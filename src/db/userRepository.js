/**
 * User Repository
 * Thin Prisma wrapper for user lookups.
 * Prisma client is lazily initialised so the module can be required
 * and fully mocked in tests without a live database.
 */

let prisma;

function getClient() {
  if (!prisma) {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  }
  return prisma;
}

/**
 * Finds a user record by email address.
 *
 * @param {string} email
 * @returns {Promise<object|null>}
 */
async function getUserByEmail(email) {
  return getClient().user.findUnique({ where: { email } });
}

/**
 * Finds a user record by ID.
 *
 * @param {string} id
 * @returns {Promise<object|null>}
 */
async function getUserById(id) {
  return getClient().user.findUnique({ where: { id } });
}

module.exports = { getUserByEmail, getUserById };
