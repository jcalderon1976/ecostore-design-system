import { useEffect, useState } from 'react'
import { Inicio } from './pages/Inicio'
import { Contacto } from './pages/Contacto'
import { Nosotros } from './pages/Nosotros'
import { Auditoria } from './pages/Auditoria'
import { Ingenieria } from './pages/Ingenieria'
import { ProductosEnergia } from './pages/ProductosEnergia'
import { ProductosAgua } from './pages/ProductosAgua'
import { EnergiaSolar } from './pages/EnergiaSolar'
import { CalentadoresSolares } from './pages/CalentadoresSolares'
import { Privacidad, Terminos } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { ContactPage } from './showcase/ContactPage'
import { SystemPage } from './showcase/SystemPage'
import { currentPath, productSlugFromHash } from './pages/site'

type View =
  | 'inicio'
  | 'contacto'
  | 'nosotros'
  | 'servicios'
  | 'ingenieria'
  | 'productosEnergia'
  | 'productosAgua'
  | 'energiaSolar'
  | 'calentadoresSolares'
  | 'privacidad'
  | 'terminos'
  | 'system'
  | 'demo'
  | 'notfound'

const PAGE_VIEW: Record<string, View> = {
  '': 'inicio',
  'productos-energia': 'productosEnergia',
  productos: 'productosEnergia',
  'productos-agua': 'productosAgua',
  'conservacion-de-agua': 'productosAgua',
  'energia-solar': 'energiaSolar',
  'calentadores-solares': 'calentadoresSolares',
  servicios: 'servicios',
  'auditoria-energetica': 'servicios',
  ingenieria: 'ingenieria',
  nosotros: 'nosotros',
  contacto: 'contacto',
  privacidad: 'privacidad',
  terminos: 'terminos',
  'design-system': 'system',
  demo: 'demo',
}

function fromPath(): View {
  const segs = currentPath().split('/').filter(Boolean)
  const page = segs[0] ?? ''
  return PAGE_VIEW[page] ?? 'notfound'
}

export function App() {
  const [view, setView] = useState<View>(fromPath)
  const [slug, setSlug] = useState(productSlugFromHash)

  useEffect(() => {
    const sync = () => {
      setView(fromPath())
      setSlug(productSlugFromHash())
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (a.target && a.target !== '_self') return
      const href = a.getAttribute('href')
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return
      const url = new URL(href, window.location.href)
      if (url.origin !== window.location.origin) return
      e.preventDefault()
      const next = `${url.pathname}${url.search}${url.hash}`
      if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.pushState(null, '', next)
      }
      sync()
      if (url.hash !== '#formulario') window.scrollTo({ top: 0 })
      if (url.hash) {
        const id = url.hash.slice(1)
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
      }
    }
    window.addEventListener('popstate', sync)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', sync)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      {view === 'inicio' && <Inicio />}
      {view === 'productosEnergia' && <ProductosEnergia key={slug ?? 'energia'} />}
      {view === 'productosAgua' && <ProductosAgua key={slug ?? 'agua'} />}
      {view === 'energiaSolar' && <EnergiaSolar />}
      {view === 'calentadoresSolares' && <CalentadoresSolares />}
      {view === 'servicios' && <Auditoria />}
      {view === 'ingenieria' && <Ingenieria />}
      {view === 'nosotros' && <Nosotros />}
      {view === 'contacto' && <Contacto />}
      {view === 'privacidad' && <Privacidad />}
      {view === 'terminos' && <Terminos />}
      {view === 'system' && <SystemPage />}
      {view === 'demo' && <ContactPage />}
      {view === 'notfound' && <NotFound />}
    </>
  )
}
