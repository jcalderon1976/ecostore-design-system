import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import { Container } from "../Layout/Layout";
import { Logo, LOGO_INVERSE_STACKED_SRC } from "../Logo/Logo";
import { SocialLinks, type SocialLink } from "../SocialLinks/SocialLinks";
import {
  ArrowUpIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "../../icons";
import styles from "./Footer.module.css";

const BASE = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + "/";
const FOOTER_LEAF_SRC = `${BASE}images/footer-leaf.png?v=2`;

export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  phone: string;
  phoneHref?: string;
  email: string;
  addressLabel?: string;
  address: string;
  hours: string;
}

export interface FooterProps {
  description: ReactNode;
  /** Hasta dos columnas de enlaces. */
  columns: FooterColumn[];
  contact: FooterContact;
  social: SocialLink[];
  /** Enlaces legales de la última línea. */
  legal?: FooterLink[];
  copyright?: ReactNode;
}

/**
 * Footer premium: marca + columnas de enlaces + contacto y línea legal.
 * Entra con animación escalonada al llegar al viewport; halo ambiental
 * que respira; hoja flotante.
 */
export function Footer({
  description,
  columns,
  contact,
  social,
  legal = [
    { label: "Privacidad", href: "#privacidad" },
    { label: "Términos", href: "#terminos" },
  ],
  copyright,
}: FooterProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tel = contact.phoneHref ?? `tel:${contact.phone.replace(/\D/g, "")}`;
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const d = (i: number) => ({ "--d": `${i * 90}ms` }) as CSSProperties;
  const cols = columns.slice(0, 2);

  return (
    <footer ref={ref} className={styles.footer} data-visible={visible}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <img
        src={FOOTER_LEAF_SRC}
        alt=""
        aria-hidden="true"
        className={styles.leaf}
      />
      <span className={styles.topline} aria-hidden="true" />

      <Container className={styles.inner}>
        {/* ---- Marca + columnas ---- */}
        <div
          className={styles.grid}
          style={{ "--cols": cols.length } as CSSProperties}
        >
          <div className={cx(styles.brand, styles.rise)} style={d(0)}>
            <Logo
              height={84}
              src={LOGO_INVERSE_STACKED_SRC}
              className={styles.brandLogo}
            />
            <p className={styles.brandText}>{description}</p>
          </div>

          {cols.map((col, ci) => (
            <div key={col.title} className={styles.rise} style={d(1 + ci)}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.links}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={styles.link}>
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={cx(styles.contact, styles.rise)} style={d(1 + cols.length)}>
            <h3 className={styles.colTitle}>Contacto</h3>
            <ul className={styles.contactList}>
              <li>
                <a href={tel} className={styles.phone}>
                  <PhoneIcon size={18} className={styles.contactIcon} />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li className={styles.contactItem}>
                <MailIcon size={16} className={styles.contactIcon} />
                <a href={`mailto:${contact.email}`} className={styles.link}>
                  <span>{contact.email}</span>
                </a>
              </li>
              <li className={styles.contactItem}>
                <MapPinIcon size={16} className={styles.contactIcon} />
                <span className={styles.contactValue}>{contact.address}</span>
              </li>
              <li className={styles.contactItem}>
                <ClockIcon size={16} className={styles.contactIcon} />
                <span className={styles.contactValue}>{contact.hours}</span>
              </li>
            </ul>
            <div className={styles.social}>
              <SocialLinks
                links={social}
                tone="outlineInverse"
                shape="square"
              />
            </div>
          </div>
        </div>

        {/* ---- Línea legal ---- */}
        <div
          className={cx(styles.bottom, styles.rise)}
          style={d(2 + cols.length)}
        >
          <span className={styles.copy}>
            {copyright ?? `© ${new Date().getFullYear()} ECOSTORE ·`}
          </span>
          <ul className={styles.legal}>
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={styles.legalLink}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.toTop}
            onClick={toTop}
            aria-label="Volver arriba"
          >
            <ArrowUpIcon size={18} />
          </button>
        </div>
      </Container>
    </footer>
  );
}
