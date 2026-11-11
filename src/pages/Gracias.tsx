import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Navbar,
  Footer,
  Section,
  Container,
  Heading,
  Lead,
  Text,
  Button,
  IconCircle,
  LeafIcon,
} from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { SEO } from './seo'
import { SeoHead } from './SeoHead'
import styles from './Gracias.module.css'

const WAIT_MS = 5000
const WAIT_REDUCED_MS = 2000
const EXIT_MS = 280

/** Confirmación tras FormSubmit; vuelve sola al inicio. */
export function Gracias() {
  const reduce = useReducedMotion() === true
  const [leaving, setLeaving] = useState(false)
  const gone = useRef(false)
  const timer = useRef(0)

  const goHome = () => {
    if (gone.current) return
    gone.current = true
    window.clearTimeout(timer.current)
    setLeaving(true)
    window.setTimeout(() => {
      window.location.assign(ROUTES.inicio)
    }, reduce ? 0 : EXIT_MS)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
    timer.current = window.setTimeout(goHome, reduce ? WAIT_REDUCED_MS : WAIT_MS)
    return () => window.clearTimeout(timer.current)
  }, [reduce])

  const waitS = (reduce ? WAIT_REDUCED_MS : WAIT_MS) / 1000

  return (
    <>
      <SeoHead {...SEO.gracias} />
      <Navbar
        items={NAV('inicio')}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
      <Section size="sm">
        <Container narrow className={styles.stage}>
          <motion.div
            className={styles.panel}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={leaving ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : leaving ? 0.28 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <IconCircle tone="solid" size="lg">
              <LeafIcon size={28} />
            </IconCircle>
            <Heading level="h1" align="center">
              Recibimos tu solicitud
            </Heading>
            <Lead className={styles.lead} role="status">
              Gracias. Uno de nuestros especialistas te contactará pronto. Si
              necesitas hablar ahora, llámanos al{' '}
              <a className={styles.phone} href={SITE.phoneHref}>{SITE.phone}</a>.
            </Lead>
            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Volviendo al inicio"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext="En curso"
            >
              <motion.span
                className={styles.progressFill}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: leaving ? 0.2 : waitS, ease: leaving ? 'easeOut' : 'linear' }}
              />
            </div>
            <Text size="sm" tone="muted" className={styles.hint}>
              Te llevamos al inicio
            </Text>
            <Button
              href={ROUTES.inicio}
              arrow
              onClick={(e) => {
                e.preventDefault()
                goHome()
              }}
            >
              Volver al inicio
            </Button>
          </motion.div>
        </Container>
      </Section>
      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
