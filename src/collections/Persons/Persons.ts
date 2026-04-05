import type { CollectionConfig } from 'payload'

export const Persons: CollectionConfig = {
  slug: 'persons',
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: '',
    defaultColumns: [],
  },
  labels: {},
  hooks: {
    beforeChange: [],
    afterChange: [],
    beforeValidate: [],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'secondName',
      label: 'Second Name',
      type: 'text',
      required: false,
    },
  ],
}
