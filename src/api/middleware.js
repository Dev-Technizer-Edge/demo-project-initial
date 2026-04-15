/**
 * Express Middleware
 * Request logging, authentication, body validation, error handling, and rate limiting.
 */

const { verifyToken, extractBearerToken } = require('../auth/tokenHelper');
const { logger } = require('../utils/logger');

/**
 * Logs every incoming request.
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} → ${res.statusCode} (${duration}ms)`);
  });
  next();
}

/**
 * Verifies the JWT Bearer token on protected routes.
 * Attaches decoded user payload to req.user.
 */
function authenticate(req, res, next) {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

/**
 * Validates that required fields are present in the request body.
 *
 * @param {string[]} fields - list of required field names
 */
function validateBody(fields) {
  return (req, res, next) => {
    const missing = fields.filter(f => req.body[f] === undefined || req.body[f] === '');
    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(', ')}`
      });
    }
    next();
  };
}

/**
 * Creates a fixed-window in-memory rate limiter middleware.
 *
 * @param {object} options
 * @param {number} options.windowMs   - Window size in milliseconds
 * @param {number} options.max        - Max requests allowed per window per IP
 * @param {string} [options.message]  - Error message sent on 429
 * @returns {Function} Express middleware
 */
function rateLimiter({ windowMs, max, message = 'Too many requests, please try again later.' }) {
  /** @type {Map<string, { count: number, resetAt: number }>} */
  const store = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now >= entry.resetAt) {
      store.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      logger.warn(`Rate limit exceeded for IP ${ip} on ${req.method} ${req.path}`);
      return res.status(429).json({ error: message });
    }

    next();
  };
}

/**
 * Global error handler — catches anything passed to next(err).
 */
function errorHandler(err, req, res, _next) {
  logger.error(`Unhandled error on ${req.method} ${req.path}: ${err.message}`);
  res.status(500).json({
    error: 'An unexpected error occurred'
  });
}

module.exports = {
  requestLogger,
  authenticate,
  validateBody,
  errorHandler,
  rateLimiter
};
