import { test, expect } from '@playwright/test'

import { GLANCE_SECTION_TEST_IDS, seedGlanceHome } from '../helpers/seedGlanceHome'

const BASE_URL = 'http://localhost:3000'

const GLANCE_BLOCK_TEST_IDS = GLANCE_SECTION_TEST_IDS.filter(
  (id) => id.startsWith('block-'),
)

const ANCHOR_SECTION_IDS = ['benefits', 'specifications', 'how-to', 'contact'] as const

test.describe('Glance Home Page', () => {
  test.beforeAll(async () => {
    await seedGlanceHome()
  })

  test('loads at /', async ({ page }) => {
    const response = await page.goto(BASE_URL)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator('[data-testid="glance-header"]')).toBeVisible()
    await expect(page.locator('[data-testid="glance-hero"]')).toBeVisible()
    await expect(page.locator('[data-testid="glance-footer"]')).toBeVisible()
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
