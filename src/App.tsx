import { useEffect, useState } from 'react'
import { Inicio } from './pages/Inicio'
import { Contacto } from './pages/Contacto'
import { Nosotros } from './pages/Nosotros'
import { Auditoria } from './pages/Auditoria'
import { Ingenieria } from './pages/Ingenieria'
import { ProductosEnergia } from './pages/ProductosEnergia'
import { ProductosAgua } from './pages/ProductosAgua'
import { ContactPage } from './showcase/ContactPage'
import { SystemPage } from './showcase/SystemPage'

type View = 'inicio' | 'contacto' | 'nosotros' | 'servicios' | 'ingenieria' | 'productosEnergia' | 'productosAgua' | 'system' | 'demo'

const VIEWS: Array<{ id: View; hash: string }> = [
  { id: 'inicio', hash: 'inicio' },
  { id: 'productosEnergia', hash: 'productos-energia' },
  { id: 'productosAgua', hash: 'productos-agua' },
  { id: 'servicios', hash: 'servicios' },
  { id: 'ingenieria', hash: 'ingenieria' },
  { id: 'nosotros', hash: 'nosotros' },
  { id: 'contacto', hash: 'contacto' },
  { id: 'system', hash: 'design-system' },
  { id: 'demo', hash: 'page' },
]

function fromHash(): View {
  const h = window.location.hash.replace('#', '')
  if (h === '') return 'inicio'
  if (h === 'formulario') return 'contacto'
  return VIEWS.find((v) => v.hash === h)?.id ?? 'inicio'
}

export function App() {
  const [view, setView] = useState<View>(fromHash)

  // Los enlaces del Navbar/Footer cambian el hash: sincronizar la vista.
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '')
      setView(fromHash())
      if (h !== 'formulario') window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      {view === 'inicio' && <Inicio />}
      {view === 'productosEnergia' && <ProductosEnergia />}
      {view === 'productosAgua' && <ProductosAgua />}
      {view === 'servicios' && <Auditoria />}
      {view === 'ingenieria' && <Ingenieria />}
      {view === 'nosotros' && <Nosotros />}
      {view === 'contacto' && <Contacto />}
      {view === 'system' && <SystemPage />}
      {view === 'demo' && <ContactPage />}
    </>
  )
}
