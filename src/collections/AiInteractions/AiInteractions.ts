import type { CollectionConfig } from 'payload'
import { ProductDescription } from '../../../../shared/payload-templates/ecommerce/src/components/product/ProductDescription';

export const AiInteractions: CollectionConfig = {
  slug: 'ai-interactions',
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
      name: 'userMessage',
      label:'User Message',
      type: 'textarea',
    },
    {
      name: 'aiResponse',
      label:'AI Response',
      type: 'textarea',
    },
    {
      name: 'source',
      label: 'Source',
      type: 'text',
      required: true,
    },
    {
      name: 'systemMessage',
      label: 'System Message',
      type: 'relationship',
      relationTo: 'prompts',
    },
        {
            name: 'model',
            label: 'Model',
            type: 'text'
        },
    {
      name: 'provider',
      label: 'Provider',
      type: 'select',
      defaultValue: 'Groq',
      options: ['Groq', 'OpenRouter','Othe'],
    },
    {
        name: 'reasoning',
        label: 'Reasoning',
        type: 'checkbox',
        defaultValue: false,
    },
    {
        name: 'reasoningText',
        label: 'Reasoning Text',
        type: 'textarea',
    },
    {
        name: 'error',
        label: 'Error',
        type: 'textarea',
    },
    {
        name: 'notes',
        label: 'Notes',
        type: 'textarea',
    },
    {
        name: 'metadata',
        label: 'Metadata (JSON)',
        type: 'json',
    },
  ],
}
