import { Navbar, Footer, Hero, Em, Stack, Button, CalendarIcon } from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { SEO, breadcrumbJsonLd, faqJsonLd } from './seo'
import { SeoHead } from './SeoHead'
import { ServiceGuide } from './ServiceGuide'
import { EcoLoTiene } from './sections/EcoLoTiene'

const FAQ = [
  {
    question: '¿EcoStore vende e instala sistemas solares en Puerto Rico?',
    answer:
      'Sí. Orientamos sistemas de paneles, inversores y baterías para hogares y negocios en Puerto Rico. La configuración depende del techo, el consumo y si necesitas respaldo.',
  },
  {
    question: '¿Qué incluye una evaluación de energía solar?',
    answer:
      'Revisamos tu factura, el espacio de techo o terreno, el consumo y si buscas ahorro, respaldo o ambos. Con eso te indicamos qué tipo de sistema tiene sentido y los siguientes pasos, sin compromiso de compra.',
  },
  {
    question: '¿Qué factores cambian el costo y el ahorro?',
    answer:
      'El tamaño del sistema, el tipo de inversor y batería, la estructura del techo, permisos, el consumo actual y la tarifa eléctrica. Por eso no publicamos un precio único: se estima caso por caso.',
  },
  {
    question: '¿Atienden residencial y comercial?',
    answer:
      'Sí. Trabajamos con residencias, comercios e industria liviana. Si el proyecto requiere ingeniería o permisología, lo canalizamos con el equipo de servicios de EcoStore.',
  },
]

const BLOCKS = [
  {
    title: 'Para quién aplica',
    body: 'Hogares y negocios en Puerto Rico que quieren bajar la factura, tener respaldo o combinar ambas cosas. Si el techo no sirve o el consumo es muy bajo, te lo decimos en la evaluación.',
  },
  {
    title: 'Cómo funciona',
    body: 'Los paneles generan electricidad; el inversor la convierte para tu casa. Las baterías guardan energía para la noche o un apagón. El diseño se ajusta a tu carga y a las reglas locales.',
  },
  {
    title: 'Qué incluye la evaluación',
    body: 'Revisión de consumo, orientación de equipos (paneles, inversor, baterías) y una conversación clara de alcance. No sustituye un plano final ni un contrato de instalación.',
  },
  {
    title: 'Qué mueve el ahorro',
    body: 'Tu kWh mensual, las horas de sol útiles, sombras, orientación del techo y si el sistema está dimensionado de más o de menos. El ahorro real se estima con tus datos, no con un porcentaje genérico.',
  },
]

export function EnergiaSolar() {
  const seo = SEO.energiaSolar
  return (
    <>
      <SeoHead
        {...seo}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Energía solar', path: seo.path },
          ]),
          faqJsonLd(FAQ),
        ]}
      />
      <Navbar items={NAV('energiaSolar')} ctaHref={ROUTES.agenda} phone={SITE.phone} phoneHref={SITE.phoneHref} />
      <Hero
        imageUrl={`${SITE.base}images/energia/placas.webp`}
        eyebrow="Energía solar"
        title={<>Energía <Em tone="highlight">solar</Em> para Puerto Rico</>}
        lead="Paneles, inversores y baterías para generar tu propia electricidad. Te ayudamos a ver si un sistema solar encaja con tu techo, tu factura y tu necesidad de respaldo."
      >
        <Stack gap={8} align="flex-start">
          <Button size="lg" href={ROUTES.agenda} leadingIcon={<CalendarIcon size={20} />} arrow>
            Solicita una evaluación
          </Button>
        </Stack>
      </Hero>
      <ServiceGuide
        lead="EcoStore, en San Juan, orienta sistemas solares para residencias y negocios en Puerto Rico. El objetivo es dimensionar bien: ni un sistema que se quede corto ni uno que pagues de más."
        blocks={BLOCKS}
        faq={FAQ}
        catalogHref={`${ROUTES.productosEnergia}/solares`}
        catalogLabel="Ver equipos solares"
      />
      <EcoLoTiene />
      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
