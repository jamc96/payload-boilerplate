import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

import { link } from './link'

export type CtaAppearances = 'primary' | 'secondary' | 'linkout'

export const ctaButtonAppearances: Record<CtaAppearances, { label: string; value: string }> = {
  primary: {
    label: 'Primary',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  linkout: {
    label: 'Link out',
    value: 'linkout',
  },
}

type CtaButtonType = (options?: {
  name?: string
  fullWidth?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const ctaButton: CtaButtonType = ({ name = 'cta', fullWidth = false, overrides = {} } = {}) => {
  const linkField = link({ appearances: false }) as GroupField

  const ctaButtonField: GroupField = {
    ...linkField,
    name,
    fields: [
      ...linkField.fields,
      {
        name: 'appearance',
        type: 'select',
        admin: {
          description: 'Choose how the button should be rendered.',
        },
        defaultValue: 'primary',
        options: [
          ctaButtonAppearances.primary,
          ctaButtonAppearances.secondary,
          ctaButtonAppearances.linkout,
        ],
      },
      ...(fullWidth
        ? [
            {
              name: 'fullWidth',
              type: 'checkbox',
              label: 'Full width',
              defaultValue: false,
            } as Field,
          ]
        : []),
    ],
  }

  return deepMerge(ctaButtonField, overrides)
}
