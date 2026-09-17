import {
  Navbar,
  Footer,
  Hero,
  Em,
  Reveal,
  Checklist,
  TrustItem,
  TrustList,
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
  SectionHeader,
  CalendarIcon,
  HomeIcon,
  AwardIcon,
  SettingsIcon,
  FactoryIcon,
  BuildingIcon,
  LandmarkIcon,
  ShieldIcon,
  CheckCircleIcon,
} from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { SolutionsCatalog } from "./sections/SolutionsCatalog";
import styles from "./Auditoria.module.css";

const img = (name: string) => `${SITE.base}images/${name}`;

const HERO_CHECKS = [
  "Análisis detallado de tu consumo energético",
  "Identificación de oportunidades de ahorro",
  "Evaluación de sistemas y equipos",
  "Diagnóstico de eficiencia energética",
  "Recomendaciones personalizadas",
  "Análisis de costos y retorno de inversión",
  "Sostenibilidad (NetZero)",
  "Financiamiento",
  "LUMA Reembolso de Eficiencia Energética",
];

/**
 * Servicios · Auditoría Energética.
 * Estructura de la referencia (hero con checklist, catálogo Energía/Agua, CTA)
 * más la sección sobre cualificación ESCO y Energía como Servicio.
 */
export function Auditoria() {
  return (
    <>
      <Navbar
        items={NAV("servicios")}
        ctaHref={ROUTES.contacto}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      {/* ---------- HERO ---------- */}
      <Hero
        imageUrl={img("servicios-auditoria.jpg")}
        className={styles.hero}
        eyebrow="Servicios"
        title={
          <>
            Auditoría <Em tone="highlight">Energética</Em>
          </>
        }
      >
        <Stack gap={8} align="flex-start">
          <Checklist items={HERO_CHECKS} className={styles.heroChecks} />
          <Button
            size="lg"
            href={ROUTES.contacto}
            leadingIcon={<CalendarIcon size={20} />}
            arrow
          >
            Solicita una evaluación
          </Button>
        </Stack>
      </Hero>

      {/* ---------- ESCO + EaaS ---------- */}
      <Section background="subtle">
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Energía como servicio"
                title={
                  <>
                    Impulsando la eficiencia energética: soluciones integrales
                    de <Em tone="brand">EcoStore</Em>
                  </>
                }
                lead="EcoStore ofrece Energía como Servicio (EaaS) y cualificación ESCO, atendiendo a diversos sectores en Puerto Rico desde 2003. Nuestras cualificaciones, líderes en la industria, demuestran experiencia en soluciones energéticas sostenibles. Elige EcoStore por capacidades probadas y soluciones innovadoras de gestión energética."
              />
            </Reveal>

            <Grid columns={2} gap={6} className={styles.twoCols}>
              <Reveal>
                <Card padding="lg" className={styles.block}>
                  <Row gap={4}>
                    <IconCircle tone="soft" size="md">
                      <AwardIcon size={22} />
                    </IconCircle>
                    <Heading level="h3">Cualificación ESCO</Heading>
                  </Row>
                  <Checklist
                    items={[
                      "Como la primera Empresa de Servicios Energéticos (ESCO) de Puerto Rico, EcoStore posee cualificaciones y certificaciones líderes en la industria en gestión y Eficiencia Energética.",
                      "Desde 2003 atendemos clientes industriales, comerciales, gubernamentales y residenciales en la isla.",
                      "Nuestras cualificaciones ESCO avalan nuestra experiencia, confiabilidad y compromiso con la excelencia en servicios energéticos.",
                      "Al elegir a EcoStore como tu Empresa de Servicios Energéticos accedes a capacidades probadas, conocimiento de la industria y soluciones innovadoras para impulsar una gestión energética sostenible y alcanzar tus metas de energía y sostenibilidad.",
                    ]}
                  />
                </Card>
              </Reveal>
              <Reveal delay={80}>
                <Card padding="lg" className={styles.block}>
                  <Row gap={4}>
                    <IconCircle tone="soft" size="md">
                      <SettingsIcon size={22} />
                    </IconCircle>
                    <Heading level="h3">Energía como Servicio (EaaS)</Heading>
                  </Row>
                  <Checklist
                    items={[
                      "Como la primera ESCO de la isla, con décadas de experiencia en el dinámico mercado de Puerto Rico, ofrecemos soluciones EaaS integrales diseñadas para optimizar la eficiencia energética, reducir costos y mejorar la sostenibilidad.",
                      "En la división de Energía como Servicio de EcoStore redefinimos la manera de gestionar los negocios al externalizar sus necesidades energéticas.",
                      "Aportamos la ingeniería energética, financiamos el 100% del proyecto, la construcción y el mantenimiento continuo: una solución de negocio llave en mano.",
                    ]}
                  />
                </Card>
              </Reveal>
            </Grid>

            <Reveal delay={60}>
              <Card variant="mint" padding="lg">
                <div className={styles.sectors}>
                  <Stack gap={2}>
                    <Label>Sectores que atendemos desde 2003</Label>
                    <Heading level="h4" as="h3" tone="brand">
                      Auditorías energéticas para toda la isla
                    </Heading>
                    <Text size="sm">
                      Evaluación verde gratuita: analizamos tu consumo y te
                      presentamos opciones con números.
                    </Text>
                  </Stack>
                  <TrustList className={styles.sectorList}>
                    <TrustItem
                      light
                      layout="horizontal"
                      icon={<FactoryIcon size={20} />}
                      title="Industrial"
                    />
                    <TrustItem
                      light
                      layout="horizontal"
                      icon={<BuildingIcon size={20} />}
                      title="Comercial"
                    />
                    <TrustItem
                      light
                      layout="horizontal"
                      icon={<LandmarkIcon size={20} />}
                      title="Gubernamental"
                    />
                    <TrustItem
                      light
                      layout="horizontal"
                      icon={<HomeIcon size={20} />}
                      title="Residencial"
                    />
                  </TrustList>
                </div>
              </Card>
            </Reveal>
          </Stack>
        </Container>
      </Section>

      {/* ---------- SOLUCIONES PRINCIPALES ---------- */}
      <Section>
        <Container>
          <SolutionsCatalog heading={false} />
        </Container>
      </Section>

      {/* ---------- POR QUÉ UNA AUDITORÍA ---------- */}
      <Section background="inverse" size="sm">
        <Container>
          <Reveal>
            <div className={styles.why}>
              <Stack gap={3}>
                <Label inverse>Por qué empezar con una auditoría</Label>
                <Heading level="h2" tone="inverse">
                  Medimos antes de <Em tone="highlight">recomendar</Em>
                </Heading>
                <Text tone="inverseMuted">
                  Una auditoría convierte la factura en un plan: qué cambiar,
                  cuánto cuesta, cuánto ahorra y en cuánto tiempo se paga. Sin
                  medición, cualquier propuesta es una apuesta.
                </Text>
              </Stack>
              <ul className={styles.whyList}>
                <li>
                  <CheckCircleIcon size={18} /> Evaluación inicial gratuita y
                  sin compromiso
                </li>
                <li>
                  <CheckCircleIcon size={18} /> Orientación en el reembolso de
                  eficiencia energética de LUMA
                </li>
                <li>
                  <CheckCircleIcon size={18} /> Opciones de financiamiento,
                  incluido EaaS al 100%
                </li>
                <li>
                  <ShieldIcon size={18} /> Más de 20 años de experiencia en
                  Puerto Rico
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
