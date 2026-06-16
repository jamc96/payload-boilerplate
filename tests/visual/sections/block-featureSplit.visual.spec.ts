import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-featureSplit', () => {
  test('block-featureSplit snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-featureSplit')
  })
})
