import type { Block } from 'payload'

export const MediaHero: Block = {
  slug: 'mediaHero',
  interfaceName: 'MediaHeroBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
    },
  ],
  labels: {
    plural: 'Media Heroes',
    singular: 'Media Hero',
  },
}
