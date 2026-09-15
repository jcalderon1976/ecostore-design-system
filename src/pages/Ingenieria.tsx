import {
  Navbar, Footer, Hero, Em, Reveal, Checklist, TrustItem, TrustList,
  Section, Container, Grid, Stack, Row, Card, IconCircle,
  Heading, Text, Label, Button, SectionHeader, Steps, CtaBand,
  CalendarIcon, HardHatIcon, SettingsIcon, ZapIcon, BuildingIcon, HomeIcon, LeafIcon, ShieldIcon, CheckCircleIcon,
} from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { SolutionsCatalog } from './sections/SolutionsCatalog'
import styles from './Ingenieria.module.css'

const HERO_CHECKS = [
  'Auditorías de Eficiencia Energética y Conservación de Agua',
  'Diseño de edificios "Green Building"',
  'Permisología',
  'Construcción',
  'Mantenimiento',
  'Proyectos residenciales y comerciales',
]

/**
 * Servicios · Servicios de ingeniería.
 * Estructura de la referencia (hero con checklist, catálogo Energía/Agua, CTA)
 * más disciplinas de ingeniería y proceso llave en mano.
 */
export function Ingenieria() {
  return (
    <>
      <Navbar items={NAV('ingenieria')} ctaHref={ROUTES.contacto} phone={SITE.phone} phoneHref={SITE.phoneHref} />

      {/* ---------- HERO ---------- */}
      <Hero
        imageUrl={`${SITE.base}images/servicios-ingenieria.jpg`}
        className={styles.hero}
        eyebrow="Servicios"
        title={<>Servicios de <Em tone="highlight">ingeniería</Em></>}
      >
        <Stack gap={8} align="flex-start">
          <Checklist items={HERO_CHECKS} className={styles.heroChecks} />
          <Button size="lg" href={ROUTES.contacto} leadingIcon={<CalendarIcon size={20} />} arrow>Solicita una evaluación</Button>
        </Stack>
      </Hero>

      {/* ---------- DISCIPLINAS ---------- */}
      <Section background="subtle">
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Ingeniería"
                title={<>Un solo equipo para todo el <Em tone="brand">proyecto</Em></>}
                lead="Nuestro equipo de profesionales experimentados nos convierte en la solución integral para proyectos de ingeniería civil, mecánica y eléctrica, y para todo tipo de proyectos de conservación de energía y agua. Desde la auditoría hasta el mantenimiento, sin intermediarios."
              />
            </Reveal>

            <Grid minColumn="260px" gap={6}>
              <Reveal delay={0}>
                <Card padding="lg" className={styles.discipline}>
                  <IconCircle tone="soft" size="lg"><BuildingIcon size={28} /></IconCircle>
                  <Heading level="h3">Ingeniería civil</Heading>
                  <Text size="sm">Diseño estructural y de sitio, edificios "Green Building", permisología y dirección de obra para proyectos residenciales y comerciales.</Text>
                </Card>
              </Reveal>
              <Reveal delay={60}>
                <Card padding="lg" className={styles.discipline}>
                  <IconCircle tone="soft" size="lg"><SettingsIcon size={28} /></IconCircle>
                  <Heading level="h3">Ingeniería mecánica</Heading>
                  <Text size="sm">Climatización eficiente, agua caliente, bombeo, cisternas y sistemas de captación y tratamiento de agua dimensionados para tu consumo real.</Text>
                </Card>
              </Reveal>
              <Reveal delay={120}>
                <Card padding="lg" className={styles.discipline}>
                  <IconCircle tone="soft" size="lg"><ZapIcon size={28} /></IconCircle>
                  <Heading level="h3">Ingeniería eléctrica</Heading>
                  <Text size="sm">Sistemas solares, baterías e inversores, iluminación LED, controles inteligentes e interconexión con la red.</Text>
                </Card>
              </Reveal>
            </Grid>

            <Reveal delay={60}>
              <Card variant="mint" padding="lg">
                <div className={styles.scope}>
                  <Stack gap={2}>
                    <Label>Alcance</Label>
                    <Heading level="h4" as="h3" tone="brand">Proyectos residenciales y comerciales en toda la isla</Heading>
                    <Text size="sm">Hogares, comercios, industria y sector gubernamental. Cada proyecto con presupuesto cerrado y un solo responsable.</Text>
                  </Stack>
                  <TrustList className={styles.scopeList}>
                    <TrustItem light layout="horizontal" icon={<HomeIcon size={20} />} title="Residencial" description="Casas y multifamiliares" />
                    <TrustItem light layout="horizontal" icon={<BuildingIcon size={20} />} title="Comercial" description="Oficinas, retail e industria" />
                  </TrustList>
                </div>
              </Card>
            </Reveal>
          </Stack>
        </Container>
      </Section>

      {/* ---------- PROCESO ---------- */}
      <Section>
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Cómo trabajamos"
                title={<>Llave en mano, de la auditoría al <Em tone="brand">mantenimiento</Em></>}
                lead="Un proceso en cinco pasos con un solo interlocutor. Aportamos la ingeniería, la construcción y el mantenimiento continuo, con opción de financiar el 100% del proyecto."
              />
            </Reveal>
            <Reveal delay={80}>
              <Steps
                steps={[
                  { duration: 'Semana 1', title: 'Auditoría', description: 'Medimos consumo de energía y agua, revisamos sistemas y equipos y calculamos el retorno de cada mejora.' },
                  { duration: 'Semanas 2–4', title: 'Diseño', description: 'Ingeniería civil, mecánica y eléctrica con criterios Green Building. Planos, especificaciones y presupuesto cerrado.' },
                  { duration: 'Según proyecto', title: 'Permisología', description: 'Gestionamos permisos, endosos e interconexión con la utilidad para que no tengas que hacerlo tú.' },
                  { duration: 'Según proyecto', title: 'Construcción', description: 'Instaladores certificados y supervisión de obra. Un solo responsable de principio a fin.' },
                  { duration: 'Continuo', title: 'Mantenimiento', description: 'Monitoreo, mantenimiento preventivo y soporte para que el ahorro se mantenga año tras año.' },
                ]}
              />
            </Reveal>
          </Stack>
        </Container>
      </Section>

      {/* ---------- CATÁLOGO ---------- */}
      <Section background="subtle">
        <Container>
          <SolutionsCatalog />
        </Container>
      </Section>

      {/* ---------- GARANTÍAS + CTA ---------- */}
      <Section size="sm">
        <Container>
          <Stack gap={8}>
            <Reveal>
              <Row gap={4} justify="center" className={styles.guarantees}>
                <span><CheckCircleIcon size={18} /> Evaluación inicial gratuita</span>
                <span><ShieldIcon size={18} /> Más de 20 años en Puerto Rico</span>
                <span><LeafIcon size={18} /> Criterios Green Building</span>
                <span><HardHatIcon size={18} /> Instaladores certificados</span>
              </Row>
            </Reveal>
            <Reveal delay={60}>
              <CtaBand
                eyebrow="Empieza hoy"
                title={<>¿Tienes un proyecto? Hablemos de <Em tone="highlight">ingeniería</Em></>}
                lead="Cuéntanos qué quieres construir o mejorar. Te devolvemos una propuesta con números en una semana."
                actions={<Button size="lg" variant="inverse" href={ROUTES.contacto} arrow>Solicita una evaluación</Button>}
                note="Sin compromiso · Respuesta en 24 h"
              />
            </Reveal>
          </Stack>
        </Container>
      </Section>

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
