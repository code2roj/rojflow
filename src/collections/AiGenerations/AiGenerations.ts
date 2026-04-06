import type { CollectionConfig } from 'payload'

export const AiGenerations: CollectionConfig = {
  slug: 'ai-generations',
  access: {
    create: () => true,
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'source',
    defaultColumns: ['source'],
  },
  labels: {},
  hooks: {
    beforeChange: [],
    afterChange: [],
    beforeValidate: [],
  },
  fields: [
    {
      name: 'source',
      label: 'Source',
      type: 'text',
      required: true,
    },
    {
      name: 'promptUsed',
      label: 'Prompt',
      type: 'relationship',
      relationTo: 'prompts',
    },
    {
      name: 'aiResponse',
      label: 'Ai Response',
      type: 'textarea',
    },
  ],
}
