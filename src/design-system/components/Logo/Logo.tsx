import { cx } from '../../utils/cx'
import styles from './Logo.module.css'

export interface LogoProps {
  /** Alto en px. El ancho se calcula proporcionalmente (≈ 3 : 1). */
  height?: number
  /** Versión para fondos oscuros: hoja y cable en blanco. */
  inverse?: boolean
  /** Ruta alternativa al archivo. Por defecto usa los logos oficiales en /public. */
  src?: string
  /** Fuerza el vector SVG interno en lugar del archivo oficial. */
  vector?: boolean
  className?: string
}

/* Logos oficiales (public/logo.png y public/logo-inverse.png). Rutas relativas para funcionar con cualquier base. */
const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'
export const LOGO_SRC = `${BASE}logo.png`
export const LOGO_INVERSE_SRC = `${BASE}logo-inverse.png`
/** Versión apilada en dos líneas para fondos oscuros (≈ 1.9 : 1). */
export const LOGO_INVERSE_STACKED_SRC = `${BASE}logo-inverse-stacked.png`

/* Colores del logotipo (no son tokens: el logo no cambia con el tema). */
const BRAND = { green: '#1E9E2E', greenDark: '#0E4D1F', orange: '#F7941D', yellow: '#FFD500' }
const INVERSE = { green: '#6FC98B', greenDark: '#FFFFFF', orange: '#F7B733', yellow: '#FFD500' }
const FONT = 'Outfit, Montserrat, Inter, sans-serif'

/**
 * Logotipo EcoStore. Usa el archivo oficial; `vector` dibuja una versión SVG aproximada
 * (útil como respaldo si el archivo no está disponible).
 */
export function Logo({ height = 40, inverse, src, vector, className }: LogoProps) {
  if (!vector) {
    return (
      <img
        src={src ?? (inverse ? LOGO_INVERSE_SRC : LOGO_SRC)}
        alt="EcoStore"
        height={height}
        className={cx(styles.logo, className)}
        decoding="async"
      />
    )
  }

  const c = inverse ? INVERSE : BRAND
  return (
    <svg height={height} viewBox="0 0 1240 320" role="img" aria-label="EcoStore" className={cx(styles.logo, className)}>
      <text x="18" y="262" fontFamily={FONT} fontWeight="800" fontSize="236" letterSpacing="-6" fill={c.green}>EC</text>
      <circle cx="395" cy="176" r="66" fill="none" stroke={c.green} strokeWidth="46" />
      <path d="M338 126 C 352 62, 438 40, 508 66 C 478 128, 398 150, 338 126 Z" fill={c.greenDark} />
      <path d="M352 122 C 400 100, 450 84, 500 70" stroke={inverse ? '#0D3A19' : '#FFFFFF'} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M470 246 C 540 246, 610 220, 622 160 C 632 106, 590 66, 508 66" stroke={c.greenDark} strokeWidth="13" strokeLinecap="round" fill="none" />
      <rect x="402" y="214" width="56" height="52" rx="9" fill={c.greenDark} />
      <rect x="376" y="226" width="26" height="9" rx="4.5" fill={c.greenDark} />
      <rect x="376" y="246" width="26" height="9" rx="4.5" fill={c.greenDark} />
      <text x="520" y="262" fontFamily={FONT} fontWeight="800" fontSize="236" letterSpacing="-6" fill={c.orange}>ST</text>
      <circle cx="858" cy="176" r="76" fill={c.yellow} />
      <g stroke={c.yellow} strokeWidth="16" strokeLinecap="round">
        <path d="M858 62v-26M858 290v26M744 176h-26M972 176h26" />
        <path d="M777 95l-18-18M939 257l18 18M777 257l-18 18M939 95l18-18" />
      </g>
      <text x="962" y="262" fontFamily={FONT} fontWeight="800" fontSize="236" letterSpacing="-6" fill={c.orange}>RE</text>
    </svg>
  )
}
