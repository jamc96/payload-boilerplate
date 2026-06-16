import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'

const footerLinkClassName =
  'font-body text-sm font-bold text-glance-text transition-colors hover:text-glance-primary'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const copyrightName = footerData?.copyrightName
  const year = footerData?.year
  const legalText = footerData?.legalText

  const hasCredits = copyrightName || year || legalText

  return (
    <footer className="mt-auto border-t border-glance-divider bg-glance-bg" data-testid="glance-footer">
      <div className="container flex flex-col gap-8 py-10 md:py-12">
        {navItems.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-start">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="inline" className={footerLinkClassName} />
            ))}
          </nav>
        )}

        <div
          className={cn(
            'flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left',
            navItems.length > 0 && 'border-t border-glance-divider pt-8',
          )}
        >
          <Link className="flex items-center" href="/">
            <Logo resource={footerData?.logo} />
          </Link>

          {hasCredits && (
            <p className="font-body text-sm text-glance-muted">
              {copyrightName && <span>© {copyrightName}</span>}
              {year && <span>{copyrightName ? ' ' : '© '}{year}</span>}
              {legalText && <span>{copyrightName || year ? ' ' : ''}{legalText}</span>}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
