# Payload CMS patterns (Website Template)

## Add a block

1. `src/blocks/{Name}/config.ts` — `slug`, `interfaceName`, `fields`
2. `src/blocks/{Name}/Component.tsx` — props from `@/payload-types`
3. Register in `src/collections/Pages/index.ts` → `layout.blocks`
4. Register in `src/blocks/RenderBlocks.tsx` → `blockComponents`
5. `pnpm generate:types`

## Add a hero variant

1. Option in `src/heros/config.ts` + conditional fields
2. Component in `src/heros/{Name}/index.tsx`
3. Map in `src/heros/RenderHero.tsx`
4. Update `page.client.tsx` header theme if needed

## Extend globals

`src/Header/config.ts`, `src/Footer/config.ts` — add fields, update components, revalidate hooks already exist.

## Reusable field factories (create in `src/fields/`)

| Factory | Use |
|---------|-----|
| `sectionHeader` | eyebrow, heading, description, align |
| `iconPicker` | lucide icon select |
| `ctaButton` | primary / secondary / linkout + optional fullWidth |
| `anchorId` | section `id` for in-page nav |

## Seed checklist

- [ ] Clear globals include ALL new fields (validation)
- [ ] All `update`/`create` pass `req` where hooks use `context.disableRevalidate`
- [ ] Home layout block order matches Figma
- [ ] Hero type matches new variant
- [ ] CLI script: `scripts/seed-cli.mts` + `pnpm seed`

## Frontend conventions

- `container` utility in `globals.css`
- `@source inline(...)` for dynamic Tailwind classes
- `CMSLink`: slug `home` → `/`
- `data-testid={`block-${slug}`}` on block roots
