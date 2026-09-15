import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './Layout.module.css'

type SpaceKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32
const space = (k: SpaceKey) => `var(--eco-space-${k})`

/* ---------------- Container ---------------- */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean
  as?: ElementType
}
export function Container({ narrow, as: Tag = 'div', className, ...rest }: ContainerProps) {
  return <Tag className={cx(styles.container, narrow && styles.containerNarrow, className)} {...rest} />
}

/* ---------------- Section ---------------- */
export type SectionBackground = 'default' | 'subtle' | 'mint' | 'sky' | 'peach' | 'inverse'
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground
  size?: 'sm' | 'md' | 'lg'
  as?: ElementType
}
const bgClass: Record<SectionBackground, string> = {
  default: styles.bgDefault,
  subtle: styles.bgSubtle,
  mint: styles.bgMint,
  sky: styles.bgSky,
  peach: styles.bgPeach,
  inverse: styles.bgInverse,
}
export function Section({ background = 'default', size = 'md', as: Tag = 'section', className, ...rest }: SectionProps) {
  return (
    <Tag
      className={cx(
        styles.section,
        size === 'sm' && styles.sectionSm,
        size === 'lg' && styles.sectionLg,
        bgClass[background],
        className,
      )}
      {...rest}
    />
  )
}

/* ---------------- Stack / Row ---------------- */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: SpaceKey
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  as?: ElementType
  children?: ReactNode
}
export function Stack({ gap = 4, align, justify, as: Tag = 'div', className, style, ...rest }: StackProps) {
  return (
    <Tag
      className={cx(styles.stack, className)}
      style={{ gap: space(gap), alignItems: align, justifyContent: justify, ...style }}
      {...rest}
    />
  )
}
export function Row({ gap = 4, align = 'center', justify, as: Tag = 'div', className, style, ...rest }: StackProps) {
  return (
    <Tag
      className={cx(styles.row, className)}
      style={{ gap: space(gap), alignItems: align, justifyContent: justify, ...style }}
      {...rest}
    />
  )
}

/* ---------------- Grid ---------------- */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Ancho mínimo de columna; el grid se adapta automáticamente. */
  minColumn?: string
  /** Número fijo de columnas (ignora minColumn). */
  columns?: number
  gap?: SpaceKey
}
export function Grid({ minColumn = '240px', columns, gap = 6, className, style, ...rest }: GridProps) {
  const template = columns
    ? `repeat(${columns}, minmax(0, 1fr))`
    : `repeat(auto-fit, minmax(min(${minColumn}, 100%), 1fr))`
  return (
    <div
      className={cx(styles.grid, className)}
      style={{ gridTemplateColumns: template, gap: space(gap), ...style }}
      {...rest}
    />
  )
}
