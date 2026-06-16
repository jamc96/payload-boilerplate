import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated site-footer', () => {
  test('site-footer snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'site-footer')
  })
})
