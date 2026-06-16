# Example: payload-poc (Glance home page)

Reference only — shows how **`docs/FIGMA_PAYLOAD_PROJECT.md`** is filled for one real project. Do not copy Glance names into other repos; copy the **structure**.

## Project

| Field | Value |
|-------|-------|
| Project name | Glance / payload-poc |
| Page plan | `docs/GLANCE_HOME_PAGE_PLAN.md` |
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
| SectionContainer | `src/components/GlanceSection/` |
| SectionHeader | `src/components/SectionHeader/` |
| PageButton | `src/components/GlanceButton/` |
| Icon | `src/components/Icon/` |
| Hero | `src/heros/GlanceHero/` |

## CSS prefix

`--glance-*` (e.g. `--glance-section-pt`, `--glance-divider`)

## Test IDs

| Entity | testid |
|--------|--------|
| Header | `glance-header` |
| Hero | `glance-hero` |
| Block | `block-{slug}` |
| Footer | `glance-footer` |

Export: `tests/helpers/seedGlanceHome.ts` → `GLANCE_SECTION_TEST_IDS`

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

Playwright E2E/visual/CLI: [playwright-qa.md](../playwright-qa.md) + [playwright skill](~/.cursor/skills/playwright/SKILL.md)
