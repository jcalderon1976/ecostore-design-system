import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { ArrowRightIcon } from '../../icons'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'sky' | 'inverse' | 'glass'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonShape = 'pill' | 'rounded'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** `pill` (por defecto) para CTAs; `rounded` para acciones dentro de formularios o toolbars. */
  shape?: ButtonShape
  /** Ícono a la izquierda del texto. */
  leadingIcon?: ReactNode
  /** Ícono a la derecha del texto. */
  trailingIcon?: ReactNode
  /** Flecha a la derecha que se desplaza en hover. */
  arrow?: boolean
  /** Ocupa el 100% del ancho disponible. */
  fullWidth?: boolean
  /** Muestra spinner y deshabilita la interacción. */
  loading?: boolean
  className?: string
  children?: ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined }

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

/**
 * Botón principal del sistema. Renderiza `<a>` cuando recibe `href`.
 * Variante `primary` = CTA verde en píldora (ej. "Agenda una evaluación").
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', shape = 'pill', leadingIcon, trailingIcon, arrow, fullWidth, loading, className, children, ...rest },
    ref,
  ) {
    const classes = cx(
      styles.button,
      styles[variant],
      styles[size],
      shape === 'rounded' && styles.rounded,
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    )

    const content = (
      <>
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        <span className={styles.label}>{children}</span>
        {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
        {arrow && <span className={styles.arrow} aria-hidden="true"><ArrowRightIcon size={size === 'sm' ? 16 : 18} /></span>}
      </>
    )

    if ('href' in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as ButtonAsAnchor
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} aria-busy={loading || undefined} {...anchorRest}>
          {content}
        </a>
      )
    }

    const { disabled, type = 'button', ...buttonRest } = rest as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...buttonRest}
      >
        {content}
      </button>
    )
  },
)
