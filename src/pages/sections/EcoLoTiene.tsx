import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Logo, Reveal, ProductDropCard, type DropItem } from '@ds'
import { SITE } from '../site'
import { ENERGIA, AGUA } from './SolutionsCatalog'
import styles from './EcoLoTiene.module.css'

const img = (name: string) => `${SITE.base}images/${name}`

function toDrops(list: typeof ENERGIA, collection: string): DropItem[] {
  return list.flatMap((s) =>
    s.image
      ? [{
          time: collection,
          name: s.title,
          collection: s.items.slice(0, 2).join(' · '),
          imageSrc: img(s.image),
          imageAlt: s.alt ?? s.title,
        }]
      : [],
  )
}

const WATER_TITLES = new Set(['Agua Caliente', 'Almacenamiento'])
const HIDDEN_AGUA = new Set(['Almacenamiento', 'Captación de Agua de Lluvia'])

const DROPS: DropItem[] = [
  ...toDrops(ENERGIA.filter((s) => !WATER_TITLES.has(s.title)), 'Energía'),
  ...toDrops(ENERGIA.filter((s) => s.title === 'Agua Caliente'), 'Agua'),
  ...toDrops(AGUA.filter((s) => !HIDDEN_AGUA.has(s.title)), 'Agua'),
]

const WORDS = [
  { text: 'ECO', tone: 'eco' as const },
  { text: 'lo', tone: 'lo' as const },
  { text: 'tiene', tone: 'lo' as const },
]

const START_OPACITY = 0.16
const SPREAD = 0.72
const WORD_DURATION = 0.28

function wordRange(index: number, count: number) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD
  return { start, end: Math.min(1, start + WORD_DURATION) }
}

function Word({
  text,
  tone,
  progress,
  index,
  count,
  reducedMotion,
}: {
  text: string
  tone: 'eco' | 'lo'
  progress: MotionValue<number>
  index: number
  count: number
  reducedMotion: boolean
}) {
  const { start, end } = wordRange(index, count)
  const opacity = useTransform(progress, (latest) => {
    if (latest <= start) return START_OPACITY
    if (latest >= end) return 1
    return START_OPACITY + (1 - START_OPACITY) * ((latest - start) / (end - start))
  })
  const y = useTransform(progress, [start, end], [18, 0])

  return (
    <motion.span
      className={tone === 'eco' ? styles.eco : styles.lo}
      aria-hidden="true"
      style={reducedMotion ? undefined : { opacity, y }}
    >
      {text}
    </motion.span>
  )
}

/** Infográfico "ECO lo tiene": logo, título y carrusel. Reutilizado en Contáctanos y Nosotros. */
export function EcoLoTiene({ hideBrand = false }: { hideBrand?: boolean }) {
  const reduce = useReducedMotion()
  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start 0.92', 'start 0.4'],
  })

  return (
    <section
      className={styles.section}
      id="eco-lo-tiene"
      aria-labelledby={hideBrand ? undefined : 'eco-lo-tiene-title'}
      aria-label={hideBrand ? 'Nuestros productos' : undefined}
    >
      <div className={styles.wrap}>
        {!hideBrand && (
          <div ref={headerRef} className={styles.header}>
            <div className={styles.brand}>
              <Logo src={img('logo-eco-store-full.png')} className={styles.logo} />
            </div>
            <h2 id="eco-lo-tiene-title" className={styles.title} aria-label="ECO lo tiene">
              {WORDS.map((word, index) => (
                <span key={`${word.text}-${index}`}>
                  <Word
                    text={word.text}
                    tone={word.tone}
                    progress={scrollYProgress}
                    index={index}
                    count={WORDS.length}
                    reducedMotion={Boolean(reduce)}
                  />
                  {index < WORDS.length - 1 ? ' ' : null}
                </span>
              ))}
            </h2>
          </div>
        )}
        <Reveal>
          <ProductDropCard
            title="Nuestros productos"
            subtitle="Eficiencia Energética y conservación de agua"
            items={DROPS}
          />
        </Reveal>
      </div>
    </section>
  )
}
