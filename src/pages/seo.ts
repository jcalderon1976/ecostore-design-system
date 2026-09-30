import { SITE, SOCIAL, absoluteUrl, siteOrigin } from './site'

export type SeoPage = {
  title: string
  description: string
  path: string
  ogImage?: string
  noindex?: boolean
}

export const DEFAULT_OG_IMAGE = '/images/hero-van.jpg'

export const SEO: Record<string, SeoPage> = {
  inicio: {
    title: 'EcoStore · Eficiencia energética y conservación de agua en Puerto Rico',
    description:
      'Tienda y servicios de eficiencia energética y agua en San Juan. Solar, calentadores, conservación de agua y auditoría para hogares y negocios en Puerto Rico.',
    path: '/',
  },
  energiaSolar: {
    title: 'Energía solar en Puerto Rico · Paneles, inversores y baterías | EcoStore',
    description:
      'Sistemas solares para hogares y negocios en Puerto Rico: paneles, inversores y baterías. Evaluación en San Juan para ver si aplica a tu techo y tu factura.',
    path: '/energia-solar',
    ogImage: '/images/energia/placas.webp',
  },
  calentadoresSolares: {
    title: 'Calentadores solares de agua en Puerto Rico | EcoStore',
    description:
      'Agua caliente con el sol de Puerto Rico. Calentadores solares de tubos y alternativas heat pump. Evaluación en EcoStore, San Juan.',
    path: '/calentadores-solares',
    ogImage: '/images/agua/calentador-solar.webp',
  },
  productosAgua: {
    title: 'Conservación de agua en Puerto Rico · Duchas, inodoros y filtración | EcoStore',
    description:
      'Productos para reducir el consumo de agua en el hogar y el negocio: duchas eficientes, aireadores, inodoros y tratamiento de agua. Tienda en San Juan.',
    path: '/conservacion-de-agua',
  },
  productosEnergia: {
    title: 'Eficiencia energética · Climatización, solar, LED y electrodomésticos | EcoStore',
    description:
      'Productos de eficiencia energética en Puerto Rico: A/C inverter, solar y baterías, iluminación LED, electrodomésticos y aislamiento. EcoStore en San Juan.',
    path: '/productos-energia',
  },
  servicios: {
    title: 'Auditoría energética en Puerto Rico | EcoStore',
    description:
      'Auditoría de eficiencia energética: análisis de consumo, diagnóstico, recomendaciones y retorno de inversión. Residencial y comercial en Puerto Rico.',
    path: '/auditoria-energetica',
    ogImage: '/images/servicios-auditoria.jpg',
  },
  ingenieria: {
    title: 'Servicios de ingeniería energética y agua | EcoStore',
    description:
      'Ingeniería para eficiencia energética y conservación de agua: diseño, permisología, construcción y mantenimiento en Puerto Rico.',
    path: '/ingenieria',
  },
  nosotros: {
    title: 'Nosotros · Más de 20 años en eficiencia energética | EcoStore',
    description:
      'EcoStore diseña soluciones de energía y agua a la medida en Puerto Rico. Ingeniería, productos y evaluación en San Juan.',
    path: '/nosotros',
    ogImage: '/images/nosotros.jpg',
  },
  contacto: {
    title: 'Contáctanos · Agenda una evaluación | EcoStore San Juan',
    description:
      'Agenda una evaluación en EcoStore. Teléfono (787) 664-7676, info@ecostorepr.com. 1354 Avenida F.D. Roosevelt, San Juan, Puerto Rico.',
    path: '/contacto',
  },
  formulario: {
    title: 'Agenda una evaluación · EcoStore',
    description:
      'Déjanos tus datos y un especialista de EcoStore te contacta para orientar tu proyecto de energía o agua en Puerto Rico.',
    path: '/contacto',
  },
  privacidad: {
    title: 'Privacidad · EcoStore',
    description: 'Aviso de privacidad del sitio de EcoStore en Puerto Rico.',
    path: '/privacidad',
  },
  terminos: {
    title: 'Términos · EcoStore',
    description: 'Términos de uso del sitio de EcoStore en Puerto Rico.',
    path: '/terminos',
  },
  notfound: {
    title: 'Página no encontrada · EcoStore',
    description: 'La página que buscas no existe. Vuelve al inicio de EcoStore o contáctanos en San Juan.',
    path: '/no-encontrada',
    noindex: true,
  },
  system: {
    title: 'Design System · EcoStore',
    description: 'Referencia interna del sistema de diseño de EcoStore.',
    path: '/design-system',
    noindex: true,
  },
  demo: {
    title: 'Demo · EcoStore',
    description: 'Página de demostración interna.',
    path: '/demo',
    noindex: true,
  },
}

export const SITEMAP_PATHS = [
  '/',
  '/energia-solar',
  '/calentadores-solares',
  '/conservacion-de-agua',
  '/productos-energia',
  '/auditoria-energetica',
  '/ingenieria',
  '/nosotros',
  '/contacto',
  '/privacidad',
  '/terminos',
] as const

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store'],
    name: SITE.name,
    description: SITE.tagline,
    url: siteOrigin() + '/',
    telephone: '+1-787-664-7676',
    email: SITE.email,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.addressLocality,
      postalCode: SITE.postalCode,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHours: SITE.openingHours,
    areaServed: { '@type': 'AdministrativeArea', name: SITE.areaServed },
    sameAs: SOCIAL.map((s) => s.href),
  }
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: siteOrigin() + '/',
    inLanguage: 'es-PR',
    publisher: { '@type': 'Organization', name: SITE.name, url: siteOrigin() + '/' },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
