import React from 'react'

import type { CtaAppearances } from '@/fields/ctaButton'
import type { Page, Post } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
import { SectionHeader, type SectionHeaderData } from '@/components/SectionHeader'

type CtaButtonData = {
  appearance?: CtaAppearances | null
  fullWidth?: boolean | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export type CtaCenteredBlockProps = {
  anchorId?: string | null
  cta?: CtaButtonData | null
  sectionHeader?: SectionHeaderData | null
}

export const CtaCenteredBlock: React.FC<CtaCenteredBlockProps> = ({
  anchorId,
  cta,
  sectionHeader,
}) => {
  return (
    <section
      className="border-t border-glance-divider bg-glance-bg py-[120px]"
      data-testid="block-ctaCentered"
      id={anchorId || undefined}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="flex flex-col items-center gap-8 text-center">
          <SectionHeader className="items-center text-center" data={sectionHeader} />

          {cta && (
            <GlanceButton
              {...cta}
              appearance={cta.appearance ?? 'linkout'}
              className="w-full"
              fullWidth={cta.fullWidth ?? true}
            />
          )}
        </div>
      </div>
    </section>
  )
}
