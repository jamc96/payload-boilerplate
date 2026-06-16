import { createLocalReq, getPayload } from 'payload'

import { seed } from '../../src/endpoints/seed/index.js'
import config from '../../src/payload.config.js'

import { seedTestUser, testUser } from './seedUser'

/**
 * Seeds the database with Glance demo content (home layout, header/footer nav, media).
 * Shared by E2E and visual regression tests.
 */
export async function seedGlanceHome(): Promise<void> {
  await seedTestUser()

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
    limit: 1,
  })

  const user = docs[0]
  if (!user) {
    throw new Error('Failed to create test user for Glance home tests')
  }

  const req = await createLocalReq({ user }, payload)
  await seed({ payload, req })
}

export const GLANCE_SECTION_TEST_IDS = [
  'glance-header',
  'glance-hero',
  'block-logoCloud',
  'block-benefits',
  'block-featureSplit',
  'block-comparisonTable',
  'block-testimonial',
  'block-processSteps',
  'block-mediaHero',
  'block-ctaCentered',
  'glance-footer',
] as const
