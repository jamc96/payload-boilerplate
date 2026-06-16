# Payload CMS patterns

Conventions for **Payload Website Template** and similar Next.js + Payload setups. Paths may differ — confirm in `docs/FIGMA_PAYLOAD_PROJECT.md` and [adapters/payload-website-template.md](adapters/payload-website-template.md).

## Add a block

1. `src/blocks/{Name}/config.ts` — slug, interfaceName, fields
2. `src/blocks/{Name}/Component.tsx` — props from generated types
3. Register in Pages collection → `layout.blocks`
4. Register in `RenderBlocks.tsx`
5. Run type generation (`pnpm generate:types` or project equivalent)

## Add a hero variant

1. Option in hero config + conditional fields
2. Component in `src/heros/{Name}/`
3. Map in `RenderHero.tsx`
4. Adjust page client header theme if needed

## Extend globals

Header/Footer config + components; reset new fields in seed clear step.

## Field factories (typical)

Create in `src/fields/` as needed:

| Factory | Use |
|---------|-----|
| `sectionHeader` | eyebrow, heading, description, align |
| `iconPicker` | icon select |
| `ctaButton` | button variants + fullWidth |
| `anchorId` | in-page nav `#id` |

Names and variants are **design-specific** — define in page plan.

## Seed checklist

- [ ] Clear step resets **all** new global fields
- [ ] Updates pass `req` + `disableRevalidate` when hooks require it
- [ ] Layout block order matches Figma top→bottom
- [ ] Hero type matches new variant
- [ ] CLI seed documented in project config

## Frontend conventions

- **SectionContainer** (your name): horizontal max-width + inset only — see spacing-patterns
- **Block root:** `data-testid` from project config (e.g. `block-{slug}`)
- **Shell:** testids on header, hero, footer
- Dynamic Tailwind: safelist in CSS if required by your setup
- CMS home slug → `/` in link helper if applicable

## Visual test hooks (Phase 6)

Implement per project config:

- Shared seed helper for E2E + visual tests
- `visualPageReady.ts` — fonts + image load
- `pnpm test:visual` script

See [visual-qa.md](visual-qa.md).
