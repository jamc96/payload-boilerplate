import type { Page } from '@playwright/test'

/** Navigate home and wait for fonts + images before visual snapshots. */
export async function prepareGlanceHomePage(page: Page): Promise<void> {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)

  await page.locator('img').evaluateAll((images) =>
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
