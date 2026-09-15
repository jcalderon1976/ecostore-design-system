import type { ReactNode } from 'react'
import { Container } from '../Layout/Layout'
import { Logo } from '../Logo/Logo'
import { IconCircle } from '../IconCircle/IconCircle'
import { SocialLinks, type SocialLink } from '../SocialLinks/SocialLinks'
import { Script } from '../Typography/Typography'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '../../icons'
import styles from './Footer.module.css'

export interface FooterLink { label: string; href: string }
export interface FooterColumn { title: string; links: FooterLink[] }

export interface FooterContact {
  phone: string
  phoneHref?: string
  email: string
  addressLabel?: string
  address: string
  hours: string
}

export interface FooterProps {
  description: ReactNode
  /** Hasta dos columnas de enlaces. */
  columns: FooterColumn[]
  contact: FooterContact
  social: SocialLink[]
  /** Frase manuscrita de cierre, centrada sobre el copyright. */
  tagline?: string
  copyright?: ReactNode
  /** Texto a la derecha de la línea de copyright. Vacío para omitirlo. */
  bottomNote?: ReactNode
}

export function Footer({ description, columns, contact, social, tagline = 'Un futuro más verde', copyright, bottomNote }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo height={44} inverse />
            <p className={styles.brandText}>{description}</p>
            <SocialLinks links={social} tone="outlineInverse" shape="square" />
          </div>

          {columns.slice(0, 2).map((col) => (
            <div key={col.title}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.links}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={styles.link}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={styles.colTitle}>Contacto</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <IconCircle tone="accent" size="sm" className={styles.contactIcon}><PhoneIcon size={16} /></IconCircle>
                <a href={contact.phoneHref ?? `tel:${contact.phone.replace(/\D/g, '')}`} className={styles.contactPhone}>
                  {contact.phone}
                </a>
              </li>
              <li className={styles.contactItem}>
                <IconCircle tone="solid" size="sm" className={styles.contactIcon}><MailIcon size={16} /></IconCircle>
                <a href={`mailto:${contact.email}`} className={styles.contactValue}>{contact.email}</a>
              </li>
              <li className={styles.contactItem}>
                <IconCircle tone="accent" size="sm" className={styles.contactIcon}><MapPinIcon size={16} /></IconCircle>
                <div>
                  <div className={styles.contactLabel}>{contact.addressLabel ?? 'Dirección'}</div>
                  <div className={styles.contactValue}>{contact.address}</div>
                </div>
              </li>
              <li className={styles.contactItem}>
                <IconCircle tone="solid" size="sm" className={styles.contactIcon}><ClockIcon size={16} /></IconCircle>
                <span className={styles.contactValue}>{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {tagline && (
          <div className={styles.signature}>
            <Script>{tagline}</Script>
          </div>
        )}

        <div className={styles.bottom}>
          <span>{copyright ?? `© ${new Date().getFullYear()} ECOSTORE · Tu tienda de conservación de energía y agua`}</span>
          {bottomNote && <span>{bottomNote}</span>}
        </div>
      </Container>
    </footer>
  )
}
