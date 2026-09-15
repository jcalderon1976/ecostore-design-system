import { Navbar, Footer, FigurineCarousel } from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'

const energia = (name: string) => `${SITE.base}images/energia/${name}`

/** Productos destacados del carrusel. Los fondos son tokens de marca. */
const FEATURED = [
  { src: energia('placas.webp'), alt: 'Paneles solares', name: 'Sistemas solares', description: 'Paneles de alta eficiencia con inversores y baterías. Genera tu propia energía y reduce la factura desde el primer mes.', bg: '#176A2C' },
  { src: energia('bateria.webp'), alt: 'Batería de litio', name: 'Baterías de litio', description: 'Respaldo silencioso y limpio. Powerwall 3 y baterías modulares para hogares y negocios.', bg: '#0F3D22' },
  { src: energia('led.webp'), alt: 'Bombilla LED', name: 'Iluminación LED', description: 'Hasta 80% menos consumo que la iluminación tradicional, con sensores de ocupación y controles inteligentes.', bg: '#C9740F' },
  { src: energia('lavaseca.webp'), alt: 'Lavadora y secadora', name: 'Electrodomésticos eficientes', description: 'Refrigeradores, lavadoras, secadoras y estufas de inducción GE, Café y Haier.', bg: '#2E9E3E' },
  { src: energia('microinversor.webp'), alt: 'Microinversor solar', name: 'Inversores', description: 'Microinversores e inversores híbridos para sistemas solares con y sin batería.', bg: '#3A9FD9' },
]

/** Productos · Conservación de energía. Hero-carrusel de productos a pantalla completa. */
export function ProductosEnergia() {
  return (
    <>
      <Navbar items={NAV('productosEnergia')} ctaHref={ROUTES.contacto} phone={SITE.phone} phoneHref={SITE.phoneHref} />

      <FigurineCarousel
        items={FEATURED}
        ghost="Energía"
        label="EcoStore · Productos"
        linkLabel="Agenda tu evaluación"
        linkHref={ROUTES.contacto}
      />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
