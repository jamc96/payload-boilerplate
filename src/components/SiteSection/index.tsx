import React from 'react'

import { cn } from '@/utilities/ui'

type SiteSectionProps = {
  as?: 'section' | 'div'
  children: React.ReactNode
  className?: string
  id?: string
  'data-testid'?: string
}

/**
 * Standard content wrapper: 1200px max-width with Figma frame insets
 * (40px desktop / 16px mobile).
 */
export const SiteSection: React.FC<SiteSectionProps> = ({
  as: Tag = 'section',
  children,
  className,
  id,
  'data-testid': dataTestId,
}) => {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1200px] px-4 md:px-10', className)} data-testid={dataTestId} id={id}>
      {children}
    </Tag>
  )
}
