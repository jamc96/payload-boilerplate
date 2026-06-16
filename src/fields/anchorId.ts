import type { Field, TextField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type AnchorIdType = (options?: {
  defaultValue?: string
  overrides?: Partial<TextField>
}) => Field

export const anchorId: AnchorIdType = ({ defaultValue = '', overrides = {} } = {}) => {
  const anchorIdField: TextField = {
    name: 'anchorId',
    type: 'text',
    label: 'Section ID',
    admin: {
      description: 'Optional HTML id for in-page navigation (e.g. benefits → #benefits).',
    },
    defaultValue,
  }

  return deepMerge(anchorIdField, overrides)
}
