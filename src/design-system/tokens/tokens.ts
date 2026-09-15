/**
 * Tokens en TypeScript. Espejo de tokens.css para uso en JS
 * (charts, canvas, props de estilo, tests). Mantener ambos sincronizados.
 */
export const colors = {
  green: {
    50: '#EEF7F0', 100: '#D5EEDC', 200: '#A9DDB9', 300: '#6FC98B', 400: '#3DB35F',
    500: '#2E9E3E', 600: '#1E7F35', 700: '#176A2C', 800: '#124F22', 900: '#0D3A19', 950: '#072A11',
  },
  lime: { 300: '#C6F27A', 400: '#A8E84A', 500: '#8CD62E' },
  orange: { 50: '#FFF5E8', 100: '#FDEBC8', 200: '#FBD79C', 400: '#F7B733', 500: '#F5A623', 600: '#E88F1A', 700: '#C9740F' },
  sky: { 50: '#EEF6FC', 100: '#DCEDF9', 200: '#B9DCF3', 300: '#8CC7EC', 400: '#5BB4E5', 500: '#3A9FD9', 600: '#2A80B3' },
  neutral: {
    0: '#FFFFFF', 50: '#F7FAF7', 100: '#F1F5F1', 200: '#E3E9E4', 300: '#CBD3CC', 400: '#9AA5A0',
    500: '#6B7772', 600: '#4B5651', 700: '#343C39', 800: '#1F2624', 900: '#111615',
  },
  state: { success: '#2E9E3E', warning: '#F5A623', danger: '#D93F3F', info: '#2B7FD9' },
} as const

export const semantic = {
  bg: colors.neutral[0],
  bgSubtle: colors.neutral[50],
  bgMint: colors.green[50],
  bgSky: colors.sky[50],
  bgPeach: colors.orange[50],
  bgInverse: colors.green[900],
  border: colors.neutral[200],
  ink: '#0F2216',
  text: '#0F2216',
  textBody: colors.neutral[600],
  textMuted: colors.neutral[500],
  textInverse: colors.neutral[0],
  primary: colors.green[600],
  primaryHover: colors.green[700],
  accent: colors.orange[500],
  accentStrong: colors.orange[600],
  secondary: colors.sky[400],
  highlight: colors.lime[400],
} as const

export const typography = {
  fontHeading: "'Outfit', 'Inter', system-ui, sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",
  fontScript: "'Caveat', cursive",
  fontAccent: "'Instrument Serif', Georgia, serif",
  size: {
    xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem',
    '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.75rem', '5xl': '3.5rem', '6xl': '4.5rem', '7xl': '5.5rem',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
  leading: { tight: 1.1, snug: 1.3, normal: 1.5, relaxed: 1.65 },
} as const

export const spacing = {
  0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem',
  8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem', 32: '8rem',
} as const

export const radius = { sm: '8px', md: '12px', lg: '20px', xl: '28px', full: '9999px' } as const

export const shadow = {
  xs: '0 1px 2px rgba(13,58,25,0.04)',
  sm: '0 1px 2px rgba(13,58,25,0.04), 0 6px 16px rgba(13,58,25,0.05)',
  md: '0 1px 2px rgba(13,58,25,0.04), 0 12px 32px rgba(13,58,25,0.08)',
  lg: '0 2px 4px rgba(13,58,25,0.04), 0 24px 56px rgba(13,58,25,0.14)',
  brand: '0 8px 20px rgba(30,127,53,0.26)',
  sky: '0 2px 4px rgba(42,128,179,0.05), 0 16px 40px rgba(42,128,179,0.12)',
} as const

export const motion = {
  duration: { fast: '120ms', normal: '200ms', slow: '320ms' },
  ease: { standard: 'cubic-bezier(0.2,0,0,1)', out: 'cubic-bezier(0,0,0.2,1)' },
} as const

export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const

export const tokens = { colors, semantic, typography, spacing, radius, shadow, motion, breakpoints }
export type Tokens = typeof tokens
