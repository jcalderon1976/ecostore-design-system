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

/**
 * Servicios · Auditoría Energética.
 * Hero con checklist, ECO lo tiene y CTA hacia contacto.
 */
export function Auditoria() {
  return (
    <>
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

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
