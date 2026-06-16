# Visual QA (Playwright + Figma)

Run in **Phase 6D**. Paths and test IDs come from **`docs/FIGMA_PAYLOAD_PROJECT.md`**.

## Two-tier strategy

| Tier | Method | Threshold | Purpose |
|------|--------|-----------|---------|
| CI regression | Playwright self-baseline | ≤2% pixel diff | Catch regressions |
| Design sign-off | Figma MCP refs in `references/figma/` | ≤5% or manual | Fidelity check |

Do not gate CI on raw Figma pixel equality (font rendering differs).

## Required snapshot types

| Snapshot | Scope | Why |
|----------|-------|-----|
| `full-page.png` | `fullPage: true` | **Section proportions** — catch gap issues |
| `full-page-above-fold.png` | Viewport only | Hero / nav at each breakpoint |
| `{testId}.png` | Per `data-testid` | Block-level fixes |

Viewports: use widths from **project config** (commonly 1280 / 800 / 375).

Total tests: **`(2 + N sections) × N breakpoints`**.

## Suggested file structure

```
tests/
  visual/
    {page}.visual.spec.ts
  helpers/
    seedPageContent.ts       # name from project config
    visualPageReady.ts       # goto + fonts + images
references/
  figma/{page}/{breakpoint}/
  playwright/{project}/{spec}/
```

## Playwright visual config (template)

Adjust `baseURL`, `webServer.command`, DB `workers: 1` if seed is destructive.

```typescript
export default defineConfig({
  testDir: './tests/visual',
  workers: 1,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000' },
  expect: {
    toHaveScreenshot: {
      pathTemplate: '{testDir}/../../references/playwright/{projectName}/{testFileName}/{arg}{ext}',
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
      animations: 'disabled',
    },
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
    { name: 'tablet',  use: { viewport: { width: 800,  height: 900 } } },
    { name: 'mobile',  use: { viewport: { width: 375,  height: 812 } } },
  ],
  webServer: { command: 'pnpm dev', reuseExistingServer: true, url: 'http://localhost:3000' },
})
```

## Test ID convention (configure per project)

Document in `FIGMA_PAYLOAD_PROJECT.md`:

| Entity | Pattern example |
|--------|-----------------|
| Header | `site-header` or `{brand}-header` |
| Hero | `site-hero` |
| Block | `block-{slug}` |
| Footer | `site-footer` |

Export array of IDs for the visual spec loop.

## Spec pattern

```typescript
test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => { await seedPageContent() })

test('full-page snapshot', async ({ page }) => {
  await preparePage(page, '{route}')
  await expect(page).toHaveScreenshot('full-page.png', { fullPage: true })
})

for (const testId of PAGE_SECTION_TEST_IDS) {
  test(`${testId} snapshot`, async ({ page }) => {
    await preparePage(page, '{route}')
    const locator = page.locator(`[data-testid="${testId}"]`)
    await expect(locator).toBeVisible()
    await expect(locator).toHaveScreenshot(`${testId}.png`)
  })
}
```

## Commands

```bash
pnpm test:visual
pnpm test:visual --update-snapshots
pnpm test:visual --grep "full-page"
```

## Figma gold masters

1. `get_screenshot` per section + full desktop frame
2. Save under `references/figma/{page}/{breakpoint}/`
3. `MANIFEST.md` — node IDs, date, fileKey

## When gaps look wrong

1. Compare `full-page.png` to live page
2. Spacing audit subagent ([spacing-patterns.md](spacing-patterns.md))
3. Fix doubled padding before tweaking internal gaps
4. Update baselines only after intentional layout changes
