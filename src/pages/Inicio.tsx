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
      if (window.scrollY > 24) go()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!ready) return null

  return <Suspense fallback={null}>{children}</Suspense>
}

/** Home: hero de scroll; marcas, carrusel y footer esperan al primer scroll. */
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
