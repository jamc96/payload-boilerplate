import type { Block } from 'payload'

import { ctaButton } from '@/fields/ctaButton'
import { sectionHeader } from '@/fields/sectionHeader'

export const CtaCentered: Block = {
  slug: 'ctaCentered',
  interfaceName: 'CtaCenteredBlock',
  fields: [
    sectionHeader({ richTextDescription: false }),
    ctaButton({ name: 'cta', fullWidth: true }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
  admin: {
    description: 'Centered heading with a single button.',
  },
}
