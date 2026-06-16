# Adapter: Payload Website Template

Optional. Load when the target repo is based on [Payload Website Template](https://github.com/payloadcms/payload/tree/main/templates/website) or a fork with the same layout.

Project-specific names still live in **`docs/FIGMA_PAYLOAD_PROJECT.md`**. This file only lists **default paths** common to that template.

## Default paths

| Concern | Typical path |
|---------|--------------|
| Pages collection | `src/collections/Pages/index.ts` |
| Block registry | `src/blocks/RenderBlocks.tsx` |
| Hero config | `src/heros/config.ts`, `RenderHero.tsx` |
| Header global | `src/Header/` |
| Footer global | `src/Footer/` |
| Seed | `src/endpoints/seed/`, CLI `scripts/seed-cli.mts` |
| Section anchors | `src/constants/sectionAnchors.ts` — [section-anchors.md](../section-anchors.md) |
| Frontend CSS | `src/app/(frontend)/globals.css` |
| E2E | `tests/e2e/`, `playwright.config.ts` |
| Visual | `tests/visual/`, `playwright.visual.config.ts` |
| Playwright CLI (required) | `@playwright/cli` + `.agents/skills/playwright-cli/` — see [playwright-qa.md](../playwright-qa.md) |
| Page render | `src/app/(frontend)/[slug]/page.tsx` |

## Default Payload mapping

| Figma | Entity |
|-------|--------|
| Nav | `header` global |
| Hero | `hero` group field on Page |
| Sections | `layout` blocks array |
| Footer | `footer` global |

## Template block slugs (may already exist)

`content`, `cta`, `mediaBlock`, `archive`, `formBlock` — reuse if close; otherwise add new slugs per page plan.

## Seed pitfalls (template-specific)

- Clear globals must include **all** fields or validation fails
- Pass `req` + `context: { disableRevalidate: true }` on seed updates
- Re-run seed after schema changes
- Hash nav links must use `sectionAnchorHref()` — same ids as block components ([section-anchors.md](../section-anchors.md))
- Avoid concurrent Payload inits (E2E + dev) on SQLite

## Type generation

```bash
pnpm generate:types
```

## Reference implementation

This repo's filled config: [examples/example-implementation.md](../examples/example-implementation.md)  
Page plan: `docs/EXAMPLE_PAGE_PLAN.md`
