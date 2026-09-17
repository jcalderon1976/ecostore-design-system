import {
  Navbar,
  Footer,
  Em,
  Reveal,
  Eyebrow,
  Heading,
  Text,
  Button,
  Stack,
  Row,
  Grid,
  Section,
  Container,
  Card,
  IconCircle,
  ParallaxHero,
  Stat,
  StatBar,
  SectionHeader,
  TrustItem,
  TrustList,
  Quote,
  CtaBand,
  LeafIcon,
  ShieldIcon,
  ClockIcon,
  SunIcon,
  HardHatIcon,
  CartIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { SolutionsCatalog } from "./sections/SolutionsCatalog";
import styles from "./Inicio.module.css";

const img = (p: string) => `${SITE.base}images/${p}`;

/** Sol del logotipo, grande, como capa decorativa. */
function Sun() {
  return (
    <svg viewBox="0 0 400 400" className={styles.sun} aria-hidden="true">
      <defs>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFD500" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFD500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#sun-glow)" />
      <circle cx="200" cy="200" r="86" fill="#FFD500" />
      <g stroke="#FFD500" strokeWidth="18" strokeLinecap="round">
        <path d="M200 70v-40M200 330v40M70 200h-40M330 200h40" />
        <path d="M108 108l-28-28M292 292l28 28M108 292l-28 28M292 108l28-28" />
      </g>
    </svg>
  );
}

/** Página principal: hero con parallax, cifras, qué hacemos, catálogo, testimonio y CTA. */
export function Inicio() {
  return (
    <>
      <Navbar
        items={NAV("inicio")}
        ctaHref={ROUTES.contacto}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      {/* ---------- HERO PARALLAX ---------- */}
      <ParallaxHero
        contentY={40}
        layers={[
          // 1 · Fotografía de fondo (se queda atrás)
          {
            y: 60,
            node: (
              <div
                className={styles.bg}
                style={{ backgroundImage: `url(${img("hero-van.jpg")})` }}
              />
            ),
          },
          // 2 · Velo verde con malla, para legibilidad
          { y: 60, node: <div className={styles.veil} /> },
          // 3 · Sol
          { y: 50, node: <Sun />, className: styles.sunLayer },
          // 4 · Texto fantasma "ECOSTORE"
          { y: 45, node: <div className={styles.ghost}>EcoStore</div> },
          // 5 · Productos en primer plano (se mueven con la página)
          {
            y: 8,
            node: (
              <img
                src={img("energia/placas.webp")}
                alt=""
                className={styles.fgLeft}
                draggable={false}
              />
            ),
          },
          {
            y: 12,
            node: (
              <img
                src={img("agua/cisterna.webp")}
                alt=""
                className={styles.fgRight}
                draggable={false}
              />
            ),
          },
        ]}
      >
        <div className={styles.copy}>
          <Eyebrow inverse>Tu tienda de Eficiencia Energética y agua</Eyebrow>
          <Heading level="display" tone="inverse">
            Ahorra energía.
            <br />
            Ahorra agua.
            <br />
            <Em tone="highlight">Vive mejor.</Em>
          </Heading>
          <p className={styles.lead}>
            Más de 20 años ayudando a hogares y negocios en Puerto Rico a bajar
            la factura con soluciones a la medida: solar, climatización,
            cisternas y auditorías energéticas.
          </p>
          <Row gap={3}>
            <Button size="lg" href={ROUTES.contacto} arrow>
              Agenda tu evaluación gratis
            </Button>
            <Button size="lg" variant="glass" href={ROUTES.productosEnergia}>
              Ver productos
            </Button>
          </Row>
          <TrustList className={styles.trust}>
            <TrustItem
              layout="horizontal"
              icon={<LeafIcon size={20} />}
              title="100% gratis"
              description="Evaluación sin compromiso"
            />
            <TrustItem
              layout="horizontal"
              icon={<ShieldIcon size={20} />}
              title="20+ años"
              description="Primera ESCO de Puerto Rico"
            />
            <TrustItem
              layout="horizontal"
              icon={<ClockIcon size={20} />}
              title="24 h"
              description="Tiempo de respuesta"
            />
          </TrustList>
        </div>
      </ParallaxHero>

      {/* ---------- CIFRAS ---------- */}
      <Section size="sm">
        <Container>
          <StatBar>
            <Stat
              value={20}
              suffix="+"
              label="años acompañando hogares y negocios"
            />
            <Stat
              value={5400}
              suffix="+"
              label="propiedades evaluadas en la isla"
            />
            <Stat
              value={32}
              suffix="%"
              label="ahorro promedio en energía tras la instalación"
            />
            <Stat
              value={100}
              prefix="$"
              suffix="M+"
              label="ahorrados en facturas a clientes corporativos"
            />
          </StatBar>
        </Container>
      </Section>

      {/* ---------- QUÉ HACEMOS ---------- */}
      <Section background="subtle">
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Qué hacemos"
                title={
                  <>
                    Productos, auditoría e ingeniería{" "}
                    <Em tone="brand">en un solo lugar</Em>
                  </>
                }
                lead="No te vendemos un producto. Medimos tu consumo, diseñamos la solución, la instalamos y la mantenemos."
              />
            </Reveal>
            <Grid minColumn="260px" gap={6}>
              {[
                {
                  icon: <CartIcon size={26} />,
                  title: "Productos",
                  desc: "Equipos de alta eficiencia para energía y agua: solar, baterías, LED, climatización, cisternas y filtración.",
                  href: ROUTES.productosEnergia,
                  cta: "Ver catálogo",
                },
                {
                  icon: <SunIcon size={26} />,
                  title: "Auditoría energética",
                  desc: "Análisis de consumo, diagnóstico de eficiencia, recomendaciones con retorno de inversión y reembolso de LUMA.",
                  href: ROUTES.servicios,
                  cta: "Cómo funciona",
                },
                {
                  icon: <HardHatIcon size={26} />,
                  title: "Servicios de ingeniería",
                  desc: "Diseño Green Building, permisología, construcción y mantenimiento. Llave en mano, con financiamiento al 100%.",
                  href: ROUTES.ingenieria,
                  cta: "Conoce el proceso",
                },
              ].map((c, i) => (
                <Reveal key={c.title} delay={i * 60}>
                  <Card padding="lg" className={styles.what} data-icon-hover="">
                    <IconCircle tone="soft" size="lg">
                      {c.icon}
                    </IconCircle>
                    <Heading level="h3">{c.title}</Heading>
                    <Text size="sm">{c.desc}</Text>
                    <a href={c.href} className={styles.whatLink}>
                      {c.cta} <ArrowRightIcon size={16} />
                    </a>
                  </Card>
                </Reveal>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ---------- CATÁLOGO ---------- */}
      <Section>
        <Container>
          <SolutionsCatalog />
        </Container>
      </Section>

      {/* ---------- TESTIMONIO ---------- */}
      <Section background="subtle">
        <Container narrow>
          <Reveal>
            <Quote
              name="Carmen Delgado"
              role="Propietaria · Guaynabo"
              initials="CD"
              rating={5}
              className={styles.quote}
            >
              Pensé que ahorrar energía era cambiar bombillas. EcoStore me
              enseñó dónde se iba realmente el dinero. La primera factura bajó
              $96.
            </Quote>
          </Reveal>
        </Container>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section size="sm">
        <Container>
          <Reveal>
            <CtaBand
              eyebrow="Empieza hoy"
              title={
                <>
                  ¿Listo para ver cuánto puedes{" "}
                  <Em tone="highlight">ahorrar</Em>?
                </>
              }
              lead="Agenda tu evaluación gratuita. En una semana tendrás números concretos sobre la mesa."
              actions={
                <>
                  <Button
                    size="lg"
                    variant="inverse"
                    href={ROUTES.contacto}
                    arrow
                  >
                    Agenda tu evaluación
                  </Button>
                  <Button
                    size="lg"
                    variant="glass"
                    href={SITE.phoneHref}
                    leadingIcon={<PhoneIcon size={18} />}
                  >
                    {SITE.phone}
                  </Button>
                </>
              }
              note="Sin compromiso · Respuesta en 24 h"
            />
          </Reveal>
        </Container>
      </Section>

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
