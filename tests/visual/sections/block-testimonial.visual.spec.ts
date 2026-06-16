import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-testimonial', () => {
  test('block-testimonial snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-testimonial')
  })
})
