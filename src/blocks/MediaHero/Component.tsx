import React from 'react'

import type { MediaHeroBlock as MediaHeroBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const MediaHeroBlock: React.FC<MediaHeroBlockProps> = ({ alt, media }) => {
  return (
    <section className="bg-glance-bg pb-10" data-testid="block-mediaHero">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-10">
        {media && typeof media === 'object' && (
          <div className="relative aspect-1120/620 max-h-[830px] w-full overflow-hidden rounded-[30px]">
            <Media
              alt={alt || undefined}
              className="relative h-full w-full"
              fill
              imgClassName="object-cover"
              resource={media}
            />
          </div>
        )}
      </div>
    </section>
  )
}
