import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-ctaCentered', () => {
  test('block-ctaCentered snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-ctaCentered')
  })
})
