/**
 * Input Validation Utilities
 * Pure functions for validating user-supplied data before processing.
 */

/**
 * Validates an email address format.
 *
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a password meets minimum requirements.
 * Requirements: at least 8 characters.
 *
 * @param {string} password
 * @returns {boolean}
 */
function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 8;
}

/**
 * Validates password strength.
 * Requirements: minimum 10 characters, at least one uppercase letter,
 * one lowercase letter, one number, and one special character.
 *
 * @param {string} password
 * @returns {boolean}
 */
function validatePasswordStrength(password) {
  return (
    typeof password === 'string' &&
    password.length >= 10 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

/**
 * Validates a UUID v4 string.
 *
 * @param {string} id
 * @returns {boolean}
 */
function validateUUID(id) {
  if (!id || typeof id !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Validates an Indian mobile number.
 * Requirements: exactly 10 digits, starting with 6, 7, 8, or 9.
 *
 * @param {string} mobile
 * @returns {boolean}
 */
function validateIndianMobile(mobile) {
  return typeof mobile === 'string' && /^[6-9]\d{9}$/.test(mobile.trim());
}

/**
 * Sanitizes a string by trimming whitespace and removing control characters.
 *
 * @param {string} input
 * @returns {string}
 */
function sanitizeString(input) {
  if (!input || typeof input !== 'string') return '';
  return input.trim().replace(/[\x00-\x1F\x7F]/g, '');
}

module.exports = {
  validateEmail,
  validatePassword,
  validatePasswordStrength,
  validateUUID,
  validateIndianMobile,
  sanitizeString
};
