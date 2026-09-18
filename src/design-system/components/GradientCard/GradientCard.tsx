import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { ArrowUpRightIcon } from '../../icons'
import styles from './GradientCard.module.css'

export type GradientTone = 'orange' | 'gray' | 'purple' | 'green'

export interface GradientCardProps {
  badgeText: string
  badgeColor: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  imageUrl: string
  gradient: GradientTone
  /** Si es true, el CTA abre en una pestaña nueva. */
  external?: boolean
  /** Contenido extra (ej. redes sociales) bajo el CTA. */
  children?: ReactNode
  className?: string
}

/**
 * Tarjeta con degradado, badge, ilustración 3D y CTA.
 * El hover mueve la tarjeta y escala la imagen (solo transform).
 */
export function GradientCard({
  badgeText,
  badgeColor,
  title,
  description,
  ctaText,
  ctaHref,
  imageUrl,
  gradient,
  external,
  children,
  className,
}: GradientCardProps) {
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : undefined

  return (
    <article className={cx(styles.card, styles[gradient], className)}>
      <span className={styles.glow} aria-hidden="true" />
      <img src={imageUrl} alt="" className={styles.image} />
      <div className={styles.body}>
        <span className={styles.badge} style={{ backgroundColor: badgeColor }}>
          {badgeText}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a href={ctaHref} className={styles.cta} {...extra}>
          {ctaText}
          <ArrowUpRightIcon size={16} />
        </a>
        {children}
      </div>
    </article>
  )
}
