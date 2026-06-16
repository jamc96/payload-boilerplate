import React from 'react'

import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'

import { SiteButton } from '@/components/SiteButton'
import { SiteSection } from '@/components/SiteSection'
import { cn } from '@/utilities/ui'
import { SECTION_ANCHORS } from '@/constants/sectionAnchors'

const formatStepNumber = (number: string | null | undefined, index: number): string => {
  if (number) {
    return number
  }

  return String(index + 1).padStart(2, '0')
}

export const ProcessStepsBlock: React.FC<ProcessStepsBlockProps> = ({
  cta,
  headline,
  steps,
}) => {
  return (
    <section
      className="border-t border-site-divider bg-site-bg pb-[120px] pt-20"
      data-testid="block-processSteps"
      id={SECTION_ANCHORS.processSteps}
    >
      <SiteSection as="div" className="flex flex-col gap-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {headline && (
            <h2 className="font-display text-[40px] leading-[0.9] tracking-[-0.03em] text-site-text md:text-[60px]">
              {headline}
            </h2>
          )}

          <SiteButton
            {...cta}
            appearance={cta.appearance ?? 'secondary'}
            className="shrink-0"
          />
        </div>

        {steps && steps.length > 0 && (
          <div
            className={cn(
              '-mx-4 flex gap-[var(--site-column-gap)] overflow-x-auto px-4 pb-2',
              'md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0',
            )}
          >
            {steps.map((step, index) => (
              <article
                className={cn(
                  'flex min-w-[240px] shrink-0 flex-col gap-[60px] border-t border-site-divider pb-5 pt-[60px] pr-[30px]',
                  'md:min-w-0 md:shrink',
                )}
                key={step.id || index}
              >
                <p className="font-body text-[64px] leading-none text-site-muted-light md:text-[80px]">
                  {formatStepNumber(step.number, index)}
                </p>

                <div className="flex flex-col gap-5">
                  {step.title && (
                    <h3 className="font-display text-[18px] leading-snug text-site-text">
                      {step.title}
                    </h3>
                  )}

                  {step.description && (
                    <p className="font-body text-[15px] leading-relaxed text-site-muted">
                      {step.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </SiteSection>
    </section>
  )
}
