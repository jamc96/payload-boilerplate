import type { Block } from 'payload'

import { anchorId } from '@/fields/anchorId'
import { iconPicker } from '@/fields/iconPicker'
import { sectionHeader } from '@/fields/sectionHeader'

export const Benefits: Block = {
  slug: 'benefits',
  interfaceName: 'BenefitsBlock',
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        iconPicker(),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    anchorId({ defaultValue: 'benefits' }),
  ],
  labels: {
    plural: 'Benefits',
    singular: 'Benefits',
  },
}
