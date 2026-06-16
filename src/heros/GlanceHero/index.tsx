import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

export const GlanceHero: React.FC<Page['hero']> = ({ backgroundColor, headline, media }) => {
  const barColor = backgroundColor || '#8E9C78'

  return (
    <section className="bg-glance-bg pt-8 md:pt-12" data-theme="light">
      <div className="mx-auto w-full max-w-[1200px] px-5">
        {headline && (
          <h1 className="font-display text-[clamp(2.5rem,12vw,10rem)] leading-[0.95] tracking-[-0.02em] text-glance-text">
            {headline}
          </h1>
        )}
        {media && typeof media === 'object' && (
          <div
            className="mt-6 overflow-hidden rounded-[30px] md:mt-10"
            style={{ backgroundColor: barColor }}
          >
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
      </div>
    </section>
  )
}
