import { useState, type FormEvent } from 'react'
import {
  Navbar, Footer, Hero, Em, TrustItem, TrustList, Reveal,
  Section, Container, Grid, Stack, Row,
  SectionHeader, ContactCard, ContactMetaStrong, SocialLinks, ChecklistCard,
  Stat, StatBar, Steps, Accordion, Quote, CtaBand,
  Heading, Text, Button, Input, Select, Textarea, Checkbox, FormField, InlineGroup, Card,
  ShieldIcon, ClockIcon, PhoneIcon, MailIcon, MapPinIcon, ChatIcon, CalendarIcon, LockIcon,
  SunIcon, DropletIcon, ZapIcon, IconCircle, LeafIcon,
} from '@ds'
import { FOOTER } from '../pages/site'
import { FloorPlan } from './FloorPlan'
import { HeroVisual } from './HeroVisual'
import styles from './ContactPage.module.css'

const NAV = [
  { label: 'Productos', href: '#productos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contáctanos', href: '#contacto', active: true },
]

const SOCIAL = [
  { network: 'facebook' as const, href: 'https://facebook.com' },
  { network: 'instagram' as const, href: 'https://instagram.com' },
  { network: 'youtube' as const, href: 'https://youtube.com' },
  { network: 'linkedin' as const, href: 'https://linkedin.com' },
]

