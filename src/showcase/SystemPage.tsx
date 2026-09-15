import type { ReactNode } from 'react'
import {
  colors, spacing, radius, shadow, typography,
  Button, Input, Select, Textarea, Checkbox, FormField, InlineGroup,
  Card, IconCircle, Heading, Highlight, Text, Eyebrow, Script,
  Container, Section, Stack, Row, Grid, Logo, SocialLinks,
  TrustItem, ContactCard, Checklist, ChecklistCard, SectionTitle, Hero, Reveal,
  Em, Lead, Label, Stat, StatBar, SectionHeader, Steps, Accordion, Quote, CtaBand,
  LeafIcon, PhoneIcon, MailIcon, MapPinIcon, ChatIcon, ClockIcon, ShieldIcon, CalendarIcon, LockIcon,
  CheckIcon, CheckCircleIcon, ChevronDownIcon, MenuIcon, CloseIcon, SunIcon, DropletIcon, ZapIcon,
  FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon,
} from '@ds'
import styles from './SystemPage.module.css'

const entries = (o: object) => Object.entries(o) as Array<[string, string]>

function Block({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className={styles.block}>
      <div className={styles.blockHead}>
        <Heading level="h3" tone="brand">{title}</Heading>
        {description && <Text size="sm" tone="muted">{description}</Text>}
      </div>
      <div className={styles.blockBody}>{children}</div>
    </section>
  )
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchColor} style={{ background: value }} />
      <div className={styles.swatchMeta}>
        <span>{name}</span>
        <code>{value}</code>
      </div>
    </div>
  )
}

const SOCIAL = [
  { network: 'facebook' as const, href: '#' },
  { network: 'instagram' as const, href: '#' },
  { network: 'youtube' as const, href: '#' },
  { network: 'linkedin' as const, href: '#' },
]

const ICONS: Array<[string, ReactNode]> = [
  ['Leaf', <LeafIcon />], ['Phone', <PhoneIcon />], ['Mail', <MailIcon />], ['MapPin', <MapPinIcon />],
  ['Chat', <ChatIcon />], ['Clock', <ClockIcon />], ['Shield', <ShieldIcon />], ['Calendar', <CalendarIcon />],
  ['Lock', <LockIcon />], ['Check', <CheckIcon />], ['CheckCircle', <CheckCircleIcon />], ['ChevronDown', <ChevronDownIcon />],
  ['Menu', <MenuIcon />], ['Close', <CloseIcon />], ['Sun', <SunIcon />], ['Droplet', <DropletIcon />], ['Zap', <ZapIcon />],
  ['Facebook', <FacebookIcon />], ['Instagram', <InstagramIcon />], ['Youtube', <YoutubeIcon />], ['Linkedin', <LinkedinIcon />],
]

