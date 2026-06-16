import { test, expect, type Locator } from '@playwright/test'

import { GLANCE_SECTION_TEST_IDS, seedGlanceHome } from '../helpers/seedGlanceHome'
import { prepareGlanceHomePage } from '../helpers/visualPageReady'

async function waitForLocatorImages(locator: Locator) {
  await locator.locator('img').evaluateAll((images) =>
    Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            const image = img as HTMLImageElement

            if (image.complete) {
              resolve()
              return
            }

            image.onload = () => resolve()
            image.onerror = () => resolve()
          }),
      ),
    ),
  )
}

test.describe('Glance Home visual regression', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeAll(async () => {
    await seedGlanceHome()
  })

  test('full-page snapshot', async ({ page }) => {
    await prepareGlanceHomePage(page)

    // Entire scrollable page — header, all sections, footer — for proportion QA
    await expect(page).toHaveScreenshot('full-page.png', {
      fullPage: true,
    })
  })

  test('full-page above-the-fold snapshot', async ({ page }) => {
    await prepareGlanceHomePage(page)

    // Viewport-only capture for hero + nav proportions at each breakpoint
    await expect(page).toHaveScreenshot('full-page-above-fold.png', {
      fullPage: false,
    })
  })

  for (const testId of GLANCE_SECTION_TEST_IDS) {
    test(`${testId} snapshot`, async ({ page }) => {
      await prepareGlanceHomePage(page)

      const locator = page.locator(`[data-testid="${testId}"]`)
      await expect(locator).toBeVisible()
      await waitForLocatorImages(locator)
      await expect(locator).toHaveScreenshot(`${testId}.png`)
    })
  }
})
