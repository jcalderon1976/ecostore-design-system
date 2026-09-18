import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cx } from '../../utils/cx'
import styles from './HoverExpand.module.css'

export interface HoverExpandItem {
  src: string
  alt: string
  title: string
  /** Línea pequeña (categoría). */
  code?: string
  caption?: string
  /** `cover` para fotografías; `contain` para recortes de producto. */
  fit?: 'contain' | 'cover'
}

export interface HoverExpandProps {
  items: HoverExpandItem[]
  /** Índice abierto al entrar. */
  initial?: number
  className?: string
}

/**
 * Carrusel de tiras que se ensanchan al hover/foco.
 * Adaptado de HoverExpand (21st.dev) a tokens EcoStore y motion/react.
 */
export function HoverExpand({ items, initial = 0, className }: HoverExpandProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(initial)
  const compact = items.length <= 4
  const expanded = compact ? 2.3 : 4.6
  const collapsed = compact ? 1 : 0.65

  return (
    <div className={cx(styles.row, className)}>
      {items.map((item, index) => {
        const isActive = active === index
        return (
          <motion.button
            key={item.src + item.title}
            type="button"
            className={styles.item}
            aria-pressed={isActive}
            aria-label={item.title}
            initial={false}
            animate={{ flexGrow: reduce ? 1 : isActive ? expanded : collapsed }}
            transition={reduce ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setActive(index)}
            onHoverStart={() => { if (!reduce) setActive(index) }}
            onFocus={() => setActive(index)}
          >
            <img
              src={item.src}
              alt=""
              className={cx(styles.img, item.fit === 'cover' && styles.imgCover)}
            />
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className={styles.overlay}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                >
                  {item.code && <p className={styles.code}>{item.code}</p>}
                  <p className={styles.name}>{item.title}</p>
                  {item.caption && <p className={styles.caption}>{item.caption}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
