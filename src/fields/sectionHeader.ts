import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type SectionHeaderType = (options?: {
  richTextDescription?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const sectionHeader: SectionHeaderType = ({
  richTextDescription = false,
  overrides = {},
} = {}) => {
  const descriptionField: Field = richTextDescription
    ? {
        name: 'description',
        type: 'richText',
        label: 'Description',
      }
    : {
        name: 'description',
        type: 'textarea',
        label: 'Description',
      }

  const sectionHeaderField: GroupField = {
    name: 'sectionHeader',
    type: 'group',
    label: 'Section Header',
    fields: [
      {
        name: 'eyebrow',
        type: 'text',
        label: 'Eyebrow',
      },
      {
        name: 'heading',
        type: 'text',
        label: 'Heading',
        required: true,
      },
      descriptionField,
      {
        name: 'align',
        type: 'select',
        label: 'Alignment',
        defaultValue: 'left',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
        ],
      },
    ],
  }

  return deepMerge(sectionHeaderField, overrides)
}
