import React from 'react'

import type { FeatureSplitBlock as FeatureSplitBlockProps } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
import { GlanceSection } from '@/components/GlanceSection'
import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

export const FeatureSplitBlock: React.FC<FeatureSplitBlockProps> = ({
  cta,
  image,
  imagePosition = 'right',
  items,
  sectionHeader,
}) => {
  const imageOnLeft = imagePosition === 'left'

  return (
    <section className="bg-glance-bg pb-[120px]" data-testid="block-featureSplit" data-theme="light">
      <GlanceSection as="div">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-5">
          <div
            className={cn(
              'order-1 flex flex-1 flex-col gap-10 border-t border-glance-divider pt-[60px] pb-20',
              imageOnLeft && 'lg:order-2',
            )}
          >
            <SectionHeader data={sectionHeader} />

            {items && items.length > 0 && (
              <ul className="flex flex-col">
                {items.map((item, index) => (
                  <li
                    className="flex flex-row items-start gap-[30px] border-t border-glance-divider py-5"
                    key={item.id ?? index}
                  >
                    {item.number && (
                      <p
                        aria-hidden
                        className="shrink-0 font-body text-[15px] font-bold text-glance-muted"
                      >
                        {item.number}
                      </p>
                    )}
                    <p className="font-body text-[15px] leading-relaxed text-glance-text">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <GlanceButton {...cta} />
          </div>

          {image && (
            <div
              className={cn(
                'relative order-2 flex-1 overflow-hidden rounded-[30px]',
                imageOnLeft && 'lg:order-1',
              )}
            >
              <Media
                className="relative w-full"
                imgClassName="h-[711px] w-full object-cover"
                resource={image}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[30px] bg-black/5"
              />
            </div>
          )}
        </div>
      </GlanceSection>
    </section>
  )
}
