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

## 4. Component specs

Per section: schema, copy, responsive notes, **Figma spacing values**.

## 5. Build phases (0–5)

| Phase | Subagent | Deliverables |
|-------|----------|--------------|
| 0 | | tokens, field factories, SectionContainer |
| 1A | | header / footer |
| 1B | | hero |
| 2 | | blocks (parallel) |
| 3 | | integration + types |
| 4 | | seed |
| 5 | | E2E |

## 5B. Visual fidelity audit

Subagent findings after Phase 5.

## 5C. Phase 6 — Polish & visual regression

| Sub-phase | Subagents | Scope |
|-----------|-----------|-------|
| 6A | 1 | shared UI + test helpers |
| 6B | 2 | shell |
| 6C | 4 | blocks |
| 6D | 1 | Playwright + Figma refs |
| 6E | 1 | full-page sign-off |

Build subagents implement; **separate QA subagents** review.

## 6. File tree

List new/modified paths (blocks, tests, references).

## 7. Acceptance criteria

### Phases 0–5
- [ ] CMS-editable sections
- [ ] Responsive at plan breakpoints
- [ ] Seed works
- [ ] E2E passes

### Phase 6
- [ ] No doubled section padding
- [ ] `test:visual` — full-page + sections
- [ ] `full-page.png` acceptable vs Figma frame

## 8. Approval gate

No code until approved. Phase 6 optional separate approval.
