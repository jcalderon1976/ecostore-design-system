import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Retardo en ms. Úsalo con índice * 60 para escalonar tarjetas. */
  delay?: number
  /** Solo anima la primera vez que entra en viewport. */
  once?: boolean
  as?: ElementType
}

/**
 * Entrada suave (fade + 14px) cuando el elemento entra en el viewport.
 * Respeta prefers-reduced-motion. Sin dependencias.
 */
export function Reveal({ delay = 0, once = true, as: Tag = 'div', className, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setVisible(true); if (once) io.unobserve(el) }
          else if (!once) setVisible(false)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      className={cx('eco-reveal', className)}
      data-visible={visible}
      style={{ '--eco-reveal-delay': `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    />
  )
}
