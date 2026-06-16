import type { Block } from 'payload'

import { ctaButton } from '@/fields/ctaButton'
import { sectionHeader } from '@/fields/sectionHeader'

export const FeatureSplit: Block = {
  slug: 'featureSplit',
  interfaceName: 'FeatureSplitBlock',
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Text',
          required: true,
        },
      ],
      label: 'Items',
    },
    ctaButton({ name: 'cta' }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
  labels: {
    plural: 'Feature Splits',
    singular: 'Feature Split',
  },
}
