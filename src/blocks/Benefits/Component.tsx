import React from 'react'

import type { BenefitsBlock as BenefitsBlockProps } from '@/payload-types'

import { GlanceSection } from '@/components/GlanceSection'
import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'
import { SECTION_ANCHORS } from '@/constants/sectionAnchors'

export const BenefitsBlock: React.FC<BenefitsBlockProps> = ({
  image,
  items,
  sectionHeader,
}) => {
  return (
    <section
      className="bg-glance-bg pb-[120px]"
      data-testid="block-benefits"
      id={SECTION_ANCHORS.benefits}
    >
      <GlanceSection as="div" className="flex flex-col">
        <div className="flex flex-col gap-[50px] border-t border-glance-divider pb-[60px] pt-20">
          <SectionHeader data={sectionHeader} />

          {items && items.length > 0 && (
            <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-2 lg:grid-cols-4">
              {items.map((item, index) => (
                <article
                  className="flex flex-col gap-6 border-t border-glance-divider py-10"
                  key={item.id || index}
                >
                  <Icon className="size-6 text-glance-text" name={item.icon} />

                  <div className="flex flex-col gap-5">
                    {item.title && (
                      <h3 className="font-display text-[18px] leading-snug text-glance-text">
                        {item.title}
                      </h3>
                    )}

                    {item.description && (
                      <p className="font-body text-[15px] leading-relaxed text-glance-muted">
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {image && typeof image === 'object' && (
          <div className="overflow-hidden rounded-[30px]">
            <Media
              className="relative w-full"
              imgClassName="h-[620px] w-full object-cover"
              resource={image}
            />
          </div>
        )}
      </GlanceSection>
    </section>
  )
}
