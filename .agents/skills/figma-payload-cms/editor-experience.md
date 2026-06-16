# Editor experience (content author UX)

Phase 0 must define how the **Payload admin** reads to non-technical editors. Code names (`slug`, `interfaceName`, file paths) stay in the codebase; **labels, descriptions, and field choices** are what editors see.

Run this analysis **before** writing block schemas or field factories.

---

## Phase 0 checklist — editor experience

Answer these in the page plan and `docs/FIGMA_PAYLOAD_PROJECT.md`:

- [ ] **Block picker labels** — plain language for each section (not Figma layer names or dev terms)
- [ ] **Field labels** — no CSS/HTML jargon (`eyebrow`, `hex`, `slug`) unless explained in plain English
- [ ] **Semantic styling** — colors and button styles as named choices (`Primary`, `Secondary`), mapped to CSS variables in code
- [ ] **Minimal dynamism** — only expose fields editors truly need; fixed copy/structure stays in components
- [ ] **Internal links first** — relationships to pages/posts default; custom URLs for external only
- [ ] **Link performance** — frontend uses Next.js `<Link>` for internal routes (prefetch, client navigation)
- [ ] **Editor glossary** — table mapping code slug → admin label → what the section does
- [ ] **Section anchors** — block slug → HTML id for nav (hardcoded, not CMS) — see [section-anchors.md](section-anchors.md)

---

## Naming: code vs admin UI

| Layer | Audience | Rule | Example |
|-------|----------|------|---------|
| `slug`, `interfaceName`, folder | Developers | Stable; never rename after launch without migration | `logoCloud`, `FeatureSplit/` |
| `labels.singular` / `labels.plural` | Editors | Describe **purpose**, not layout mechanic | "Partner Logos" not "Logo Cloud" |
| `admin.description` on blocks | Editors | One sentence: when to use this section | "Logo strip for clients or partners" |
| Field `label` + `admin.description` | Editors | Plain language + example | "Section label" not "Eyebrow" |

### Block label examples (Glance)

| Code slug | Avoid (dev/Figma) | Prefer (editor) |
|-----------|-------------------|-----------------|
| `logoCloud` | Logo Cloud | Partner Logos |
| `featureSplit` | Feature Split | Features |
| `comparisonTable` | Comparison Table | Feature Comparison |
| `processSteps` | Process Steps | How It Works |
| `mediaHero` | Media Hero | Image Highlight |
| `ctaCentered` | Centered CTA | Call to Action |

Slugs stay unchanged so existing content and tests keep working.

---

## Colors and styling — never raw hex in CMS

**Do not** expose `#485C11` or free-text color fields to editors.

**Do** use selects tied to design tokens:

```ts
{
  name: 'imageFrameColor',
  type: 'select',
  label: 'Image frame color',
  defaultValue: 'midGreen',
  options: [
    { label: 'Brand green (medium)', value: 'midGreen' },
    { label: 'Brand green (dark)', value: 'primary' },
    { label: 'Brand green (light)', value: 'primaryLight' },
  ],
}
```

Map values to CSS variables or Tailwind classes in the React component — never inline hex from CMS input.

Same pattern for buttons: `appearance: primary | secondary | linkout` → `GlanceButton` / theme CSS.

---

## Field minimalism — when to expose vs hardcode

| Situation | CMS field | Hardcode in component |
|-----------|-----------|------------------------|
| Headline, body copy, CTAs editors change often | Yes | — |
| Design-specific label above heading (optional) | Yes, with plain label + description | — |
| Jargon field editors won't understand | No — rename, describe, or remove | Default copy if design always shows it |
| Section ID / HTML anchor for in-page nav | No — hardcode on block component | See [section-anchors.md](section-anchors.md) |
| Layout/spacing tokens | No | CSS variables from Phase 0 tokens |
| Icon set from fixed design system | Select from named icons | Icon component map |

### "Section label" (formerly eyebrow)

Small text above the main heading (e.g. "Benefits", "Specs"). If used:

- Label: **Section label (optional)**
- Description: *Small text above the main heading. Leave blank if this section doesn't use one.*
- Keep schema key `eyebrow` for stability; only the **admin label** changes.

If a section never uses it, pass `includeSectionLabel: false` to the `sectionHeader` factory.

---

## Links — internal first, performant frontend

### CMS schema (`src/fields/link.ts`)

- Default `type` to `reference` (internal)
- Label internal option **"Page on this site"**; custom **"External URL"**
- Group description: *Prefer linking to a page on this site. Use external URL only for off-site links.*
- Relationship `relationTo: ['pages', 'posts']` (extend as needed)

### Frontend (`CMSLink`)

- Internal: resolve slug → href, render with Next.js `<Link>` (default prefetch)
- External: same component with `url`; `newTab` + `rel="noopener noreferrer"` when checked
- Never use `<a href>` for internal routes when `<Link>` is available

---

## Discovery subagent prompt (editor UX)

Add to Phase 1 Subagent B output:

```
For each Figma section, propose:
1. Editor-facing block label (singular + plural)
2. One-line admin description
3. Fields editors need vs hardcoded
4. Any color/style as semantic select (not hex)
5. Link fields: internal targets only or external allowed?
6. In-page nav targets: block slug → HTML id (for sectionAnchors.ts)
```

Document results in plan §3 (Architecture) and project config **Editor labels** table.

---

## Acceptance criteria (Phases 0–5)

- [ ] No hex/color text inputs in block or hero schemas
- [ ] Every block has editor-friendly `labels` (+ optional `admin.description`)
- [ ] Field factories use plain-language labels; jargon fields removed or documented
- [ ] Link fields default to internal reference
- [ ] Plan includes editor glossary (slug → label → purpose)
- [ ] Section anchors defined in plan + `sectionAnchors.ts`; no CMS anchor fields
