import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons'
import { Button } from '../Button/Button'
import { YouTubePlayer, preconnectYouTube } from '../YouTubePlayer/YouTubePlayer'
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
  /** Enlace de ficha o búsqueda. Si existe, el nombre y la figura central son clicables. */
  href?: string
  /** ID o URL de YouTube. Si existe, se muestra un reproductor compacto en este ítem. */
  videoId?: string
  videoTitle?: string
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
  /** Alto del hero: el hueco bajo el navbar, sin desbordar el viewport. */
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
  items, ghost, label, linkLabel = 'Agenda una evaluación', linkHref = '#catalogo',
  height = 'calc(100dvh - var(--eco-nav-h) - 1px)', initialIndex = 0, className,
}: FigurineCarouselProps) {
  const n = items.length
  const [active, setActive] = useState(initialIndex % n)
  const [isMobile, setIsMobile] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const lock = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoOpenRef = useRef(videoOpen)
  videoOpenRef.current = videoOpen

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const warm = (i: number) => {
      const it = items[(i + n) % n]
      if (!it) return
      const im = new Image()
      im.src = it.src
    }
    warm(active)
    warm(active + 1)
    warm(active - 1)
    if (items[active]?.videoId) preconnectYouTube()
  }, [active, items, n])

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (lock.current || videoOpen) return
    lock.current = true
    setVideoOpen(false)
    setActive((prev) => (dir === 'next' ? (prev + 1) % n : (prev + n - 1) % n))
    window.setTimeout(() => { lock.current = false }, DURATION)
  }, [n, videoOpen])

  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  // Teclado: flechas izquierda/derecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    let pointerId = -1
    let startX = 0
    let startY = 0
    let lastX = 0
    let axis: 'x' | 'y' | null = null
    let dragging = false
    let didDrag = false

    const setDrag = (px: number) => {
      el.style.setProperty('--fc-drag', `${px}px`)
    }

    const clearDrag = () => {
      setDrag(0)
      el.removeAttribute('data-dragging')
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || videoOpenRef.current || lock.current) return
      pointerId = e.pointerId
      startX = e.clientX
      startY = e.clientY
      lastX = e.clientX
      axis = null
      dragging = true
      didDrag = false
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        if (axis === 'y') {
          dragging = false
          return
        }
        el.setPointerCapture(e.pointerId)
        el.dataset.dragging = ''
        didDrag = true
        if (e.cancelable) e.preventDefault()
      }
      if (axis === 'x') {
        if (e.cancelable) e.preventDefault()
        lastX = e.clientX
        setDrag(dx)
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return
      dragging = false
      if (axis === 'x') {
        const dx = lastX - startX
        const threshold = Math.min(88, Math.max(40, el.getBoundingClientRect().width * 0.12))
        if (dx <= -threshold) navigateRef.current('next')
        else if (dx >= threshold) navigateRef.current('prev')
      }
      clearDrag()
      axis = null
      pointerId = -1
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
    }

    const onClickCapture = (e: MouseEvent) => {
      if (!didDrag) return
      e.preventDefault()
      e.stopPropagation()
      didDrag = false
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove, { passive: false })
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    el.addEventListener('click', onClickCapture, true)
    return () => {
      clearDrag()
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [])

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

      <div ref={stageRef} className={styles.stage}>
        {items.map((it, i) => {
          const role = roleOf(i)
          const img = (
            <img src={it.src} alt={role === 'center' ? it.alt : ''} draggable={false} decoding="async" />
          )
          return (
            <div
              key={it.src}
              className={cx(styles.item, styles[role])}
              aria-hidden={role !== 'center'}
            >
              {it.href && role === 'center' ? (
                <a
                  href={it.href}
                  className={styles.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver ${it.name}`}
                >
                  {img}
                </a>
              ) : img}
            </div>
          )
        })}
      </div>

      <div className={styles.caption} aria-live="polite">
        {current.href ? (
          <a
            href={current.href}
            className={styles.name}
            target="_blank"
            rel="noopener noreferrer"
            key={current.name}
          >
            {current.name}
          </a>
        ) : (
          <p className={styles.name} key={current.name}>{current.name}</p>
        )}
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

      {current.videoId && (
        <div className={styles.videoDock}>
          <YouTubePlayer
            key={current.videoId}
            videoId={current.videoId}
            title={current.videoTitle ?? current.name}
            compact={isMobile}
            onExpandedChange={setVideoOpen}
          />
        </div>
      )}

      <div className={styles.link}>
        <Button href={linkHref} variant="inverse" size={isMobile ? 'sm' : 'lg'} arrow>
          {isMobile ? 'Agendar' : linkLabel}
        </Button>
      </div>
    </section>
  )
}
