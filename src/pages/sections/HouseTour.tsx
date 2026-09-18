import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { Button } from '@ds'
import { SITE, ROUTES } from '../site'
import { initHouseTour } from './initHouseTour'
import './HouseTour.css'

const img = (p: string) => `${SITE.base}images/tour/${p}`

function Callout({
  at = '0 1',
  side,
  mobile,
  x,
  y,
  dx,
  dy,
  i,
  mini,
  children,
}: {
  at?: string
  side: 'left' | 'right' | 'up' | 'down'
  mobile?: string
  x: string
  y: string
  dx: number
  dy: number
  i?: number
  mini?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={mini ? 'co co-mini' : 'co'}
      data-at={at}
      data-side={side}
      data-m={mobile}
      data-i={i}
      style={{ '--x': x, '--y': y, '--dx': dx, '--dy': dy } as CSSProperties}
    >
      <span className="co-dot" />
      <span className="co-ring" />
      <svg className="co-line" aria-hidden="true">
        <line x1="0" y1="0" x2="0" y2="0" />
      </svg>
      <div className="co-label">{children}</div>
    </div>
  )
}

/** Recorrido scroll: zoom a la casa, habitaciones y señalamientos. */
export function HouseTour() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    return initHouseTour(rootRef.current)
  }, [])

  return (
    <section ref={rootRef} className="eco-tour" aria-label="Recorrido por un hogar EcoStore">
      <a className="skip" href="#eco-lo-tiene">
        Saltar el recorrido
      </a>

      <div className="stage" id="stage">
        <div className="hero" id="hero">
          <div className="plane plane-sky" data-plane="sky" aria-hidden="true" />
          <div className="plane plane-rays breathe" data-plane="rays" aria-hidden="true" />
          <div className="plane plane-clouds" data-plane="clouds" aria-hidden="true" />

          <div className="hero-copy" data-plane="copy">
            <img
              className="hero-logo"
              src={img('logo.webp')}
              alt="EcoStore"
              width={540}
              height={235}
              fetchPriority="high"
            />
            <h1>Tu tienda exclusiva de soluciones en eficiencia energética y conservación de agua</h1>
            <div className="hero-actions">
              <Button href={ROUTES.agenda} variant="primary" size="lg" arrow>
                Agenda una evaluación
              </Button>
              <a className="hero-phone" href={SITE.phoneHref}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                {SITE.phone}
              </a>
            </div>
          </div>

          <div className="plane plane-house" data-plane="house">
            <img
              src={img('house-1600.webp')}
              srcSet={`${img('house-900.webp')} 900w, ${img('house-1600.webp')} 1600w`}
              sizes="(max-width: 767px) 150vw, 84vw"
              width={1600}
              height={1067}
              alt="Casa equipada por EcoStore: paneles solares, calentador solar, cisterna y aire acondicionado en el techo"
              fetchPriority="high"
              decoding="async"
            />
            <div className="door-light" data-plane="door" aria-hidden="true" />
          </div>
          <div className="plane plane-haze" data-plane="haze" aria-hidden="true" />
        </div>

        <div
          className="scene"
          data-scene="entrada"
          data-w="1536"
          data-h="1024"
          data-fx=".5"
          data-fy=".45"
          data-fxm=".5"
          data-fxm2=".5"
          data-origin="50% 42%"
          style={{ '--ar': '1536/1024' } as CSSProperties}
        >
          <img
            data-src={img('entrada-1600.webp')}
            data-srcset={`${img('entrada-900.webp')} 900w, ${img('entrada-1600.webp')} 1600w`}
            sizes="100vw"
            width={1536}
            height={1024}
            alt="Entrada de la casa con el tapete EcoStore y el pasillo hacia la sala"
            decoding="async"
          />
          <p className="scene-caption" data-cap>
            Bienvenido a un hogar eficiente
          </p>
        </div>

        <div
          className="scene"
          data-scene="inverter"
          data-w="1536"
          data-h="1024"
          data-fx=".55"
          data-fy=".5"
          data-fxm=".5"
          data-fxm2=".8"
          data-pan=".36 .48"
          data-origin="50% 50%"
          style={{ '--ar': '1536/1024' } as CSSProperties}
        >
          <img
            data-src={img('inverter-1600.webp')}
            data-srcset={`${img('inverter-900.webp')} 900w, ${img('inverter-1600.webp')} 1600w`}
            sizes="100vw"
            width={1536}
            height={1024}
            alt="Cuarto técnico con inversor híbrido, baterías de litio y sistema de tratamiento de agua EcoStore"
            decoding="async"
          />
          <Callout at=".20 .32" side="left" mobile="right 34 28" x="47%" y="22%" dx={-70} dy={64}>
            <b>Inversor híbrido y baterías de litio</b>
            <span>Energía solar con respaldo cuando se va la luz</span>
          </Callout>
          <Callout at=".42 .54" side="left" x="80%" y="44%" dx={-60} dy={-70}>
            <b>Tratamiento de agua</b>
            <span>Filtración, suavización y purificación</span>
          </Callout>
        </div>

        <div
          className="scene"
          data-scene="sala"
          data-w="1536"
          data-h="900"
          data-fx=".42"
          data-fy=".4"
          data-fxm=".45"
          data-fxm2=".18"
          data-pan=".34 .44"
          data-origin="78% 45%"
          style={{ '--ar': '1536/900' } as CSSProperties}
        >
          <img
            data-src={img('sala-1600.webp')}
            data-srcset={`${img('sala-900.webp')} 900w, ${img('sala-1600.webp')} 1600w`}
            sizes="100vw"
            width={1536}
            height={900}
            alt="Sala con iluminación LED, aire acondicionado de alta eficiencia, cocina y electrodomésticos EcoStore"
            decoding="async"
          />
          <Callout at=".18 .30" side="left" mobile="down 0 44" x="45%" y="27%" dx={-90} dy={-80}>
            <b>Iluminación LED</b>
            <span>Mayor eficiencia, menor consumo</span>
          </Callout>
          <Callout at=".40 .52" side="right" x="14%" y="18%" dx={70} dy={90}>
            <b>Aire acondicionado de alta eficiencia</b>
            <span>Confort todo el año con menor consumo</span>
          </Callout>
          <Callout at=".58 .78" side="left" mobile="down 0 48" x="56%" y="52%" dx={-72} dy={44}>
            <b>Electrodomésticos eficientes</b>
            <span>Estufas eficientes · Refrigeradores · Lavadora y secadora 2 en 1 · Controles inteligentes</span>
          </Callout>
        </div>

        <div
          className="scene"
          data-scene="bano"
          data-w="1536"
          data-h="1024"
          data-fx=".6"
          data-fy=".4"
          data-fxm=".55"
          data-fxm2=".74"
          data-pan=".34 .44"
          data-origin="50% 50%"
          style={{ '--ar': '1536/1024' } as CSSProperties}
        >
          <img
            data-src={img('bano-1600.webp')}
            data-srcset={`${img('bano-900.webp')} 900w, ${img('bano-1600.webp')} 1600w`}
            sizes="100vw"
            width={1536}
            height={1024}
            alt="Baño con inodoro de alta eficiencia y ducha de bajo consumo"
            decoding="async"
          />
          <Callout at=".18 .30" side="right" x="48%" y="54%" dx={40} dy={-80}>
            <b>Inodoro de alta eficiencia</b>
            <span>Menor consumo de agua por descarga (dual flush)</span>
          </Callout>
          <Callout at=".40 .52" side="right" mobile="down 0 44" x="74%" y="22%" dx={46} dy={78}>
            <b>Ducha con tecnología eco-friendly</b>
            <span>Ahorra hasta 50 % de agua sin sacrificar la experiencia</span>
          </Callout>
        </div>

        <div
          className="scene scene-final"
          data-scene="final"
          data-w="1536"
          data-h="1024"
          data-contain="1"
          data-origin="62% 78%"
        >
          <img
            src={img('house-1600.webp')}
            srcSet={`${img('house-900.webp')} 900w, ${img('house-1600.webp')} 1600w`}
            sizes="100vw"
            width={1600}
            height={1067}
            alt="La casa completa con todos los equipos EcoStore señalados"
            decoding="async"
          />
          <Callout mini i={0} side="up" x="25%" y="14%" dx={0} dy={-26}>
            <b>Sistema fotovoltaico</b>
          </Callout>
          <Callout mini i={1} side="up" x="52%" y="9%" dx={0} dy={-26}>
            <b>Calentador solar</b>
          </Callout>
          <Callout mini i={2} side="up" x="69%" y="10%" dx={0} dy={-26}>
            <b>Cisterna</b>
          </Callout>
          <Callout mini i={3} side="right" x="80%" y="18%" dx={40} dy={-20}>
            <b>Aire acondicionado inverter</b>
          </Callout>
          <Callout mini i={4} side="right" x="62%" y="37%" dx={44} dy={-26}>
            <b>Iluminación LED</b>
          </Callout>
          <Callout mini i={5} side="right" x="92%" y="66%" dx={26} dy={-30}>
            <b>Cargador para auto eléctrico</b>
          </Callout>
          <Callout mini i={6} side="down" x="80%" y="84%" dx={0} dy={26}>
            <b>Tratamiento de agua</b>
          </Callout>
          <Callout mini i={7} side="left" x="44%" y="62%" dx={-44} dy={-8}>
            <b>Controles inteligentes</b>
          </Callout>
          <Callout mini i={8} side="left" x="17%" y="74%" dx={-46} dy={18}>
            <b>Lavadora / secadora 2 en 1</b>
          </Callout>
          <Callout mini i={9} side="down" x="29%" y="70%" dx={0} dy={26}>
            <b>Electrodomésticos eficientes</b>
          </Callout>
          <Callout mini i={10} side="left" x="22%" y="64%" dx={-40} dy={-6}>
            <b>Estufa de inducción</b>
          </Callout>
          <Callout mini i={11} side="left" x="13%" y="48%" dx={-38} dy={-12}>
            <b>Inodoros eficientes</b>
          </Callout>
          <Callout mini i={12} side="left" x="33%" y="26%" dx={-36} dy={-10}>
            <b>Aislamiento térmico</b>
          </Callout>
        </div>

        <div className="final-scrim" data-plane="finalScrim" aria-hidden="true" />
        <div className="final-copy">
          <ul className="final-legend" id="finalLegend" aria-hidden="true">
            <li>Sistema fotovoltaico</li>
            <li>Calentador solar</li>
            <li>Cisterna</li>
            <li>A/C inverter</li>
            <li>Iluminación LED</li>
            <li>Cargador EV</li>
            <li>Tratamiento de agua</li>
            <li>Controles inteligentes</li>
            <li>Lavadora / secadora 2 en 1</li>
            <li>Electrodomésticos eficientes</li>
            <li>Estufa de inducción</li>
            <li>Inodoros eficientes</li>
            <li>Aislamiento térmico</li>
          </ul>
          <p className="final-title" id="finalTitle">
            <b>ECO</b> lo tiene
          </p>
          <Button href={ROUTES.agenda} variant="primary" size="lg" arrow className="final-cta" id="finalCta" tabIndex={-1}>
            Agenda una evaluación
          </Button>
        </div>

        <div className="vignette" data-plane="vignette" aria-hidden="true" />
        <div className="room-chip" id="roomChip" aria-hidden="true" />
      </div>

      <nav className="route" id="route" aria-label="Recorrido por la casa">
        <svg viewBox="0 0 120 150" aria-hidden="true">
          <path className="rt-house" d="M10 42 L60 12 L110 42 V140 H10 Z" />
          <rect className="rt-room" data-room="bano" x="16" y="48" width="40" height="52" rx="3">
            <title>Baño</title>
          </rect>
          <rect className="rt-room" data-room="sala" x="60" y="48" width="44" height="52" rx="3">
            <title>Sala</title>
          </rect>
          <rect className="rt-room" data-room="inverter" x="16" y="104" width="40" height="32" rx="3">
            <title>Cuarto técnico</title>
          </rect>
          <rect className="rt-room" data-room="entrada" x="60" y="104" width="44" height="32" rx="3">
            <title>Entrada</title>
          </rect>
          <path className="rt-door" d="M74 140 V128 H90 V140" />
          <path className="rt-path" id="rtPath" d="M82 150 L82 120 L36 120 L36 74 L82 74 L82 150" />
          <circle className="rt-dot" id="rtDot" cx="82" cy="150" r="5" />
        </svg>
        <span className="route-label" id="routeLabel">
          Exterior
        </span>
      </nav>
    </section>
  )
}
