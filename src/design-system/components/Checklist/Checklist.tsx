import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Card } from '../Card/Card'
import { IconCircle } from '../IconCircle/IconCircle'
import { Heading } from '../Typography/Typography'
import { CheckCircleIcon, LeafIcon } from '../../icons'
import styles from './Checklist.module.css'

export interface ChecklistProps extends HTMLAttributes<HTMLUListElement> {
  items: ReactNode[]
}

/** Lista con check verde relleno. */
export function Checklist({ items, className, ...rest }: ChecklistProps) {
  return (
    <ul className={cx(styles.list, className)} {...rest}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <CheckCircleIcon size={20} className={styles.icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export interface ChecklistCardProps {
  title: ReactNode
  items: ReactNode[]
  /** Muestra el sello verde con hoja en la esquina. */
  badge?: boolean
  className?: string
}

/** Tarjeta flotante "¿Qué incluye tu evaluación gratuita?" con lista de checks. */
export function ChecklistCard({ title, items, badge = true, className }: ChecklistCardProps) {
  return (
    <Card variant="floating" padding="lg" className={cx(styles.card, className)}>
      <Heading level="h4" as="h3" style={{ marginBottom: 'var(--eco-space-4)' }}>{title}</Heading>
      <Checklist items={items} />
      {badge && (
        <IconCircle tone="solid" size="lg" className={styles.badge} aria-hidden="true">
          <LeafIcon size={28} />
        </IconCircle>
      )}
    </Card>
  )
}
