import { expect, type Locator, type Page } from '@playwright/test'

const LOCATOR_IMAGE_TIMEOUT_MS = 15_000

async function waitForLocatorImages(locator: Locator) {
  await Promise.race([
    locator.locator('img').evaluateAll((images) =>
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
    ),
    locator.page().waitForTimeout(LOCATOR_IMAGE_TIMEOUT_MS),
  ])
}

/** Navigate home and wait for fonts (section tests share one navigation per viewport). */
export async function openHomePage(page: Page): Promise<void> {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
}

/** Snapshot a section on the current page — no navigation. */
export async function snapshotSectionOnPage(page: Page, testId: string): Promise<void> {
  const locator = page.locator(`[data-testid="${testId}"]`)
  await expect(locator).toBeVisible()
  await waitForLocatorImages(locator)
  await expect(locator).toHaveScreenshot(`${testId}.png`)
}

/** Navigate home then snapshot one section (isolated / @isolated specs). */
export async function snapshotPageSection(page: Page, testId: string): Promise<void> {
  await openHomePage(page)
  await snapshotSectionOnPage(page, testId)
}

const IMAGE_READY_TIMEOUT_MS = 30_000

/** Navigate home and wait for fonts + all images before full-page snapshots. */
export async function prepareVisualPage(page: Page): Promise<void> {
  await openHomePage(page)

  await Promise.race([
    page.locator('img').evaluateAll((images) =>
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
    ),
    page.waitForTimeout(IMAGE_READY_TIMEOUT_MS),
  ])
}
