'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
import { Logo } from '@/components/Logo/Logo'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const ctaLink = data?.ctaLink

  return (
    <header
      className="relative z-20 bg-glance-bg"
      data-testid="glance-header"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container relative flex items-center justify-between py-6 md:py-8">
        <Link className="relative z-10 shrink-0" href="/">
          <Logo loading="eager" priority="high" resource={data?.logo} />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 hidden justify-center md:flex">
          <div className="pointer-events-auto">
            <HeaderNav data={data} />
          </div>
        </div>

        <div className="relative z-10 hidden shrink-0 md:block">
          {ctaLink && <GlanceButton {...ctaLink} appearance={ctaLink.appearance ?? 'linkout'} />}
        </div>

        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="relative z-10 inline-flex items-center justify-center rounded-full p-2 text-glance-text md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity md:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setMobileOpen(false)}
        role="presentation"
      />

      <div
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b border-glance-divider bg-glance-bg p-6 pt-24 transition-transform duration-300 ease-out md:hidden',
          mobileOpen ? 'translate-y-0' : '-translate-y-full',
        )}
        data-testid="header-mobile-drawer"
      >
        <HeaderNav data={data} mobile onNavigate={() => setMobileOpen(false)} />
        {ctaLink && (
          <div className="mt-8">
            <GlanceButton
              {...ctaLink}
              appearance={ctaLink.appearance ?? 'linkout'}
              className="w-full"
              fullWidth
            />
          </div>
        )}
      </div>
    </header>
  )
}
