import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons'
import styles from './FigurineCarousel.module.css'

export interface FigurineItem {
  /** Recorte con transparencia (WebP/PNG). */
  src: string
  alt: string
  /** Nombre del producto (texto inferior izquierdo). */
  name: string
  /** Una o dos líneas de descripción. */
  description?: string
  /** Color de fondo de marca para este ítem (token o hex). */
  bg: string
  /** Fotografía sin transparencia: se muestra como tarjeta redondeada a sangre en vez de recorte. */
  photo?: boolean
}

export interface FigurineCarouselProps {
  items: FigurineItem[]
  /** Texto fantasma gigante detrás de los productos ("ENERGÍA"). */
  ghost: string
  /** Etiqueta superior izquierda ("EcoStore · Productos"). */
  label?: ReactNode
  /** Enlace inferior derecho. */
  linkLabel?: string
  linkHref?: string
  /** Alto del hero. Por defecto ocupa el viewport menos la cabecera. */
  height?: string
  /** Índice inicial. */
  initialIndex?: number
  className?: string
}

const DURATION = 650

/**
 * Hero-carrusel de productos "figurine": el ítem activo grande al centro,
 * vecinos a los lados desenfocados y uno al fondo. Fondo, posición, escala,
 * desenfoque y opacidad se animan a la vez en 650 ms.
 */
export function FigurineCarousel({
  items, ghost, label, linkLabel = 'Ver catálogo', linkHref = '#catalogo',
  height = 'calc(100vh - 84px)', initialIndex = 0, className,
}: FigurineCarouselProps) {
  const n = items.length
  const [active, setActive] = useState(initialIndex % n)
  const [isMobile, setIsMobile] = useState(false)
  const lock = useRef(false)

  // Precarga de imágenes y detección de móvil
  useEffect(() => {
    items.forEach((it) => { const im = new Image(); im.src = it.src })
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [items])

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (lock.current) return
    lock.current = true
    setActive((prev) => (dir === 'next' ? (prev + 1) % n : (prev + n - 1) % n))
    window.setTimeout(() => { lock.current = false }, DURATION)
  }, [n])

  // Teclado: flechas izquierda/derecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const current = items[active]

  /** Rol de cada ítem según su distancia al activo. */
  const roleOf = (i: number): 'center' | 'right' | 'left' | 'back' | 'hidden' => {
    const d = (i - active + n) % n
    if (d === 0) return 'center'
    if (d === 1) return 'right'
    if (d === n - 1) return 'left'
    if (d === 2 || (n <= 3 && d === n - 2)) return 'back'
    return 'hidden'
  }

  return (
    <section
      className={cx(styles.hero, isMobile && styles.mobile, className)}
      style={{ '--fc-bg': current.bg, '--fc-height': height, '--fc-duration': `${DURATION}ms` } as CSSProperties}
      aria-roledescription="carrusel"
      aria-label={label ? undefined : 'Productos destacados'}
    >
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.ghost} aria-hidden="true">{ghost}</div>

      {label && <div className={styles.label}>{label}</div>}

      <div className={styles.stage}>
        {items.map((it, i) => {
          const role = roleOf(i)
          return (
            <div
              key={it.src}
              className={cx(styles.item, styles[role], it.photo && styles.photo)}
              aria-hidden={role !== 'center'}
            >
              <img src={it.src} alt={role === 'center' ? it.alt : ''} draggable={false} decoding="async" />
            </div>
          )
        })}
      </div>

      <div className={styles.caption} aria-live="polite">
        <p className={styles.name} key={current.name}>{current.name}</p>
        {current.description && <p className={styles.desc}>{current.description}</p>}
        <div className={styles.nav}>
          <button type="button" className={styles.arrow} onClick={() => navigate('prev')} aria-label="Producto anterior">
            <ArrowLeftIcon size={26} strokeWidth={2.25} />
          </button>
          <button type="button" className={styles.arrow} onClick={() => navigate('next')} aria-label="Producto siguiente">
            <ArrowRightIcon size={26} strokeWidth={2.25} />
          </button>
          <span className={styles.counter}>{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        </div>
      </div>

      <a href={linkHref} className={styles.link}>
        {linkLabel}
        <ArrowRightIcon className={styles.linkIcon} strokeWidth={2.25} />
      </a>
    </section>
  )
}
