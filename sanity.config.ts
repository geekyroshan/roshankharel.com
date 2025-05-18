'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {table} from '@sanity/table'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {structure} from './sanity/structure'
import {schemaTypes} from "./sanity/schemas"

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Use schemas from sanity/schemas folder
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Table plugin
    table(),
  ],
})
