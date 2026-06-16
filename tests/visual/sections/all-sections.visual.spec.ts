import { test } from '@playwright/test'

import { PAGE_SECTION_TEST_IDS } from '../../helpers/seedDemoPage'
import {
  openHomePage,
  snapshotSectionOnPage,
} from '../../helpers/visualSectionSnapshot'

test.describe('Visual @sections batch', () => {
  test.describe.configure({ mode: 'serial' })

  test('all section snapshots', async ({ page }) => {
    await openHomePage(page)

    for (const testId of PAGE_SECTION_TEST_IDS) {
      await test.step(`${testId}`, async () => {
        await snapshotSectionOnPage(page, testId)
      })
    }
  })
})
