import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Heading, Label, Lead, type HeadingLevel } from '../Typography/Typography'
import styles from './SectionHeader.module.css'

export interface SectionHeaderProps {
  /** Etiqueta corta de la sección ("Contacto", "Proceso"). */
  label?: ReactNode
  /** Índice de sección si la página es una secuencia real ("01"). */
  index?: string
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  level?: HeadingLevel
  align?: 'split' | 'center'
  inverse?: boolean
  className?: string
}

/**
 * Cabecera de sección editorial: hairline superior, etiqueta a la izquierda,
 * título y lead a la derecha. `align="center"` para secciones simétricas.
 */
export function SectionHeader({ label, index, title, lead, actions, level = 'h2', align = 'split', inverse, className }: SectionHeaderProps) {
  return (
    <div className={cx(align === 'center' ? styles.centered : styles.header, inverse && styles.inverse, className)}>
      {(label || index) && (
        <div className={styles.left}>
          {index && <span className={styles.index}>{index}</span>}
          {label && <Label inverse={inverse}>{label}</Label>}
        </div>
      )}
      <div className={styles.right}>
        <Heading level={level} tone={inverse ? 'inverse' : 'brand'}>{title}</Heading>
        {lead && <Lead inverse={inverse}>{lead}</Lead>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  )
}
