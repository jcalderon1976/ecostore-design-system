import { Card, IconCircle, Label, LeafIcon, SunIcon, DropletIcon, CheckCircleIcon } from '@ds'
import styles from './HeroVisual.module.css'

/**
 * Composición visual del hero: panel fotográfico (placeholder con malla) y
 * tarjetas de cristal flotantes con datos reales de la propuesta.
 * Sustituir el panel por la fotografía de la van/casa cuando esté disponible.
 */
export function HeroVisual() {
  return (
    <div className={styles.wrap}>
      <div className={styles.photo} role="img" aria-label="Casa en Puerto Rico con paneles solares y la van de EcoStore">
        <svg viewBox="0 0 400 500" className={styles.art} aria-hidden="true">
          <defs>
            <linearGradient id="hv-sun" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FBD79C" /><stop offset="1" stopColor="#F5A623" />
            </linearGradient>
            <linearGradient id="hv-roof" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1E7F35" /><stop offset="1" stopColor="#124F22" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="120" r="64" fill="url(#hv-sun)" opacity="0.95" />
          <g stroke="#F5A623" strokeWidth="3" strokeLinecap="round" opacity="0.6">
            <path d="M300 30v16M300 194v16M210 120h16M374 120h16M236 56l11 11M353 173l11 11M236 184l11-11M353 67l11-11" />
          </g>
          {/* Techo con paneles */}
          <path d="M40 300 200 210 360 300Z" fill="url(#hv-roof)" />
          <g fill="#0D3A19" opacity="0.9">
            <rect x="110" y="268" width="40" height="26" rx="3" transform="skewY(-14) translate(0 40)" />
            <rect x="158" y="268" width="40" height="26" rx="3" transform="skewY(-14) translate(0 48)" />
            <rect x="206" y="268" width="40" height="26" rx="3" transform="skewY(-14) translate(0 56)" />
          </g>
          <rect x="70" y="300" width="260" height="140" rx="6" fill="#FFFFFF" opacity="0.92" />
          <rect x="176" y="360" width="48" height="80" rx="4" fill="#0D3A19" opacity="0.85" />
          <rect x="96" y="330" width="52" height="44" rx="4" fill="#B9DCF3" />
          <rect x="252" y="330" width="52" height="44" rx="4" fill="#B9DCF3" />
          {/* Vegetación */}
          <ellipse cx="60" cy="446" rx="60" ry="22" fill="#2E9E3E" opacity="0.7" />
          <ellipse cx="350" cy="446" rx="70" ry="24" fill="#3DB35F" opacity="0.7" />
        </svg>
        <span className={styles.photoHint}>Foto: fachada con paneles y van (reemplazar)</span>
      </div>

      <Card variant="glass" padding="md" className={styles.cardSavings}>
        <Label inverse>Ahorro estimado</Label>
        <div className={styles.big}>32<span className={styles.unit}>%</span></div>
        <div className={styles.small}>en la factura de energía de un hogar típico</div>
        <div className={styles.bar}><span /></div>
      </Card>

      <Card variant="glassLight" padding="sm" className={styles.cardSteps}>
        <ul className={styles.checks}>
          <li><CheckCircleIcon size={18} /> Evaluación gratuita</li>
          <li><CheckCircleIcon size={18} /> Propuesta en 24 h</li>
          <li><CheckCircleIcon size={18} /> Instalación certificada</li>
        </ul>
      </Card>

      <div className={styles.bubbles}>
        <IconCircle tone="bubble" size="md"><SunIcon size={20} /></IconCircle>
        <IconCircle tone="bubble" size="md"><DropletIcon size={20} /></IconCircle>
        <IconCircle tone="solid" size="md"><LeafIcon size={20} /></IconCircle>
      </div>
    </div>
  )
}
