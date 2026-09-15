import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { CheckCircleIcon, LeafIcon } from '../../icons'
import styles from './Catalog.module.css'

/* ---------------- CategoryBand ---------------- */
export type CategoryTone = 'green' | 'sky'

export interface CategoryBandProps {
  icon: ReactNode
  title: string
  tagline?: ReactNode
  /** Nota a la derecha con hoja ("Reduce costos. Aumenta tu eficiencia."). */
  note?: ReactNode
  tone?: CategoryTone
  className?: string
}

/** Cabecera de categoría del catálogo: ícono sólido, título en mayúsculas, tagline y nota. */
export function CategoryBand({ icon, title, tagline, note, tone = 'green', className }: CategoryBandProps) {
  return (
    <div className={cx(styles.band, tone === 'sky' ? styles.bandSky : styles.bandGreen, className)}>
      <span className={styles.bandIcon} aria-hidden="true">{icon}</span>
      <h3 className={styles.bandTitle}>{title}</h3>
      {tagline && <><span className={styles.bandSep} aria-hidden="true" /><span className={styles.bandTagline}>{tagline}</span></>}
      {note && <span className={styles.bandNote}><LeafIcon size={16} />{note}</span>}
    </div>
  )
}

/* ---------------- SolutionCard ---------------- */
export interface SolutionCardProps {
  title: ReactNode
  items: ReactNode[]
  /** Imagen recortada (PNG/WebP con transparencia). */
  imageSrc?: string
  imageAlt?: string
  /** Ícono grande cuando no hay imagen. */
  icon?: ReactNode
  tone?: CategoryTone
  /** Hoja decorativa en la esquina de la imagen. */
  leaf?: boolean
  /** `sm` para filas de 6–7 tarjetas. */
  size?: 'sm' | 'md'
  /** `contain` para recortes con transparencia (por defecto); `cover` para fotografías. */
  imageFit?: 'contain' | 'cover'
  className?: string
}

/** Tarjeta de solución: imagen sobre fondo pastel, título y lista con checks. */
export function SolutionCard({ title, items, imageSrc, imageAlt = '', icon, tone = 'green', leaf = true, size = 'md', imageFit = 'contain', className }: SolutionCardProps) {
  return (
    <article className={cx(styles.card, size === 'sm' && styles.compact, className)}>
      <div className={cx(styles.media, tone === 'sky' && styles.mediaSky)}>
        {imageSrc
          ? <img src={imageSrc} alt={imageAlt} className={cx(styles.img, imageFit === 'cover' && styles.imgCover)} loading="lazy" decoding="async" />
          : <span className={styles.mediaIcon} aria-hidden="true">{icon}</span>}
        {leaf && <LeafIcon size={18} className={styles.leaf} />}
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <ul className={styles.list}>
          {items.map((it, i) => (
            <li key={i} className={styles.item}><CheckCircleIcon size={16} /><span>{it}</span></li>
          ))}
        </ul>
      </div>
    </article>
  )
}
