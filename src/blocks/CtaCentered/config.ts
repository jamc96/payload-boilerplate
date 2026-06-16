import type { Block } from 'payload'

import { anchorId } from '@/fields/anchorId'
import { ctaButton } from '@/fields/ctaButton'
import { sectionHeader } from '@/fields/sectionHeader'

export const CtaCentered: Block = {
  slug: 'ctaCentered',
  interfaceName: 'CtaCenteredBlock',
  fields: [
    sectionHeader({ richTextDescription: false }),
    ctaButton({ name: 'cta', fullWidth: true }),
    anchorId({ defaultValue: 'contact' }),
  ],
  labels: {
    plural: 'Centered CTAs',
    singular: 'Centered CTA',
  },
}
