import type { Block } from 'payload'

import { anchorId } from '@/fields/anchorId'
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
    anchorId({ defaultValue: 'how-to' }),
  ],
  labels: {
    plural: 'Process Steps',
    singular: 'Process Steps',
  },
}
