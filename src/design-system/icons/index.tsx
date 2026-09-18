import type { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Tamaño en px. Por defecto 20. */
  size?: number
  /** Etiqueta accesible. Si se omite, el ícono es decorativo (aria-hidden). */
  title?: string
}

function base(
  { size = 20, title, ...rest }: IconProps,
  children: React.ReactNode,
  fill = false,
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth={fill ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}

/* ---------- Íconos de línea (Lucide-style) ---------- */
export const PhoneIcon = (p: IconProps) =>
  base(p, <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />)

export const MailIcon = (p: IconProps) =>
  base(p, <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>)

export const MapPinIcon = (p: IconProps) =>
  base(p, <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>)

export const ChatIcon = (p: IconProps) =>
  base(p, <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />)

export const ClockIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>)

export const ShieldIcon = (p: IconProps) =>
  base(p, <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>)

export const CalendarIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>)

export const LockIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>)

export const CheckIcon = (p: IconProps) =>
  base(p, <path d="M20 6 9 17l-5-5" />)

export const ArrowLeftIcon = (p: IconProps) =>
  base(p, <path d="M19 12H5M11 18l-6-6 6-6" />)

export const ArrowRightIcon = (p: IconProps) =>
  base(p, <path d="M5 12h14M13 6l6 6-6 6" />)

export const ArrowUpIcon = (p: IconProps) =>
  base(p, <path d="M12 19V5M5 12l7-7 7 7" />)

export const ArrowUpRightIcon = (p: IconProps) =>
  base(p, <path d="M7 17 17 7M8 7h9v9" />)

export const PlusIcon = (p: IconProps) =>
  base(p, <path d="M12 5v14M5 12h14" />)

export const QuoteIcon = (p: IconProps) =>
  base(p, <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4M20 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4" />)

export const StarIcon = (p: IconProps) =>
  base(p, <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />, true)

export const CarIcon = (p: IconProps) =>
  base(p, <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 8 12 8s-6.7 2.6-8.5 3.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>)

export const CartIcon = (p: IconProps) =>
  base(p, <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>)

export const HardHatIcon = (p: IconProps) =>
  base(p, <><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" /><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" /><path d="M4 15v-3a6 6 0 0 1 6-6" /><path d="M14 6a6 6 0 0 1 6 6v3" /></>)

export const AwardIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="8" r="6" /><path d="M15.5 13 17 22l-5-3-5 3 1.5-9" /></>)

/** Sello de experiencia: medalla dentada con check y cintas. */
export function AwardSealIcon({ size = 40, title, ...rest }: IconProps) {
  const lobes = [
    [32, 8],
    [40.1, 10.17],
    [46.03, 16.1],
    [48.2, 24.2],
    [46.03, 32.3],
    [40.1, 38.23],
    [32, 40.4],
    [23.9, 38.23],
    [17.97, 32.3],
    [15.8, 24.2],
    [17.97, 16.1],
    [23.9, 10.17],
  ] as const

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d="M22 38 14.5 57.2 27.8 48.4 29.2 38Z" fill="#176A2C" />
      <path d="M42 38 49.5 57.2 36.2 48.4 34.8 38Z" fill="#124F22" />
      <circle cx="32" cy="24.2" r="16.2" fill="#6FC98B" />
      {lobes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5.2" fill="#6FC98B" />
      ))}
      <circle cx="32" cy="24.2" r="11.8" fill="#072A11" />
      <circle
        cx="32"
        cy="24.2"
        r="12.7"
        fill="none"
        stroke="#8FD4A3"
        strokeWidth="0.9"
      />
      <path
        d="M23.4 24.8 29.8 31.6 42.4 17.4"
        stroke="#6FC98B"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const CubeIcon = (p: IconProps) =>
  base(p, <><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>)

