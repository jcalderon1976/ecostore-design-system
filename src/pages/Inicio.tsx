import { Navbar, Footer, MarqueeLogoScroller } from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { EcoLoTiene } from "./sections/EcoLoTiene";
import { EcoHero } from "./sections/EcoHero";

const partner = (file: string) => `${SITE.base}images/partners/${file}`;

const PARTNERS = [
  {
    src: partner("ge.png"),
    alt: "GE Appliances",
    gradient: { from: "#8AA7FF", via: "#3B6FD4", to: "#1D3F99" },
  },
  {
    src: partner("ge-pro.png"),
    alt: "GE Appliances PRO Solutions Center",
    gradient: { from: "#7EC8F0", via: "#1E6BB8", to: "#0B2E6B" },
  },
  {
    src: partner("haier.png"),
    alt: "Haier",
    gradient: { from: "#4D8CFF", via: "#0050C8", to: "#00286B" },
  },
  {
    src: partner("hotpoint.png"),
    alt: "Hotpoint",
    gradient: { from: "#FF8A7A", via: "#E03A2F", to: "#8F140C" },
  },
];

/** Home: hero de scroll + marcas + ECO lo tiene + footer. */
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

      <EcoHero />

      <MarqueeLogoScroller
        title="Somos representantes autorizados"
        logos={PARTNERS}
        speed="normal"
      />

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
