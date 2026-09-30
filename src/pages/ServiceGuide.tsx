import {
  Accordion,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Section,
  Stack,
  Text,
} from '@ds'
import { ROUTES } from './site'
import styles from './ServiceGuide.module.css'

export type GuideBlock = { title: string; body: string }
export type GuideFaq = { question: string; answer: string }

export function ServiceGuide({
  lead,
  blocks,
  faq,
  catalogHref,
  catalogLabel = 'Ver productos',
}: {
  lead: string
  blocks: GuideBlock[]
  faq: GuideFaq[]
  catalogHref?: string
  catalogLabel?: string
}) {
  return (
    <>
      <Section>
        <Container narrow>
          <Stack gap={8}>
            <Text size="lg">{lead}</Text>
            <Grid columns={2} gap={6} className={styles.blocks}>
              {blocks.map((block) => (
                <Card key={block.title} padding="lg">
                  <Stack gap={3}>
                    <Heading level="h3">{block.title}</Heading>
                    <Text>{block.body}</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section background="subtle">
        <Container narrow>
          <Stack gap={8}>
            <Heading level="h2">Preguntas frecuentes</Heading>
            <Accordion items={faq} />
            <div className={styles.actions}>
              <Button href={ROUTES.agenda} arrow>
                Agenda una evaluación
              </Button>
              {catalogHref && (
                <Button href={catalogHref} variant="outline">
                  {catalogLabel}
                </Button>
              )}
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  )
}
