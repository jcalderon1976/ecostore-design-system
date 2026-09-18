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
import styles from "./Ingenieria.module.css";

const HERO_CHECKS = [
  "Auditorías de Eficiencia Energética y Conservación de Agua",
  'Diseño de edificios "Green Building"',
  "Permisología",
  "Construcción",
  "Mantenimiento",
  "Proyectos residenciales y comerciales",
];

/**
 * Servicios · Servicios de ingeniería.
 * Hero con checklist, ECO lo tiene y CTA hacia contacto.
 */
export function Ingenieria() {
  return (
    <>
      <Navbar
        items={NAV("ingenieria")}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      {/* ---------- HERO ---------- */}
      <Hero
        imageUrl={`${SITE.base}images/servicios-ingenieria.jpg`}
        className={styles.hero}
        eyebrow="Servicios"
        title={
          <>
            Servicios de <Em tone="highlight">ingeniería</Em>
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
