import {
  Navbar,
  Footer,
  Hero,
  Em,
  TrustItem,
  TrustList,
  Reveal,
  Section,
  Container,
  Grid,
  Stack,
  Row,
  Card,
  IconCircle,
  Heading,
  Text,
  Label,
  Button,
  SectionTitle,
  SunIcon,
  DropletIcon,
  CubeIsoIcon,
  LeafIcon,
  AwardSealIcon,
  CartIcon,
  HardHatIcon,
  CalendarIcon,
  SettingsIcon,
  BorderTrail,
} from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { EcoLoTiene } from "./sections/EcoLoTiene";
import styles from "./Nosotros.module.css";

const IMG = { equipo: `${SITE.base}images/nosotros.jpg` };

/**
 * Página "Nosotros".
 * Contenido: quiénes somos, 20+ años, All-in-One, servicios profesionales y ECO lo tiene.
 */
export function Nosotros() {
  return (
    <>
      <Navbar
        items={NAV("nosotros")}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      {/* ---------- HERO ---------- */}
      <Hero
        imageUrl={IMG.equipo}
        className={styles.hero}
        eyebrow="Quiénes somos"
        title={
          <>
            No te vendemos un producto. Diseñamos una solución{" "}
            <Em tone="highlight">a la medida.</Em>
          </>
        }
        lead="Más de 20 años de experiencia en ingeniería, Eficiencia Energética y agua. Analizamos tus necesidades y te ayudamos a identificar las tecnologías que realmente pueden generar ahorro y minimizar la inversión."
      >
        <Stack gap={6}>
          <TrustList className={styles.pillarsHero}>
            <TrustItem icon={<SunIcon size={22} />} title="Energía Solar" />
            <TrustItem
              icon={<DropletIcon size={22} />}
              title="Conservación de Agua"
            />
            <TrustItem
              icon={<SettingsIcon size={22} />}
              title="Soluciones Integradas"
            />
            <TrustItem
              icon={<LeafIcon size={22} />}
              title="Un Futuro Más Verde"
            />
          </TrustList>
          <Label inverse>Tu aliado en un hogar y negocio más eficiente</Label>
        </Stack>
      </Hero>

      {/* ---------- 20+ AÑOS · ALL-IN-ONE ---------- */}
      <Section size="sm" className={styles.pillars}>
        <Container>
          <Grid columns={2} gap={6} className={styles.pillarGrid}>
            <Reveal>
              <Card padding="lg" className={styles.pillar} data-icon-hover="">
                <BorderTrail delay={0} />
                <Row gap={5} align="center">
                  <IconCircle tone="soft" size="xl">
                    <AwardSealIcon size={56} />
                  </IconCircle>
                  <div>
                    <div className={styles.pillarNumber}>20+</div>
                    <Heading level="h3" tone="brand">
                      años de experiencia
                    </Heading>
                  </div>
                </Row>
                <span className={styles.pillarBar} aria-hidden="true" />
                <Text>
                  Más de 20 años impulsando proyectos de eficiencia energética y
                  conservación de agua en Puerto Rico.
                </Text>
              </Card>
            </Reveal>
            <Reveal delay={80}>
              <Card padding="lg" className={styles.pillar} data-icon-hover="">
                <BorderTrail delay={0.5} />
                <Row gap={5} align="center">
                  <IconCircle tone="soft" size="xl">
                    <CubeIsoIcon size={48} />
                  </IconCircle>
                  <Heading level="h2" as="h3" tone="brand">
                    All-in-One
                  </Heading>
                </Row>
                <span className={styles.pillarBar} aria-hidden="true" />
                <Text>
                  Evaluación, equipos, diseño, instalación y asesoría en un solo
                  lugar.
                </Text>
              </Card>
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* ---------- SERVICIOS PROFESIONALES ---------- */}
      <Section>
        <Container>
          <Reveal>
            <Card variant="mint" padding="lg" className={styles.services}>
              <Stack gap={10} align="center">
                <SectionTitle
                  title={
                    <>
                      Servicios <Em tone="brand">Profesionales</Em>
                    </>
                  }
                  level="h1"
                />
                <div className={styles.servicesGrid}>
                  <div className={styles.service}>
                    <IconCircle tone="bubbleGreen" size="xl">
                      <CartIcon size={34} />
                    </IconCircle>
                    <div>
                      <Heading level="h3">Productos</Heading>
                      <Text>
                        Equipos y tecnologías de alta eficiencia para energía y
                        agua.
                      </Text>
                    </div>
                  </div>
                  <div className={styles.service}>
                    <IconCircle tone="bubbleGreen" size="xl">
                      <HardHatIcon size={34} />
                    </IconCircle>
                    <div>
                      <Heading level="h3">Servicios de Ingeniería</Heading>
                      <Text>
                        Soluciones a la medida para maximizar el ahorro y la
                        sostenibilidad.
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  href="#contacto"
                  leadingIcon={<CalendarIcon size={20} />}
                  arrow
                >
                  Solicita una evaluación
                </Button>
              </Stack>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
