import type { Field, SelectField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

/** Semantic hero/image frame colors — mapped to CSS in components, never raw hex in CMS. */
export type ThemeColorValue = 'midGreen' | 'primary' | 'primaryLight'

export const themeColorOptions: Record<
  ThemeColorValue,
  { label: string; value: ThemeColorValue }
> = {
  midGreen: {
    label: 'Brand green (medium)',
    value: 'midGreen',
  },
  primary: {
    label: 'Brand green (dark)',
    value: 'primary',
  },
  primaryLight: {
    label: 'Brand green (light)',
    value: 'primaryLight',
  },
}

export const themeColorClassMap: Record<ThemeColorValue, string> = {
  midGreen: 'bg-glance-mid-green',
  primary: 'bg-glance-primary',
  primaryLight: 'bg-glance-primary-light',
}

type ThemeColorFieldType = (options?: {
  name?: string
  label?: string
  defaultValue?: ThemeColorValue
  overrides?: Partial<SelectField>
}) => Field

export const themeColorField: ThemeColorFieldType = ({
  name = 'imageFrameColor',
  label = 'Image frame color',
  defaultValue = 'midGreen',
  overrides = {},
} = {}) => {
  const field: SelectField = {
    name,
    type: 'select',
    label,
    defaultValue,
    options: Object.values(themeColorOptions),
    admin: {
      description: 'Background color behind the hero image. Colors are set in the site theme.',
    },
  }

  return deepMerge(field, overrides)
}
