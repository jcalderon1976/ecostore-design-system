/**
 * Datos compartidos del sitio: contacto, navegación, redes y footer.
 * Una sola fuente de verdad para todas las páginas.
 */
import type { NavItem, SocialLink, FooterColumn, FooterContact, FooterLink } from '@ds'

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'

export const SITE = {
  base,
  name: 'EcoStore',
  tagline: 'Tu tienda de Eficiencia Energética y agua',
  phone: '(787) 664-7676',
  phoneHref: 'tel:+17876647676',
  email: 'info@ecostorepr.com',
  address: '1354 Avenida F.D. Roosevelt, San Juan, 00920, Puerto Rico',
  streetAddress: '1354 Avenida F.D. Roosevelt',
  addressLocality: 'San Juan',
  postalCode: '00920',
  addressRegion: 'PR',
  addressCountry: 'PR',
  hours: 'Lun - Vie: 8:00am - 5:00pm',
  openingHours: 'Mo-Fr 08:00-17:00',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4490.41063229366!2d-66.09295809999999!3d18.413354799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c03692bae351bc1%3A0x16ddb193b6747561!2sEcoStore!5e1!3m2!1sen!2spr!4v1789500271946!5m2!1sen!2spr',
  directions: 'https://maps.app.goo.gl/oTgYLNfByRznh9Xv5',
  geo: { latitude: 18.4133548, longitude: -66.0929581 },
  areaServed: 'Puerto Rico',
} as const

/** Origen público. En producción define VITE_SITE_URL (https://www.tudominio.com). */
export function siteOrigin(): string {
  const fromEnv = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return 'https://www.ecostorepr.com'
}

