import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-logoCloud', () => {
  test('block-logoCloud snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-logoCloud')
  })
})
