# {Project Name} — Page Implementation Plan

> **Status:** Draft — awaiting approval  
> **Project config:** `docs/FIGMA_PAYLOAD_PROJECT.md`  
> **Figma:** [design link](https://www.figma.com/design/{fileKey}/...) (`{fileKey}`)  
> **Route:** `{/}` → CMS slug `{home}`

## 1. Goals / non-goals

### Phase 6 goals (visual polish — after MVP)

1. Spacing/typography vs Figma (`get_design_context`)
2. Shared horizontal inset via **SectionContainer** (name from project config)
3. Visual regression: **full-page + per-section** at plan breakpoints
4. Figma refs in `references/figma/{page}/`

## 2. Figma analysis

### Frames
| Breakpoint | Node ID | Width |

### Sections (top → bottom)
| # | Figma layer | Payload entity | Node ID | testid |

### Design tokens
From `get_variable_defs` + spacing from `get_design_context`

### Spacing notes (per section)
| Section | Pattern A/B/C | Outer pt/pb | Inner gaps |

See skill: `spacing-patterns.md`

## 3. Architecture

Document render pipeline and shared components from **project config**.

### Editor experience (Phase 0)

See skill: `editor-experience.md`

| Code slug | Editor label | Purpose |
|-----------|--------------|---------|
| `{slug}` | `{Label}` | `{One line for content authors}` |

Field rules:
- Semantic colors/button styles only (no hex inputs)
- Internal links default; external URLs secondary
- Plain-language field labels; minimal dynamism

### Section anchors (hardcoded, not CMS)

See skill: `section-anchors.md`

| Block slug | HTML `id` | Nav label |
|------------|-----------|-----------|
| `{slug}` | `{id}` | `{label}` |

## 4. Component specs

Per section: schema, copy, responsive notes, **Figma spacing values**.

## 5. Build phases (0–5)

Subagent assignment: [subagent-strategy.md](subagent-strategy.md) — **one build subagent per section**, then **one QA subagent per section** (readonly, different agent).

| Phase | Build subagent(s) | QA subagent(s) | Deliverables |
|-------|-------------------|----------------|--------------|
| 0 | Build-Foundations (1) | QA-Foundations (1) | tokens, field factories, SectionContainer, `sectionAnchors.ts` |
| 1A | Build-Header, Build-Footer (parallel) | QA-Header, QA-Footer | header / footer |
| 1B | Build-Hero (1) | QA-Hero (1) | hero |
| 2 | Build-{Block} — **one per block** (parallel) | QA-{Block} — **one per block** | blocks |
| 3 | Parent / integration | — | register blocks, types |
| 4 | — | — | seed |
| 5 | — | **Build-Tests**, **QA-Tests** | E2E — [playwright-qa.md](playwright-qa.md) |

### Per-section assignment table (fill for every Figma section)

| Section | Figma node | Payload entity | Build subagent | QA subagent |
|---------|------------|----------------|----------------|-------------|
| Nav | `{id}` | header | Build-Header | QA-Header |
| Hero | `{id}` | hero | Build-Hero | QA-Hero |
| `{name}` | `{id}` | `{block}` | Build-{Name} | QA-{Name} |
| Footer | `{id}` | footer | Build-Footer | QA-Footer |

## 5B. Visual fidelity audit

**QA subagent findings** after Phase 5 — one report per section (PASS/FAIL + fixes). Paste summaries here; detail in subagent outputs.

## 5C. Phase 6 — Polish & visual regression

Same build/QA split as Phase 2 — see [subagent-strategy.md](subagent-strategy.md).

| Sub-phase | Build subagents | QA subagents (readonly, after wave) |
|-----------|-----------------|-------------------------------------|
| 6A | Build-Foundations (1) | QA-Foundations (1) |
| 6B | Build-Header, Build-Hero, Build-Footer (parallel) | QA-Header, QA-Hero, QA-Footer |
| 6C | **Build-{Block} — one per section** (parallel) | **QA-{Block} — one per section** |
| 6D | Build-VisualTests (1) | QA-Visual (1) | Playwright + baselines |
| 6E | — | QA-FullPage + section QAs | sign-off |

Build subagents implement; **separate QA subagents** review — the build agent must never QA its own section.

## 6. File tree

List new/modified paths (blocks, tests, references).

## 7. Acceptance criteria

### Phases 0–5
- [ ] CMS-editable sections
- [ ] Responsive at plan breakpoints
- [ ] Seed works
- [ ] E2E passes
- [ ] Section anchors match plan (`sectionAnchors.ts`; no CMS anchor fields)

### Phase 6
- [ ] Per-section build/QA subagent pairs completed ([subagent-strategy.md](../.agents/skills/figma-payload-cms/subagent-strategy.md))
- [ ] All section QA subagents PASS before visual baselines
- [ ] No doubled section padding
- [ ] `pnpm test:e2e` passes (Build-Tests / QA-Tests subagents)
- [ ] `pnpm test:visual` — full-page + sections ([playwright-qa.md](../.agents/skills/figma-payload-cms/playwright-qa.md))
- [ ] `full-page.png` acceptable vs Figma frame

## 8. Approval gate

No code until approved. Phase 6 optional separate approval.
