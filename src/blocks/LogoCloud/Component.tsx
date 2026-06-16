import React from 'react'

import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = LogoCloudBlockProps & {
  className?: string
}

export const LogoCloudBlock: React.FC<Props> = ({ anchorId, className, label, logos }) => {
  if (!logos?.length) return null

  return (
    <section
      className={cn('border-t border-glance-divider bg-glance-bg py-10 md:py-12', className)}
      data-testid="block-logoCloud"
      id={anchorId || undefined}
    >
      <div className="container">
        {label && (
          <p className="mb-6 font-caption text-xs uppercase tracking-wide text-glance-muted md:mb-8">
            {label}
          </p>
        )}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:flex-wrap md:items-center md:justify-between md:gap-y-10">
          {logos.map((logo, index) => {
            const { alt, image } = logo

            if (!image) return null

            return (
              <li
                className="flex items-center justify-center opacity-60 md:w-[calc(100%/6-1rem)]"
                key={logo.id || index}
              >
                <Media
                  alt={alt || undefined}
                  className="relative h-8 w-full max-w-32 md:h-10"
                  imgClassName="h-full w-full object-contain"
                  resource={image}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
