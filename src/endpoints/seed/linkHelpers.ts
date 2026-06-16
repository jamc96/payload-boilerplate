type PageLinkExtras = {
  appearance?: 'primary' | 'secondary' | 'linkout' | 'default' | 'outline'
  fullWidth?: boolean
  newTab?: boolean
}

/** Internal link to a CMS page — preferred over custom URLs in seed data. */
export function pageLink(
  pageId: number | string,
  label: string,
  extras?: PageLinkExtras,
) {
  return {
    type: 'reference' as const,
    reference: {
      relationTo: 'pages' as const,
      value: pageId,
    },
    label,
    ...extras,
  }
}

/**
 * In-page anchor or external URL — use only when a page reference is not possible.
 * For section hash links, pass `sectionAnchorHref('benefits')` from `@/constants/sectionAnchors`.
 */
export function customLink(url: string, label: string, extras?: PageLinkExtras) {
  return {
    type: 'custom' as const,
    url,
    label,
    ...extras,
  }
}
