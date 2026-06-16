import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated site-hero', () => {
  test('site-hero snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'site-hero')
  })
})
