import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import { ChevronDownIcon } from '../../icons'
import styles from './Form.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  invalid?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder, invalid, className, ...rest },
  ref,
) {
  return (
    <div className={styles.selectWrap}>
      <select
        ref={ref}
        className={cx(styles.control, styles.select, className)}
        aria-invalid={invalid || undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon size={18} className={styles.selectChevron} />
    </div>
  )
})
