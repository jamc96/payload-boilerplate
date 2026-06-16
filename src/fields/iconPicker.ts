import type { Field, SelectField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type IconPickerValue = 'cable' | 'earth' | 'user' | 'barChart'

export const iconPickerOptions: { label: string; value: IconPickerValue }[] = [
  { label: 'Cable', value: 'cable' },
  { label: 'Earth', value: 'earth' },
  { label: 'User / Account', value: 'user' },
  { label: 'Bar Chart', value: 'barChart' },
]

type IconPickerType = (options?: { overrides?: Partial<SelectField> }) => Field

export const iconPicker: IconPickerType = ({ overrides = {} } = {}) => {
  const iconPickerField: SelectField = {
    name: 'icon',
    type: 'select',
    label: 'Icon',
    required: true,
    options: iconPickerOptions,
  }

  return deepMerge(iconPickerField, overrides)
}
