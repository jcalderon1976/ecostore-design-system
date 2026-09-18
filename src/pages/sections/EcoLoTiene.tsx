import { Logo, Reveal, ProductDropCard, type DropItem } from '@ds'
import { SITE } from '../site'
import { ENERGIA, AGUA } from './SolutionsCatalog'
import styles from './EcoLoTiene.module.css'

const img = (name: string) => `${SITE.base}images/${name}`

function toDrops(list: typeof ENERGIA, collection: string): DropItem[] {
  return list.flatMap((s) =>
    s.image
      ? [{
          time: collection,
          name: s.title,
          collection: s.items.slice(0, 2).join(' · '),
          imageSrc: img(s.image),
          imageAlt: s.alt ?? s.title,
        }]
      : [],
  )
}

const WATER_TITLES = new Set(['Agua Caliente', 'Almacenamiento'])

const DROPS: DropItem[] = [
  ...toDrops(ENERGIA.filter((s) => !WATER_TITLES.has(s.title)), 'Energía'),
  ...toDrops(ENERGIA.filter((s) => s.title === 'Agua Caliente'), 'Agua'),
  ...toDrops(AGUA, 'Agua'),
]

/** Infográfico "ECO lo tiene": logo, título y carrusel. Reutilizado en Contáctanos y Nosotros. */
export function EcoLoTiene({ hideBrand = false }: { hideBrand?: boolean }) {
  return (
    <section
      className={styles.section}
      id="eco-lo-tiene"
      aria-labelledby={hideBrand ? undefined : 'eco-lo-tiene-title'}
      aria-label={hideBrand ? 'Nuestros productos' : undefined}
    >
      <div className={styles.wrap}>
        {!hideBrand && (
          <Reveal>
            <div className={styles.header}>
              <Logo src={img('logo-eco-store-full.png')} className={styles.logo} />
              <h2 id="eco-lo-tiene-title" className={styles.title}>
                <span className={styles.eco}>ECO</span> <span className={styles.lo}>lo tiene</span>
              </h2>
            </div>
          </Reveal>
        )}
        <Reveal>
          <ProductDropCard
            title="Nuestros productos"
            subtitle="Eficiencia Energética y conservación de agua"
            items={DROPS}
          />
        </Reveal>
      </div>
    </section>
  )
}
