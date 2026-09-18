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
    if (!el) return

    let side: 'left' | 'right' | null = null
    let timer = 0

    const step = () => {
      setIndex((prev) => {
        if (loopingRef.current) return prev + (side === 'left' ? -1 : 1)
        const max = Math.max(0, n - visibleCount())
        if (side === 'left' && prev <= 0) return prev
        if (side === 'right' && prev >= max) return prev
        return side === 'left' ? prev - 1 : prev + 1
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
      step()
      timer = window.setInterval(step, 700)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const edge = Math.max(72, Math.min(128, r.width * 0.16))
      if (x <= edge) start('left')
      else if (x >= r.width - edge) start('right')
      else stop()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', stop)
    return () => {
      stop()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', stop)
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
          className={styles.track}
          data-instant={instant || undefined}
          style={{
            '--drop-index': index,
            '--drop-visible': visible,
          } as CSSProperties}
        >
          {loopItems.map((item, i) => (
            <article key={`${item.name}-${item.imageSrc}-${i}`} className={styles.slide} tabIndex={0}>
              <p className={styles.time}>{item.time}</p>
              <div className={styles.media}>
                <img src={item.imageSrc} alt={item.imageAlt ?? item.name} className={styles.img} />
              </div>
              <h4 className={styles.name}>{item.name}</h4>
              <p className={styles.collection}>{item.collection}</p>
            </article>
          ))}
        </div>
      </div>
    </Card>
  )
}
