import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyrightName',
      type: 'text',
      label: 'Copyright name',
    },
    {
      name: 'year',
      type: 'number',
    },
    {
      name: 'legalText',
      type: 'text',
      label: 'Legal text',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