export function SystemPage() {
  return (
    <>
      <Section background="inverse" size="lg">
        <Container>
          <Stack gap={5}>
            <Logo height={48} inverse />
            <Eyebrow inverse>Design System v0.1</Eyebrow>
            <Heading level="display" tone="inverse">
              EcoStore <Em tone="highlight">Design System</Em>
            </Heading>
            <Text size="lg" tone="inverseMuted" style={{ maxWidth: '60ch' }}>
              Tokens, componentes y patrones en React + TypeScript + CSS Modules para construir
              la experiencia EcoStore con consistencia. Verde de marca, acento naranja solar y lima como destacado.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <Stack gap={16}>
            {/* ---------------- COLOR ---------------- */}
            <Block title="Color" description="Escalas de marca y neutrales. Los componentes usan solo los alias semánticos (--eco-color-*).">
              <Stack gap={6}>
                <div>
                  <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Verde (marca)</Text>
                  <div className={styles.swatchRow}>
                    {entries(colors.green).map(([k, v]) => <Swatch key={k} name={`green-${k}`} value={v} />)}
                  </div>
                </div>
                <div>
                  <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Lima (destacado) y Naranja (acento)</Text>
                  <div className={styles.swatchRow}>
                    {entries(colors.lime).map(([k, v]) => <Swatch key={k} name={`lime-${k}`} value={v} />)}
                    {entries(colors.orange).map(([k, v]) => <Swatch key={k} name={`orange-${k}`} value={v} />)}
                  </div>
                </div>
                <div>
                  <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Celeste (pastel, ilustración y fondos)</Text>
                  <div className={styles.swatchRow}>
                    {entries(colors.sky).map(([k, v]) => <Swatch key={k} name={`sky-${k}`} value={v} />)}
                  </div>
                </div>
                <div>
                  <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Neutrales</Text>
                  <div className={styles.swatchRow}>
                    {entries(colors.neutral).map(([k, v]) => <Swatch key={k} name={`neutral-${k}`} value={v} />)}
                  </div>
                </div>
                <div>
                  <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Estado</Text>
                  <div className={styles.swatchRow}>
                    {entries(colors.state).map(([k, v]) => <Swatch key={k} name={k} value={v} />)}
                  </div>
                </div>
              </Stack>
            </Block>

            {/* ---------------- TIPOGRAFÍA ---------------- */}
            <Block title="Tipografía" description="Outfit para títulos, Instrument Serif itálica como acento editorial (una palabra por título), Inter para cuerpo, Caveat para la firma.">
              <Stack gap={5}>
                <Heading level="display">Display · Obtén tu orientación <Em tone="brand">personalizada</Em></Heading>
                <Lead>Lead · Uno de nuestros especialistas revisa tu consumo, identifica dónde se va tu energía y tu agua, y te propone un plan concreto de ahorro.</Lead>
                <Label>Label · Cómo funciona</Label>
                <Heading level="h1">H1 · Agenda tu orientación personalizada</Heading>
                <Heading level="h2">H2 · Múltiples formas de contactarnos</Heading>
                <Heading level="h3">H3 · ¿Qué incluye tu evaluación gratuita?</Heading>
                <Heading level="h4">H4 · Enlaces rápidos</Heading>
                <Text size="lg">Text lg · Déjanos tus datos y uno de nuestros especialistas se pondrá en contacto contigo.</Text>
                <Text>Text md · Más de 20 años ayudando a hogares y negocios en Puerto Rico a reducir su consumo de energía y agua.</Text>
                <Text size="sm" tone="muted">Text sm muted · Lun - Vie: 8:00am - 5:00pm</Text>
                <Text size="xs" tone="muted">Text xs · Tu información está segura y no será compartida.</Text>
                <Row gap={3}>
                  <Eyebrow>Estamos aquí para ayudarte</Eyebrow>
                  <Eyebrow plain>Sin fondo</Eyebrow>
                  <span style={{ background: 'var(--eco-green-900)', padding: 8, borderRadius: 999 }}><Eyebrow inverse>Sobre oscuro</Eyebrow></span>
                </Row>
                <div style={{ background: 'var(--eco-green-900)', padding: 24, borderRadius: 12, display: 'inline-block' }}>
                  <Script>Un futuro más verde</Script>
                </div>
                <Card padding="sm">
                  <code className={styles.code}>
                    heading: {typography.fontHeading}<br />body: {typography.fontBody}<br />script: {typography.fontScript}
                  </code>
                </Card>
              </Stack>
            </Block>

            {/* ---------------- ESPACIADO / RADIOS / SOMBRAS ---------------- */}
            <Block title="Espaciado, radios y elevación" description="Escala base 4px. Radios por nivel: sm 8 (chips) · md 12 (controles) · lg 20 (tarjetas) · xl 28 (contenedores) · full.">
              <Grid minColumn="280px" gap={8}>
                <Stack gap={2}>
                  {entries(spacing).map(([k, v]) => (
                    <Row key={k} gap={3}>
                      <code className={styles.codeSm} style={{ width: 80 }}>space-{k}</code>
                      <div style={{ height: 12, width: v, background: 'var(--eco-green-400)', borderRadius: 2 }} />
                      <Text size="xs" tone="muted">{v}</Text>
                    </Row>
                  ))}
                </Stack>
                <Row gap={4} align="flex-end">
                  {entries(radius).map(([k, v]) => (
                    <Stack key={k} gap={1} align="center">
                      <div style={{ width: 56, height: 56, background: 'var(--eco-green-100)', border: '2px solid var(--eco-green-500)', borderRadius: v }} />
                      <Text size="xs" tone="muted">{k}</Text>
                    </Stack>
                  ))}
                </Row>
                <Row gap={5} align="flex-end">
                  {entries(shadow).map(([k, v]) => (
                    <Stack key={k} gap={2} align="center">
                      <div style={{ width: 72, height: 56, background: '#fff', borderRadius: 10, boxShadow: v }} />
                      <Text size="xs" tone="muted">{k}</Text>
                    </Stack>
                  ))}
                </Row>
              </Grid>
            </Block>

            {/* ---------------- BOTONES ---------------- */}
            <Block title="Button" description="Variantes: primary · secondary · outline · ghost · accent · sky · inverse · glass. Forma pill por defecto, rounded para formularios. Prop arrow añade flecha que se desplaza. Tamaños: sm · md · lg. Estados: loading, disabled.">
              <Stack gap={5}>
                <Row gap={3}>
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="accent">Accent (pastel)</Button>
                  <Button variant="sky">Sky</Button>
                  <span style={{ background: 'var(--eco-green-900)', padding: 8, borderRadius: 999 }}><Button variant="glass">Glass</Button></span>
                  <span style={{ background: 'var(--eco-green-900)', padding: 8, borderRadius: 12 }}><Button variant="inverse">Inverse</Button></span>
                </Row>
                <Row gap={3}>
                  <Button size="sm" leadingIcon={<CalendarIcon size={16} />}>Small</Button>
                  <Button size="md" leadingIcon={<CalendarIcon size={18} />}>Agenda una evaluación</Button>
                  <Button size="lg" leadingIcon={<CalendarIcon size={20} />}>Enviar solicitud</Button>
                </Row>
                <Row gap={3}>
                  <Button loading>Enviando</Button>
                  <Button disabled>Deshabilitado</Button>
                  <Button variant="outline" trailingIcon={<ChevronDownIcon size={16} />}>Con ícono</Button>
                  <Button href="#" variant="secondary">Como enlace</Button>
                  <Button arrow>Con flecha</Button>
                  <Button shape="rounded" variant="outline">Rounded</Button>
                </Row>
              </Stack>
            </Block>

            {/* ---------------- FORMULARIOS ---------------- */}
            <Block title="Formularios" description="Input · Select · Textarea · Checkbox · FormField (label/hint/error) · InlineGroup.">
              <Card variant="mint" padding="lg">
                <Grid columns={2} gap={4}>
                  <FormField label="Nombre completo" required>
                    <Input placeholder="Nombre completo" />
                  </FormField>
                  <FormField label="Teléfono" hint="Formato: (787) 000-0000">
                    <Input placeholder="Teléfono" type="tel" />
                  </FormField>
                  <FormField label="Correo electrónico" error="Ingresa un correo válido.">
                    <Input placeholder="Correo electrónico" defaultValue="correo@invalido" />
                  </FormField>
                  <FormField label="Tipo de propiedad">
                    <Select defaultValue="residencial" options={[{ value: 'residencial', label: 'Residencial' }, { value: 'comercial', label: 'Comercial' }]} />
                  </FormField>
                </Grid>
                <div style={{ marginTop: 16 }}>
                  <InlineGroup label="Me interesa:">
                    <Checkbox label="Eficiencia Energética" defaultChecked />
                    <Checkbox label="Conservación de Agua" />
                    <Checkbox label="Ambas" />
                    <Checkbox label="Deshabilitado" disabled />
                  </InlineGroup>
                </div>
                <div style={{ marginTop: 16 }}>
                  <FormField label="Mensaje">
                    <Textarea placeholder="Cuéntanos brevemente sobre tu propiedad o necesidad" />
                  </FormField>
                </div>
              </Card>
            </Block>

            {/* ---------------- CARDS ---------------- */}
            <Block title="Card" description="Variantes: outlined · elevated · floating · mint · sky · peach. Sombras teñidas de verde en dos capas, sin borde duro. Prop interactive añade hover.">
              <Grid minColumn="200px" gap={4}>
                <Card><Text weight="semibold">Outlined</Text><Text size="sm" tone="muted">Borde sutil, sombra xs.</Text></Card>
                <Card variant="elevated"><Text weight="semibold">Elevated</Text><Text size="sm" tone="muted">Sombra md, sin borde.</Text></Card>
                <Card variant="mint"><Text weight="semibold">Mint</Text><Text size="sm" tone="muted">Fondo verde claro.</Text></Card>
                <Card variant="sky"><Text weight="semibold">Sky</Text><Text size="sm" tone="muted">Celeste pastel.</Text></Card>
                <Card variant="peach"><Text weight="semibold">Peach</Text><Text size="sm" tone="muted">Durazno pastel.</Text></Card>
                <Card variant="ink"><Text weight="semibold" tone="inverse">Ink</Text><Text size="sm" tone="inverseMuted">Malla verde oscura.</Text></Card>
                <div style={{ background: 'var(--eco-mesh-dark)', padding: 12, borderRadius: 20 }}><Card variant="glass"><Text weight="semibold" tone="inverse">Glass</Text><Text size="sm" tone="inverseMuted">Cristal sobre oscuro.</Text></Card></div>
                <div style={{ background: 'var(--eco-mesh-light)', padding: 12, borderRadius: 20 }}><Card variant="glassLight"><Text weight="semibold">Glass light</Text><Text size="sm" tone="muted">Cristal sobre pastel.</Text></Card></div>
                <Card variant="floating"><Text weight="semibold">Floating</Text><Text size="sm" tone="muted">Sombra lg, radio xl.</Text></Card>
                <Card interactive><Text weight="semibold">Interactive</Text><Text size="sm" tone="muted">Hover con elevación.</Text></Card>
              </Grid>
            </Block>

            {/* ---------------- ICONCIRCLE + ÍCONOS ---------------- */}
            <Block title="IconCircle e íconos" description="Tonos: soft · solid · ring · outline · outlineInverse · accent · peach · skySoft · bubble · bubbleGreen. Tamaños sm · md · lg · xl. Con data-icon-hover en el padre, pasan a sólido en hover.">
              <Stack gap={6}>
                <Row gap={4}>
                  <IconCircle tone="soft"><PhoneIcon /></IconCircle>
                  <IconCircle tone="solid"><MailIcon /></IconCircle>
                  <IconCircle tone="accent"><MapPinIcon /></IconCircle>
                  <IconCircle tone="outline"><FacebookIcon /></IconCircle>
                  <span style={{ background: 'var(--eco-green-900)', padding: 8, borderRadius: 999, display: 'inline-flex', gap: 8 }}>
                    <IconCircle tone="ring"><LeafIcon /></IconCircle>
                    <IconCircle tone="outlineInverse"><InstagramIcon /></IconCircle>
                  </span>
                  <IconCircle tone="peach"><SunIcon /></IconCircle>
                  <IconCircle tone="skySoft"><DropletIcon /></IconCircle>
                  <span style={{ background: 'var(--eco-sky-50)', padding: 8, borderRadius: 999, display: 'inline-flex', gap: 8 }}>
                    <IconCircle tone="bubble"><ZapIcon /></IconCircle>
                    <IconCircle tone="bubbleGreen"><LeafIcon /></IconCircle>
                  </span>
                  <IconCircle tone="soft" size="sm"><LeafIcon size={16} /></IconCircle>
                  <IconCircle tone="solid" size="lg"><LeafIcon size={28} /></IconCircle>
                </Row>
                <div className={styles.iconGrid}>
                  {ICONS.map(([name, node]) => (
                    <div key={name} className={styles.iconCell}>
                      {node}
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
                <Row gap={6}>
                  <SocialLinks links={SOCIAL} />
                  <span style={{ background: 'var(--eco-green-900)', padding: 8, borderRadius: 12 }}>
                    <SocialLinks links={SOCIAL} tone="outlineInverse" shape="square" />
                  </span>
                </Row>
              </Stack>
            </Block>

            {/* ---------------- PATRONES ---------------- */}
            <Block title="Patrones" description="Composiciones listas: SectionTitle, TrustItem, ContactCard, Checklist, ChecklistCard.">
              <Stack gap={8}>
                <SectionTitle eyebrow="Contacto" title="Múltiples formas de contactarnos" subtitle="Elige el canal que prefieras. Te respondemos a la brevedad." leaves level="h3" />

                <div style={{ background: 'var(--eco-green-900)', padding: 24, borderRadius: 16 }}>
                  <Row gap={8}>
                    <TrustItem icon={<LeafIcon size={22} />} title="100% Gratis" description="Evaluación sin compromiso" />
                    <TrustItem icon={<ShieldIcon size={22} />} title="Asesoría experta" description="Más de 20 años de experiencia" />
                    <TrustItem icon={<ClockIcon size={22} />} title="Respuesta rápida" description="Te contactaremos en 24 horas" />
                  </Row>
                </div>
                <Row gap={8}>
                  <TrustItem light layout="horizontal" icon={<SunIcon size={22} />} title="Energía Solar" description="Paneles y baterías" />
                  <TrustItem light layout="horizontal" icon={<DropletIcon size={22} />} title="Cisternas y Filtración" description="Agua segura" />
                  <TrustItem light layout="horizontal" icon={<ZapIcon size={22} />} title="Eficiencia Energética" description="Auditorías" />
                </Row>

                <Grid minColumn="220px" gap={5}>
                  <ContactCard icon={<PhoneIcon size={22} />} title="Llámanos" value="(787) 664-7676" href="tel:+17876647676" emphasize meta="Lun - Vie: 8:00am - 5:00pm" />
                  <ContactCard icon={<MailIcon size={22} />} title="Envíanos un correo" value="info@ecostorepr.com" href="mailto:info@ecostorepr.com" meta="Te responderemos a la brevedad." />
                  <ContactCard icon={<ChatIcon size={22} />} title="Síguenos" meta="Mantente al día con consejos, noticias y promociones.">
                    <SocialLinks links={SOCIAL} size="sm" />
                  </ContactCard>
                </Grid>

                <Grid minColumn="280px" gap={8}>
                  <Card>
                    <Checklist items={['Análisis detallado de tu consumo actual', 'Identificación de oportunidades de ahorro', 'Recomendaciones personalizadas']} />
                  </Card>
                  <div style={{ paddingRight: 32, paddingBottom: 32 }}>
                    <ChecklistCard title="¿Qué incluye tu evaluación gratuita?" items={['Análisis detallado de tu consumo actual', 'Identificación de oportunidades de ahorro', 'Recomendaciones personalizadas', 'Estimado de ahorro potencial', 'Asesoría sin compromiso']} />
                  </div>
                </Grid>
              </Stack>
            </Block>

            <Block title="Stat y StatBar" description="Cifras grandes con contador al entrar en viewport, separadas por hairlines. Dos columnas en móvil.">
              <StatBar>
                <Stat value={20} suffix="+" label="años en Puerto Rico" />
                <Stat value={5400} suffix="+" label="propiedades evaluadas" />
                <Stat value={32} suffix="%" label="ahorro promedio" />
                <Stat value={24} suffix="h" label="tiempo de respuesta" />
              </StatBar>
            </Block>

            <Block title="SectionHeader" description="Cabecera editorial: hairline, etiqueta a la izquierda, título y lead a la derecha. align=center para secciones simétricas.">
              <Stack gap={10}>
                <SectionHeader label="Contacto" title={<>Múltiples formas de <Em tone="brand">contactarnos</Em></>} lead="Elige el canal que prefieras. Respondemos en horario de oficina." actions={<Button variant="outline" size="sm" arrow>Ver todos</Button>} />
                <SectionHeader align="center" level="h3" title="Preguntas frecuentes" lead="Lo que más nos preguntan antes de la primera visita." />
              </Stack>
            </Block>

            <Block title="Steps" description="Proceso numerado (el orden es real). Duración opcional por paso.">
              <Steps steps={[
                { duration: 'Hoy', title: 'Nos cuentas tu caso', description: 'Formulario o llamada. Te contactamos en menos de 24 horas.' },
                { duration: 'Día 2–5', title: 'Evaluación en tu propiedad', description: 'Revisamos consumo, equipos, techos y plomería.' },
                { duration: 'Día 7', title: 'Propuesta con números', description: 'Inversión, ahorro estimado y tiempo de retorno.' },
                { duration: 'Semanas 2–4', title: 'Instalación y seguimiento', description: 'Instaladores certificados y monitoreo de la primera factura.' },
              ]} />
            </Block>

            <Block title="Quote y Accordion" description="Testimonial en serif itálica con valoración; FAQ con hairlines y altura animada.">
              <Grid minColumn="320px" gap={12}>
                <Quote name="Carmen Delgado" role="Propietaria · Guaynabo" initials="CD" rating={5}>
                  Pensé que ahorrar energía era cambiar bombillas. EcoStore me enseñó dónde se iba realmente el dinero.
                </Quote>
                <Accordion items={[
                  { question: '¿La evaluación tiene algún costo?', answer: 'No. La evaluación inicial y la propuesta son gratuitas.' },
                  { question: '¿Cuánto tarda la visita?', answer: 'Entre 45 y 90 minutos según el tamaño de la propiedad.' },
                  { question: '¿Ofrecen financiamiento?', answer: 'Sí, con cuotas diseñadas para que el ahorro cubra la mayor parte del pago.' },
                ]} />
              </Grid>
            </Block>

            <Block title="CtaBand" description="Banda de conversión antes del footer: malla verde, hoja como marca de agua, CTA inverso.">
              <CtaBand
                eyebrow="Empieza hoy"
                title={<>¿Listo para ver cuánto puedes <Em tone="highlight">ahorrar</Em>?</>}
                lead="Agenda tu evaluación gratuita. En una semana tendrás números concretos."
                actions={<Button size="lg" variant="inverse" arrow>Agenda tu evaluación</Button>}
                note="Sin compromiso · Respuesta en 24 h"
              />
            </Block>

            <Block title="Hero claro (pastel)" description="Variante light: celeste pastel, onda blanca y slot lateral para ilustración. Los TrustItem light usan burbujas blancas con ícono naranja.">
              <div style={{ borderRadius: 'var(--eco-radius-xl)', overflow: 'hidden', border: '1px solid var(--eco-sky-100)' }}>
                <Hero
                  variant="light"
                  eyebrow="Ahorro sin complicaciones"
                  title={<>La eficiencia no tiene que <Highlight brand>ser complicada.</Highlight></>}
                  lead="Identificamos dónde se va tu energía y tu agua, y te decimos exactamente qué cambiar."
                  aside={<Card variant="elevated" padding="lg"><Stack gap={3}><Heading level="h4">Slot lateral</Heading><Text size="sm">Ilustración, foto o tarjeta. Ver la página de ejemplo para el plano con burbujas.</Text></Stack></Card>}
                >
                  <Row gap={6}>
                    <TrustItem light layout="horizontal" icon={<SunIcon size={22} />} title="Energía solar" description="Paneles y calentadores" />
                    <TrustItem light layout="horizontal" icon={<DropletIcon size={22} />} title="Agua" description="Cisternas y filtración" />
                  </Row>
                </Hero>
              </div>
            </Block>

            <Block title="Reveal" description="Entrada fade + 14px al entrar en viewport. Escalona tarjetas con delay = índice * 60.">
              <Grid minColumn="180px" gap={4}>
                {[0, 1, 2, 3].map((i) => (
                  <Reveal key={i} delay={i * 60} once={false}>
                    <Card><Text weight="semibold">Tarjeta {i + 1}</Text><Text size="sm" tone="muted">delay {i * 60}ms</Text></Card>
                  </Reveal>
                ))}
              </Grid>
            </Block>

            <Card variant="sky" padding="lg">
              <Row justify="space-between" gap={4}>
                <Stack gap={1}>
                  <Heading level="h4" tone="brand">Navbar, Hero y Footer</Heading>
                  <Text size="sm">Los patrones de página completa se muestran ensamblados en la pestaña "Página de ejemplo".</Text>
                </Stack>
                <Button href="#page" onClick={() => { window.location.hash = 'page'; window.location.reload() }} leadingIcon={<CalendarIcon size={18} />}>
                  Ver página de ejemplo
                </Button>
              </Row>
            </Card>
          </Stack>
        </Container>
      </Section>
    </>
  )
}
