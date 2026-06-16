import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  resource?: MediaType | number | null
}

export const Logo = ({ className, loading = 'lazy', priority, resource }: Props) => {
  if (resource && typeof resource === 'object') {
    return (
      <Media
        htmlElement={null}
        imgClassName={cn('h-8 w-auto', className)}
        loading={loading}
        priority={priority === 'high'}
        resource={resource}
      />
    )
  }

  return (
    <span
      aria-label="Glance"
      className={cn(
        'font-body text-[30px] font-bold leading-none tracking-tight text-glance-text',
        className,
      )}
    >
      Glance
    </span>
  )
}
