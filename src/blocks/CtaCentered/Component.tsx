import React from 'react'

import type { CtaCenteredBlock as CtaCenteredBlockProps } from '@/payload-types'

import { GlanceButton } from '@/components/GlanceButton'
import { SectionHeader } from '@/components/SectionHeader'

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

          <GlanceButton
            {...cta}
            appearance={cta.appearance ?? 'linkout'}
            className="w-full"
            fullWidth={cta.fullWidth ?? true}
          />
        </div>
      </div>
    </section>
  )
}
