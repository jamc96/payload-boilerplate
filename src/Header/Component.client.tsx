'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { SiteButton } from '@/components/SiteButton'
import { SiteSection } from '@/components/SiteSection'
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
    if (!mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  const ctaLink = data?.ctaLink

  return (
    <header
      className="relative z-20 bg-site-bg pt-5 pb-20"
      data-testid="site-header"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <SiteSection>
        <div
          className={cn(
            'relative md:static',
            mobileOpen &&
              'rounded-b-[20px] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:rounded-none md:bg-transparent md:shadow-none',
          )}
        >
          <div className="relative flex items-center justify-between">
            <Link className="relative z-10 shrink-0" href="/">
              <Logo loading="eager" priority="high" resource={data?.logo} />
            </Link>

            <div className="pointer-events-none absolute inset-x-0 hidden justify-center md:flex">
              <div className="pointer-events-auto">
                <HeaderNav data={data} />
              </div>
            </div>

            <div className="relative z-10 hidden shrink-0 md:block">
              {ctaLink && <SiteButton {...ctaLink} appearance={ctaLink.appearance ?? 'linkout'} />}
            </div>

            <button
              aria-controls="header-mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="relative z-10 inline-flex items-center justify-center rounded-full p-2 text-site-text md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              type="button"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          <div
            className={cn(
              'grid transition-[grid-template-rows] duration-300 ease-out md:hidden',
              mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            )}
            id="header-mobile-menu"
          >
            <div className="overflow-hidden">
              <HeaderNav data={data} mobile onNavigate={() => setMobileOpen(false)} />
              {ctaLink && (
                <div className="border-t border-site-divider py-[30px]">
                  <SiteButton
                    {...ctaLink}
                    appearance={ctaLink.appearance ?? 'linkout'}
                    className="w-full"
                    fullWidth
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </SiteSection>
    </header>
  )
}
