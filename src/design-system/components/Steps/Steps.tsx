import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './Steps.module.css'

export interface Step {
  title: ReactNode
  description: ReactNode
  /** Duración o momento ("24 h", "Día 1"). */
  duration?: string
  icon?: ReactNode
}

export interface StepsProps {
  steps: Step[]
  className?: string
}

/**
 * Proceso en pasos. Numerado porque el orden importa (es una secuencia real).
 * Cuatro columnas en escritorio, dos en tablet, una en móvil.
 */
export function Steps({ steps, className }: StepsProps) {
  return (
    <ol className={cx(styles.steps, className)} style={{ '--steps-count': steps.length } as CSSProperties}>
      {steps.map((s, i) => (
        <li key={i} className={styles.step}>
          <div className={styles.head}>
            <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
            {s.duration && <span className={styles.duration}>{s.duration}</span>}
          </div>
          {s.icon}
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.body}>{s.description}</p>
        </li>
      ))}
    </ol>
  )
}
