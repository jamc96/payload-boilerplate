import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-comparisonTable', () => {
  test('block-comparisonTable snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-comparisonTable')
  })
})
