import type { Block } from 'payload'

import { ctaButton } from '@/fields/ctaButton'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    ctaButton({ name: 'cta' }),
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'number',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
  labels: {
    plural: 'How It Works sections',
    singular: 'How It Works',
  },
  admin: {
    description: 'Numbered steps explaining your product or process.',
  },
}
