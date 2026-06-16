# {Project Name} — Page Implementation Plan

> **Status:** Draft — awaiting approval  
> **Figma:** [design link](https://www.figma.com/design/{fileKey}/...) (`{fileKey}`)  
> **Route:** `/` → CMS page `slug: home`  
> **Stack:** Next.js + Payload + Tailwind

## 1. Goals / non-goals

## 2. Figma analysis

### Frames
| Breakpoint | Node ID | Width |

### Sections (top → bottom)
| # | Figma layer | Payload entity | Editable? |

### Design tokens
(colors, typography, spacing from `get_variable_defs`)

## 3. Architecture

```
Pages (home) → hero + layout[] + header/footer globals
```

## 4. Component specs

Per section: schema fields, default copy, responsive notes.

## 5. Build phases

| Phase | Subagent | Deliverables |
|-------|----------|--------------|
| 0 Foundation | | tokens, field factories |
| 1A Header/Footer | | |
| 1B Hero | | |
| 2 Blocks (parallel) | | |
| 3 Integration | | Pages + RenderBlocks + types |
| 4 Seed | | |
| 5 QA | | E2E |

## 6. File tree (new / modified)

## 7. Acceptance criteria

- [ ] All sections CMS-editable
- [ ] Responsive at target breakpoints
- [ ] Seed populates page
- [ ] E2E passes

## 8. Approval gate

No code until user approves this plan.
