declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

/** Rutas internas: el contenedor carga, pero no enviamos page_view de SPA. */
const SKIP_PREFIX = ['/design-system', '/demo']

let lastKey = ''

function shouldSkip(pathname: string): boolean {
  return SKIP_PREFIX.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

/** page_view para GTM/gtag en cambios de ruta (el primer load lo cubre el contenedor). */
export function trackPageView(title: string) {
  if (typeof window === 'undefined') return
  const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (shouldSkip(window.location.pathname)) return
  const key = `${pagePath}|${title}`
  if (key === lastKey) return
  const isFirst = lastKey === ''
  lastKey = key
  if (isFirst) return
  window.dataLayer = window.dataLayer || []
  const payload = {
    page_title: title,
    page_path: pagePath,
    page_location: window.location.href,
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', payload)
    return
  }
  window.dataLayer.push({ event: 'page_view', ...payload })
}
