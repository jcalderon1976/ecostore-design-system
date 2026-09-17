import type { ReactNode } from 'react'
import {
  Reveal, Stack, CategoryBand, SolutionCard, cx,
  BoltIcon, DropIcon, SnowflakeIcon, HomeIcon, FilterIcon,
} from '@ds'
import { SITE } from '../site'
import styles from './SolutionsCatalog.module.css'

const img = (name: string) => `${SITE.base}images/${name}`

interface Solution { title: string; items: string[]; image?: string; alt?: string; icon?: ReactNode; fit?: 'contain' | 'cover' }

/** Catálogo que cierra todas las páginas, justo sobre el footer. */
export const ENERGIA: Solution[] = [
  { title: 'Climatización', image: 'climatizacion.webp', fit: 'cover', alt: 'Aire acondicionado inverter de pared', icon: <SnowflakeIcon size={56} />, items: ['A/C Inverter', 'A/C de ventana', 'PTAC', 'Fresh Air'] },
  // \u00AD es un guion suave: en las columnas estrechas parte como "Electrodo-mésticos".
  { title: 'Electrodo\u00ADmésticos', image: 'lavaseca.webp', alt: 'Lavadora y secadora de alta eficiencia', items: ['Refrigeradores', 'Lavadoras / Secadoras', 'Lavaplatos', 'Estufas de inducción', 'GE / Café / Haier'] },
  { title: 'Iluminación y Controles', image: 'led.webp', alt: 'Bombilla LED', items: ['LED Lighting', 'Sensores de ocupación', 'Controles inteligentes', 'Wallpacks'] },
  { title: 'Eficiencia de la Propiedad', image: 'house.webp', fit: 'cover', alt: 'Casa moderna con ventanas de doble cristal', icon: <HomeIcon size={56} />, items: ['Sellado de techo', 'Aislamiento térmico', 'Poliuretano', 'Double-pane glass'] },
  { title: 'Agua Caliente', image: 'calentador-solar.webp', alt: 'Calentador solar de agua', items: ['Calentadores solares', 'Heat Pump', 'Gas'] },
  { title: 'Solar y Baterías', image: 'placas.webp', alt: 'Paneles solares', items: ['Sistemas solares', 'Inverters', 'Baterías de litio', 'Powerwall 3'] },
]

export const AGUA: Solution[] = [
  { title: 'Conservación de Agua', image: 'ducha.webp', alt: 'Ducha de bajo consumo', items: ['Duchas eficientes', 'Aireadores', 'Inodoros UP/ET', 'Urinarios sin agua'] },
  { title: 'Tratamiento de Agua', image: 'tratamiento-agua.webp', fit: 'cover', alt: 'Sistema de filtración de agua', icon: <FilterIcon size={72} />, items: ['Reverse Osmosis', 'Filtros', 'Suavizadores'] },
  { title: 'Almacenamiento', image: 'cisterna.webp', alt: 'Cisterna de agua', items: ['Cisternas', 'Sistemas de agua de lluvia'] },
]

/** "ECO lo tiene": paneles de Energía y Agua lado a lado con sus tarjetas. */
export function SolutionsCatalog() {
  return (
    <Stack gap={10} className={styles.wrap}>
      <Reveal>
        <h2 className={styles.title}>
          <span className={styles.titleBrand}>ECO</span> lo tiene
        </h2>
      </Reveal>

      <div className={styles.panels}>
        <Reveal className={styles.panel}>
          <CategoryBand tone="green" icon={<BoltIcon size={26} />} title="Energía" className={styles.band} />
          <div className={cx(styles.cards, styles.cardsEnergia)}>
            {ENERGIA.map((s) => (
              <SolutionCard key={s.title} size="sm" title={s.title} items={s.items} imageSrc={s.image ? img(s.image) : undefined} imageAlt={s.alt} imageFit={s.fit} icon={s.icon} tone="green" />
            ))}
          </div>
        </Reveal>

        <Reveal delay={90} className={cx(styles.panel, styles.panelAgua)}>
          <CategoryBand tone="sky" icon={<DropIcon size={26} />} title="Agua" className={styles.band} />
          <div className={cx(styles.cards, styles.cardsAgua)}>
            {AGUA.map((s) => (
              <SolutionCard key={s.title} size="sm" title={s.title} items={s.items} imageSrc={s.image ? img(s.image) : undefined} imageAlt={s.alt} imageFit={s.fit} icon={s.icon} tone="sky" />
            ))}
          </div>
        </Reveal>
      </div>
    </Stack>
  )
}
