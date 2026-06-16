import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-processSteps', () => {
  test('block-processSteps snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-processSteps')
  })
})
