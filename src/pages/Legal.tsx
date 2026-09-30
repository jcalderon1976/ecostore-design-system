import { useEffect, type ReactNode } from 'react'
import {
  Navbar,
  Footer,
  Section,
  Container,
  Stack,
  Heading,
  Lead,
  Text,
  Eyebrow,
} from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { SEO } from './seo'
import { SeoHead } from './SeoHead'
import styles from './Legal.module.css'

function LegalShell({
  title,
  lead,
  seo,
  children,
}: {
  title: string
  lead: string
  seo: (typeof SEO)['privacidad']
  children: ReactNode
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <SeoHead {...seo} />
      <Navbar
        items={NAV('inicio')}
        ctaHref={ROUTES.agenda}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
      <Section size="sm">
        <Container narrow>
          <Stack gap={6}>
            <Eyebrow>Legal</Eyebrow>
            <Heading level="h1">{title}</Heading>
            <Lead>{lead}</Lead>
            <Stack gap={8} className={styles.article}>
              {children}
            </Stack>
            <Text size="sm" tone="muted" className={styles.updated}>
              Última actualización: 28 de septiembre de 2026.
            </Text>
          </Stack>
        </Container>
      </Section>
      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack gap={3} as="section">
      <Heading level="h2">{title}</Heading>
      {children}
    </Stack>
  )
}

/** Política de privacidad: qué datos recoge el sitio y cómo los usa EcoStore. */
export function Privacidad() {
  return (
    <LegalShell
      title="Política de privacidad"
      lead="Explica cómo EcoStore recopila, usa y protege la información que nos das al usar este sitio o al solicitar una evaluación."
      seo={SEO.privacidad}
    >
      <Block title="Quiénes somos">
        <Text>
          EcoStore opera este sitio desde {SITE.address}. Puedes escribirnos a{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> o llamarnos al{' '}
          <a href={SITE.phoneHref}>{SITE.phone}</a>.
        </Text>
      </Block>
      <Block title="Qué información recopilamos">
        <Text>
          Cuando envías el formulario de contacto, recibimos el nombre, teléfono, correo,
          tipo de propiedad, interés (energía, agua o ambos) y el mensaje que escribas.
          También se recogen datos técnicos habituales del navegador, como dirección IP
          aproximada y páginas visitadas, para que el sitio funcione y se pueda medir su uso.
        </Text>
      </Block>
      <Block title="Para qué la usamos">
        <Text>Usamos esa información para:</Text>
        <ul>
          <li>Responder tu solicitud y coordinar una evaluación o asesoría.</li>
          <li>Comunicarnos contigo sobre productos, servicios o el estado de tu consulta.</li>
          <li>Mejorar el sitio y detectar errores o usos indebidos.</li>
          <li>Cumplir obligaciones legales cuando aplique.</li>
        </ul>
      </Block>
      <Block title="Con quién la compartimos">
        <Text>
          No vendemos tus datos. Podemos compartirlos con proveedores que nos ayudan a
          operar el sitio (por ejemplo, el servicio que entrega el correo del formulario)
          y solo en la medida necesaria para esa función. También los revelaremos si la
          ley lo exige.
        </Text>
      </Block>
      <Block title="Conservación y derechos">
        <Text>
          Guardamos los datos de contacto el tiempo necesario para atender tu solicitud y
          las obligaciones que apliquen. Para acceder, corregir o pedir que eliminemos tu
          información, escríbenos a {SITE.email}.
        </Text>
      </Block>
      <Block title="Enlaces de terceros">
        <Text>
          Este sitio puede incluir enlaces a mapas, redes sociales u otros servicios. Su
          política de privacidad es independiente de la nuestra.
        </Text>
      </Block>
    </LegalShell>
  )
}

/** Términos de uso del sitio y de las solicitudes de evaluación. */
export function Terminos() {
  return (
    <LegalShell
      title="Términos de uso"
      lead="Condiciones para usar el sitio de EcoStore y para las solicitudes de orientación o evaluación que envíes por este medio."
      seo={SEO.terminos}
    >
      <Block title="El sitio">
        <Text>
          El contenido de este sitio es informativo. Los productos, precios, disponibilidad
          y ahorros descritos son orientativos y pueden cambiar. Una solicitud en línea no
          constituye un contrato de compraventa ni una cotización vinculante.
        </Text>
      </Block>
      <Block title="Evaluaciones y servicios">
        <Text>
          Al pedirnos una evaluación, nos autorizas a contactarte con los datos que
          enviaste. Cualquier trabajo, instalación o venta se formaliza por separado, con
          las condiciones que acordemos por escrito.
        </Text>
      </Block>
      <Block title="Uso aceptable">
        <Text>
          No debes usar el formulario para envíos automáticos, datos falsos o contenido
          ilícito. Podemos rechazar o ignorar solicitudes que parezcan fraudulentas o
          abusivas.
        </Text>
      </Block>
      <Block title="Propiedad intelectual">
        <Text>
          Marcas, textos, fotografías y diseño de EcoStore pertenecen a sus titulares.
          No está permitido copiarlos ni usarlos con fines comerciales sin permiso.
        </Text>
      </Block>
      <Block title="Limitación">
        <Text>
          En la medida que permita la ley de Puerto Rico, EcoStore no responde por daños
          indirectos derivados del uso de este sitio o de información publicada aquí. El
          sitio se ofrece “tal cual”.
        </Text>
      </Block>
      <Block title="Contacto">
        <Text>
          Preguntas sobre estos términos: {SITE.email} · {SITE.phone} · {SITE.address}.
        </Text>
      </Block>
    </LegalShell>
  )
}
