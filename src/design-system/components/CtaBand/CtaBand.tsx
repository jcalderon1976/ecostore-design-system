import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Heading, Eyebrow } from '../Typography/Typography'
import { LeafIcon } from '../../icons'
import styles from './CtaBand.module.css'

export interface CtaBandProps {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  actions: ReactNode
  /** Nota pequeña bajo los botones ("Sin compromiso · Respuesta en 24 h"). */
  note?: ReactNode
  className?: string
}

/** Banda de conversión antes del footer: malla verde, hoja como marca de agua, CTA a la derecha. */
export function CtaBand({ eyebrow, title, lead, actions, note, className }: CtaBandProps) {
  return (
    <div className={cx(styles.band, className)}>
      <LeafIcon className={styles.leaf} size={340} />
      <div className={styles.content}>
        {eyebrow && <Eyebrow inverse>{eyebrow}</Eyebrow>}
        <Heading level="h1" as="h2" tone="inverse">{title}</Heading>
        {lead && <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '48ch', lineHeight: 'var(--eco-leading-relaxed)' }}>{lead}</p>}
      </div>
      <div className={styles.actions}>
        {actions}
        {note && <span className={styles.note}>{note}</span>}
      </div>
    </div>
  )
}
