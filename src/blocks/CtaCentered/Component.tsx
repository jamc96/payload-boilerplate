import React from 'react'

import type { CtaCenteredBlock as CtaCenteredBlockProps } from '@/payload-types'

import { SiteButton } from '@/components/SiteButton'
import { SectionHeader } from '@/components/SectionHeader'
import { SECTION_ANCHORS } from '@/constants/sectionAnchors'

export const CtaCenteredBlock: React.FC<CtaCenteredBlockProps> = ({
  cta,
  sectionHeader,
}) => {
  return (
    <section
      className="border-t border-site-divider bg-site-bg pb-[120px] pt-20"
      data-testid="block-ctaCentered"
      id={SECTION_ANCHORS.ctaCentered}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-[100px] xl:px-[300px]">
        <div className="flex flex-col items-center gap-10 text-center">
          <SectionHeader className="items-center text-center" data={sectionHeader} />

          <SiteButton
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
