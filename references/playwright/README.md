# Playwright visual regression baselines

Self-baseline snapshots written by `pnpm test:visual`.

Path layout (from `playwright.visual.config.ts`):

```
references/playwright/{projectName}/{testFileName}/{snapshot}.png
```

- `{projectName}` — `desktop`, `tablet`, or `mobile`
- `{testFileName}` — spec basename without extension (e.g. `glance-home.visual.spec`)
- `{snapshot}` — e.g. `full-page.png`, `full-page-above-fold.png`, or section `data-testid` (e.g. `glance-hero.png`)

## Snapshot types

| File | Scope |
|------|--------|
| `full-page.png` | Entire scrollable page (header → footer) — section proportions |
| `full-page-above-fold.png` | Viewport only — hero/nav at each breakpoint |
| `{testId}.png` | Individual section crop via `data-testid` |

Generate baselines with the dev server running:

```bash
pnpm test:visual --update-snapshots
```
