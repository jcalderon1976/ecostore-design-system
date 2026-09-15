import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { CheckIcon } from '../../icons'
import styles from './Form.module.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={cx(styles.checkbox, className)}>
      <input ref={ref} type="checkbox" {...rest} />
      <span className={styles.checkboxBox} aria-hidden="true">
        <CheckIcon size={14} strokeWidth={3} />
      </span>
      <span>{label}</span>
    </label>
  )
})
