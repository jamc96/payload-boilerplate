import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type SectionHeaderType = (options?: {
  includeSectionLabel?: boolean
  richTextDescription?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const sectionHeader: SectionHeaderType = ({
  includeSectionLabel = true,
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

  const sectionLabelField: Field = {
    name: 'eyebrow',
    type: 'text',
    label: 'Section label (optional)',
    admin: {
      description:
        'Small text above the main heading (e.g. "Benefits"). Leave blank if this section does not use one.',
    },
  }

  const sectionHeaderField: GroupField = {
    name: 'sectionHeader',
    type: 'group',
    label: 'Section heading',
    fields: [
      ...(includeSectionLabel ? [sectionLabelField] : []),
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
