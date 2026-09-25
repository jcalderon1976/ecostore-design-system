import type { CSSProperties, HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import { Heading, Text } from '../Typography/Typography'
import styles from './MarqueeLogoScroller.module.css'

export interface MarqueeLogo {
  src: string
  alt: string
  /** Tile oscuro para wordmarks sobre negro. */
  onDark?: boolean
  gradient?: {
    from: string
    via: string
    to: string
  }
}

export interface MarqueeLogoScrollerProps extends HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  logos: MarqueeLogo[]
  speed?: 'normal' | 'slow' | 'fast'
}

const DURATION = { slow: '80s', normal: '40s', fast: '18s' } as const

/**
 * Cinta infinita de logos. Adaptado de 21st.dev al DS (CSS Modules).
 * Se pausa al hover. Respetar prefers-reduced-motion.
 */
export function MarqueeLogoScroller({
  title,
  description,
  logos,
  speed = 'normal',
  className,
  ...props
}: MarqueeLogoScrollerProps) {
  const loop = [...logos, ...logos, ...logos, ...logos]

  return (
    <section
      aria-label={title}
      className={cx(styles.section, className)}
      {...props}
    >
      <div className={styles.header}>
        <Heading level="h2" tone="brand" className={styles.title}>
          {title}
        </Heading>
        {description && (
          <Text tone="muted" className={styles.lead}>
            {description}
          </Text>
        )}
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ '--marquee-duration': DURATION[speed] } as CSSProperties}
        >
          {loop.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className={cx(styles.tile, logo.onDark && styles.tileDark)}
              style={
                logo.gradient
                  ? {
                      '--from': logo.gradient.from,
                      '--via': logo.gradient.via,
                      '--to': logo.gradient.to,
                    } as CSSProperties
                  : undefined
              }
            >
              <span className={styles.wash} aria-hidden="true" />
              <img src={logo.src} alt={logo.alt} className={styles.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
