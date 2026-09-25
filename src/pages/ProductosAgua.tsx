import { Navbar, Footer, FigurineCarousel } from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { EcoLoTiene } from './sections/EcoLoTiene'

const agua = (name: string) => `${SITE.base}images/agua/${name}`

const BG = ['#3A9FD9', '#2E9E3E', '#5BB4E5', '#1E7F35'] as const

/** Un ítem por cada recorte en `public/images/agua`. */
const PRODUCTS = [
  {
    file: 'calentador-solar.webp',
    alt: 'Calentador solar de agua',
    name: 'Calentador solar',
    description: 'Agua caliente con el sol de Puerto Rico. Menos electricidad y un tanque listo todo el año.',
  },
  {
    file: 'ducha.webp',
    alt: 'Ducha de bajo consumo',
    name: 'Duchas eficientes',
    description: 'Misma presión, hasta 40% menos agua. El primer paso para bajar la factura sin cambiar hábitos.',
  },
  {
    file: 'ducha-low-flow.webp',
    alt: 'Ducha de bajo flujo',
    name: 'Ducha de bajo flujo',
    description: 'Cabezal low-flow que reduce galones por minuto y mantiene una ducha cómoda.',
  },
  {
    file: 'ducha-sistema.webp',
    alt: 'Sistema de ducha de bajo consumo',
    name: 'Sistema de ducha',
    description: 'Kit completo de ducha eficiente: cabezal, brazo y válvulas pensados para ahorrar agua.',
  },
  {
    file: 'aireador.webp',
    alt: 'Aireador de grifo',
    name: 'Aireador de grifo',
    description: 'Se instala en minutos. Mezcla aire con el agua para bajar el caudal sin perder presión.',
  },
  {
    file: 'aireador-giratorio.webp',
    alt: 'Aireador giratorio para grifo',
    name: 'Aireador giratorio',
    description: 'Aireador articulado de 1.5 GPM. Dirige el chorro donde lo necesitas y ahorra en cada uso.',
  },
  {
    file: 'inodoro-1-pieza.webp',
    alt: 'Inodoro de una pieza',
    name: 'Inodoro de 1 pieza',
    description: 'Inodoro de bajo consumo en una sola pieza. Menos fugas, menos agua por descarga.',
  },
  {
    file: 'inodoro-2-piezas.webp',
    alt: 'Inodoro de dos piezas',
    name: 'Inodoro de 2 piezas',
    description: 'Tanque y taza de alta eficiencia. Reemplazo directo para bajar el consumo del hogar.',
  },
  {
    file: 'toilet-tank-bank.webp',
    alt: 'Ahorrador para tanque de inodoro',
    name: 'Ahorrador para tanque',
    description: 'Desplaza agua dentro del tanque para reducir cada descarga sin cambiar el inodoro.',
  },
  {
    file: 'tratamiento-agua.webp',
    alt: 'Sistema de filtración y ósmosis inversa',
    name: 'Tratamiento de agua',
    description: 'Ósmosis inversa, filtros y suavizadores. Agua más limpia para toda la casa.',
  },
] as const

const FEATURED = PRODUCTS.map((p, i) => ({
  src: agua(p.file),
  alt: p.alt,
  name: p.name,
  description: p.description,
  bg: 'bg' in p ? p.bg : BG[i % BG.length],
}))

/** Productos · Conservación de agua. Hero-carrusel de productos a pantalla completa. */
export function ProductosAgua() {
  return (
    <>
      <Navbar items={NAV('productosAgua')} ctaHref={ROUTES.agenda} phone={SITE.phone} phoneHref={SITE.phoneHref} />

      <FigurineCarousel
        items={FEATURED}
        ghost="Agua"
        label="EcoStore · Productos"
        linkLabel="Agenda una evaluación"
        linkHref={ROUTES.agenda}
      />

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
