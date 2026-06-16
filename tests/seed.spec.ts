import { test } from '@playwright/test'

import { openHomePage } from '../helpers/visualSectionSnapshot'

/**
 * Playwright CLI seed — attach here for live section QA (faster than full visual suite).
 *
 *   pnpm seed:fresh && pnpm dev
 *   pnpm test:debug tests/seed.spec.ts
 *   pnpm cli attach tw-XXXX
 *   pnpm cli goto http://localhost:3000/
 *   pnpm cli snapshot
 */
test.describe('Seed @cli', () => {
  test('open home page', async ({ page }) => {
    await openHomePage(page)
    await page.waitForTimeout(60_000)
  })
})
