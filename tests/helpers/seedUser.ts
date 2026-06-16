import { getPayload } from 'payload'

import config from '../../src/payload.config.js'

import { ensureSeedAdminUser, getSeedAdminCredentials } from '../../src/endpoints/seed/ensureAdminUser.js'

/** Same credentials as CLI seed admin — override via SEED_ADMIN_* env vars. */
export const testUser = getSeedAdminCredentials()

/**
 * Ensures the seed admin exists for e2e / visual tests.
 */
export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })
  await ensureSeedAdminUser(payload)
}

/**
 * Cleans up seed admin after isolated tests (optional).
 */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
