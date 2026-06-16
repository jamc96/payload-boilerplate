import { test, expect } from '@playwright/test'
import { createLocalReq, getPayload } from 'payload'

import { seed } from '../../src/endpoints/seed/index.js'
import config from '../../src/payload.config.js'
import { seedTestUser, testUser } from '../helpers/seedUser'

const BASE_URL = 'http://localhost:3000'

/**
 * Seeds the database with Glance demo content (home layout, header/footer nav, media).
 *
 * Required for:
 * - All block `data-testid` visibility tests
 * - Header `/contact` link test
 * - Anchor section id tests (`#benefits`, `#specifications`, `#how-to`, `#contact`)
 *
 * Without seed, the home page still renders via `homeStatic` fallback with the
 * "Browse everything." hero headline, but layout blocks and header nav are empty.
 */
async function seedGlanceHome(): Promise<void> {
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
    throw new Error('Failed to create test user for Glance home E2E tests')
  }

  const req = await createLocalReq({ user }, payload)
  await seed({ payload, req })
}

const GLANCE_BLOCK_TEST_IDS = [
  'block-logoCloud',
  'block-benefits',
  'block-featureSplit',
  'block-comparisonTable',
  'block-testimonial',
  'block-processSteps',
  'block-mediaHero',
  'block-ctaCentered',
] as const

const ANCHOR_SECTION_IDS = ['benefits', 'specifications', 'how-to', 'contact'] as const

test.describe('Glance Home Page', () => {
  test.beforeAll(async () => {
    await seedGlanceHome()
  })

  test('loads at /', async ({ page }) => {
    const response = await page.goto(BASE_URL)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator('[data-testid="glance-header"]')).toBeVisible()
  })

  test('hero heading contains Glance headline', async ({ page }) => {
    await page.goto(BASE_URL)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Browse everything.')
  })

  test('renders all Glance content blocks', async ({ page }) => {
    await page.goto(BASE_URL)

    for (const testId of GLANCE_BLOCK_TEST_IDS) {
      await expect(page.locator(`[data-testid="${testId}"]`)).toBeVisible()
    }
  })

  test('header includes a link to /contact', async ({ page }) => {
    await page.goto(BASE_URL)

    const contactLink = page.locator('[data-testid="glance-header"] a[href="/contact"]').first()
    await expect(contactLink).toBeVisible()
  })

  test('anchor sections have expected ids', async ({ page }) => {
    await page.goto(BASE_URL)

    for (const id of ANCHOR_SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })
})
