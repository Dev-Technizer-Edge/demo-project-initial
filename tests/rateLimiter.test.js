const { rateLimiter } = require('../src/api/middleware');

/**
 * Builds a minimal mock req/res/next for unit-testing the rateLimiter middleware.
 *
 * @param {string} ip - Simulated client IP
 */
function makeContext(ip = '1.2.3.4') {
  const headers = {};
  const res = {
    statusCode: null,
    body: null,
    set(key, value) { headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    headers
  };
  const req = {
    ip,
    socket: { remoteAddress: ip },
    method: 'POST',
    path: '/api/auth/login'
  };
  const next = jest.fn();
  return { req, res, next };
}

describe('rateLimiter', () => {
  test('allows requests within the limit', () => {
    const middleware = rateLimiter({ windowMs: 60_000, max: 3 });
    for (let i = 0; i < 3; i++) {
      const { req, res, next } = makeContext('10.0.0.1');
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.statusCode).toBeNull();
    }
  });

  test('blocks the request that exceeds the limit with 429', () => {
    const middleware = rateLimiter({ windowMs: 60_000, max: 2 });
    const ip = '10.0.0.2';

    // consume the two allowed slots
    for (let i = 0; i < 2; i++) {
      const { req, next } = makeContext(ip);
      middleware(req, { set: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() }, next);
    }

    // third request must be blocked
    const { req, res, next } = makeContext(ip);
    middleware(req, res, next);

    expect(res.statusCode).toBe(429);
    expect(res.body).toMatchObject({ error: expect.any(String) });
    expect(next).not.toHaveBeenCalled();
  });

  test('sets Retry-After header when rate limit is exceeded', () => {
    const middleware = rateLimiter({ windowMs: 60_000, max: 1 });
    const ip = '10.0.0.3';

    // consume the one allowed slot
    makeContext(ip);
    middleware({ ip, socket: { remoteAddress: ip }, method: 'POST', path: '/' },
      { set: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() },
      jest.fn());

    // second request — blocked
    const { req, res, next } = makeContext(ip);
    middleware(req, res, next);

    expect(res.headers['Retry-After']).toBeDefined();
    expect(Number(res.headers['Retry-After'])).toBeGreaterThan(0);
  });

  test('uses a custom message when provided', () => {
    const middleware = rateLimiter({ windowMs: 60_000, max: 1, message: 'Custom limit message.' });
    const ip = '10.0.0.4';

    const noop = { set: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    middleware({ ip, socket: { remoteAddress: ip }, method: 'POST', path: '/' }, noop, jest.fn());

    const { req, res, next } = makeContext(ip);
    middleware(req, res, next);

    expect(res.body).toEqual({ error: 'Custom limit message.' });
  });

  test('tracks IPs independently', () => {
    const middleware = rateLimiter({ windowMs: 60_000, max: 1 });

    // IP A uses its one slot
    const ctxA = makeContext('10.0.1.1');
    middleware(ctxA.req, ctxA.res, ctxA.next);
    expect(ctxA.next).toHaveBeenCalled();

    // IP B still has its own fresh slot
    const ctxB = makeContext('10.0.1.2');
    middleware(ctxB.req, ctxB.res, ctxB.next);
    expect(ctxB.next).toHaveBeenCalled();
    expect(ctxB.res.statusCode).toBeNull();
  });

  test('resets the count after the window expires', () => {
    jest.useFakeTimers();

    const middleware = rateLimiter({ windowMs: 1_000, max: 1 });
    const ip = '10.0.0.5';

    const noop = { set: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    // use up the slot
    middleware({ ip, socket: { remoteAddress: ip }, method: 'GET', path: '/' }, noop, jest.fn());

    // advance past the window
    jest.advanceTimersByTime(1_001);

    // should be allowed again
    const { req, res, next } = makeContext(ip);
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.statusCode).toBeNull();

    jest.useRealTimers();
  });
});
