import { useEffect, useState, type FormEvent } from 'react'
import {
  Navbar, Footer, Hero, Em, TrustItem, TrustList, Reveal,
  Section, Container, Grid, Stack, Row,
  SectionTitle, ContactCard, ContactMetaStrong, SocialLinks, ChecklistCard,
  Heading, Text, Button, Input, Select, Textarea, Checkbox, FormField, InlineGroup, Card, IconCircle,
  LeafIcon, ShieldIcon, ClockIcon, PhoneIcon, MailIcon, MapPinIcon, ChatIcon, CalendarIcon, LockIcon,
} from '@ds'
import { SITE, NAV, SOCIAL, FOOTER, ROUTES } from './site'
import { EcoLoTiene } from './sections/EcoLoTiene'
import styles from './Contacto.module.css'

const IMG = {
  hero: `${SITE.base}images/hero-van.jpg`,
  especialista: `${SITE.base}images/especialista.jpg`,
}
const CONTACT = SITE
const NAV_ITEMS = NAV('contacto')

/**
 * Página de contacto de EcoStore.
 * Estructura de la referencia: hero con fotografía, formas de contacto,
 * formulario con foto del especialista y checklist, footer.
 */
type Interes = 'energia' | 'agua' | 'ambas' | ''

export function Contacto() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [interes, setInteres] = useState<Interes>('')

  useEffect(() => {
    const go = () => {
      if (window.location.hash.replace('#', '') !== 'formulario') return
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      window.setTimeout(() => {
        document.getElementById('formulario')?.scrollIntoView({
          behavior: reduce ? 'auto' : 'smooth',
          block: 'start',
        })
      }, 50)
    }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Sustituir por la llamada real al backend / servicio de formularios.
    setTimeout(() => { setLoading(false); setSent(true) }, 900)
  }

  return (
    <>
      <Navbar items={NAV_ITEMS} ctaHref={ROUTES.agenda} phone={CONTACT.phone} phoneHref={CONTACT.phoneHref} />

      {/* ---------- HERO ---------- */}
      <Hero
        imageUrl={IMG.hero}
        className={styles.hero}
        eyebrow="Estamos aquí para ayudarte"
        title={<>Obtén tu orientación <Em tone="highlight">personalizada</Em></>}
        lead="Déjanos tus datos y uno de nuestros especialistas se pondrá en contacto contigo para ayudarte a comenzar a ahorrar energía y agua."
      >
        <TrustList>
          <TrustItem icon={<LeafIcon size={22} />} title="100% Gratis" description={<>Evaluación sin<br />compromiso</>} />
          <TrustItem icon={<ShieldIcon size={22} />} title="Asesoría experta" description={<>Más de 20 años<br />de experiencia</>} />
          <TrustItem icon={<ClockIcon size={22} />} title="Respuesta rápida" description={<>Te contactaremos<br />en 24 horas</>} />
        </TrustList>
      </Hero>

      {/* ---------- FORMAS DE CONTACTO ---------- */}
      <Section>
        <Container>
          <Stack gap={10}>
            <Reveal>
              <SectionTitle title={<>Múltiples formas de <Em tone="brand">contactarnos</Em></>} leaves level="h2" />
            </Reveal>
            <Grid minColumn="220px" gap={5}>
              <Reveal delay={0}>
                <ContactCard icon={<PhoneIcon size={22} />} title="Llámanos" value={CONTACT.phone} href={CONTACT.phoneHref} emphasize meta={CONTACT.hours} trailDelay={0} />
              </Reveal>
              <Reveal delay={60}>
                <ContactCard icon={<MailIcon size={22} />} title="Envíanos un correo" value={CONTACT.email} href={`mailto:${CONTACT.email}`} meta={<>Te responderemos a<br />la brevedad.</>} trailDelay={0.5} />
              </Reveal>
              <Reveal delay={120}>
                <ContactCard
                  icon={<MapPinIcon size={22} />}
                  title="Visítanos"
                  meta={
                    <>
                      <ContactMetaStrong>1354 Avenida F.D. Roosevelt<br />San Juan, 00920, Puerto Rico</ContactMetaStrong>
                      <br />
                      <a href={CONTACT.directions} className={styles.mapLink} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
                    </>
                  }
                  trailDelay={1}
                />
              </Reveal>
              <Reveal delay={180}>
                <ContactCard icon={<ChatIcon size={22} />} title="Síguenos" meta={<>Mantente al día con consejos,<br />noticias y promociones.</>} trailDelay={1.5}>
                  <SocialLinks links={SOCIAL} tone="outline" size="sm" />
                </ContactCard>
              </Reveal>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ---------- FORMULARIO + ESPECIALISTA ---------- */}
      <Section id="formulario" size="sm" className={styles.formSection}>
        <Container>
          <div className={styles.formLayout}>
            <Reveal>
              <Card variant="mint" padding="lg" className={styles.formCard}>
                <Stack gap={6}>
                  <Stack gap={3}>
                    <Heading level="h1" as="h2" tone="brand">Agenda tu orientación <Em tone="brand">personalizada</Em></Heading>
                    <Text>Déjanos tus datos y nuestro equipo te contactará.</Text>
                  </Stack>

                  {sent ? (
                    <Card variant="elevated">
                      <Row gap={4}>
                        <IconCircle tone="solid" size="md"><LeafIcon size={20} /></IconCircle>
                        <Stack gap={1}>
                          <Heading level="h4" tone="brand">¡Gracias! Recibimos tu solicitud.</Heading>
                          <Text tone="muted" size="sm">Uno de nuestros especialistas te contactará en menos de 24 horas.</Text>
                        </Stack>
                      </Row>
                    </Card>
                  ) : (
                    <form onSubmit={onSubmit} noValidate>
                      <Stack gap={4}>
                        <Grid columns={2} gap={4} className={styles.formGrid}>
                          <FormField required>
                            <Input name="nombre" placeholder="Nombre completo" autoComplete="name" aria-label="Nombre completo" />
                          </FormField>
                          <FormField required>
                            <Input name="telefono" type="tel" placeholder="Teléfono" autoComplete="tel" aria-label="Teléfono" />
                          </FormField>
                          <FormField required>
                            <Input name="email" type="email" placeholder="Correo electrónico" autoComplete="email" aria-label="Correo electrónico" />
                          </FormField>
                          <FormField>
                            <Select
                              name="tipo"
                              defaultValue="residencial"
                              aria-label="Tipo de propiedad"
                              options={[
                                { value: 'residencial', label: 'Residencial' },
                                { value: 'comercial', label: 'Comercial' },
                                { value: 'industrial', label: 'Industrial' },
                              ]}
                            />
                          </FormField>
                        </Grid>

                        <InlineGroup label="Me interesa:">
                          <Checkbox name="interes" value="energia" label="Eficiencia Energética" checked={interes === 'energia'} onChange={() => setInteres('energia')} />
                          <Checkbox name="interes" value="agua" label="Conservación de Agua" checked={interes === 'agua'} onChange={() => setInteres('agua')} />
                          <Checkbox name="interes" value="ambas" label="Ambas" checked={interes === 'ambas'} onChange={() => setInteres('ambas')} />
                        </InlineGroup>

                        <FormField>
                          <Textarea name="mensaje" placeholder="Cuéntanos brevemente sobre tu propiedad o necesidad" aria-label="Mensaje" />
                        </FormField>

                        <Button type="submit" size="lg" fullWidth loading={loading} leadingIcon={<CalendarIcon size={20} />}>
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
              <img
                src={IMG.especialista}
                alt="Especialista de EcoStore atendiendo una llamada con audífonos en la oficina"
                className={styles.asideImage}
                loading="lazy"
              />
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

      <EcoLoTiene />

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
