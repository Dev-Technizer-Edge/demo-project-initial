const request = require('supertest');
const bcrypt = require('bcryptjs');

jest.mock('../src/db/userRepository');
const { getUserByEmail } = require('../src/db/userRepository');

const app = require('../src/index');

describe('POST /api/auth/login', () => {
  let validUserRecord;

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash('ValidPass1!', 10);
    validUserRecord = {
      id: 'user-001',
      email: 'user@example.com',
      role: 'user',
      passwordHash,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with accessToken and refreshToken for valid credentials', async () => {
    getUserByEmail.mockResolvedValue(validUserRecord);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'ValidPass1!' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.user.email).toBe('user@example.com');
  });

  it('returns 401 when email does not exist in the database', async () => {
    getUserByEmail.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ghost@example.com', password: 'ValidPass1!' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid email or password');
  });

  it('returns 401 when password is wrong', async () => {
    getUserByEmail.mockResolvedValue(validUserRecord);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'WrongPassword1!' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid email or password');
  });

  it('returns 400 when email field is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ password: 'ValidPass1!' });

    expect(res.status).toBe(400);
  });

  it('returns 400 when password field is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com' });

    expect(res.status).toBe(400);
  });
});
