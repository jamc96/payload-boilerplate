import type { Payload, User } from 'payload'

export type SeedAdminCredentials = {
  email: string
  password: string
  name: string
}

/** Admin user used for CLI seed, admin UI login, and test seed requests. */
export function getSeedAdminCredentials(): SeedAdminCredentials {
  return {
    email: process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com',
    password: process.env.SEED_ADMIN_PASSWORD ?? 'password',
    name: process.env.SEED_ADMIN_NAME ?? 'Admin',
  }
}

/**
 * Ensures the seed admin exists (creates on first run, updates password if env changed).
 * Call before `seed()` so you never hit Payload's register-first-user screen after `pnpm seed:fresh`.
 */
export async function ensureSeedAdminUser(payload: Payload): Promise<User> {
  const { email, password, name } = getSeedAdminCredentials()

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })

  const existing = docs[0]

  if (existing) {
    return payload.update({
      collection: 'users',
      id: existing.id,
      data: { name, password },
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: 'users',
    data: { email, password, name },
    overrideAccess: true,
  })
}
