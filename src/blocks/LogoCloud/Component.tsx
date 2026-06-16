import React from 'react'

import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { GlanceSection } from '@/components/GlanceSection'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = LogoCloudBlockProps & {
  className?: string
}

export const LogoCloudBlock: React.FC<Props> = ({ anchorId, className, label, logos }) => {
  if (!logos?.length) return null

  return (
    <section
      className={cn('bg-glance-bg py-[50px]', className)}
      data-testid="block-logoCloud"
      id={anchorId || undefined}
    >
      <GlanceSection as="div" className="flex flex-col gap-[30px]">
        {label && <p className="font-body text-[15px] text-glance-muted">{label}</p>}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {logos.map((logo, index) => {
            const { alt, image } = logo

            if (!image) return null

            return (
              <li
                className="flex h-[84px] w-[154px] items-center justify-center p-5 opacity-60"
                key={logo.id || index}
              >
                <Media
                  alt={alt || undefined}
                  className="relative h-full w-full"
                  imgClassName="h-full w-full object-contain"
                  resource={image}
                />
              </li>
            )
          })}
        </ul>
      </GlanceSection>
    </section>
  )
}
