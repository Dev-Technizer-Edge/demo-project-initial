const bcrypt = require('bcryptjs');
const { loginUser } = require('../src/auth/authService');

describe('loginUser', () => {
  let userRecord;

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash('correct-password', 10);
    userRecord = { id: 'user-001', email: 'test@example.com', role: 'user', passwordHash };
  });

  it('returns tokens when correct password is supplied', async () => {
    const result = await loginUser('test@example.com', 'correct-password', userRecord);
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result.user.email).toBe('test@example.com');
  });

  it('throws Invalid credentials when wrong password is supplied', async () => {
    await expect(loginUser('test@example.com', 'wrong-password', userRecord))
      .rejects.toThrow('Invalid credentials');
  });

  it('throws Invalid credentials when userRecord is null', async () => {
    await expect(loginUser('test@example.com', 'any-password', null))
      .rejects.toThrow('Invalid credentials');
  });
});
