import type { Block } from 'payload'

import { ctaButton } from '@/fields/ctaButton'
import { sectionHeader } from '@/fields/sectionHeader'

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  interfaceName: 'ComparisonTableBlock',
  fields: [
    sectionHeader(),
    ctaButton({ name: 'cta' }),
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Feature Comparisons',
    singular: 'Feature Comparison',
  },
  admin: {
    description: 'Side-by-side comparison table for product specs or plans.',
  },
}
