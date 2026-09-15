import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import styles from './Form.module.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cx(styles.control, styles.textarea, className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
})
