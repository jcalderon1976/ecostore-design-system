import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function webp(input, output, { width, quality = 74 } = {}) {
  const out = path.join(root, output)
  await fs.mkdir(path.dirname(out), { recursive: true })
  await sharp(path.join(root, input))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 88, effort: 6 })
    .toFile(out)
  const meta = await sharp(out).metadata()
  console.log(`${output}  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(1)} KB`)
}

async function variants(input, widths, quality) {
  const parsed = path.parse(input)
  const dir = parsed.dir.replaceAll('\\', '/')
  for (const width of widths) {
    await webp(input, `${dir}/${parsed.name}-${width}.webp`, { width, quality })
  }
}

await webp('public/images/hero/house.png', 'public/images/hero/house-800.webp', { width: 800, quality: 36 })
await webp('public/images/hero/house.png', 'public/images/hero/house-1200.webp', { width: 1200, quality: 54 })
await webp('public/images/hero/house.png', 'public/images/hero/house-1600.webp', { width: 1536, quality: 54 })

await webp('public/images/hero/hero-logo.png', 'public/images/hero/hero-logo-320.webp', { width: 320, quality: 68 })
await webp('public/images/hero/hero-logo.png', 'public/images/hero/hero-logo-520.webp', { width: 520, quality: 68 })
await webp('public/images/hero/hero-logo.png', 'public/images/hero/hero-logo-640.webp', { width: 640, quality: 68 })

await webp('public/images/logo-wordmark.png', 'public/images/logo-wordmark-190.webp', { width: 190, quality: 48 })
await webp('public/images/logo-wordmark.png', 'public/images/logo-wordmark-380.webp', { width: 380, quality: 48 })

await webp('public/logo-inverse-stacked.png', 'public/images/logo-inverse-stacked-280.webp', { width: 280, quality: 78 })
await webp('public/logo-inverse-stacked.png', 'public/images/logo-inverse-stacked-560.webp', { width: 560, quality: 78 })

await webp('public/images/footer-leaf.png', 'public/images/footer-leaf-800.webp', { width: 800, quality: 62 })

const PRODUCT_WIDTHS = [420, 640, 840, 1200]
const PRODUCTS = [
  'public/images/lavaseca.webp',
  'public/images/climatizacion.webp',
  'public/images/house.webp',
  'public/images/tratamiento-agua.webp',
  'public/images/calentador-solar.webp',
  'public/images/placas.webp',
  'public/images/ducha.webp',
  'public/images/led.webp',
  'public/images/cisterna.webp',
  'public/images/captacion-lluvia.webp',
  'public/images/heatPump.webp',
  'public/images/energia/heatPump.webp',
  'public/images/energia/climatizacion.webp',
  'public/images/energia/placas.webp',
  'public/images/energia/microinversor.webp',
  'public/images/energia/bateria.webp',
  'public/images/energia/led.webp',
  'public/images/energia/lavaseca.webp',
  'public/images/energia/countertop.webp',
  'public/images/energia/doubleGlass.png',
  'public/images/energia/Sealer.png',
  'public/images/agua/calentador-solar.webp',
  'public/images/agua/ducha.webp',
  'public/images/agua/ducha-low-flow.webp',
  'public/images/agua/ducha-sistema.webp',
  'public/images/agua/aireador.webp',
  'public/images/agua/aireador-giratorio.webp',
  'public/images/agua/inodoro-1-pieza.webp',
  'public/images/agua/inodoro-2-piezas.webp',
  'public/images/agua/toilet-tank-bank.webp',
  'public/images/agua/tratamiento-agua.webp',
  'public/images/agua/cisterna.webp',
  'public/images/agua/captacion-lluvia.webp',
]

for (const file of PRODUCTS) {
  try {
    await fs.access(path.join(root, file))
  } catch {
    console.warn(`skip missing ${file}`)
    continue
  }
  await variants(file, PRODUCT_WIDTHS, 72)
}

await variants('public/images/partners/ge.png', [200, 400], 76)
await variants('public/images/partners/ge-pro.png', [200, 400], 76)
await variants('public/images/partners/haier.png', [200, 400], 76)
await variants('public/images/partners/hotpoint.png', [200, 400], 76)
