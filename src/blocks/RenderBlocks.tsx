import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BenefitsBlock } from '@/blocks/Benefits/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ComparisonTableBlock } from '@/blocks/ComparisonTable/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CtaCenteredBlock } from '@/blocks/CtaCentered/Component'
import { FeatureSplitBlock } from '@/blocks/FeatureSplit/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LogoCloudBlock } from '@/blocks/LogoCloud/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaHeroBlock } from '@/blocks/MediaHero/Component'
import { ProcessStepsBlock } from '@/blocks/ProcessSteps/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'

const blockComponents = {
  archive: ArchiveBlock,
  benefits: BenefitsBlock,
  comparisonTable: ComparisonTableBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaCentered: CtaCenteredBlock,
  featureSplit: FeatureSplitBlock,
  formBlock: FormBlock,
  logoCloud: LogoCloudBlock,
  mediaBlock: MediaBlock,
  mediaHero: MediaHeroBlock,
  processSteps: ProcessStepsBlock,
  testimonial: TestimonialBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-0" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
