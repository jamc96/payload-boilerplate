import React from 'react'

import { cn } from '@/utilities/ui'

export type SectionHeaderData = {
  align?: ('left' | 'center') | null
  description?: string | null
  eyebrow?: string | null
  heading?: string | null
}

type SectionHeaderProps = {
  className?: string
  data?: SectionHeaderData | null
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ className, data }) => {
  if (!data?.heading) {
    return null
  }

  const { align = 'left', description, eyebrow, heading } = data
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-[50px]',
        isCentered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className="font-caption text-[12px] tracking-[-0.12px] text-glance-primary">{eyebrow}</p>
      )}

      <h2 className="font-display text-[40px] leading-[0.9] tracking-[-0.03em] text-glance-text md:text-[60px]">
        {heading}
      </h2>

      {description && (
        <p className="max-w-[42rem] font-body text-[15px] leading-[1.4] tracking-[-0.075px] text-glance-muted">
          {description}
        </p>
      )}
    </div>
  )
}
