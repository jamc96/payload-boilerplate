import React from 'react'

import type { Page } from '@/payload-types'

import { cn } from '@/utilities/ui'

import { SiteSection } from '@/components/SiteSection'
import { Media } from '@/components/Media'
import { themeColorClassMap, type ThemeColorValue } from '@/fields/themeColor'

export const MarketingHero: React.FC<Page['hero']> = ({ headline, imageFrameColor, media }) => {
  const frameColorKey = (imageFrameColor as ThemeColorValue | null | undefined) ?? 'midGreen'
  const frameColorClass = themeColorClassMap[frameColorKey] ?? themeColorClassMap.midGreen

  return (
    <section className="bg-site-bg max-md:pt-[120px]" data-testid="site-hero" data-theme="light">
      <SiteSection as="div" className="flex flex-col gap-[120px] md:gap-[140px] xl:gap-[240px]">
        {headline && (
          <h1 className="font-display text-[72px] leading-[0.9] tracking-[-3px] text-site-text md:text-[100px] md:tracking-[-4.25px] xl:text-[160px] xl:tracking-[-6.8px]">
            {headline}
          </h1>
        )}
        {media && typeof media === 'object' && (
          <div className={cn('overflow-hidden rounded-[30px]', frameColorClass)}>
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
      </SiteSection>
    </section>
  )
}
