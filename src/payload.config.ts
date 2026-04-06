/**
 * ./payload.config.ts
 * @Type: Config
 * @Description: Main configuration file for the Payload CMS instance
 * @Functions: buildConfig
 */
// ----------------------------->>>>>>>>>>>>>>>>>>> PAYLOAD IMPORTS <<<<<<<
import { postgresAdapter } from '@payloadcms/db-postgres' // Import PostgreSQL database adapter
import { lexicalEditor } from '@payloadcms/richtext-lexical' // Import Lexical rich text editor
import path from 'path' // Import path utility for file routing
import { buildConfig } from 'payload' // Import the core config builder
import { fileURLToPath } from 'url' // Import utility to convert URL to file path
import sharp from 'sharp' // Import image processing library

// ----------------------------->>>>>>>>>>>>>>>>>>> COLLECTIONS <<<<<<<
import { Users } from './collections/Users/Users' // Import the Users collection schema
import { Media } from './collections/Media/Media' // Import the Media collection schema
import { Persons } from './collections/Persons/Persons' // Import the Persons collection schema
import { Prompts } from './collections/Prompts/Prompts'
import { AiGenerations } from './collections/AiGenerations/AiGenerations'
// ----------------------------->>>>>>>>>>>>>>>>>>> PLUGINS <<<<<<<

import { importExportPlugin } from '@payloadcms/plugin-import-export'

const filename = fileURLToPath(import.meta.url) // Get the current file path
const dirname = path.dirname(filename) // Get the directory name of the current file

export default buildConfig({
  // Export the initialized Payload configuration
  admin: {
    // Admin panel settings
    user: Users.slug, // Define the default user collection for authentication
    importMap: {
      // Configure the base directory for the import map
      baseDir: path.resolve(dirname), // Resolve absolute path for imports
    },
  },
  routes: {
    // Custom routing configuration
    admin: '/flow-manage', // Set custom path for the admin dashboard
  },
  collections: [
    // Register available data collections
    AiGenerations,
    Users,
    Media,
    Prompts,
    Persons,
  ],

  editor: lexicalEditor(), // Set the default rich text editor to Lexical
  secret: process.env.PAYLOAD_SECRET || '', // Set the encryption secret from environment variables
  typescript: {
    // TypeScript generation settings
    outputFile: path.resolve(dirname, 'payload-types.ts'), // Define the output path for generated types
  },
  db: postgresAdapter({
    // Database connection settings
    pool: {
      // Configure the connection pool
      connectionString: process.env.DATABASE_URL || '', // Set the database URI from environment variables
    },
  }),
  sharp, // Assign the sharp library for image manipulation
  plugins: [
    importExportPlugin({
      collections: [
        { slug: 'ai-generations' },
        { slug: 'media' },
        { slug: 'users' },
        { slug: 'prompts' },
        { slug: 'persons' },
      ],
    }),
  ],
})
