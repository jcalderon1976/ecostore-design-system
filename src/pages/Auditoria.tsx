import {
  Navbar,
  Footer,
  Hero,
  Em,
  Checklist,
  Stack,
  Button,
  CalendarIcon,
} from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { SEO, breadcrumbJsonLd, faqJsonLd } from "./seo";
import { SeoHead } from "./SeoHead";
import { ServiceGuide } from "./ServiceGuide";
import { EcoLoTiene } from "./sections/EcoLoTiene";
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

const FAQ = [
  {
    question: "¿Qué es una auditoría energética en EcoStore?",
    answer:
      "Es un diagnóstico de cómo usas la electricidad (y, si aplica, el agua) para priorizar medidas con sentido: equipos, hábitos y, cuando toca, solar o agua caliente. No es una cotización de un solo producto.",
  },
  {
    question: "¿Para quién es?",
    answer:
      "Residencias, comercios e industria liviana en Puerto Rico que quieren bajar consumo, preparar un proyecto o entender el retorno antes de invertir. Si solo buscas un recambio puntual, a veces basta una orientación más corta.",
  },
  {
    question: "¿Qué incluye la evaluación?",
    answer:
      "Revisión de consumo, equipos y oportunidades de ahorro; recomendaciones priorizadas; y una conversación de costos e inversión. Temas como financiamiento o incentivos (por ejemplo programas de eficiencia de LUMA, si aplican a tu caso) se discuten con tus datos, no como promesa genérica.",
  },
  {
    question: "¿Cuánto cuesta o cuánto ahorro?",
    answer:
      "Depende de tu tarifa, el estado de los equipos, el edificio y qué medidas implementes. Por eso partimos de una evaluación: los números se construyen con tu factura y tu propiedad, no con un porcentaje fijo de marketing.",
  },
];

const BLOCKS = [
  {
    title: "Para quién aplica",
    body: "Dueños de casa, administradores de edificio y negocios que quieren decidir con datos. Si ya sabes el equipo exacto, igual sirve para no sobredimensionar.",
  },
  {
    title: "Cómo funciona",
    body: "Levantamos consumo y sistemas, identificamos fugas de eficiencia (climatización, agua caliente, iluminación, envolvente) y ordenamos las medidas por impacto y esfuerzo.",
  },
  {
    title: "Qué entregas",
    body: "Un diagnóstico claro, oportunidades de ahorro y una idea de retorno. El alcance de un informe formal se acuerda en la visita; la solicitud en el sitio es el primer contacto.",
  },
  {
    title: "Qué mueve el resultado",
    body: "kWh y tarifa, edad de los equipos, aislamiento, hábitos y si hay incentivos vigentes. Nada de eso se ve completo sin tus facturas y una visita o llamado de diagnóstico.",
  },
];

/**
 * Servicios · Auditoría Energética.
 * Hero con checklist, ECO lo tiene y CTA hacia contacto.
 */
export function Auditoria() {
  const seo = SEO.servicios;
  return (
    <>
      <SeoHead
        {...seo}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Auditoría energética", path: seo.path },
          ]),
          faqJsonLd(FAQ),
        ]}
      />
      <Navbar
        items={NAV("servicios")}
        ctaHref={ROUTES.agenda}
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

      <ServiceGuide
        lead="La auditoría sirve para decidir con orden: qué conviene ahora, qué puede esperar y qué no aplica a tu propiedad. EcoStore atiende desde San Juan a clientes en Puerto Rico."
        blocks={BLOCKS}
        faq={FAQ}
      />

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
