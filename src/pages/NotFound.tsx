import { useEffect } from 'react'
import {
  Navbar,
  Footer,
  Section,
  Container,
  Stack,
  Heading,
  Lead,
  Button,
} from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import styles from './Legal.module.css'

/** Hash desconocido: no reutiliza el inicio. */
export function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Navbar
        items={NAV('inicio')}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
      <Section size="sm">
        <Container narrow className={styles.notFound}>
          <Stack gap={6}>
            <Heading level="h1">Esta página no existe</Heading>
            <Lead>
              El enlace no corresponde a ninguna sección del sitio. Comprueba la dirección
              o vuelve al inicio.
            </Lead>
            <Stack gap={3} align="flex-start">
              <Button href={ROUTES.inicio} arrow>
                Ir al inicio
              </Button>
              <Button href={ROUTES.contacto} variant="outline">
                Contáctanos
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Section>
      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
