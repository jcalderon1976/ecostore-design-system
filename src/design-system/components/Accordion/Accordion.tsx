import { useId, useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { PlusIcon } from '../../icons'
import styles from './Accordion.module.css'

export interface AccordionItem {
  question: ReactNode
  answer: ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  /** Índice abierto inicialmente. */
  defaultOpen?: number
  /** Permite varios abiertos a la vez. */
  multiple?: boolean
  className?: string
}

/** FAQ con hairlines, ícono "+" que rota a "×" y altura animada. */
export function Accordion({ items, defaultOpen = 0, multiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen >= 0 ? [defaultOpen] : []))
  const baseId = useId()

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : [])
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className={cx(styles.list, className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i)
        const panelId = `${baseId}-panel-${i}`
        const triggerId = `${baseId}-trigger-${i}`
        return (
          <div key={i} className={styles.item} data-open={isOpen}>
            <h3>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true"><PlusIcon size={16} /></span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
              <div className={styles.panelInner}>
                <div className={styles.body}>{item.answer}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
