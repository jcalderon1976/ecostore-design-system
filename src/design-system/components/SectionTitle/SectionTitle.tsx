import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Heading, Text, Eyebrow, type HeadingLevel } from '../Typography/Typography'
import { LeafIcon } from '../../icons'
import styles from './SectionTitle.module.css'

export interface SectionTitleProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: ReactNode
  /** Hojas decorativas a ambos lados del título. */
  leaves?: boolean
  level?: HeadingLevel
  align?: 'center' | 'left'
  className?: string
}

/** Título de sección: opcional eyebrow, título con hojas a los lados y subtítulo. */
export function SectionTitle({ title, subtitle, eyebrow, leaves, level = 'h2', align = 'center', className }: SectionTitleProps) {
  return (
    <div className={cx(styles.wrap, align === 'left' && styles.alignLeft, className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className={styles.row}>
        {leaves && <LeafIcon size={22} className={cx(styles.leaf, styles.leafFlip)} />}
        <Heading level={level} tone="brand">{title}</Heading>
        {leaves && <LeafIcon size={22} className={styles.leaf} />}
      </div>
      {subtitle && <Text tone="muted" className={styles.subtitle}>{subtitle}</Text>}
    </div>
  )
}
