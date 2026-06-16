/**
 * Hardcoded in-page section ids — set on block components, not in CMS.
 * Nav seed links use the same values via sectionAnchorHref().
 */
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
