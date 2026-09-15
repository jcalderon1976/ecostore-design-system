import { forwardRef, type InputHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import styles from './Form.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Marca el campo como inválido (borde rojo + aria-invalid). */
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cx(styles.control, className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
})
