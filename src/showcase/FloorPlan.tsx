import { IconCircle, DropletIcon, ZapIcon, SunIcon, LeafIcon, ClockIcon } from '@ds'
import styles from './FloorPlan.module.css'

/**
 * Ilustración de plano en línea celeste con burbujas blancas e íconos naranja,
 * al estilo de la pieza "La eficiencia no tiene que ser complicada".
 * Solo para demostrar la paleta pastel; en producción se sustituye por el asset oficial.
 */
export function FloorPlan() {
  return (
    <div className={styles.wrap} role="img" aria-label="Plano de una casa con puntos de ahorro de energía y agua">
      <svg viewBox="0 0 420 320" className={styles.plan} aria-hidden="true">
        <g fill="none" stroke="var(--eco-sky-300)" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M30 40h230v80h130v170H30z" />
          <path d="M30 150h140M170 150v130M260 120v60M260 230v60M170 230h90" />
        </g>
        <g fill="none" stroke="var(--eco-sky-200)" strokeWidth="3" strokeLinejoin="round">
          <rect x="60" y="180" width="70" height="90" rx="8" />
          <rect x="300" y="60" width="40" height="50" rx="6" />
          <circle cx="215" cy="95" r="28" />
          <rect x="290" y="200" width="70" height="70" rx="10" />
        </g>
        <g stroke="var(--eco-sky-400)" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" fill="none">
          <path d="M95 75 L150 120" />
          <path d="M330 100 L300 150" />
          <path d="M120 240 L190 210" />
          <path d="M330 240 L280 200" />
        </g>
        <g fill="var(--eco-sky-400)">
          <circle cx="150" cy="120" r="4" /><circle cx="300" cy="150" r="4" />
          <circle cx="190" cy="210" r="4" /><circle cx="280" cy="200" r="4" />
        </g>
      </svg>

      <IconCircle tone="bubble" size="lg" className={styles.b1}><DropletIcon size={26} /></IconCircle>
      <IconCircle tone="bubble" size="lg" className={styles.b2}><SunIcon size={26} /></IconCircle>
      <IconCircle tone="bubble" size="lg" className={styles.b3}><ZapIcon size={26} /></IconCircle>
      <IconCircle tone="bubble" size="lg" className={styles.b4}><ClockIcon size={26} /></IconCircle>
      <IconCircle tone="bubbleGreen" size="md" className={styles.b5}><LeafIcon size={20} /></IconCircle>
    </div>
  )
}
