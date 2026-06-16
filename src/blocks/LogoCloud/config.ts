import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: {
    plural: 'Partner Logos',
    singular: 'Partner Logos',
  },
  admin: {
    description: 'Row of client or partner logos with an optional heading.',
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
  ],
}
