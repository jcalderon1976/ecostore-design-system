import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './Form.module.css'

export interface FormFieldProps {
  /** Etiqueta visible. Si se omite, pasa `aria-label` al control. */
  label?: ReactNode
  /** Texto de ayuda bajo el control. */
  hint?: ReactNode
  /** Mensaje de error. Activa `invalid` en el control. */
  error?: ReactNode
  required?: boolean
  className?: string
  children: ReactElement
}

/**
 * Envuelve Input/Select/Textarea y conecta label, hint y error
 * con `id`, `aria-describedby` e `invalid` automáticamente.
 */
export function FormField({ label, hint, error, required, className, children }: FormFieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        required,
        invalid: Boolean(error),
        'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
      })
    : children

  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      {control}
      {hint && !error && <p id={hintId} className={styles.hint}>{hint}</p>}
      {error && <p id={errorId} className={styles.error} role="alert">{error}</p>}
    </div>
  )
}

export interface InlineGroupProps {
  label: ReactNode
  children: ReactNode
  className?: string
}

/** Grupo horizontal etiquetado, ej. "Me interesa: [x] Energía [ ] Agua". */
export function InlineGroup({ label, children, className }: InlineGroupProps) {
  return (
    <fieldset className={cx(styles.inlineGroup, className)} style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className={styles.inlineGroupLabel} style={{ float: 'left', marginRight: 'var(--eco-space-2)' }}>
        {label}
      </legend>
      {children}
    </fieldset>
  )
}
