import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Card } from '../Card/Card'
import { IconCircle } from '../IconCircle/IconCircle'
import { BorderTrail } from '../BorderTrail/BorderTrail'
import styles from './ContactCard.module.css'

export interface ContactCardProps {
  icon: ReactNode
  title: ReactNode
  /** Valor principal en verde (teléfono, email). Si se pasa `href`, es un enlace. */
  value?: ReactNode
  href?: string
  /** Tamaño grande para el valor (teléfono). */
  emphasize?: boolean
  /** Línea(s) secundarias en gris. */
  meta?: ReactNode
  /** Contenido libre (ej. SocialLinks). */
  children?: ReactNode
  /** Desfase de la estela del borde. */
  trailDelay?: number
  className?: string
}

/** Tarjeta "Múltiples formas de contactarnos": ícono + título + valor + meta. */
export function ContactCard({ icon, title, value, href, emphasize, meta, children, trailDelay = 0, className }: ContactCardProps) {
  const valueClass = cx(styles.value, emphasize && styles.valueLg)
  return (
    <Card className={cx(styles.card, className)} data-icon-hover="">
      <BorderTrail delay={trailDelay} />
      <div className={styles.head}>
        <IconCircle tone="soft" size="md">{icon}</IconCircle>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.body}>
        {value && (href ? <a href={href} className={valueClass}>{value}</a> : <span className={valueClass}>{value}</span>)}
        {children}
        {meta && <div className={styles.meta}>{meta}</div>}
      </div>
    </Card>
  )
}

export function ContactMetaStrong({ children }: { children: ReactNode }) {
  return <span className={styles.metaStrong}>{children}</span>
}
