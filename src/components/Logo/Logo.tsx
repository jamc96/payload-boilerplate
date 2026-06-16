import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  resource?: MediaType | number | null
  size?: 'header' | 'footer'
}

export const Logo = ({
  className,
  loading = 'lazy',
  priority,
  resource,
  size = 'header',
}: Props) => {
  const imageHeightClass = size === 'footer' ? 'h-[70px]' : 'h-8'

  if (resource && typeof resource === 'object') {
    return (
      <Media
        htmlElement={null}
        imgClassName={cn(imageHeightClass, 'w-auto', className)}
        loading={loading}
        priority={priority === 'high'}
        resource={resource}
      />
    )
  }

  return (
    <span
      aria-label="Site"
      className={cn(
        'font-body text-[30px] font-medium leading-none tracking-[-0.05em] text-site-text',
        className,
      )}
    >
      Site
    </span>
  )
}
