# Example: payload-figma-boilerplate (Home page)

Reference only — shows how **`docs/FIGMA_PAYLOAD_PROJECT.md`** is filled for one real project. Do not copy names into other repos; copy the **structure**.

## Project

| Field | Value |
|-------|-------|
| Project name | payload-figma-boilerplate (demo) |
| Page plan | `.agents/skills/figma-payload-cms/examples/EXAMPLE_PAGE_PLAN.md` |
| Route | `/` → slug `home` |
| Adapter | Payload Website Template |

## Figma

| Field | Value |
|-------|-------|
| fileKey | `lEM5McyRvPeMRIn4Ce6q0a` |
| Desktop | `1:118` @ 1280px |
| Tablet | `1:274` @ 800px |
| Mobile | `1:430` @ 375px |

## This repo's component names (brand-specific)

| Role | Path |
|------|------|
| SectionContainer | `src/components/SiteSection/` |
| SectionHeader | `src/components/SectionHeader/` |
| PageButton | `src/components/SiteButton/` |
| Icon | `src/components/Icon/` |
| Hero | `src/heros/MarketingHero/` |

## CSS prefix

`--site-*` (e.g. `--site-section-pt`, `--site-divider`)

## Test IDs

| Entity | testid |
|--------|--------|
| Header | `site-header` |
| Hero | `site-hero` |
| Block | `block-{slug}` |
| Footer | `site-footer` |

Export: `tests/helpers/seedDemoPage.ts` → `PAGE_SECTION_TEST_IDS`

## Section anchors

`src/constants/sectionAnchors.ts` — hardcoded `#id` on block components (not CMS).

| Block slug | HTML id |
|------------|---------|
| `benefits` | `benefits` |
| `comparisonTable` | `specifications` |
| `processSteps` | `how-to` |
| `ctaCentered` | `contact` |

Seed nav: `sectionAnchorHref()` from constants. Skill: [section-anchors.md](../section-anchors.md)

## Commands

`pnpm dev`, `pnpm seed`, `pnpm test:e2e`, `pnpm test:visual`

## Blocks implemented

`logoCloud`, `benefits`, `featureSplit`, `comparisonTable`, `testimonial`, `processSteps`, `mediaHero`, `ctaCentered`

See page plan for Figma node IDs, spacing audit (§5B), and **per-section build/QA subagent table** (§5, §5C).

Subagent rules: [subagent-strategy.md](../subagent-strategy.md)

Playwright E2E/visual/CLI: [playwright-qa.md](../playwright-qa.md) + required skills in [STACK_SETUP.md](../STACK_SETUP.md)
