import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './Stat.module.css'

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || reduce || typeof IntersectionObserver === 'undefined') { setValue(target); return }
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(target * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [target, duration])
  return { ref, value }
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  /** Valor numérico; se anima con contador al entrar en viewport. */
  value: number
  /** Sufijo pegado al número: "+", "%", "h". */
  suffix?: string
  /** Prefijo: "$". */
  prefix?: string
  label: ReactNode
  inverse?: boolean
  /** Formato del número. Por defecto separador de miles es-PR. */
  format?: (n: number) => string
}

const defaultFormat = (n: number) => n.toLocaleString('es-PR')

/** Cifra grande con contador + etiqueta. Úsalo dentro de <StatBar>. */
export function Stat({ value, suffix, prefix, label, inverse, format = defaultFormat, className, ...rest }: StatProps) {
  const { ref, value: v } = useCountUp(value)
  return (
    <div className={cx(styles.stat, inverse && styles.inverse, className)} {...rest}>
      <span className={styles.value}>
        {prefix && <span className={styles.suffix}>{prefix}</span>}
        <span ref={ref}>{format(v)}</span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export interface StatBarProps extends HTMLAttributes<HTMLDivElement> {
  inverse?: boolean
}

/** Fila de stats separados por hairlines. 2 columnas en móvil. */
export function StatBar({ inverse, className, ...rest }: StatBarProps) {
  return <div className={cx(styles.bar, inverse && styles.barInverse, className)} {...rest} />
}
