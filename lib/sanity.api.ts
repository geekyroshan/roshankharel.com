/**
 * Unified Sanity API file that connects the existing setups
 */

import { createClient } from 'next-sanity'
import { client as studioClient } from '@/sanity/lib/client'
import { client as appClient } from '@/lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Re-export clients for use in different contexts
export const sanityClient = appClient
export const sanityStudioClient = studioClient

// Create image URL builder using the app client
const builder = imageUrlBuilder(appClient)

// Helper function to build image URLs from Sanity image references
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

// Export main functions from sanity.query for convenience
export { sanityFetch } from './sanity.client' 