'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

const navLinkClassName =
  'font-body text-sm font-bold text-glance-text transition-colors hover:text-glance-primary'

type HeaderNavProps = {
  data: HeaderType
  mobile?: boolean
  onNavigate?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mobile = false, onNavigate }) => {
  const navItems = data?.navItems || []

  if (mobile) {
    return (
      <nav className="flex flex-col gap-6">
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={cn(navLinkClassName, 'text-base')}
            onClick={onNavigate}
          />
        ))}
      </nav>
    )
  }

  return (
    <nav
      className="hidden items-center gap-1 rounded-full bg-white/40 px-2 py-2 backdrop-blur-[15px] md:flex"
      data-testid="header-nav"
    >
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="inline"
          className={cn(navLinkClassName, 'rounded-full px-4 py-2')}
        />
      ))}
    </nav>
  )
}
