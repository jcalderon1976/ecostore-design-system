import { useEffect, useState } from 'react'
import { cx } from '@ds'
import { Inicio } from './pages/Inicio'
import { Contacto } from './pages/Contacto'
import { Nosotros } from './pages/Nosotros'
import { Auditoria } from './pages/Auditoria'
import { Ingenieria } from './pages/Ingenieria'
import { ProductosEnergia } from './pages/ProductosEnergia'
import { ProductosAgua } from './pages/ProductosAgua'
import { ContactPage } from './showcase/ContactPage'
import { SystemPage } from './showcase/SystemPage'
import styles from './App.module.css'

type View = 'inicio' | 'contacto' | 'nosotros' | 'servicios' | 'ingenieria' | 'productosEnergia' | 'productosAgua' | 'system' | 'demo'

const VIEWS: Array<{ id: View; label: string; hash: string }> = [
  { id: 'inicio', label: 'Inicio', hash: 'inicio' },
  { id: 'productosEnergia', label: 'Energía', hash: 'productos-energia' },
  { id: 'productosAgua', label: 'Agua', hash: 'productos-agua' },
  { id: 'servicios', label: 'Auditoría', hash: 'servicios' },
  { id: 'ingenieria', label: 'Ingeniería', hash: 'ingenieria' },
  { id: 'nosotros', label: 'Nosotros', hash: 'nosotros' },
  { id: 'contacto', label: 'Contacto', hash: 'contacto' },
  { id: 'system', label: 'Design System', hash: 'design-system' },
  { id: 'demo', label: 'Demo premium', hash: 'page' },
]

function fromHash(): View {
  const h = window.location.hash.replace('#', '')
  if (h === '') return 'inicio'
  return VIEWS.find((v) => v.hash === h)?.id ?? 'inicio'
}

export function App() {
  const [view, setView] = useState<View>(fromHash)

  // Los enlaces del Navbar/Footer cambian el hash: sincronizar la vista.
  useEffect(() => {
    const onHash = () => { setView(fromHash()); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (v: View) => {
    window.location.hash = VIEWS.find((x) => x.id === v)!.hash
    setView(v)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <div className={styles.switcher} role="tablist" aria-label="Vista">
        {VIEWS.map((v) => (
          <button key={v.id} role="tab" aria-selected={view === v.id} className={cx(styles.tab, view === v.id && styles.tabActive)} onClick={() => go(v.id)}>
            {v.label}
          </button>
        ))}
      </div>
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
