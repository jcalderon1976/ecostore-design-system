import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../Layout/Layout'
import { Eyebrow, Heading } from '../Typography/Typography'
import styles from './Hero.module.css'

export type HeroVariant = 'dark' | 'light'

export interface HeroProps {
  /** `dark`: malla verde con grano (o foto con degradado). `light`: malla celeste pastel. */
  variant?: HeroVariant
  eyebrow?: ReactNode
  /** Título. Usa <Em tone="highlight"> para la palabra en serif itálica. */
  title: ReactNode
  lead?: ReactNode
  /** Botones de acción bajo el lead. */
  actions?: ReactNode
  /** URL de imagen de fondo (solo variante dark). */
  imageUrl?: string
  /** Contenido extra bajo las acciones (ej. TrustList). */
  children?: ReactNode
  /** Columna derecha: composición visual, ilustración o tarjeta. */
  aside?: ReactNode
  className?: string
}

export function Hero({ variant = 'dark', eyebrow, title, lead, actions, imageUrl, children, aside, className }: HeroProps) {
  const style = imageUrl ? ({ '--hero-image': `url(${imageUrl})` } as CSSProperties) : undefined
  const inverse = variant === 'dark'

  return (
    <section className={cx(styles.hero, styles[variant], imageUrl && styles.hasImage, className)} style={style}>
      <Container>
        <div className={cx(styles.grid, !aside && styles.single)}>
          <div className={styles.content}>
            {eyebrow && <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>}
            <Heading level="display" tone={inverse ? 'inverse' : 'brand'}>{title}</Heading>
            {lead && <p className={styles.lead}>{lead}</p>}
            {actions && <div className={styles.actions}>{actions}</div>}
            {children && <div className={styles.extra}>{children}</div>}
          </div>
          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
      </Container>
    </section>
  )
}
