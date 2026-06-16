import { Check, X } from 'lucide-react'
import React from 'react'

import type { ComparisonTableBlock as ComparisonTableBlockProps } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
import { SectionHeader, type SectionHeaderData } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

export const ComparisonTableBlock: React.FC<ComparisonTableBlockProps> = ({
  anchorId,
  columns,
  cta,
  sectionHeader,
}) => {
  const centeredHeader: SectionHeaderData | null | undefined = sectionHeader
    ? { ...sectionHeader, align: 'center' }
    : sectionHeader

  return (
    <section
      className="bg-glance-bg py-[var(--glance-section-padding-y)] lg:py-[var(--glance-section-padding-y-lg)]"
      data-testid="block-comparisonTable"
      id={anchorId || undefined}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeader className="w-full" data={centeredHeader} />

          <GlanceButton {...cta} />
        </div>

        {columns && columns.length > 0 && (
          <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 md:mt-12">
            <div
              className="flex w-max min-w-full gap-[var(--glance-column-gap)] md:grid md:w-full"
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
                    'flex w-[17.5rem] shrink-0 flex-col rounded-[var(--glance-radius-table)] md:w-auto md:shrink',
                    column.highlighted
                      ? 'bg-glance-bg px-4 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:px-5 md:py-8'
                      : 'px-2 py-4 md:px-3 md:py-6',
                  )}
                  key={column.id || columnIndex}
                >
                  {column.name && (
                    <h3
                      className={cn(
                        'border-b border-glance-muted-light pb-4 font-body text-sm font-bold text-glance-text',
                        column.highlighted && 'pb-5',
                      )}
                    >
                      {column.name}
                    </h3>
                  )}

                  <ul className="mt-4 flex flex-col">
                    {(column.features || []).map((feature, featureIndex) => (
                      <li
                        className={cn(
                          'flex items-start gap-3 border-b border-glance-divider py-4 font-body text-[15px] leading-snug text-glance-muted last:border-b-0',
                          column.highlighted && 'py-5',
                        )}
                        key={feature.id || featureIndex}
                      >
                        {feature.included ? (
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-glance-primary"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-glance-muted-light"
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
      </div>
    </section>
  )
}
