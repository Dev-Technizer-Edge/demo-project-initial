const { validatePasswordStrength, validateIndianMobile } = require('../src/utils/validators');

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

describe('validateIndianMobile', () => {
  test('accepts valid numbers starting with 6', () => {
    expect(validateIndianMobile('6123456789')).toBe(true);
  });

  test('accepts valid numbers starting with 7', () => {
    expect(validateIndianMobile('7123456789')).toBe(true);
  });

  test('accepts valid numbers starting with 8', () => {
    expect(validateIndianMobile('8123456789')).toBe(true);
  });

  test('accepts valid numbers starting with 9', () => {
    expect(validateIndianMobile('9876543210')).toBe(true);
  });

  test('rejects numbers starting with 5', () => {
    expect(validateIndianMobile('5123456789')).toBe(false);
  });

  test('rejects numbers with fewer than 10 digits', () => {
    expect(validateIndianMobile('912345678')).toBe(false);
  });

  test('rejects numbers with more than 10 digits', () => {
    expect(validateIndianMobile('91234567890')).toBe(false);
  });

  test('rejects numbers containing non-digit characters', () => {
    expect(validateIndianMobile('98765-43210')).toBe(false);
    expect(validateIndianMobile('+919876543210')).toBe(false);
  });

  test('rejects non-string inputs', () => {
    expect(validateIndianMobile(null)).toBe(false);
    expect(validateIndianMobile(undefined)).toBe(false);
    expect(validateIndianMobile(9876543210)).toBe(false);
  });
});
