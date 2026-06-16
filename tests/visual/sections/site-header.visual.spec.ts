import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated site-header', () => {
  test('site-header snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'site-header')
  })
})
