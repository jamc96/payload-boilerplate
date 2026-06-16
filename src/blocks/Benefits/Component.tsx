import React from 'react'

import type { IconPickerValue } from '@/fields/iconPicker'
import type { Media as MediaType } from '@/payload-types'

import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { SectionHeader, type SectionHeaderData } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

type BenefitItem = {
  description?: string | null
  icon?: IconPickerValue | null
  id?: string | null
  title?: string | null
}

export type BenefitsBlockProps = {
  anchorId?: string | null
  image?: MediaType | number | null
  items?: BenefitItem[] | null
  sectionHeader?: SectionHeaderData | null
}

export const BenefitsBlock: React.FC<BenefitsBlockProps> = ({
  anchorId,
  image,
  items,
  sectionHeader,
}) => {
  return (
    <section
      className="bg-glance-bg py-(--glance-section-padding-y) lg:py-(--glance-section-padding-y-lg)"
      data-testid="block-benefits"
      id={anchorId || undefined}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <SectionHeader data={sectionHeader} />

        {items && items.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-(--glance-column-gap) md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <article
                className={cn('flex flex-col gap-4 border-t border-glance-divider pt-6')}
                key={item.id || index}
              >
                <Icon className="size-6 text-glance-primary" name={item.icon} />

                {item.title && (
                  <h3 className="font-display text-[18px] leading-snug text-glance-text">{item.title}</h3>
                )}

                {item.description && (
                  <p className="font-body text-[15px] leading-relaxed text-glance-muted">
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}

        {image && typeof image === 'object' && (
          <div className="mt-10 overflow-hidden rounded-(--glance-radius-image) md:mt-12">
            <Media
              className="relative w-full"
              imgClassName="aspect-[16/9] h-auto w-full object-cover"
              resource={image}
            />
          </div>
        )}
      </div>
    </section>
  )
}
