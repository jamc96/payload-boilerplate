import React from 'react'

import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
import { cn } from '@/utilities/ui'

const formatStepNumber = (number: string | null | undefined, index: number): string => {
  if (number) {
    return number
  }

  return String(index + 1).padStart(2, '0')
}

export const ProcessStepsBlock: React.FC<ProcessStepsBlockProps> = ({
  anchorId,
  cta,
  headline,
  steps,
}) => {
  return (
    <section
      className="bg-glance-bg py-[var(--glance-section-padding-y)] lg:py-[var(--glance-section-padding-y-lg)]"
      data-testid="block-processSteps"
      id={anchorId || undefined}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {headline && (
            <h2 className="font-display text-[40px] leading-[1.1] text-glance-text md:text-[60px]">
              {headline}
            </h2>
          )}

          <GlanceButton
            {...cta}
            appearance={cta.appearance ?? 'secondary'}
            className="shrink-0"
          />
        </div>

        {steps && steps.length > 0 && (
          <div
            className={cn(
              'mt-10 -mx-5 flex gap-[var(--glance-column-gap)] overflow-x-auto px-5 pb-2',
              'md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0',
            )}
          >
            {steps.map((step, index) => (
              <article
                className={cn(
                  'flex min-w-[17.5rem] shrink-0 flex-col gap-4 border-t border-glance-divider pt-6',
                  'md:min-w-0 md:shrink',
                )}
                key={step.id || index}
              >
                <p className="font-body text-[64px] leading-none text-glance-muted-light md:text-[80px]">
                  {formatStepNumber(step.number, index)}
                </p>

                {step.title && (
                  <h3 className="font-display text-[18px] leading-snug text-glance-text">{step.title}</h3>
                )}

                {step.description && (
                  <p className="font-body text-[15px] leading-relaxed text-glance-muted">
                    {step.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
