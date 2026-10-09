import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { cx } from '../../utils/cx'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import styles from './ProductDropCard.module.css'

export interface DropItem {
  time: string
  name: string
  collection: string
  imageSrc: string
  imageAlt?: string
  href?: string
}

export interface ProductDropCardProps {
  title: string
  subtitle: string
  items: DropItem[]
  className?: string
}

function visibleCount() {
  if (typeof window === 'undefined') return 5
  if (window.matchMedia('(max-width: 539px)').matches) return 1
  if (window.matchMedia('(max-width: 759px)').matches) return 2
  if (window.matchMedia('(max-width: 999px)').matches) return 3
  return 5
}

/** Carrusel de productos tipo "drops": 5 tarjetas visibles en desktop, loop infinito. */
export function ProductDropCard({ title, subtitle, items, className }: ProductDropCardProps) {
  const n = items.length
  const [visible, setVisible] = useState(5)
  const looping = n > visible
  const lead = looping ? visible : 0
  const [index, setIndex] = useState(lead)
  const [instant, setInstant] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(index)
  const loopingRef = useRef(looping)
  indexRef.current = index
  loopingRef.current = looping

  const loopItems = looping
    ? [...items.slice(-visible), ...items, ...items.slice(0, visible)]
    : items

  useEffect(() => {
    const update = () => setVisible(visibleCount())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    setInstant(true)
    setIndex(n > visible ? visible : 0)
  }, [visible, n])

  useLayoutEffect(() => {
    if (!looping) return
    const realEnd = visible + n
    if (index > 0 && index < realEnd) return
    setInstant(true)
    setIndex((i) => (i <= 0 ? i + n : i - n))
  }, [index, looping, visible, n])

  useEffect(() => {
    if (!instant) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstant(false))
    })
    return () => cancelAnimationFrame(id)
  }, [instant])

  useEffect(() => {
    const el = viewportRef.current
    const track = trackRef.current
    if (!el || !track) return

    let side: 'left' | 'right' | null = null
    let timer = 0
    let pointerId = -1
    let startX = 0
    let startY = 0
    let lastX = 0
    let axis: 'x' | 'y' | null = null
    let dragging = false
    let didDrag = false

    const stepBy = (dir: -1 | 1) => {
      setIndex((prev) => {
        if (loopingRef.current) return prev + dir
        const max = Math.max(0, n - visibleCount())
        return Math.min(max, Math.max(0, prev + dir))
      })
    }

    const stop = () => {
      side = null
      el.removeAttribute('data-edge')
      if (timer) {
        window.clearInterval(timer)
        timer = 0
      }
    }

    const start = (next: 'left' | 'right') => {
      if (side === next) return
      side = next
      el.dataset.edge = next
      if (timer) window.clearInterval(timer)
      stepBy(next === 'left' ? -1 : 1)
      timer = window.setInterval(() => stepBy(next === 'left' ? -1 : 1), 700)
    }

    const setDrag = (px: number) => {
      track.style.setProperty('--drop-drag', `${px}px`)
    }

    const clearDrag = () => {
      setDrag(0)
      track.removeAttribute('data-dragging')
      el.removeAttribute('data-dragging')
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      pointerId = e.pointerId
      startX = e.clientX
      startY = e.clientY
      lastX = e.clientX
      axis = null
      dragging = true
      didDrag = false
      stop()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (dragging && e.pointerId === pointerId) {
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
          track.dataset.dragging = ''
          didDrag = true
          if (e.cancelable) e.preventDefault()
        }
        if (axis === 'x') {
          if (e.cancelable) e.preventDefault()
          lastX = e.clientX
          setDrag(dx)
          return
        }
      }

      if (dragging || e.pointerType === 'touch' || e.pointerType === 'pen') return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const edge = Math.max(72, Math.min(128, r.width * 0.16))
      if (x <= edge) start('left')
      else if (x >= r.width - edge) start('right')
      else stop()
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return
      dragging = false
      if (axis === 'x') {
        const dx = lastX - startX
        const width = el.getBoundingClientRect().width
        const threshold = Math.min(88, Math.max(40, width * 0.18))
        if (dx <= -threshold) stepBy(1)
        else if (dx >= threshold) stepBy(-1)
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

    const onPointerLeave = () => {
      if (!dragging) stop()
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
    el.addEventListener('pointerleave', onPointerLeave)
    el.addEventListener('click', onClickCapture, true)
    return () => {
      stop()
      clearDrag()
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('pointerleave', onPointerLeave)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [n])

  const move = (dir: -1 | 1) => {
    setIndex((prev) => {
      if (looping) return prev + dir
      const max = Math.max(0, n - visible)
      return Math.min(max, Math.max(0, prev + dir))
    })
  }

  return (
    <Card padding="md" className={cx(styles.wrap, className)}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.nav}>
          <Button
            variant="outline"
            size="sm"
            shape="rounded"
            className={styles.iconBtn}
            aria-label="Anterior"
            onClick={() => move(-1)}
          >
            <ArrowLeftIcon size={18} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            shape="rounded"
            className={styles.iconBtn}
            aria-label="Siguiente"
            onClick={() => move(1)}
          >
            <ArrowRightIcon size={18} />
          </Button>
        </div>
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          data-instant={instant || undefined}
          style={{
            '--drop-index': index,
            '--drop-visible': visible,
          } as CSSProperties}
        >
          {loopItems.map((item, i) => {
            const inner = (
              <>
                <p className={styles.time}>{item.time}</p>
                <div className={styles.media}>
                  <img src={item.imageSrc} alt={item.imageAlt ?? item.name} className={styles.img} draggable={false} />
                </div>
                <h4 className={styles.name}>{item.name}</h4>
                <p className={styles.collection}>{item.collection}</p>
              </>
            )
            return item.href ? (
              <a
                key={`${item.name}-${item.imageSrc}-${i}`}
                className={styles.slide}
                href={item.href}
                aria-label={`Ver ${item.name}`}
              >
                {inner}
              </a>
            ) : (
              <article key={`${item.name}-${item.imageSrc}-${i}`} className={styles.slide} tabIndex={0}>
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
