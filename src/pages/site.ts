/**
 * Datos compartidos del sitio: contacto, navegación, redes y footer.
 * Una sola fuente de verdad para todas las páginas.
 */
import type { NavItem, SocialLink, FooterColumn, FooterContact } from '@ds'

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'

export const SITE = {
  base,
  name: 'EcoStore',
  tagline: 'Tu tienda de Eficiencia Energética y agua',
  phone: '(787) 664-7676',
  phoneHref: 'tel:+17876647676',
  email: 'info@ecostorepr.com',
  address: '1354 Avenida F.D. Roosevelt, San Juan, 00920, Puerto Rico',
  hours: 'Lun - Vie: 8:00am - 5:00pm',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4490.41063229366!2d-66.09295809999999!3d18.413354799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c03692bae351bc1%3A0x16ddb193b6747561!2sEcoStore!5e1!3m2!1sen!2spr!4v1789500271946!5m2!1sen!2spr',
  directions: 'https://maps.app.goo.gl/oTgYLNfByRznh9Xv5',
} as const

/**
 * Rutas de las páginas. Hoy son hashes (una sola SPA); al pasar a rutas reales
 * (`productos.html`, `/productos`, etc.) solo hay que cambiar este mapa.
 */
export const ROUTES = {
  inicio: '#inicio',
  designSystem: '#design-system',
  productos: '#productos',
  productosEnergia: '#productos-energia',
  productosAgua: '#productos-agua',
  servicios: '#servicios',
  ingenieria: '#ingenieria',
  nosotros: '#nosotros',
  contacto: '#contacto',
  /** CTA "Agenda una evaluación": Contacto + sección del formulario. */
  agenda: '#formulario',
} as const

export type PageKey =
  | 'inicio' | 'productos' | 'productosEnergia' | 'productosAgua'
  | 'servicios' | 'ingenieria' | 'nosotros' | 'contacto'

/** Navegación principal; `active` marca la página actual. "Productos" y "Servicios" despliegan dos opciones. */
export const NAV = (active: PageKey): NavItem[] => [
  {
    label: 'Productos',
    active: active === 'productos',
    children: [
      {
        label: 'Eficiencia Energética',
        description: 'Climatización, solar y baterías, iluminación, agua caliente',
        href: ROUTES.productosEnergia,
        active: active === 'productosEnergia',
      },
      {
        label: 'Conservación de agua',
        description: 'Duchas eficientes, tratamiento, cisternas y captación de lluvia',
        href: ROUTES.productosAgua,
        active: active === 'productosAgua',
      },
    ],
  },
  {
    label: 'Servicios',
    children: [
      {
        label: 'Servicios de Auditoría',
        description: 'Análisis de consumo, diagnóstico y retorno de inversión',
        href: ROUTES.servicios,
        active: active === 'servicios',
      },
      {
        label: 'Servicios de ingeniería',
        description: 'Diseño, permisología y construcción a la medida',
        href: ROUTES.ingenieria,
        active: active === 'ingenieria',
      },
    ],
  },
  { label: 'Nosotros', href: ROUTES.nosotros, active: active === 'nosotros' },
  { label: 'Contáctanos', href: ROUTES.contacto, active: active === 'contacto' },
]

export const SOCIAL: SocialLink[] = [
  { network: 'facebook', href: 'https://facebook.com' },
  { network: 'instagram', href: 'https://instagram.com' },
  { network: 'youtube', href: 'https://youtube.com' },
  { network: 'linkedin', href: 'https://linkedin.com' },
]

export const FOOTER: { description: string; columns: FooterColumn[]; contact: FooterContact; copyright: string } = {
  description: 'Más de 20 años ayudando a hogares y negocios en Puerto Rico a reducir su consumo de energía y agua.',
  columns: [
    { title: 'Enlaces rápidos', links: [
      { label: 'Inicio', href: ROUTES.inicio },
      { label: 'Productos', href: ROUTES.productos },
      { label: 'Servicios', href: ROUTES.servicios },
      { label: 'Nosotros', href: ROUTES.nosotros },
      { label: 'Contáctanos', href: ROUTES.contacto },
    ] },
  ],
  copyright: `© ${new Date().getFullYear()} ECOSTORE ·`,
  contact: {
    phone: '787-664-7676',
    phoneHref: SITE.phoneHref,
    email: SITE.email,
    addressLabel: 'Dirección Completa',
    address: SITE.address,
    hours: SITE.hours,
  },
}
