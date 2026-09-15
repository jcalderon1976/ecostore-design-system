import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { IconCircle } from '../IconCircle/IconCircle'
import styles from './TrustItem.module.css'

export interface TrustItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Sobre fondo claro (ícono soft, texto oscuro). Por defecto: fondo oscuro con anillo lima. */
  light?: boolean
  layout?: 'vertical' | 'horizontal'
}

/** Ícono circular + título en negrita + descripción breve. Usado en el hero ("100% Gratis", etc.). */
export function TrustItem({ icon, title, description, light, layout = 'vertical', className, ...rest }: TrustItemProps) {
  return (
    <div className={cx(styles.item, light && styles.light, layout === 'horizontal' && styles.horizontal, className)} {...rest}>
      <IconCircle tone={light ? 'bubble' : 'ring'} size="md">{icon}</IconCircle>
      <div>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.desc}>{description}</div>}
      </div>
    </div>
  )
}

export function TrustList({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.list, className)} {...rest} />
}
