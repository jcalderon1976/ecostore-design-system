import type { ElementType, HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import styles from './Card.module.css'

export type CardVariant = 'outlined' | 'elevated' | 'floating' | 'mint' | 'sky' | 'peach' | 'glass' | 'glassLight' | 'ink'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  /** Añade hover/focus y cursor pointer. */
  interactive?: boolean
  as?: ElementType
}

const padClass: Record<CardPadding, string> = {
  none: styles.padNone, sm: styles.padSm, md: styles.padMd, lg: styles.padLg,
}

export function Card({ variant = 'outlined', padding = 'md', interactive, as: Tag = 'div', className, ...rest }: CardProps) {
  return (
    <Tag
      className={cx(styles.card, styles[variant], padClass[padding], interactive && styles.interactive, className)}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  )
}
