import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-benefits', () => {
  test('block-benefits snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-benefits')
  })
})
