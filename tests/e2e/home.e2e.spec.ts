import { test, expect } from '@playwright/test'

import { PAGE_SECTION_TEST_IDS, seedDemoPage } from '../helpers/seedDemoPage'

const BASE_URL = 'http://localhost:3000'

const PAGE_BLOCK_TEST_IDS = PAGE_SECTION_TEST_IDS.filter(
  (id) => id.startsWith('block-'),
)

const ANCHOR_SECTION_IDS = ['benefits', 'specifications', 'how-to', 'contact'] as const

test.describe('Home Page', () => {
  test.beforeAll(async () => {
    await seedDemoPage()
  })

  test('loads at /', async ({ page }) => {
    const response = await page.goto(BASE_URL)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator('[data-testid="site-header"]')).toBeVisible()
    await expect(page.locator('[data-testid="site-hero"]')).toBeVisible()
    await expect(page.locator('[data-testid="site-footer"]')).toBeVisible()
  })

  test('hero heading contains headline', async ({ page }) => {
    await page.goto(BASE_URL)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Browse everything.')
  })

  test('renders all content blocks', async ({ page }) => {
    await page.goto(BASE_URL)

    for (const testId of PAGE_BLOCK_TEST_IDS) {
      await expect(page.locator(`[data-testid="${testId}"]`)).toBeVisible()
    }
  })

  test('header includes a link to /contact', async ({ page }) => {
    await page.goto(BASE_URL)

    const contactLink = page.locator('[data-testid="site-header"] a[href="/contact"]').first()
    await expect(contactLink).toBeVisible()
  })

  test('anchor sections have expected ids', async ({ page }) => {
    await page.goto(BASE_URL)

    for (const id of ANCHOR_SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })
})
