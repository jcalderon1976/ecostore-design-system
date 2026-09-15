import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './IconCircle.module.css'

export type IconCircleTone =
  | 'solid' | 'soft' | 'ring' | 'outline' | 'outlineInverse'
  | 'accent' | 'peach'
  | 'skySoft'
  | 'bubble' | 'bubbleGreen'
export type IconCircleSize = 'sm' | 'md' | 'lg' | 'xl'

export interface IconCircleProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: IconCircleTone
  size?: IconCircleSize
  children: ReactNode
}

/**
 * Contenedor circular para íconos. Usado en hero, tarjetas de contacto, footer, redes e ilustraciones.
 * Coloca `data-icon-hover` en un ancestro (ej. Card) para que el ícono pase a sólido en hover.
 */
export function IconCircle({ tone = 'soft', size = 'md', className, children, ...rest }: IconCircleProps) {
  return (
    <span className={cx(styles.circle, styles[tone], styles[size], className)} {...rest}>
      {children}
    </span>
  )
}
