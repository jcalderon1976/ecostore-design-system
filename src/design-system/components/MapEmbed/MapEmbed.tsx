import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './MapEmbed.module.css'

export interface MapEmbedProps {
  /** URL de embed de Google Maps (Compartir → Insertar un mapa). */
  src: string
  /** Título accesible del iframe. */
  title?: string
  /** Relación de aspecto del mapa. Por defecto 21/9 en escritorio. */
  ratio?: string
  /** Contenido superpuesto (tarjeta con dirección, horario, botón). */
  overlay?: ReactNode
  overlayPosition?: 'left' | 'right'
  className?: string
}

/**
 * Mapa embebido con esquinas redondeadas, sombra teñida y tarjeta superpuesta opcional.
 * El iframe carga en diferido y no envía referrer completo.
 */
export function MapEmbed({ src, title = 'Ubicación en Google Maps', ratio = '21 / 9', overlay, overlayPosition = 'left', className }: MapEmbedProps) {
  return (
    <div className={cx(styles.wrap, className)} style={{ aspectRatio: ratio }}>
      <iframe
        src={src}
        title={title}
        className={styles.frame}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
      {overlay && (
        <div className={cx(styles.overlay, overlayPosition === 'right' && styles.overlayRight)}>{overlay}</div>
      )}
    </div>
  )
}
