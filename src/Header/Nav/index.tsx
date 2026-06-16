'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

const navLinkClassName =
  'font-body text-sm font-bold text-site-text transition-colors hover:text-site-primary'

type HeaderNavProps = {
  data: HeaderType
  mobile?: boolean
  onNavigate?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mobile = false, onNavigate }) => {
  const navItems = data?.navItems || []

  if (mobile) {
    return (
      <nav className="flex flex-col" data-testid="header-mobile-menu">
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={cn(
              navLinkClassName,
              'border-t border-site-divider py-[30px] text-base',
            )}
            onClick={onNavigate}
          />
        ))}
      </nav>
    )
  }

  return (
    <nav
      className="hidden items-center gap-[27px] rounded-[100px] bg-white/40 px-6 py-5 tracking-[-0.35px] backdrop-blur-[15px] md:flex"
      data-testid="header-nav"
    >
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="inline" className={navLinkClassName} />
      ))}
    </nav>
  )
}