/** Página de contacto premium construida únicamente con componentes del sistema. */
export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 900)
  }

  return (
    <>
      <Navbar items={NAV} ctaHref="#formulario" phone="(787) 664-7676" />

      {/* ---------- HERO ---------- */}
      <Hero
        eyebrow="Estamos aquí para ayudarte"
        title={<>Obtén tu orientación <Em tone="highlight">personalizada</Em></>}
        lead="Uno de nuestros especialistas revisa tu consumo, identifica dónde se va tu energía y tu agua, y te propone un plan concreto de ahorro. Gratis y sin compromiso."
        actions={
          <>
            <Button size="lg" href="#formulario" arrow>Agenda tu evaluación</Button>
            <Button size="lg" variant="glass" href="tel:+17876647676" leadingIcon={<PhoneIcon size={18} />}>(787) 664-7676</Button>
          </>
        }
        aside={<HeroVisual />}
      >
        <TrustList>
          <TrustItem layout="horizontal" icon={<LeafIcon size={20} />} title="100% gratis" description="Sin compromiso" />
          <TrustItem layout="horizontal" icon={<ShieldIcon size={20} />} title="Asesoría experta" description="20+ años en Puerto Rico" />
          <TrustItem layout="horizontal" icon={<ClockIcon size={20} />} title="Respuesta rápida" description="Te contactamos en 24 h" />
        </TrustList>
      </Hero>

      {/* ---------- STATS ---------- */}
      <Section size="sm">
        <Container>
          <StatBar>
            <Stat value={20} suffix="+" label="años acompañando hogares y negocios" />
            <Stat value={5400} suffix="+" label="propiedades evaluadas en la isla" />
            <Stat value={32} suffix="%" label="ahorro promedio en energía tras la instalación" />
            <Stat value={24} suffix="h" label="tiempo máximo de respuesta a tu solicitud" />
          </StatBar>
        </Container>
      </Section>

      {/* ---------- FORMAS DE CONTACTO ---------- */}
      <Section>
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Contacto"
                title={<>Múltiples formas de <Em tone="brand">contactarnos</Em></>}
                lead="Elige el canal que prefieras. Respondemos en horario de oficina y, si escribes fuera de él, al siguiente día hábil."
              />
            </Reveal>
            <Grid minColumn="220px" gap={5}>
              <Reveal delay={0}>
                <ContactCard icon={<PhoneIcon size={22} />} title="Llámanos" value="(787) 664-7676" href="tel:+17876647676" emphasize meta="Lun - Vie · 8:00am - 5:00pm" />
              </Reveal>
              <Reveal delay={60}>
                <ContactCard icon={<MailIcon size={22} />} title="Escríbenos" value="info@ecostorepr.com" href="mailto:info@ecostorepr.com" meta="Respuesta el mismo día hábil." />
              </Reveal>
              <Reveal delay={120}>
                <ContactCard icon={<MapPinIcon size={22} />} title="Visítanos" meta={<><ContactMetaStrong>1354 Ave. F.D. Roosevelt, San Juan, PR 00920</ContactMetaStrong><br />Estacionamiento disponible.</>} />
              </Reveal>
              <Reveal delay={180}>
                <ContactCard icon={<ChatIcon size={22} />} title="Síguenos" meta="Consejos de ahorro, noticias y promociones.">
                  <SocialLinks links={SOCIAL} tone="outline" size="sm" />
                </ContactCard>
              </Reveal>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ---------- PROCESO ---------- */}
      <Section background="subtle">
        <Container>
          <Stack gap={12}>
            <Reveal>
              <SectionHeader
                label="Cómo funciona"
                title={<>De la primera llamada al <Em tone="brand">primer ahorro</Em></>}
                lead="Un proceso claro en cuatro pasos. Sabes qué pasa en cada momento y cuánto tarda."
              />
            </Reveal>
            <Reveal delay={80}>
              <Steps
                steps={[
                  { duration: 'Hoy', title: 'Nos cuentas tu caso', description: 'Rellenas el formulario o nos llamas. Un especialista te contacta en menos de 24 horas para agendar la visita.' },
                  { duration: 'Día 2–5', title: 'Evaluación en tu propiedad', description: 'Revisamos consumo, equipos, techos y plomería. Medimos, no estimamos.' },
                  { duration: 'Día 7', title: 'Propuesta con números', description: 'Recibes recomendaciones priorizadas, inversión, ahorro estimado y tiempo de retorno.' },
                  { duration: 'Semanas 2–4', title: 'Instalación y seguimiento', description: 'Instaladores certificados. Después, monitoreamos contigo la primera factura.' },
                ]}
              />
            </Reveal>
          </Stack>
        </Container>
      </Section>

      {/* ---------- PASTEL / ILUSTRACIÓN ---------- */}
      <Hero
        variant="light"
        eyebrow="Ahorro sin complicaciones"
        title={<>La eficiencia no tiene que <Em tone="brand">ser complicada.</Em></>}
        lead="Identificamos dónde se va tu energía y tu agua, y te decimos exactamente qué cambiar. Sin tecnicismos, sin compromiso."
        aside={<Reveal delay={120}><FloorPlan /></Reveal>}
      >
        <Reveal>
          <TrustList>
            <TrustItem light layout="horizontal" icon={<SunIcon size={22} />} title="Energía solar" description="Paneles y calentadores" />
            <TrustItem light layout="horizontal" icon={<DropletIcon size={22} />} title="Agua" description="Cisternas y filtración" />
            <TrustItem light layout="horizontal" icon={<ZapIcon size={22} />} title="Eficiencia" description="Auditorías y LED" />
          </TrustList>
        </Reveal>
      </Hero>

      {/* ---------- FORMULARIO ---------- */}
      <Section id="formulario">
        <Container>
          <div className={styles.formLayout}>
            <Reveal>
              <Card variant="mint" padding="lg" className={styles.formCard}>
                <Stack gap={8}>
                  <Stack gap={3}>
                    <Heading level="h1" as="h2" tone="brand">Agenda tu orientación <Em tone="brand">personalizada</Em></Heading>
                    <Text>Déjanos tus datos y nuestro equipo te contactará en menos de 24 horas.</Text>
                  </Stack>

                  {sent ? (
                    <Card variant="elevated">
                      <Row gap={4}>
                        <IconCircle tone="solid" size="md"><LeafIcon size={20} /></IconCircle>
                        <Stack gap={1}>
                          <Heading level="h4" tone="brand">Recibimos tu solicitud</Heading>
                          <Text tone="muted" size="sm">Un especialista te contactará en menos de 24 horas hábiles.</Text>
                        </Stack>
                      </Row>
                    </Card>
                  ) : (
                    <form onSubmit={onSubmit} noValidate>
                      <Stack gap={5}>
                        <Grid columns={2} gap={4} className={styles.formGrid}>
                          <FormField label="Nombre completo" required>
                            <Input name="nombre" placeholder="Ana Rivera" autoComplete="name" />
                          </FormField>
                          <FormField label="Teléfono" required>
                            <Input name="telefono" type="tel" placeholder="(787) 000-0000" autoComplete="tel" />
                          </FormField>
                          <FormField label="Correo electrónico" required>
                            <Input name="email" type="email" placeholder="ana@ejemplo.com" autoComplete="email" />
                          </FormField>
                          <FormField label="Tipo de propiedad">
                            <Select
                              name="tipo"
                              defaultValue="residencial"
                              options={[
                                { value: 'residencial', label: 'Residencial' },
                                { value: 'comercial', label: 'Comercial' },
                                { value: 'industrial', label: 'Industrial' },
                              ]}
                            />
                          </FormField>
                        </Grid>

                        <InlineGroup label="Me interesa:">
                          <Checkbox name="interes" value="energia" label="Eficiencia energética" />
                          <Checkbox name="interes" value="agua" label="Conservación de agua" />
                          <Checkbox name="interes" value="ambas" label="Ambas" />
                        </InlineGroup>

                        <FormField label="Cuéntanos sobre tu propiedad" hint="Metros cuadrados, número de personas, factura mensual aproximada… lo que sepas.">
                          <Textarea name="mensaje" placeholder="Casa de dos plantas en Guaynabo, 4 personas, factura de unos $280 al mes." />
                        </FormField>

                        <Button type="submit" size="lg" fullWidth loading={loading} arrow leadingIcon={<CalendarIcon size={20} />}>
                          Enviar solicitud
                        </Button>

                        <Text size="xs" tone="muted" align="center" className={styles.secure}>
                          <LockIcon size={14} /> Tu información está segura y no será compartida.
                        </Text>
                      </Stack>
                    </form>
                  )}
                </Stack>
              </Card>
            </Reveal>

            <Reveal delay={120} className={styles.aside}>
              <div className={styles.asideImage} role="img" aria-label="Especialista de EcoStore atendiendo una llamada">
                <span className={styles.asideImageHint}>Foto: especialista atendiendo (reemplazar)</span>
              </div>
              <ChecklistCard
                title="¿Qué incluye tu evaluación gratuita?"
                items={[
                  'Análisis detallado de tu consumo actual',
                  'Identificación de oportunidades de ahorro',
                  'Recomendaciones personalizadas',
                  'Estimado de ahorro potencial',
                  'Asesoría sin compromiso',
                ]}
                className={styles.checklist}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------- TESTIMONIAL + FAQ ---------- */}
      <Section background="subtle">
        <Container>
          <div className={styles.split}>
            <Reveal>
              <Quote name="Carmen Delgado" role="Propietaria · Guaynabo" initials="CD" rating={5}>
                Pensé que ahorrar energía era cambiar bombillas. EcoStore me enseñó dónde se iba realmente el dinero. La primera factura bajó $96.
              </Quote>
            </Reveal>
            <Reveal delay={100}>
              <Stack gap={6}>
                <SectionHeader align="center" level="h3" title="Preguntas frecuentes" className={styles.faqHead} />
                <Accordion
                  items={[
                    { question: '¿La evaluación tiene algún costo?', answer: 'No. La evaluación inicial y la propuesta son gratuitas. Solo pagas si decides ejecutar alguna de las recomendaciones, y siempre con un presupuesto cerrado antes de empezar.' },
                    { question: '¿Cuánto tarda la visita?', answer: 'Entre 45 y 90 minutos según el tamaño de la propiedad. Revisamos equipos, techos, plomería y tu historial de facturas.' },
                    { question: '¿Trabajan con negocios además de hogares?', answer: 'Sí. Atendemos residencias, comercios e industrias en toda la isla, con propuestas adaptadas a cada tipo de consumo.' },
                    { question: '¿Ofrecen financiamiento?', answer: 'Sí. Tenemos planes de financiamiento para sistemas solares y de agua, con cuotas diseñadas para que el ahorro mensual cubra la mayor parte del pago.' },
                  ]}
                />
              </Stack>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section size="sm">
        <Container>
          <Reveal>
            <CtaBand
              eyebrow="Empieza hoy"
              title={<>¿Listo para ver cuánto puedes <Em tone="highlight">ahorrar</Em>?</>}
              lead="Agenda tu evaluación gratuita. En una semana tendrás números concretos sobre la mesa."
              actions={<Button size="lg" variant="inverse" href="#formulario" arrow>Agenda tu evaluación</Button>}
              note="Sin compromiso · Respuesta en 24 h"
            />
          </Reveal>
        </Container>
      </Section>

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
