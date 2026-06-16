import React from 'react'

import type { Page } from '@/payload-types'

import { GlanceSection } from '@/components/GlanceSection'
import { Media } from '@/components/Media'

export const GlanceHero: React.FC<Page['hero']> = ({ backgroundColor, headline, media }) => {
  const barColor = backgroundColor || '#8E9C78'

  return (
    <section className="bg-glance-bg max-md:pt-[120px]" data-testid="glance-hero" data-theme="light">
      <GlanceSection as="div" className="flex flex-col gap-[120px] md:gap-[140px] xl:gap-[240px]">
        {headline && (
          <h1 className="font-display text-[72px] leading-[0.9] tracking-[-3px] text-glance-text md:text-[100px] md:tracking-[-4.25px] xl:text-[160px] xl:tracking-[-6.8px]">
            {headline}
          </h1>
        )}
        {media && typeof media === 'object' && (
          <div className="overflow-hidden rounded-[30px]" style={{ backgroundColor: barColor }}>
            <div className="relative w-full">
              <Media
                className="relative w-full"
                imgClassName="h-auto w-full object-contain"
                priority
                resource={media}
              />
            </div>
          </div>
        )}
      </GlanceSection>
    </section>
  )
}
