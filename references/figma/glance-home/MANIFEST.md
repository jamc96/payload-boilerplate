# Glance Home — Figma Reference Manifest

Design gold masters for side-by-side comparison with Playwright visual regression output.

## Figma source

| Field | Value |
|-------|-------|
| File | [Modern Product Launch - Payload POC](https://www.figma.com/design/lEM5McyRvPeMRIn4Ce6q0a) |
| `fileKey` | `lEM5McyRvPeMRIn4Ce6q0a` |

## Responsive frames

| Breakpoint | Frame node | Width | Export folder |
|------------|------------|-------|---------------|
| Desktop | `1:118` | 1280px | `desktop-1280/` |
| Tablet | `1:274` | 800px | `tablet-800/` |
| Mobile | `1:430` | 375px | `mobile-375/` |

## Section node IDs (Appendix A)

| Section | Desktop node | Suggested PNG filename |
|---------|--------------|------------------------|
| Full page (scroll) | `1:118` | `full-page.png` |
| Full page (viewport) | `1:118` | `full-page-above-fold.png` |
| Navigation | `1:119` | `glance-header.png` |
| Hero | `1:120` | `glance-hero.png` |
| Logo cloud | `1:124` | `block-logoCloud.png` |
| Benefits | `1:139` | `block-benefits.png` |
| Feature split | `1:167` | `block-featureSplit.png` |
| Comparison table | `1:188` | `block-comparisonTable.png` |
| Testimonial | `1:223` | `block-testimonial.png` |
| Process steps | `1:230` | `block-processSteps.png` |
| Media hero | `1:250` | `block-mediaHero.png` |
| Centered CTA | `1:253` | `block-ctaCentered.png` |
| Footer | `1:257` | `glance-footer.png` |

Filenames align with `data-testid` values from `tests/helpers/seedGlanceHome.ts` (`GLANCE_SECTION_TEST_IDS`).

## Export instructions (Figma MCP)

Use the Figma MCP `get_screenshot` tool for each section node:

1. Set `fileKey` to `lEM5McyRvPeMRIn4Ce6q0a`.
2. Set `nodeId` to the section node from the table above (e.g. `1:120` for Hero).
3. Save the returned image to the matching breakpoint folder, e.g. `references/figma/glance-home/desktop-1280/glance-hero.png`.

Repeat for tablet (`1:274` child nodes) and mobile (`1:430` child nodes) as needed.

### Example MCP parameters

```json
{
  "fileKey": "lEM5McyRvPeMRIn4Ce6q0a",
  "nodeId": "1:120"
}
```

## Status

> **Placeholder:** PNG reference images are not yet committed. Export manually or via Figma MCP `get_screenshot`, then place files under `desktop-1280/`, `tablet-800/`, and `mobile-375/`.

## Sign-off notes

After export, annotate per-section diff notes here during Phase 6E review (target ≤5% pixel diff vs Figma desktop, or documented exceptions).
