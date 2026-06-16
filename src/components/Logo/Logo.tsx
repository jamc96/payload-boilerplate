import React from 'react'

import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = ({ className }: Props) => {
  return (
    <span
      aria-label="Glance"
      className={cn('font-body text-[30px] font-bold leading-none tracking-tight text-glance-text', className)}
    >
      Glance
    </span>
  )
}