export function absoluteUrl(path = '/'): string {
  const origin = siteOrigin()
  if (!path || path === '/') return `${origin}/`
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Rutas públicas (historial). Los hashes antiguos se redirigen en `redirectLegacyHash`.
 */
export const ROUTES = {
  inicio: '/',
  designSystem: '/design-system',
  demo: '/demo',
  productos: '/productos-energia',
  productosEnergia: '/productos-energia',
  productosAgua: '/conservacion-de-agua',
  energiaSolar: '/energia-solar',
  calentadoresSolares: '/calentadores-solares',
  servicios: '/auditoria-energetica',
  ingenieria: '/ingenieria',
  nosotros: '/nosotros',
  contacto: '/contacto',
  agenda: '/contacto#formulario',
  privacidad: '/privacidad',
  terminos: '/terminos',
} as const

const HASH_REDIRECT: Record<string, string> = {
  inicio: ROUTES.inicio,
  formulario: ROUTES.agenda,
  contacto: ROUTES.contacto,
  productos: ROUTES.productosEnergia,
  'productos-energia': ROUTES.productosEnergia,
  'productos-agua': ROUTES.productosAgua,
  servicios: ROUTES.servicios,
  ingenieria: ROUTES.ingenieria,
  nosotros: ROUTES.nosotros,
  privacidad: ROUTES.privacidad,
  terminos: ROUTES.terminos,
  'design-system': ROUTES.designSystem,
  page: ROUTES.demo,
  'energia-solar': ROUTES.energiaSolar,
  'calentadores-solares': ROUTES.calentadoresSolares,
  'auditoria-energetica': ROUTES.servicios,
  'conservacion-de-agua': ROUTES.productosAgua,
}

/** Pathname sin BASE_URL ni barra final (`/contacto`). */
export function currentPath(pathname = typeof window === 'undefined' ? '/' : window.location.pathname): string {
  const root = base.replace(/\/$/, '')
  let path = pathname || '/'
  if (root && path.startsWith(root)) path = path.slice(root.length) || '/'
  if (!path.startsWith('/')) path = `/${path}`
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

export function pathSegments(pathname?: string): string[] {
  return currentPath(pathname).split('/').filter(Boolean)
}

/** Primera página del path (`productos-energia/led` → `productos-energia`). */
export function hashPage(hash = typeof window === 'undefined' ? '' : window.location.hash): string {
  if (hash && hash !== '#') return hash.replace(/^#/, '').split('/')[0]
  return pathSegments()[0] ?? ''
}

/** Slug de producto (`/productos-energia/led` → `led`). */
export function productSlugFromHash(hash = typeof window === 'undefined' ? '' : window.location.hash): string | undefined {
  if (hash && hash !== '#' && hash.includes('/')) {
    const slug = hash.replace(/^#/, '').split('/')[1]
    return slug || undefined
  }
  const segs = pathSegments()
  if (segs.length >= 2) return segs[1]
  return undefined
}

export function productIndexFromHash(slugs: readonly string[]): number {
  const slug = productSlugFromHash()
  if (!slug) return 0
  const i = slugs.indexOf(slug)
  return i < 0 ? 0 : i
}

/**
 * Convierte bookmarks `#contacto` / `#productos-energia/led` a rutas reales.
 * Conserva `#formulario` cuando ya estás en contacto.
 */
export function redirectLegacyHash(): void {
  if (typeof window === 'undefined') return
  const { pathname, hash, search } = window.location
  if (!hash || hash === '#') return
  const raw = hash.replace(/^#/, '')
  const [page, ...rest] = raw.split('/')
  const slug = rest.filter(Boolean).join('/')
  const path = currentPath(pathname)
  if (page === 'formulario' && (path === '/contacto' || path.endsWith('/contacto'))) return
  const atIndex = path === '/' || pathname.endsWith('/index.html')
  if (!atIndex) return
  const mapped = HASH_REDIRECT[page]
  let dest = mapped ?? `/${raw}`
  if (mapped && slug && !mapped.includes('#')) dest = `${mapped}/${slug}`
  const [destPath, destHash] = dest.split('#')
  const next = `${destPath}${search}${destHash ? `#${destHash}` : ''}`
  window.history.replaceState(null, '', next)
}

export type PageKey =
  | 'inicio' | 'productos' | 'productosEnergia' | 'productosAgua'
  | 'servicios' | 'ingenieria' | 'nosotros' | 'contacto'
  | 'energiaSolar' | 'calentadoresSolares'

/** Navegación principal; `active` marca la página actual. */
export const NAV = (active: PageKey): NavItem[] => [
  {
    label: 'Productos',
    active: active === 'productos' || active === 'productosEnergia' || active === 'productosAgua'
      || active === 'energiaSolar' || active === 'calentadoresSolares',
    children: [
      {
        label: 'Eficiencia Energética',
        description: 'Climatización, solar y baterías, iluminación, agua caliente',
        href: ROUTES.productosEnergia,
        active: active === 'productosEnergia' || active === 'energiaSolar',
      },
      {
        label: 'Conservación de agua',
        description: 'Duchas eficientes, tratamiento, cisternas y captación de lluvia',
        href: ROUTES.productosAgua,
        active: active === 'productosAgua' || active === 'calentadoresSolares',
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

/** Perfiles oficiales de EcoStore (Facebook) y del canal ESCOPR (YouTube). */
export const SOCIAL: SocialLink[] = [
  { network: 'facebook', href: 'https://www.facebook.com/ahorraaguapr' },
  { network: 'youtube', href: 'https://www.youtube.com/@escopr5800' },
]

export const FOOTER: {
  description: string
  columns: FooterColumn[]
  contact: FooterContact
  copyright: string
  legal: FooterLink[]
} = {
  description: 'Más de 20 años ayudando a hogares y negocios en Puerto Rico a reducir su consumo de energía y agua.',
  columns: [
    { title: 'Enlaces rápidos', links: [
      { label: 'Inicio', href: ROUTES.inicio },
      { label: 'Productos', href: ROUTES.productos },
      { label: 'Servicios', href: ROUTES.servicios },
      { label: 'Nosotros', href: ROUTES.nosotros },
      { label: 'Contáctanos', href: ROUTES.contacto },
    ] },
    { title: 'Soluciones', links: [
      { label: 'Energía solar', href: ROUTES.energiaSolar },
      { label: 'Calentadores solares', href: ROUTES.calentadoresSolares },
      { label: 'Conservación de agua', href: ROUTES.productosAgua },
      { label: 'Auditoría energética', href: ROUTES.servicios },
    ] },
  ],
  copyright: `© ${new Date().getFullYear()} ECOSTORE ·`,
  legal: [
    { label: 'Privacidad', href: ROUTES.privacidad },
    { label: 'Términos', href: ROUTES.terminos },
  ],
  contact: {
    phone: '787-664-7676',
    phoneHref: SITE.phoneHref,
    email: SITE.email,
    addressLabel: 'Dirección Completa',
    address: SITE.address,
    hours: SITE.hours,
  },
}
