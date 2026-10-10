import { SITE } from './site'

export const PRODUCT_WIDTHS = [420, 640, 840, 1200] as const
export const PARTNER_WIDTHS = [200, 400] as const

export const SIZES = {
  productCard:
    '(max-width: 539px) 56vw, (max-width: 759px) 36vw, (max-width: 999px) 26vw, 16vw',
  figurine: '(max-width: 639px) 70vw, min(42vw, 520px)',
  solution: '(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 220px',
  partner: '184px',
} as const

function stem(file: string) {
  return file.replace(/\.(webp|png|jpe?g)$/i, '')
}

/** Variantes `name-420.webp` / `name-640.webp` / `name-840.webp` / `name-1200.webp`. */
export function responsiveSrc(
  dir: string,
  file: string,
  widths: readonly number[] = PRODUCT_WIDTHS,
  srcWidth = widths[Math.min(1, widths.length - 1)] ?? widths[0],
) {
  const folder = dir.replace(/^\/|\/$/g, '')
  const base = `${SITE.base}${folder}/${stem(file)}`
  return {
    src: `${base}-${srcWidth}.webp`,
    srcSet: widths.map((width) => `${base}-${width}.webp ${width}w`).join(', '),
  }
}
