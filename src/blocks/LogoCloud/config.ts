import type { Block } from 'payload'

import { anchorId } from '@/fields/anchorId'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: {
    plural: 'Logo Clouds',
    singular: 'Logo Cloud',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Trusted by:',
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Logos',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    anchorId({ defaultValue: '' }),
  ],
}