/** Cubo isométrico 3D (All-in-One). Colores de marca, no usa currentColor. */
export function CubeIsoIcon({ size = 40, title, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      {/* Cara derecha (exterior) */}
      <path d="M32 32 56 18.2V42.6L32 56.4Z" fill="#2E9E3E" />
      {/* Cara izquierda (exterior) */}
      <path d="M32 32 8 18.2V42.6L32 56.4Z" fill="#124F22" />
      {/* Cara superior */}
      <path d="M32 4.4 56 18.2 32 32 8 18.2Z" fill="#6FC98B" />
      {/* Interior: piso claro */}
      <path d="M32 22.5 44.5 29.7 32 36.9 19.5 29.7Z" fill="#F4FBF6" />
      {/* Interior: pared izquierda */}
      <path d="M19.5 29.7 32 36.9V47.8L19.5 40.6Z" fill="#A9DDB9" />
      {/* Interior: pared derecha */}
      <path d="M44.5 29.7 32 36.9V47.8L44.5 40.6Z" fill="#D5EEDC" />
    </svg>
  )
}

export const SolarPanelIcon = (p: IconProps) =>
  base(p, <><path d="M4 4h16l2 10H2z" /><path d="M8 4l-1 10M16 4l1 10M3 9h18M12 14v6M8 20h8" /></>)

export const SettingsIcon = (p: IconProps) =>
  base(p, <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>)

export const BuildingIcon = (p: IconProps) =>
  base(p, <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>)

export const SnowflakeIcon = (p: IconProps) =>
  base(p, <><path d="M12 2v20M2 12h20" /><path d="m4.9 4.9 14.2 14.2M19.1 4.9 4.9 19.1" /><path d="M12 2l-2 2M12 2l2 2M12 22l-2-2M12 22l2-2M2 12l2-2M2 12l2 2M22 12l-2-2M22 12l-2 2" /></>)

export const HomeIcon = (p: IconProps) =>
  base(p, <><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>)

export const FilterIcon = (p: IconProps) =>
  base(p, <><path d="M8 3h8a2 2 0 0 1 2 2v3H6V5a2 2 0 0 1 2-2z" /><path d="M6 8h12v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" /><path d="M10 12h4M10 15h4" /></>)

export const CloudRainIcon = (p: IconProps) =>
  base(p, <><path d="M16 14v6M8 14v6M12 16v6" /><path d="M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3" /></>)

export const BoltIcon = (p: IconProps) =>
  base(p, <path d="M13 2 4 14h7l-1 8 9-12h-7z" />, true)

export const DropIcon = (p: IconProps) =>
  base(p, <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />, true)

export const FactoryIcon = (p: IconProps) =>
  base(p, <><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /><path d="M17 18h1M12 18h1M7 18h1" /></>)

export const LandmarkIcon = (p: IconProps) =>
  base(p, <><path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 3 7h18z" /></>)

export const ChevronDownIcon = (p: IconProps) =>
  base(p, <path d="m6 9 6 6 6-6" />)

export const MenuIcon = (p: IconProps) =>
  base(p, <path d="M4 6h16M4 12h16M4 18h16" />)

export const CloseIcon = (p: IconProps) =>
  base(p, <path d="M18 6 6 18M6 6l12 12" />)

export const SunIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>)

export const DropletIcon = (p: IconProps) =>
  base(p, <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />)

export const ZapIcon = (p: IconProps) =>
  base(p, <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />)

/* ---------- Íconos rellenos ---------- */
export const LeafIcon = (p: IconProps) =>
  base(
    p,
    <path d="M17 8C8 10 5.9 16.2 3.8 21.1c-.2.4.2.9.6.9h.1c.4 0 .7-.2.8-.5C6.6 18.9 8 17 12 17c6 0 9-6 9-13-.8 1-2 1.5-4 4z" />,
    true,
  )

export const CheckCircleIcon = (p: IconProps) =>
  base(
    p,
    <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.7 8.2a1 1 0 0 0-1.4-1.4L11 13.1l-2.3-2.3a1 1 0 0 0-1.4 1.4l3 3a1 1 0 0 0 1.4 0l5-5z" />,
    true,
  )

/* ---------- Redes sociales (rellenos) ---------- */
export const FacebookIcon = (p: IconProps) =>
  base(p, <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" />, true)

export const InstagramIcon = (p: IconProps) =>
  base(
    p,
    <path fillRule="evenodd" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />,
    true,
  )

export const YoutubeIcon = (p: IconProps) =>
  base(
    p,
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />,
    true,
  )

export const LinkedinIcon = (p: IconProps) =>
  base(
    p,
    <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9h3v10zM6.5 7.7A1.8 1.8 0 1 1 6.5 4a1.8 1.8 0 0 1 0 3.7zM19 19h-3v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.6V19z" />,
    true,
  )
