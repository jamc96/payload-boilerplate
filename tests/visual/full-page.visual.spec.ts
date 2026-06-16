import { test, expect } from '@playwright/test'

import { prepareVisualPage } from '../helpers/visualSectionSnapshot'

test.describe('Visual @full-page', () => {
  test('full-page snapshots', async ({ page }) => {
    await prepareVisualPage(page)

    await test.step('full-page scroll', async () => {
      await expect(page).toHaveScreenshot('full-page.png', { fullPage: true })
    })

    await test.step('above-the-fold', async () => {
      await page.evaluate(() => window.scrollTo(0, 0))
      await expect(page).toHaveScreenshot('full-page-above-fold.png', {
        fullPage: false,
      })
    })
  })
})
