import React from 'react'

import type { FeatureSplitBlock as FeatureSplitBlockProps } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
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
    <section
      className="bg-glance-bg py-(--glance-section-padding-y) lg:py-(--glance-section-padding-y-lg)"
      data-testid="block-featureSplit"
      data-theme="light"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-5">
          <div
            className={cn(
              'order-1 flex flex-1 flex-col gap-8',
              imageOnLeft && 'lg:order-2',
            )}
          >
            <SectionHeader data={sectionHeader} />

            {items && items.length > 0 && (
              <ul className="flex flex-col">
                {items.map((item, index) => (
                  <li
                    className="border-t border-glance-divider py-6"
                    key={item.id ?? index}
                  >
                    {item.number && (
                      <p
                        aria-hidden
                        className="font-body text-[64px] leading-none text-glance-muted-light lg:text-[80px]"
                      >
                        {item.number}
                      </p>
                    )}
                    <p className="mt-4 font-body text-[15px] leading-relaxed text-glance-muted">
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
                'order-2 flex-1 overflow-hidden rounded-[30px]',
                imageOnLeft && 'lg:order-1',
              )}
            >
              <Media
                className="relative w-full"
                imgClassName="h-auto w-full object-cover"
                resource={image}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
