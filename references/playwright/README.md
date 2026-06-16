# Playwright visual regression baselines

Self-baseline snapshots written by `pnpm test:visual`.

Path layout (from `playwright.visual.config.ts`):

```
references/playwright/{projectName}/demo-home/{snapshot}.png
```

- `{projectName}` — `desktop`, `tablet`, or `mobile`
- `{snapshot}` — e.g. `full-page.png`, `full-page-above-fold.png`, or section `data-testid` (e.g. `site-hero.png`)

## Spec layout (batch-first — fast)

| Spec | Scope | Grep tag |
|------|--------|----------|
| `tests/visual/sections/all-sections.visual.spec.ts` | All sections, one navigation per viewport | `@sections batch` |
| `tests/visual/full-page.visual.spec.ts` | Full scroll + above-fold | `@full-page` |
| `tests/visual/sections/{testId}.visual.spec.ts` | One section (opt-in) | `@section @isolated` |

Default `pnpm test:visual` excludes `@isolated` specs (6 tests total vs 39).

Seed runs once in `tests/global/visualGlobalSetup.ts` (skip with `SKIP_VISUAL_SEED=1`).

## Agent QA (live — preferred during build)

```bash
pnpm seed:fresh && pnpm dev
pnpm test:visual:live
pnpm cli attach tw-XXXX
pnpm cli snapshot
```

Compare vs local Figma gold masters in `references/figma/` (see `scripts/figma-refs-setup.md`).

## Snapshot types

| File | Scope |
|------|--------|
| `full-page.png` | Entire scrollable page (header → footer) — section proportions |
| `full-page-above-fold.png` | Viewport only — hero/nav at each breakpoint |
| `{testId}.png` | Individual section crop via `data-testid` |

**PNGs in this folder are gitignored** — generate locally; do not commit.

```bash
pnpm test:visual --update-snapshots
```

Isolated section (slow):

```bash
SKIP_VISUAL_SEED=1 pnpm test:visual:section --grep site-hero
```
