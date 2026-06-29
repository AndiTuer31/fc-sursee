import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'ek289jzm',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Sanity CDN Image URL aus Asset-Referenz bauen
export function imageUrl(asset, width = 800) {
  if (!asset?.asset?._ref) return null
  const ref = asset.asset._ref
  // Format: image-{id}-{width}x{height}-{ext}
  const parts = ref.replace('image-', '').split('-')
  const ext = parts.pop()
  const dims = parts.pop()
  const id = parts.join('-')
  return `https://cdn.sanity.io/images/ek289jzm/production/${id}-${dims}.${ext}?w=${width}&auto=format`
}
