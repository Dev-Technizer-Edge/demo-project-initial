---
name: Project State — Pre-Prisma Baseline
description: Current data-layer state of the demo-project before PostgreSQL migration; Prisma is not yet installed
type: project
---

No `prisma/` directory exists. No Prisma or pg driver in `package.json` dependencies.

The only persistent state is an in-memory `refreshTokenStore` Map in `src/auth/authService.js`. It holds `{ userId, createdAt, expiresAt }` keyed on a UUID refresh token string.

`getUserById` in `authService.js` is a stub that returns a hardcoded object — it does not touch a database. The login route in `routes.js` also uses a hardcoded `mockUserRecord`. Neither a `User` table nor any ORM query exists yet.

Two models are needed for the migration: `User` and `RefreshToken`.

**Why:** User asked for a full PostgreSQL migration analysis covering schema, file impact, test impact, and risks.

**How to apply:** When proposing schema or migration work, start from zero — no existing Prisma setup to preserve. Both `User` and `RefreshToken` tables must be created from scratch.
