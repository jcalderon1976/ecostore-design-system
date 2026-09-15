import {
  Navbar, Footer, Hero, Em, TrustItem, TrustList, Reveal,
  Section, Container, Grid, Stack, Row, Card, IconCircle,
  Heading, Text, Label, Button, SectionHeader, SectionTitle, Stat, StatBar, CtaBand, Quote,
  SunIcon, DropletIcon, CubeIcon, LeafIcon, AwardIcon, CartIcon, HardHatIcon, CalendarIcon,
  SolarPanelIcon, SettingsIcon, BuildingIcon, ShieldIcon,
} from '@ds'
import { SITE, NAV, SOCIAL, FOOTER } from './site'
import styles from './Nosotros.module.css'

const IMG = { equipo: `${SITE.base}images/nosotros.jpg` }

/**
 * Página "Nosotros".
 * Contenido: referencia visual (quiénes somos, 20+ años, All-in-One, servicios profesionales)
 * más la historia de la empresa (Energy Service Company of Puerto Rico) traducida al español.
 */
export function Nosotros() {
  return (
    <>
      <Navbar items={NAV('nosotros')} ctaHref="#contacto" phone={SITE.phone} phoneHref={SITE.phoneHref} />

      {/* ---------- HERO ---------- */}
      <Hero
        imageUrl={IMG.equipo}
        className={styles.hero}
        eyebrow="Quiénes somos"
        title={<>No te vendemos un producto. Diseñamos una solución <Em tone="highlight">a la medida.</Em></>}
        lead="Más de 20 años de experiencia en ingeniería, conservación de energía y agua. Analizamos tus necesidades y te ayudamos a identificar las tecnologías que realmente pueden generar ahorro y minimizar la inversión."
      >
        <Stack gap={6}>
          <TrustList className={styles.pillarsHero}>
            <TrustItem icon={<SunIcon size={22} />} title="Energía Solar" />
            <TrustItem icon={<DropletIcon size={22} />} title="Conservación de Agua" />
            <TrustItem icon={<SettingsIcon size={22} />} title="Soluciones Integradas" />
            <TrustItem icon={<LeafIcon size={22} />} title="Un Futuro Más Verde" />
          </TrustList>
          <Label inverse>Tu aliado en un hogar y negocio más eficiente</Label>
        </Stack>
      </Hero>

      {/* ---------- 20+ AÑOS · ALL-IN-ONE ---------- */}
      <Section size="sm" className={styles.pillars}>
        <Container>
          <Grid columns={2} gap={6} className={styles.pillarGrid}>
            <Reveal>
              <Card padding="lg" className={styles.pillar}>
                <Row gap={5} align="center">
                  <IconCircle tone="soft" size="xl"><AwardIcon size={34} /></IconCircle>
                  <div>
                    <div className={styles.pillarNumber}>20+</div>
                    <Heading level="h3" tone="brand">años de experiencia</Heading>
                  </div>
                </Row>
                <span className={styles.pillarBar} aria-hidden="true" />
                <Text>Más de 20 años impulsando proyectos de eficiencia energética y conservación de agua en Puerto Rico.</Text>
              </Card>
            </Reveal>
            <Reveal delay={80}>
              <Card padding="lg" className={styles.pillar}>
                <Row gap={5} align="center">
                  <IconCircle tone="soft" size="xl"><CubeIcon size={34} /></IconCircle>
                  <Heading level="h2" as="h3" tone="brand">All-in-One</Heading>
                </Row>
                <span className={styles.pillarBar} aria-hidden="true" />
                <Text>Evaluación, equipos, diseño, instalación y asesoría en un solo lugar.</Text>
              </Card>
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* ---------- HISTORIA ---------- */}
      <Section background="subtle">
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Nuestra historia"
                title={<>Tu solución integral en ingeniería y <Em tone="brand">conservación de energía</Em></>}
                lead="Especialistas en soluciones sostenibles para una gestión energética rentable. EcoStore es la tienda de conservación de energía y agua de la primera Energy Service Company of Puerto Rico."
              />
            </Reveal>

            <Reveal delay={60}>
              <StatBar>
                <Stat value={2003} format={(n) => String(n)} label="año de fundación en San Juan, Puerto Rico" />
                <Stat value={1} prefix="#" format={(n) => String(n)} label="primera Empresa de Servicios Energéticos (ESCO) de la isla" />
                <Stat value={100} prefix="$" suffix="M+" label="ahorrados en facturas de servicios a clientes corporativos desde 2003" />
                <Stat value={3} label="disciplinas de ingeniería: civil, mecánica y eléctrica" />
              </StatBar>
            </Reveal>

            <Grid minColumn="260px" gap={6}>
              <Reveal delay={0}>
                <Card padding="lg" className={styles.story}>
                  <IconCircle tone="soft" size="md"><BuildingIcon size={22} /></IconCircle>
                  <Heading level="h4" as="h3">Fundada en 2003 en San Juan</Heading>
                  <Text size="sm">Somos la primera Empresa de Servicios Energéticos (ESCO) de Puerto Rico. Ofrecemos soluciones integrales de energía como servicio, con la meta de alcanzar cero emisiones netas en todos nuestros clientes mediante tecnologías costo-eficientes y energía renovable.</Text>
                </Card>
              </Reveal>
              <Reveal delay={60}>
                <Card padding="lg" className={styles.story}>
                  <IconCircle tone="soft" size="md"><HardHatIcon size={22} /></IconCircle>
                  <Heading level="h4" as="h3">Ingeniería en eficiencia energética</Heading>
                  <Text size="sm">Nuestro equipo de profesionales experimentados nos convierte en la solución integral para proyectos de ingeniería civil, mecánica y eléctrica, y para todo tipo de proyectos de conservación de energía.</Text>
                </Card>
              </Reveal>
              <Reveal delay={120}>
                <Card padding="lg" className={styles.story}>
                  <IconCircle tone="soft" size="md"><SolarPanelIcon size={22} /></IconCircle>
                  <Heading level="h4" as="h3">Conservación, eficiencia y energía renovable</Heading>
                  <Text size="sm">Nuestro compromiso es superar las necesidades de nuestros clientes con estrategias que mejoran su posición financiera al reducir significativamente los costos de energía y agua en sus negocios y hogares.</Text>
                </Card>
              </Reveal>
              <Reveal delay={180}>
                <Card padding="lg" className={styles.story}>
                  <IconCircle tone="soft" size="md"><ShieldIcon size={22} /></IconCircle>
                  <Heading level="h4" as="h3">Cientos de millones de dólares ahorrados</Heading>
                  <Text size="sm">Desde 2003 hemos ahorrado cientos de millones de dólares en facturas de servicios a clientes corporativos de diversas industrias. Hoy esa misma experiencia está disponible para clientes residenciales, vivan donde vivan.</Text>
                </Card>
              </Reveal>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ---------- SERVICIOS PROFESIONALES ---------- */}
      <Section>
        <Container>
          <Reveal>
            <Card variant="mint" padding="lg" className={styles.services}>
              <Stack gap={10} align="center">
                <SectionTitle title={<>Servicios <Em tone="brand">Profesionales</Em></>} level="h1" />
                <div className={styles.servicesGrid}>
                  <div className={styles.service}>
                    <IconCircle tone="bubbleGreen" size="xl"><CartIcon size={34} /></IconCircle>
                    <div>
                      <Heading level="h3">Productos</Heading>
                      <Text>Equipos y tecnologías de alta eficiencia para energía y agua.</Text>
                    </div>
                  </div>
                  <div className={styles.service}>
                    <IconCircle tone="bubbleGreen" size="xl"><HardHatIcon size={34} /></IconCircle>
                    <div>
                      <Heading level="h3">Servicios de Ingeniería</Heading>
                      <Text>Soluciones a la medida para maximizar el ahorro y la sostenibilidad.</Text>
                    </div>
                  </div>
                </div>
                <Button size="lg" href="#contacto" leadingIcon={<CalendarIcon size={20} />} arrow>Solicita una evaluación</Button>
              </Stack>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* ---------- COMPROMISO CON LA SOSTENIBILIDAD ---------- */}
      <Section background="inverse">
        <Container narrow>
          <Reveal>
            <Stack gap={6} align="center">
              <Label inverse>Compromiso con la sostenibilidad</Label>
              <Quote inverse name="EcoStore" role="Energy Service Company of Puerto Rico · desde 2003" initials="E" className={styles.quote}>
                La sostenibilidad es nuestro compromiso inquebrantable. A través de soluciones innovadoras impulsamos un futuro más verde y aseguramos la preservación del medio ambiente.
              </Quote>
            </Stack>
          </Reveal>
        </Container>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section size="sm">
        <Container>
          <Reveal>
            <CtaBand
              eyebrow="Empieza hoy"
              title={<>¿Listo para diseñar tu solución <Em tone="highlight">a la medida</Em>?</>}
              lead="Agenda una evaluación gratuita. Analizamos tu consumo y te decimos exactamente dónde puedes ahorrar."
              actions={<Button size="lg" variant="inverse" href="#contacto" arrow>Agenda tu evaluación</Button>}
              note="Sin compromiso · Respuesta en 24 h"
            />
          </Reveal>
        </Container>
      </Section>

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
