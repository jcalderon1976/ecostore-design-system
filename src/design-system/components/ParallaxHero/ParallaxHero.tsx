import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './ParallaxHero.module.css'

export interface ParallaxLayer {
  /** Contenido de la capa (imagen, SVG, texto). */
  node: ReactNode
  /**
   * Desplazamiento vertical al final del scroll del hero, en % de la altura del hero.
   * Valores altos = la capa "se queda atrás" (fondo). Valores bajos = se mueve con la página (frente).
   */
  y: number
  /** Posición y tamaño de la capa (CSS). Por defecto ocupa todo el hero. */
  style?: CSSProperties
  className?: string
  /** Índice de apilamiento. Por defecto el orden del array. */
  z?: number
}

export interface ParallaxHeroProps {
  layers: ParallaxLayer[]
  /** Contenido editorial (eyebrow, título, lead, CTAs). Se mueve como capa intermedia. */
  children?: ReactNode
  /** Desplazamiento del bloque de contenido. Por defecto 40. */
  contentY?: number
  /** Alto del hero. Por defecto el viewport menos la cabecera. */
  height?: string
  /** Degradado inferior hacia el fondo de la página. */
  fade?: boolean
  className?: string
}

/**
 * Hero con parallax por capas. El progreso de scroll (0 → 1 mientras el hero sale de pantalla)
 * se escribe en `--p` y cada capa se traslada `calc(var(--p) * y%)`. Sin librerías, con
 * requestAnimationFrame y respeto a prefers-reduced-motion.
 */
export function ParallaxHero({ layers, children, contentY = 40, height = 'calc(100vh - 84px)', fade = true, className }: ParallaxHeroProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { el.style.setProperty('--p', '0'); return }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const h = rect.height || 1
      // 0 cuando el hero está arriba del todo; 1 cuando ha salido por completo
      const p = Math.min(1, Math.max(0, -rect.top / h))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={ref} className={cx(styles.hero, className)} style={{ '--hero-h': height } as CSSProperties}>
      <div className={styles.viewport}>
        {layers.map((l, i) => (
          <div
            key={i}
            className={cx(styles.layer, l.className)}
            style={{ '--y': `${l.y}%`, zIndex: l.z ?? i + 1, ...l.style } as CSSProperties}
            aria-hidden="true"
          >
            {l.node}
          </div>
        ))}
        {children && (
          <div className={cx(styles.layer, styles.content)} style={{ '--y': `${contentY}%`, zIndex: layers.length + 1 } as CSSProperties}>
            <div className={styles.inner}>{children}</div>
          </div>
        )}
        {fade && <div className={styles.fade} aria-hidden="true" />}
      </div>
    </section>
  )
}
