import type { ReactNode } from 'react'
import {
  Reveal, Grid, Stack, Button, SectionTitle, CategoryBand, SolutionCard, Em,
  BoltIcon, DropIcon, LeafIcon, SnowflakeIcon, HomeIcon, FilterIcon, CloudRainIcon,
} from '@ds'
import { SITE, ROUTES } from '../site'
import styles from './SolutionsCatalog.module.css'

const img = (name: string) => `${SITE.base}images/${name}`

interface Solution { title: string; items: string[]; image?: string; alt?: string; icon?: ReactNode; fit?: 'contain' | 'cover' }

/** Catálogo compartido por Servicios (Auditoría e Ingeniería) y, en el futuro, Productos. */
export const ENERGIA: Solution[] = [
  { title: 'Climatización', image: 'climatizacion.webp', fit: 'cover', alt: 'Aire acondicionado inverter de pared', icon: <SnowflakeIcon size={56} />, items: ['A/C Inverter', 'A/C de ventana', 'PTAC', 'Fresh Air'] },
  { title: 'Electrodomésticos', image: 'lavaseca.webp', alt: 'Lavadora y secadora de alta eficiencia', items: ['Refrigeradores', 'Lavadoras / Secadoras', 'Lavaplatos', 'Estufas de inducción', 'GE / Café / Haier'] },
  { title: 'Iluminación y Controles', image: 'led.webp', alt: 'Bombilla LED', items: ['LED Lighting', 'Sensores de ocupación', 'Controles inteligentes', 'Wallpacks'] },
  { title: 'Eficiencia de la Propiedad', image: 'house.webp', fit: 'cover', alt: 'Casa moderna con ventanas de doble cristal', icon: <HomeIcon size={56} />, items: ['Sellado de techo', 'Aislamiento térmico', 'Poliuretano', 'Double-pane glass'] },
  { title: 'Agua Caliente', image: 'calentador-solar.webp', alt: 'Calentador solar de agua', items: ['Calentadores solares', 'Heat Pump', 'Gas'] },
  { title: 'Solar y Baterías', image: 'placas.webp', alt: 'Paneles solares', items: ['Sistemas solares', 'Inverters', 'Baterías de litio', 'Powerwall 3'] },
  { title: 'Almacenamiento', image: 'cisterna.webp', alt: 'Cisterna de agua', items: ['Cisternas', 'Sistemas de agua de lluvia'] },
]

export const AGUA: Solution[] = [
  { title: 'Conservación de Agua', image: 'ducha.webp', alt: 'Ducha de bajo consumo', items: ['Duchas eficientes', 'Aireadores', 'Inodoros UP/ET', 'Urinarios sin agua'] },
  { title: 'Tratamiento de Agua', image: 'tratamiento-agua.webp', fit: 'cover', alt: 'Sistema de filtración de agua', icon: <FilterIcon size={72} />, items: ['Reverse Osmosis', 'Filtros', 'Suavizadores'] },
  { title: 'Almacenamiento', image: 'cisterna.webp', alt: 'Cisterna de agua', items: ['Cisternas', 'Sistemas de agua de lluvia'] },
  { title: 'Captación de Agua de Lluvia', image: 'captacion-lluvia.webp', fit: 'cover', alt: 'Tanque de recolección de agua de lluvia conectado a la canaleta', icon: <CloudRainIcon size={72} />, items: ['Canaletas y bajantes', 'Sistemas de filtración', 'Tanques de recolección', 'Reuso para riego y limpieza'] },
]

export interface SolutionsCatalogProps {
  /** Muestra la franja de CTA al final. */
  cta?: boolean
}

/** "Nuestras soluciones principales": bandas Energía y Agua con sus tarjetas y franja de CTA. */
export function SolutionsCatalog({ cta = true }: SolutionsCatalogProps) {
  return (
    <Stack gap={10}>
      <Reveal>
        <SectionTitle
          leaves
          level="h1"
          title={<>Nuestras soluciones <Em tone="brand">principales</Em></>}
          subtitle="Hogar y negocio más eficiente, sostenible y económico"
        />
      </Reveal>

      <Stack gap={5}>
        <Reveal>
          <CategoryBand tone="green" icon={<BoltIcon size={26} />} title="Energía" tagline="Soluciones para un futuro más eficiente" note="Reduce costos. Aumenta tu eficiencia. Cuida el planeta." />
        </Reveal>
        <Grid minColumn="150px" gap={3}>
          {ENERGIA.map((s, i) => (
            <Reveal key={s.title + i} delay={(i % 4) * 60}>
              <SolutionCard size="sm" title={s.title} items={s.items} imageSrc={s.image ? img(s.image) : undefined} imageAlt={s.alt} imageFit={s.fit} icon={s.icon} tone="green" />
            </Reveal>
          ))}
        </Grid>
      </Stack>

      <Stack gap={5}>
        <Reveal>
          <CategoryBand tone="sky" icon={<DropIcon size={26} />} title="Agua" tagline="Soluciones para un uso inteligente y responsable" note="Agua más limpia. Hogares más saludables. Un mejor mañana." />
        </Reveal>
        <Grid minColumn="240px" gap={4}>
          {AGUA.map((s, i) => (
            <Reveal key={s.title + i} delay={i * 60}>
              <SolutionCard title={s.title} items={s.items} imageSrc={s.image ? img(s.image) : undefined} imageAlt={s.alt} imageFit={s.fit} icon={s.icon} tone="sky" />
            </Reveal>
          ))}
        </Grid>
      </Stack>

      {cta && (
        <Reveal>
          <div className={styles.ctaStrip}>
            <span className={styles.ctaText}><LeafIcon size={18} /> Soluciones integrales para un futuro más sostenible</span>
            <Button href={ROUTES.contacto} arrow>Solicita tu evaluación</Button>
          </div>
        </Reveal>
      )}
    </Stack>
  )
}
