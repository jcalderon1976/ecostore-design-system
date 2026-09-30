import { Navbar, Footer, Hero, Em, Stack, Button, CalendarIcon } from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { SEO, breadcrumbJsonLd, faqJsonLd } from './seo'
import { SeoHead } from './SeoHead'
import { ServiceGuide } from './ServiceGuide'
import { EcoLoTiene } from './sections/EcoLoTiene'

const FAQ = [
  {
    question: '¿Un calentador solar funciona todo el año en Puerto Rico?',
    answer:
      'El clima de la isla favorece el agua caliente solar. En días nublados o de alta demanda, muchos sistemas combinan el tanque solar con un respaldo. En la evaluación vemos consumo de agua caliente y espacio en techo.',
  },
  {
    question: '¿Calentador solar o heat pump?',
    answer:
      'El solar aprovecha el sol directo; el heat pump usa electricidad de forma más eficiente que un calentador eléctrico convencional. La mejor opción depende del techo, la demanda de agua y si ya tienes o planeas placas solares.',
  },
  {
    question: '¿Qué incluye una evaluación de agua caliente?',
    answer:
      'Cuántas personas usan agua caliente, dónde iría el tanque, el estado del techo y si buscas bajar electricidad, sustituir un calentador que falló o ambos. Sales con una orientación de equipo, no con una venta automática.',
  },
  {
    question: '¿Instalan en hogar y negocio?',
    answer:
      'Sí. Duchas y cocinas residenciales, y usos comerciales con demanda continua, se evalúan aparte porque el tamaño del tanque y el respaldo cambian.',
  },
]

const BLOCKS = [
  {
    title: 'Para quién aplica',
    body: 'Familias y negocios que pagan mucha electricidad por calentar agua, o que quieren dejar de depender de un calentador eléctrico o de gas. Si el techo no tiene sol útil, exploramos heat pump u otras opciones.',
  },
  {
    title: 'Cómo funciona',
    body: 'Los calentadores solares de tubos captan calor y lo guardan en un tanque. El agua llega caliente a las llaves con poca o ninguna resistencia eléctrica cuando hay sol suficiente.',
  },
  {
    title: 'Qué incluye la evaluación',
    body: 'Uso de agua caliente, ubicación del tanque, viabilidad de techo y comparación honesta entre solar y bomba de calor cuando ambas aplican.',
  },
  {
    title: 'Qué mueve el ahorro',
    body: 'Cuánta agua calientas hoy, el clima de tu zona, sombras, el aislamiento del tanque y si el equipo está sobredimensionado. El ahorro se estima con tu patrón de uso.',
  },
]

export function CalentadoresSolares() {
  const seo = SEO.calentadoresSolares
  return (
    <>
      <SeoHead
        {...seo}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Calentadores solares', path: seo.path },
          ]),
          faqJsonLd(FAQ),
        ]}
      />
      <Navbar items={NAV('calentadoresSolares')} ctaHref={ROUTES.agenda} phone={SITE.phone} phoneHref={SITE.phoneHref} />
      <Hero
        imageUrl={`${SITE.base}images/agua/calentador-solar.webp`}
        eyebrow="Agua caliente"
        title={<>Calentadores <Em tone="highlight">solares</Em></>}
        lead="Agua caliente con el sol de Puerto Rico. Te ayudamos a elegir entre calentador solar de tubos y alternativas de bomba de calor según tu techo y tu consumo."
      >
        <Stack gap={8} align="flex-start">
          <Button size="lg" href={ROUTES.agenda} leadingIcon={<CalendarIcon size={20} />} arrow>
            Solicita una evaluación
          </Button>
        </Stack>
      </Hero>
      <ServiceGuide
        lead="En EcoStore, San Juan, orientamos agua caliente eficiente para residencias y negocios. El equipo correcto es el que cubre tu demanda sin pagar capacidad que no usas."
        blocks={BLOCKS}
        faq={FAQ}
        catalogHref={`${ROUTES.productosAgua}/calentador-solar`}
        catalogLabel="Ver calentadores"
      />
      <EcoLoTiene />
      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
