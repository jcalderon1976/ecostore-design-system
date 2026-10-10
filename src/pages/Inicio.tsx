import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { Navbar } from '@ds'
import { SITE, NAV, ROUTES } from './site'
import { SEO, webSiteJsonLd } from './seo'
import { SeoHead } from './SeoHead'
import { EcoHero } from './sections/EcoHero'

const HomeBelow = lazy(() => import('./sections/HomeBelow'))

function AfterHero({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    const go = () => {
      if (done) return
      done = true
      setReady(true)
    }

    const onScroll = () => {
      if (window.scrollY > 48) go()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let idleId = 0
    if (typeof requestIdleCallback === 'function') {
      idleId = requestIdleCallback(go, { timeout: 900 })
    } else {
      idleId = window.setTimeout(go, 1)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  if (!ready) return <div style={{ minHeight: '90vh' }} aria-hidden="true" />

  return (
    <Suspense fallback={<div style={{ minHeight: '90vh' }} aria-hidden="true" />}>
      {children}
    </Suspense>
  )
}

/** Home: hero de scroll; el resto espera al idle o al primer scroll. */
export function Inicio() {
  return (
    <>
      <SeoHead {...SEO.inicio} jsonLd={[webSiteJsonLd()]} />
      <Navbar
        overlay
        overlayUntil=".eco-hero-overlay-until"
        items={NAV('inicio')}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />

      <EcoHero />

      <AfterHero>
        <HomeBelow />
      </AfterHero>
    </>
  )
}
