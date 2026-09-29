import { useEffect, useState } from 'react'
import { Inicio } from './pages/Inicio'
import { Contacto } from './pages/Contacto'
import { Nosotros } from './pages/Nosotros'
import { Auditoria } from './pages/Auditoria'
import { Ingenieria } from './pages/Ingenieria'
import { ProductosEnergia } from './pages/ProductosEnergia'
import { ProductosAgua } from './pages/ProductosAgua'
import { Privacidad, Terminos } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { ContactPage } from './showcase/ContactPage'
import { SystemPage } from './showcase/SystemPage'
import { hashPage, pageTitle, productSlugFromHash } from './pages/site'

type View =
  | 'inicio'
  | 'contacto'
  | 'nosotros'
  | 'servicios'
  | 'ingenieria'
  | 'productosEnergia'
  | 'productosAgua'
  | 'privacidad'
  | 'terminos'
  | 'system'
  | 'demo'
  | 'notfound'

const VIEWS: Array<{ id: View; hash: string }> = [
  { id: 'inicio', hash: 'inicio' },
  { id: 'productosEnergia', hash: 'productos-energia' },
  { id: 'productosAgua', hash: 'productos-agua' },
  { id: 'servicios', hash: 'servicios' },
  { id: 'ingenieria', hash: 'ingenieria' },
  { id: 'nosotros', hash: 'nosotros' },
  { id: 'contacto', hash: 'contacto' },
  { id: 'privacidad', hash: 'privacidad' },
  { id: 'terminos', hash: 'terminos' },
  { id: 'system', hash: 'design-system' },
  { id: 'demo', hash: 'page' },
]

const ALIASES: Record<string, View> = {
  '': 'inicio',
  formulario: 'contacto',
  productos: 'productosEnergia',
}

function fromHash(): View {
  const h = hashPage()
  if (h in ALIASES) return ALIASES[h]
  return VIEWS.find((v) => v.hash === h)?.id ?? 'notfound'
}

export function App() {
  const [view, setView] = useState<View>(fromHash)
  const [slug, setSlug] = useState(productSlugFromHash)

  useEffect(() => {
    document.title = pageTitle()
  }, [view, slug])

  // Los enlaces del Navbar/Footer cambian el hash: sincronizar la vista.
  useEffect(() => {
    const onHash = () => {
      setView(fromHash())
      setSlug(productSlugFromHash())
      document.title = pageTitle()
      if (hashPage() !== 'formulario') window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      {view === 'inicio' && <Inicio />}
      {view === 'productosEnergia' && <ProductosEnergia key={slug ?? 'energia'} />}
      {view === 'productosAgua' && <ProductosAgua key={slug ?? 'agua'} />}
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
