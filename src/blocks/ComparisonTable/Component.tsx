import { Check, X } from 'lucide-react'
import React from 'react'

import type { ComparisonTableBlock as ComparisonTableBlockProps } from '@/payload-types'

import { SiteButton } from '@/components/SiteButton'
import { SiteSection } from '@/components/SiteSection'
import { SectionHeader, type SectionHeaderData } from '@/components/SectionHeader'
import { SECTION_ANCHORS } from '@/constants/sectionAnchors'
import { cn } from '@/utilities/ui'

export const ComparisonTableBlock: React.FC<ComparisonTableBlockProps> = ({
  columns,
  cta,
  sectionHeader,
}) => {
  const centeredHeader: SectionHeaderData | null | undefined = sectionHeader
    ? { ...sectionHeader, align: 'center' }
    : sectionHeader

  return (
    <section
      className="border-t border-site-muted-light bg-site-bg pb-[120px] pt-20"
      data-testid="block-comparisonTable"
      id={SECTION_ANCHORS.comparisonTable}
    >
      <SiteSection as="div" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-10 text-center">
          <SectionHeader className="w-full" data={centeredHeader} />

          <SiteButton {...cta} />
        </div>

        {columns && columns.length > 0 && (
          <div className="-mx-4 overflow-x-auto rounded-[20px] px-4 pb-2 md:mx-0 md:px-0 md:pb-0">
            <div
              className="flex w-max min-w-full gap-[var(--site-column-gap)] md:grid md:w-full"
              style={
                {
                  '--comparison-cols': columns.length,
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                } as React.CSSProperties
              }
            >
              {columns.map((column, columnIndex) => (
                <article
                  className={cn(
                    'flex w-[17.5rem] shrink-0 flex-col md:w-auto md:shrink',
                    column.highlighted &&
                      'rounded-[20px] border border-site-divider bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
                  )}
                  key={column.id || columnIndex}
                >
                  {column.name && (
                    <h3 className="flex h-24 items-center border-b border-site-muted-light px-[30px] py-10 font-body text-[26px] font-medium text-site-text">
                      {column.name}
                    </h3>
                  )}

                  <ul className="flex flex-col">
                    {(column.features || []).map((feature, featureIndex) => (
                      <li
                        className="flex items-start gap-2 px-[30px] py-8 font-caption text-[12px] leading-snug text-site-text"
                        key={feature.id || featureIndex}
                      >
                        {feature.included ? (
                          <Check
                            aria-hidden
                            className="mt-0.5 size-3 shrink-0 text-site-primary"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X
                            aria-hidden
                            className="mt-0.5 size-3 shrink-0 text-site-muted-light"
                            strokeWidth={2.5}
                          />
                        )}

                        {feature.label && <span>{feature.label}</span>}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        )}
      </SiteSection>
    </section>
  )
}
