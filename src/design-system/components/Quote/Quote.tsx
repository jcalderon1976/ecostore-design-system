import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { QuoteIcon, StarIcon } from '../../icons'
import styles from './Quote.module.css'

export interface QuoteProps {
  children: ReactNode
  name: string
  role?: ReactNode
  /** Iniciales para el avatar cuando no hay foto. */
  initials?: string
  avatarUrl?: string
  /** 1–5. */
  rating?: number
  inverse?: boolean
  className?: string
}

/** Testimonial en serif itálica grande con autor y valoración. */
export function Quote({ children, name, role, initials, avatarUrl, rating, inverse, className }: QuoteProps) {
  return (
    <figure className={cx(styles.quote, inverse && styles.inverse, className)}>
      <QuoteIcon size={36} className={styles.mark} />
      <div>
        <blockquote className={styles.text}>{children}</blockquote>
        <figcaption className={styles.footer}>
          {avatarUrl
            ? <img src={avatarUrl} alt="" className={styles.avatar} />
            : <span className={styles.avatar} aria-hidden="true">{initials ?? name.slice(0, 1)}</span>}
          <div>
            <div className={styles.name}>{name}</div>
            {role && <div className={styles.role}>{role}</div>}
          </div>
          {rating && (
            <span className={styles.stars} role="img" aria-label={`${rating} de 5 estrellas`}>
              {Array.from({ length: rating }).map((_, i) => <StarIcon key={i} size={16} />)}
            </span>
          )}
        </figcaption>
      </div>
    </figure>
  )
}
