import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './Typography.module.css'

/* ---------------- Heading ---------------- */
export type HeadingLevel = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type HeadingTone = 'default' | 'brand' | 'inverse' | 'accent' | 'sky'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Escala visual. Independiente del elemento HTML. */
  level?: HeadingLevel
  /** Elemento HTML a renderizar. Por defecto se deriva de `level`. */
  as?: ElementType
  tone?: HeadingTone
  align?: 'left' | 'center'
  children?: ReactNode
}

const defaultTag: Record<HeadingLevel, ElementType> = {
  display: 'h1', h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5',
}
const toneClass: Record<HeadingTone, string> = {
  default: styles.toneDefault, brand: styles.toneBrand, inverse: styles.toneInverse, accent: styles.toneAccent, sky: styles.toneSky,
}

export function Heading({ level = 'h2', as, tone = 'default', align, className, ...rest }: HeadingProps) {
  const Tag = as ?? defaultTag[level]
  return (
    <Tag
      className={cx(styles.heading, styles[level], toneClass[tone], align === 'center' && styles.alignCenter, className)}
      {...rest}
    />
  )
}

/** Palabra o frase destacada dentro de un Heading. */
export function Highlight({ children, brand }: { children: ReactNode; brand?: boolean }) {
  return <span className={brand ? styles.highlightBrand : styles.highlight}>{children}</span>
}

export type EmTone = 'inherit' | 'highlight' | 'brand' | 'accent'
/**
 * Acento editorial: serif itálica (Instrument Serif) dentro de un título sans.
 * Una sola palabra o frase corta por título.
 */
export function Em({ children, tone = 'inherit', className }: { children: ReactNode; tone?: EmTone; className?: string }) {
  const toneCls = tone === 'highlight' ? styles.emHighlight : tone === 'brand' ? styles.emBrand : tone === 'accent' ? styles.emAccent : undefined
  return <em className={cx(styles.em, toneCls, className)}>{children}</em>
}

/** Párrafo de apertura bajo un título. */
export function Lead({ inverse, className, ...rest }: HTMLAttributes<HTMLParagraphElement> & { inverse?: boolean }) {
  return <p className={cx(styles.lead, inverse && styles.leadInverse, className)} {...rest} />
}

/** Etiqueta pequeña en mayúsculas (sin pill). Para nombrar secciones y columnas. */
export function Label({ inverse, as: Tag = 'span', className, ...rest }: HTMLAttributes<HTMLElement> & { inverse?: boolean; as?: ElementType }) {
  return <Tag className={cx(styles.label, inverse && styles.labelInverse, className)} {...rest} />
}

/* ---------------- Text ---------------- */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextTone = 'default' | 'strong' | 'muted' | 'inverse' | 'inverseMuted' | 'brand' | 'accent'
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  size?: TextSize
  tone?: TextTone
  weight?: TextWeight
  align?: 'left' | 'center'
  children?: ReactNode
}

const sizeClass: Record<TextSize, string> = {
  xs: styles.sizeXs, sm: styles.sizeSm, md: styles.sizeMd, lg: styles.sizeLg, xl: styles.sizeXl,
}
const textToneClass: Record<TextTone, string> = {
  default: styles.textDefault, strong: styles.textStrong, muted: styles.textMuted, inverse: styles.textInverse,
  inverseMuted: styles.textInverseMuted, brand: styles.textBrand, accent: styles.textAccent,
}
const weightClass: Record<TextWeight, string> = {
  regular: styles.wRegular, medium: styles.wMedium, semibold: styles.wSemibold, bold: styles.wBold,
}

export function Text({ as: Tag = 'p', size = 'md', tone = 'default', weight = 'regular', align, className, ...rest }: TextProps) {
  return (
    <Tag
      className={cx(styles.text, sizeClass[size], textToneClass[tone], weightClass[weight], align === 'center' && styles.alignCenter, className)}
      {...rest}
    />
  )
}

/* ---------------- Eyebrow ---------------- */
export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  inverse?: boolean
  /** Muestra la barra lima a la izquierda del texto. */
  bar?: boolean
  /** Sin fondo pill (solo texto + barra). */
  plain?: boolean
}
export function Eyebrow({ inverse, bar = true, plain, className, children, ...rest }: EyebrowProps) {
  return (
    <span className={cx(styles.eyebrow, inverse && styles.eyebrowInverse, plain && styles.eyebrowPlain, className)} {...rest}>
      {bar && <span className={styles.eyebrowBar} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  )
}

/* ---------------- Script ---------------- */
/** Texto manuscrito de acento, ej. "Un futuro más verde". */
export function Script({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx(styles.script, className)} {...rest} />
}
