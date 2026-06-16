import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { GlanceSection } from '@/components/GlanceSection'
import { Logo } from '@/components/Logo/Logo'

const footerLinkClassName =
  'font-body text-sm font-bold text-glance-text transition-colors hover:text-glance-primary'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const copyrightName = footerData?.copyrightName
  const year = footerData?.year
  const legalText = footerData?.legalText

  const hasCopyright = copyrightName || year

  return (
    <footer className="mt-auto border-t border-glance-divider bg-glance-bg" data-testid="glance-footer">
      <GlanceSection className="flex flex-col gap-20 pt-10 pb-5">
        {navItems.length > 0 && (
          <nav className="flex flex-col gap-[27px] md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-4">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="inline" className={footerLinkClassName} />
            ))}
          </nav>
        )}

        {(hasCopyright || legalText || footerData?.logo) && (
          <div className="flex items-end justify-between gap-4">
            <Link className="shrink-0" href="/">
              <Logo resource={footerData?.logo} size="footer" />
            </Link>

            {hasCopyright && (
              <p className="font-caption text-[12px] tracking-[-0.12px] text-glance-primary">
                {copyrightName && <span>© {copyrightName}</span>}
                {year && <span>{copyrightName ? ' ' : '© '}{year}</span>}
              </p>
            )}

            {legalText && (
              <p className="shrink-0 font-caption text-[12px] tracking-[-0.12px] text-glance-primary">
                {legalText}
              </p>
            )}
          </div>
        )}
      </GlanceSection>
    </footer>
  )
}
