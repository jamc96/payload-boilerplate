# Visual QA (Playwright + Figma)

Run in **Phase 6D** after **per-section QA subagents PASS** ([subagent-strategy.md](subagent-strategy.md)).

Playwright commands, parallel subagents, and **Build-VisualTests / QA-Visual** roles: [playwright-qa.md](playwright-qa.md). Load `.agents/skills/playwright/SKILL.md` when writing or fixing specs.

Paths and test IDs come from **`docs/FIGMA_PAYLOAD_PROJECT.md`**.

## Two-tier strategy

| Tier | Method | Threshold | Purpose |
|------|--------|-----------|---------|
| CI regression | Playwright self-baseline | ≤2% pixel diff | Catch regressions |
| Design sign-off | Figma MCP refs in `references/figma/` | ≤5% or manual | Fidelity check |

Do not gate CI on raw Figma pixel equality (font rendering differs).

**PNG baselines and Figma gold masters are local-only** — never commit. Gitignore via `references/playwright/.gitignore` and `references/figma/.gitignore`.  
**Do commit:** Figma seed assets in `public/media/figma/`, plus `MANIFEST.md` and README files. See [STACK_SETUP.md](STACK_SETUP.md).

## Required snapshot types

| Snapshot | Scope | Why |
|----------|-------|-----|
| `full-page.png` | `fullPage: true` | **Section proportions** — catch gap issues |
| `full-page-above-fold.png` | Viewport only | Hero / nav at each breakpoint |
| `{testId}.png` | Per `data-testid` | Block-level fixes |

Viewports: use widths from **project config** (commonly 1280 / 800 / 375).

Total batch tests: **`2 × N breakpoints`** (one section batch + one full-page test per viewport).  
Optional `@isolated` specs: one navigation each — use only with `pnpm test:visual:section`.

## File structure (batch-first)

```
tests/
  seed.spec.ts                 # Playwright CLI attach entry (@cli)
  global/
    visualGlobalSetup.ts       # seed once before all workers
  visual/
    full-page.visual.spec.ts   # tag @full-page — one navigation, two snapshots
    sections/
      all-sections.visual.spec.ts   # tag @sections batch — one navigation, all sections
      {testId}.visual.spec.ts       # tag @section @isolated — opt-in only
  helpers/
    visualSectionSnapshot.ts   # openHomePage, snapshotSectionOnPage, prepareVisualPage
references/
  figma/{page}/{breakpoint}/   # MANIFEST.md committed; PNGs local only (Phase 0 cache)
  playwright/{project}/demo-home/   # PNGs local only
```

Phase 0 Figma export: [scripts/figma-refs-setup.md](../../../scripts/figma-refs-setup.md) · `pnpm figma:refs:check`

## Playwright visual config (template)

Use **global seed** (not `beforeAll` per file) so workers can run in parallel without SQLite lock.

```typescript
export default defineConfig({
  testDir: './tests/visual',
  globalSetup: './tests/global/visualGlobalSetup.ts',
  workers: process.env.CI ? 2 : Number(process.env.PLAYWRIGHT_VISUAL_WORKERS ?? 3),
  fullyParallel: true,
  timeout: 60_000,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000' },
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      pathTemplate:
        '{testDir}/../../references/playwright/{projectName}/demo-home/{arg}{ext}',
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
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000',
  },
})
```

`visualGlobalSetup.ts` calls the project seed helper. Skip when a parent already seeded:

```bash
SKIP_VISUAL_SEED=1 pnpm test:visual
```

## Spec patterns

**Batch sections** (`tests/visual/sections/all-sections.visual.spec.ts`):

```typescript
test.describe('Visual @sections batch', () => {
  test.describe.configure({ mode: 'serial' })
  test('all section snapshots', async ({ page }) => {
    await openHomePage(page)
    for (const testId of SECTION_TEST_IDS) {
      await test.step(testId, () => snapshotSectionOnPage(page, testId))
    }
  })
})
```

**Full page** — single navigation, two snapshots via `test.step`.

**Isolated section** (opt-in `@isolated` only): `snapshotPageSection(page, testId)` — full navigation per test.

## Commands

```bash
pnpm test:visual                              # batch specs only (6 tests — fast)
pnpm test:visual:sections                     # @sections batch
pnpm test:visual:full-page                    # @full-page
pnpm test:visual:live                         # CLI attach for agent QA (preferred during build)
pnpm test:visual:section --grep site-hero   # slow isolated spec when needed
pnpm test:visual --update-snapshots            # after intentional layout change + QA PASS
SKIP_VISUAL_SEED=1 pnpm test:visual           # parent already seeded
```

## Agent QA — Playwright CLI (preferred during Phase 6)

Faster than running the full visual suite on every subagent:

```bash
pnpm seed:fresh && pnpm dev
pnpm test:visual:live          # or: pnpm test:debug tests/seed.spec.ts
# attach tw-XXXX from output:
pnpm cli attach tw-XXXX
pnpm cli goto http://localhost:3000/
pnpm cli snapshot              # compare vs references/figma/... local PNGs
```

Compare CLI snapshot + local Figma gold master — do **not** re-export Figma MCP unless design changed.

## Parallel subagent wave (Phase 6D / 6E)

1. **Parent:** `pnpm seed:fresh` once, `pnpm dev` running
2. **Parallel QA-Visual** (readonly): prefer **`pnpm test:visual:live`** + CLI per section, or compare local `references/figma/` PNGs
3. **Last:** `SKIP_VISUAL_SEED=1 pnpm test:visual` (batch CI suite)

See [subagent-strategy.md](subagent-strategy.md) and [playwright-qa.md](playwright-qa.md).

## Figma gold masters

One-time Phase 0 export — see `scripts/figma-refs-setup.md`. Verify with `pnpm figma:refs:check`.

1. `get_screenshot` / `download_assets` per MANIFEST (single setup agent)
2. Save under `references/figma/{page}/{breakpoint}/` (local; gitignored PNGs)
3. `MANIFEST.md` — node IDs, date, fileKey (committed)
4. **Agents read local PNGs** — refresh only when design changes

## When gaps look wrong

1. Compare `full-page.png` to live page
2. Launch **readonly QA subagent for the failing section only** — not the agent that built it
3. Spacing values: [spacing-patterns.md](spacing-patterns.md)
4. Fix doubled padding before tweaking internal gaps
5. Re-run section QA, then `--update-snapshots` only after intentional layout changes
