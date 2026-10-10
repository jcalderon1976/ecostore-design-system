import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Footer, MarqueeLogoScroller } from '@ds'
import { SOCIAL, FOOTER } from '../site'
import { PARTNER_WIDTHS, responsiveSrc, SIZES } from '../responsiveImage'

const EcoLoTiene = lazy(() => import('./EcoLoTiene').then((m) => ({ default: m.EcoLoTiene })))

function WhenNear({ children, minHeight }: { children: ReactNode; minHeight: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setOn(true)
        io.disconnect()
      },
      { rootMargin: '280px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {on ? children : <div style={{ minHeight }} aria-hidden="true" />}
    </div>
  )
}

const partner = (file: string) => ({
  ...responsiveSrc('images/partners', file, PARTNER_WIDTHS, 200),
  sizes: SIZES.partner,
})

const PARTNERS = [
  {
    ...partner('ge.png'),
    alt: 'GE Appliances',
    gradient: { from: '#8AA7FF', via: '#3B6FD4', to: '#1D3F99' },
  },
  {
    ...partner('ge-pro.png'),
    alt: 'GE Appliances PRO Solutions Center',
    gradient: { from: '#7EC8F0', via: '#1E6BB8', to: '#0B2E6B' },
  },
  {
    ...partner('haier.png'),
    alt: 'Haier',
    gradient: { from: '#4D8CFF', via: '#0050C8', to: '#00286B' },
  },
  {
    ...partner('hotpoint.png'),
    alt: 'Hotpoint',
    gradient: { from: '#FF8A7A', via: '#E03A2F', to: '#8F140C' },
  },
]

/** Marcas + ECO lo tiene + footer. Chunk aparte: no va en el JS del primer pintado. */
export default function HomeBelow() {
  return (
    <>
      <MarqueeLogoScroller
        title="Somos representantes autorizados"
        logos={PARTNERS}
        speed="normal"
      />
      <WhenNear minHeight={480}>
        <Suspense fallback={<div style={{ minHeight: 480 }} aria-hidden="true" />}>
          <EcoLoTiene />
        </Suspense>
      </WhenNear>
      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
