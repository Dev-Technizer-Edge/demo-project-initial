const { validatePasswordStrength } = require('../src/utils/validators');

describe('validatePasswordStrength', () => {
  test('accepts a password meeting all requirements', () => {
    expect(validatePasswordStrength('Abcdefg1!x')).toBe(true);
  });

  test('rejects passwords shorter than 10 characters', () => {
    expect(validatePasswordStrength('Abc1!xyz')).toBe(false);
  });

  test('rejects passwords missing an uppercase letter', () => {
    expect(validatePasswordStrength('abcdefg1!x')).toBe(false);
  });

  test('rejects passwords missing a lowercase letter', () => {
    expect(validatePasswordStrength('ABCDEFG1!X')).toBe(false);
  });

  test('rejects passwords missing a number', () => {
    expect(validatePasswordStrength('Abcdefgh!x')).toBe(false);
  });

  test('rejects passwords missing a special character', () => {
    expect(validatePasswordStrength('Abcdefg1xy')).toBe(false);
  });

  test('rejects non-string inputs', () => {
    expect(validatePasswordStrength(null)).toBe(false);
    expect(validatePasswordStrength(undefined)).toBe(false);
    expect(validatePasswordStrength(12345678901)).toBe(false);
  });
});
