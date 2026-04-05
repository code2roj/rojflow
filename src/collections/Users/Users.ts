import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles'],
  },
  auth: {
    useAPIKey: true,
  },
  access: {
    // Only you can create or delete users
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('super-admin')),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('super-admin')),
    // Admins can see their own data; Super Admin sees everything
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('super-admin')) return true
      return { id: { equals: user?.id } }
    },
    // Users can update their own profile (to change password/API key)
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('super-admin')) return true
      return { id: { equals: user?.id } }
    },
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['user'],
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user?.roles?.includes('super-admin')),
      },
    },
  ],
}
