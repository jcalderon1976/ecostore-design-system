import { Navbar, Footer, FigurineCarousel } from "@ds";
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from "./site";
import { EcoLoTiene } from "./sections/EcoLoTiene";

const energia = (name: string) => `${SITE.base}images/energia/${name}`;

const BG = ["#2E9E3E", "#176A2C", "#E88F1A", "#3DB35F", "#5BB4E5"] as const;

/** Un ítem por cada recorte en `public/images/energia`. */
const TESLA_POWERWALL = "https://www.tesla.com/powerwall";

const PRODUCTS = [
  {
    file: "heatPump.webp",
    alt: "Calentador de agua heat pump",
    name: "Calentador Heat Pump",
    description:
      "Agua caliente con bomba de calor. Hasta tres veces más eficiente que un calentador eléctrico.",
    href: "https://geaprstore.com/search?options%5Bprefix%5D=last&q=Heat+Pump",
  },
  {
    file: "climatizacion.webp",
    alt: "Aire acondicionado inverter",
    name: "Climatización",
    description:
      "A/C inverter, de ventana y PTAC. Más confort con menos consumo en hogar y negocio.",
    href: "https://geaprstore.com/search?q=air+conditioner+inverter&_pos=3&_psq=Air&_psid=db8be55dd&_ss=e",
  },
  {
    file: "placas.webp",
    alt: "Paneles solares",
    name: "Sistemas solares",
    description:
      "Paneles de alta eficiencia con inversores y baterías. Genera tu propia energía y reduce la factura desde el primer mes.",
  },
  {
    file: "microinversor.webp",
    alt: "Microinversor solar",
    name: "Inversores",
    description:
      "Microinversores e inversores híbridos para sistemas solares con y sin batería.",
    href: TESLA_POWERWALL,
  },
  {
    file: "bateria.webp",
    alt: "Batería de litio",
    name: "Baterías de litio",
    description:
      "Respaldo silencioso y limpio. Powerwall 3 y baterías modulares para hogares y negocios.",
    href: TESLA_POWERWALL,
  },
  {
    file: "led.webp",
    alt: "Bombilla LED",
    name: "Iluminación LED",
    description:
      "Hasta 80% menos consumo que la iluminación tradicional, con sensores de ocupación y controles inteligentes.",
  },
  {
    file: "lavaseca.webp",
    alt: "Lavadora y secadora",
    name: "Lavadora y secadora",
    description:
      "Equipos de alta eficiencia GE, Café y Haier. Menos agua, menos kWh y el mismo resultado.",
    href: "https://geaprstore.com/search?options%5Bprefix%5D=last&q=lavadora+y+secadora+2%2F1+Heat+pump",
  },
  {
    file: "countertop.webp",
    alt: "Estufa de inducción",
    name: "Estufa de inducción",
    description:
      "Cocina precisa y eficiente. Menos calor residual y hasta 50% menos energía que una estufa tradicional.",
    href: "https://geaprstore.com/search?q=induction+cooktop&_pos=1&_psq=induc&_psid=143610958&_ss=e",
  },
] as const;

const FEATURED = PRODUCTS.map((p, i) => ({
  src: energia(p.file),
  alt: p.alt,
  name: p.name,
  description: p.description,
  bg: BG[i % BG.length],
  href: "href" in p ? p.href : undefined,
}));

/** Productos · Eficiencia Energética. Hero-carrusel de productos a pantalla completa. */
export function ProductosEnergia() {
  return (
    <>
      <Navbar
        items={NAV("productosEnergia")}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      <FigurineCarousel
        items={FEATURED}
        ghost="Energía"
        label="EcoStore · Productos"
        linkLabel="Agenda una evaluación"
        linkHref={ROUTES.agenda}
      />

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  );
}
