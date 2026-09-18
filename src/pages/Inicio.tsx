import { Navbar, Footer } from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { EcoLoTiene } from "./sections/EcoLoTiene";
import { HouseTour } from "./sections/HouseTour";

/** Home: recorrido animado por la casa + ECO lo tiene + footer. */
export function Inicio() {
  return (
    <>
      <Navbar
        overlay
        items={NAV("inicio")}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      <HouseTour />

      <EcoLoTiene hideBrand />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
