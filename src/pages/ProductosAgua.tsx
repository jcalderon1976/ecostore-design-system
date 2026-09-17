import { Navbar, FigurineCarousel } from '@ds'
import { SITE, NAV, ROUTES } from './site'
import { SiteClose } from './sections/SiteClose'

const agua = (name: string) => `${SITE.base}images/agua/${name}`

/** Productos destacados del carrusel. Los fondos son tokens de marca (verde y celeste). */
const FEATURED = [
  { src: agua('ducha.webp'), alt: 'Ducha de bajo consumo', name: 'Duchas eficientes', description: 'Duchas, aireadores e inodoros de bajo consumo. Misma presión, hasta 40% menos agua.', bg: '#2A80B3' },
  { src: agua('cisterna.webp'), alt: 'Cisterna de agua', name: 'Cisternas', description: 'Almacenamiento seguro con bomba y filtración. Agua disponible cuando el servicio falla.', bg: '#176A2C' },
  { src: agua('tratamiento-agua.webp'), alt: 'Sistema de filtración y ósmosis inversa', name: 'Tratamiento de agua', description: 'Ósmosis inversa, filtros y suavizadores. Agua más limpia para toda la casa.', bg: '#3A9FD9', photo: true },
  { src: agua('captacion-lluvia.webp'), alt: 'Tanque de recolección de agua de lluvia', name: 'Captación de lluvia', description: 'Canaletas, filtración y tanques de recolección. Reúsa el agua de lluvia para riego y limpieza.', bg: '#124F22', photo: true },
]

/** Productos · Conservación de agua. Hero-carrusel de productos a pantalla completa. */
export function ProductosAgua() {
  return (
    <>
      <Navbar items={NAV('productosAgua')} ctaHref={ROUTES.contacto} phone={SITE.phone} phoneHref={SITE.phoneHref} />

      <FigurineCarousel
        items={FEATURED}
        ghost="Agua"
        label="EcoStore · Productos"
        linkLabel="Agenda tu evaluación"
        linkHref={ROUTES.contacto}
      />

      <SiteClose />
    </>
  )
}
