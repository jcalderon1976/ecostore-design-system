import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function webp(input, output, width, quality) {
  const out = path.join(root, output)
  await sharp(path.join(root, input))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 90, effort: 6 })
    .toFile(out)
  const meta = await sharp(out).metadata()
  console.log(`${output}  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(1)} KB`)
}

await webp('public/images/hero/house.png', 'public/images/hero/house-800.webp', 800, 78)
await webp('public/images/hero/house.png', 'public/images/hero/house-1200.webp', 1200, 78)
await webp('public/images/hero/house.png', 'public/images/hero/house-1600.webp', 1536, 78)

await webp('public/images/hero/hero-logo.png', 'public/images/hero/hero-logo-320.webp', 320, 86)
await webp('public/images/hero/hero-logo.png', 'public/images/hero/hero-logo-640.webp', 640, 86)

await webp('public/images/logo-wordmark.png', 'public/images/logo-wordmark-190.webp', 190, 86)
await webp('public/images/logo-wordmark.png', 'public/images/logo-wordmark-380.webp', 380, 86)
