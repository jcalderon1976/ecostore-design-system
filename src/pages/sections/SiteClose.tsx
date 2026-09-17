import { Section, Footer } from '@ds'
import { FOOTER, SOCIAL } from '../site'
import { SolutionsCatalog } from './SolutionsCatalog'

/** Cierre común de todas las páginas: catálogo "ECO lo tiene" y footer. */
export function SiteClose() {
  return (
    <>
      <Section>
        <SolutionsCatalog />
      </Section>

      <Footer {...FOOTER} social={SOCIAL} />
    </>
  )
}
