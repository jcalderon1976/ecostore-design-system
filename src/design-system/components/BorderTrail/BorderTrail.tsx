import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import { cx } from '../../utils/cx'
import styles from './BorderTrail.module.css'

export interface BorderTrailProps {
  /** Diámetro de la estela en px. */
  size?: number
  /** Radio del recorte; debe coincidir con el de la tarjeta. */
  radius?: number
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}

/**
 * Estela que recorre el borde. Usa offset-path (compositor) y se oculta
 * con prefers-reduced-motion.
 */
export function BorderTrail({
  size = 100,
  radius = 20,
  delay = 0,
  duration = 5,
  className,
  style,
}: BorderTrailProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div className={styles.mask} aria-hidden="true">
      <motion.div
        className={cx(styles.trail, className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${radius}px)`,
          ...style,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration, ease: 'linear', delay }}
      />
    </div>
  )
}
