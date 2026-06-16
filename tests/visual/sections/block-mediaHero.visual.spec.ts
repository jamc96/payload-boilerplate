import { test } from '@playwright/test'

import { snapshotPageSection } from '../../helpers/visualSectionSnapshot'

test.describe('Visual @section @isolated block-mediaHero', () => {
  test('block-mediaHero snapshot', async ({ page }) => {
    await snapshotPageSection(page, 'block-mediaHero')
  })
})
