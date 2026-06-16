---
name: playwright
description: >-
  Playwright E2E and visual tests for this repo. Routes to in-repo workflow docs —
  no user-level or external skill paths. Use with playwright-cli for live QA.
---

# Playwright (in-repo)

All Playwright guidance lives **inside this repository**. Do not load `~/.cursor/skills/playwright/` or other paths outside the project.

## Load these docs (in order)

| Doc | Path | When |
|-----|------|------|
| **Workflow QA** | `.agents/skills/figma-payload-cms/playwright-qa.md` | E2E, visual regression, test subagents, scripts |
| **Visual QA** | `.agents/skills/figma-payload-cms/visual-qa.md` | Snapshots, baselines, batch specs |
| **Playwright CLI** | `.agents/skills/playwright-cli/SKILL.md` | Live section QA — `pnpm test:visual:live`, attach, snapshot |
| **Project config** | `docs/FIGMA_PAYLOAD_PROJECT.md` | test IDs, commands, base URL |

## Project test layout

```
tests/e2e/              # Functional smoke
tests/visual/           # Visual regression (batch + @isolated section specs)
tests/helpers/          # seedDemoPage, visualSectionSnapshot, seedUser
tests/global/           # visualGlobalSetup.ts
tests/seed.spec.ts      # CLI attach entry
playwright.config.ts
playwright.visual.config.ts
```

## Rules (this stack)

- Locators: `getByRole` / `getByLabel` for admin; `data-testid` from project config for marketing sections
- No `waitForTimeout` in specs — use `prepareVisualPage` / `snapshotSectionOnPage` helpers
- Seed before destructive DB tests: `seedDemoPage()` or `pnpm seed:fresh`
- Visual baselines are **local only** — never commit `references/playwright/**/*.png`
- Prefer `pnpm test:visual:live` + CLI for agent QA; full `pnpm test:visual` for sign-off

## Commands

```bash
pnpm test:e2e
pnpm test:visual
pnpm test:visual:live
pnpm test:debug tests/seed.spec.ts
pnpm cli attach tw-XXXX
```

Upstream Playwright API reference: https://playwright.dev/docs/intro
