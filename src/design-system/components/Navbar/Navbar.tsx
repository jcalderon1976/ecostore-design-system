import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { Container } from '../Layout/Layout'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from '../../icons'
import styles from './Navbar.module.css'

export interface NavChild {
  label: string
  href: string
  /** Línea secundaria bajo el título (opcional). */
  description?: string
  icon?: ReactNode
  active?: boolean
}

export interface NavItem {
  label: string
  /** Enlace directo. Si el item tiene `children`, el href es opcional. */
  href?: string
  active?: boolean
  /** Submenú desplegable. */
  children?: NavChild[]
}

export interface NavbarProps {
  items: NavItem[]
  /** Texto del CTA. Por defecto "Agenda una evaluación". */
  ctaLabel?: ReactNode
  ctaHref?: string
  onCtaClick?: () => void
  /** Teléfono visible junto al CTA en escritorio. */
  phone?: string
  phoneHref?: string
  logoHref?: string
  /** Fijo y transparente: el contenido (p. ej. el recorrido) se ve detrás. */
  overlay?: boolean
}

/** Item con submenú: abre en hover y con teclado (Enter/Espacio/flecha abajo), cierra con Escape o clic fuera. */
function Dropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const menuId = useId()
  const isActive = item.active || item.children?.some((c) => c.active)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div
      ref={ref}
      className={styles.dropdown}
      data-open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cx(styles.link, styles.linkDropdown, isActive && styles.linkActive)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); setOpen(true)
            requestAnimationFrame(() => (ref.current?.querySelector('a') as HTMLElement | null)?.focus())
          }
        }}
      >
        {item.label}
        <ChevronDownIcon size={14} className={styles.chevron} />
      </button>
      <div id={menuId} role="menu" className={styles.menu} aria-label={item.label}>
        {item.children!.map((c) => (
          <a
            key={c.href}
            role="menuitem"
            href={c.href}
            className={cx(styles.menuItem, c.active && styles.menuItemActive)}
            aria-current={c.active ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {c.icon && <span className={styles.menuIcon}>{c.icon}</span>}
            <span>
              <span className={styles.menuLabel}>{c.label}</span>
              {c.description && <span className={styles.menuDesc}>{c.description}</span>}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * Cabecera sticky de cristal: logo, navegación en píldoras (con submenús), teléfono y CTA.
 * Gana sombra al hacer scroll. En < 1024px colapsa a un menú hamburguesa.
 * `overlay` la deja fija y transparente sobre un hero a pantalla completa.
 */
export function Navbar({ items, ctaLabel = 'Agenda una evaluación', ctaHref, onCtaClick, phone, phoneHref, logoHref = '/', overlay = false }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tel = phoneHref ?? (phone ? `tel:${phone.replace(/\D/g, '')}` : undefined)

  return (
    <header
      className={styles.header}
      data-overlay={overlay || undefined}
      data-scrolled={scrolled}
      data-menu={open || undefined}
    >
      <Container>
        <div className={styles.inner}>
          <a href={logoHref} className={styles.logo} aria-label="EcoStore, inicio">
            <Logo height={36} />
          </a>

          <nav className={styles.nav} aria-label="Principal">
            {items.map((item) =>
              item.children?.length ? (
                <Dropdown key={item.label} item={item} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={cx(styles.link, item.active && styles.linkActive)}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className={styles.actions}>
            {phone && (
              <a href={tel} className={styles.phone}>
                <PhoneIcon size={16} />
                {phone}
              </a>
            )}
            <Button className={styles.cta} href={ctaHref} onClick={onCtaClick} arrow>
              {ctaLabel}
            </Button>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        <div id={panelId} className={styles.mobilePanel} data-open={open}>
          <nav className={styles.mobileNav} aria-label="Principal móvil">
            {items.map((item) =>
              item.children?.length ? (
                <div key={item.label} className={styles.mobileGroup}>
                  <span className={styles.mobileGroupLabel}>{item.label}</span>
                  {item.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className={cx(styles.mobileLink, styles.mobileSubLink, c.active && styles.mobileLinkActive)}
                      aria-current={c.active ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={cx(styles.mobileLink, item.active && styles.mobileLinkActive)}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className={styles.mobileCta}>
            <Button fullWidth href={ctaHref} onClick={onCtaClick} arrow>
              {ctaLabel}
            </Button>
            {phone && (
              <Button fullWidth variant="outline" href={tel} leadingIcon={<PhoneIcon size={18} />}>
                {phone}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
