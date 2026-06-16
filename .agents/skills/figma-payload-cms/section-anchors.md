# Section anchors (in-page navigation)

For single-page / scroll layouts, header nav often links to sections (`#benefits`, `#specifications`). **Do not** expose a "Section ID" text field in Payload — editors don't need it and IDs must stay stable for nav.

**Pattern:** hardcode `id` on block `<section>` elements; share values in one constants file used by components, seed, and tests.

---

## Phase 0 — define anchors in the page plan

In `docs/{PAGE}_PAGE_PLAN.md` and `docs/FIGMA_PAYLOAD_PROJECT.md`, list only sections that **nav links to**:

| Block slug (code) | HTML `id` (nav hash) | Nav label (editor-facing) |
|-------------------|----------------------|---------------------------|
| `benefits` | `benefits` | Benefits |
| `comparisonTable` | `specifications` | Specifications |
| `processSteps` | `how-to` | How-to |
| `ctaCentered` | `contact` | Contact |

Rules:

- **HTML `id`** can differ from block slug — use short, readable hashes (`specifications` not `comparisonTable`).
- Only add entries for sections that appear in header/footer nav (or deep links).
- Blocks without nav targets get **no** `id` attribute.

---

## Implementation

### 1. Constants file (per project)

Path from project config — default: `src/constants/sectionAnchors.ts`

```ts
/** Hardcoded in-page section ids — not CMS fields. */
export const SECTION_ANCHORS = {
  benefits: 'benefits',
  comparisonTable: 'specifications',
  processSteps: 'how-to',
  ctaCentered: 'contact',
} as const

export type SectionAnchorKey = keyof typeof SECTION_ANCHORS

export function sectionAnchorHref(key: SectionAnchorKey): string {
  return `#${SECTION_ANCHORS[key]}`
}
```

### 2. Block components

Set `id` on the root `<section>` when the block has a nav target:

```tsx
import { SECTION_ANCHORS } from '@/constants/sectionAnchors'

export const BenefitsBlock = () => (
  <section id={SECTION_ANCHORS.benefits} data-testid="block-benefits">
    …
  </section>
)
```

**Do not** put `id` on a wrapper in `RenderBlocks` — each anchored block owns its id in its component.

**Do not** add an `anchorId` (or "Section ID") field to block `config.ts`.

### 3. Header / footer nav (seed)

Use the same helper for hash links; use internal page references for full pages:

```ts
import { customLink, pageLink } from './linkHelpers'
import { sectionAnchorHref } from '@/constants/sectionAnchors'

navItems: [
  { link: customLink(sectionAnchorHref('benefits'), 'Benefits') },
  { link: customLink(sectionAnchorHref('comparisonTable'), 'Specifications') },
  { link: pageLink(contactPageId, 'Contact Us') }, // full page, not hash
]
```

See `src/endpoints/seed/linkHelpers.ts` — `pageLink()` for CMS pages, `customLink()` for `#hash` and external URLs only.

### 4. Tests

E2E asserts the **HTML id values** from `SECTION_ANCHORS`, not block slugs:

```ts
const ANCHOR_SECTION_IDS = ['benefits', 'specifications', 'how-to', 'contact']
```

---

## Anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| CMS text field "Section ID" | Jargon; breaks nav if editor changes it | Constants + component `id` |
| Auto `id` from `blockType` in RenderBlocks | Ugly hashes (`#comparisonTable`); duplicates if same block twice | Named ids in constants |
| Hardcoded `#benefits` in seed only | Drifts from component ids | `sectionAnchorHref('benefits')` |
| `anchorId` Payload field factory | Same as CMS field — remove | Delete field; use constants |

---

## Checklist (Phase 0 / build)

- [ ] Page plan table: block slug → HTML id → nav label
- [ ] `sectionAnchors.ts` created; path in `FIGMA_PAYLOAD_PROJECT.md`
- [ ] Anchored blocks set `id={SECTION_ANCHORS.…}` on `<section>`
- [ ] Seed nav uses `sectionAnchorHref()` for hash links
- [ ] No `anchorId` field in any block schema
- [ ] E2E covers expected `#id` values

---

## When to add a new anchor

1. Figma nav item scrolls to a section → add row to plan + `SECTION_ANCHORS`
2. Set `id` on that block's component
3. Update seed header/footer + E2E
4. Re-run `pnpm seed` (or project equivalent)

No CMS migration — ids live in code only.
