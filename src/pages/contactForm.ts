import { SITE } from './site'

export type ContactPayload = {
  nombre: string
  telefono: string
  email: string
  tipo?: string
  interes?: string
  mensaje?: string
}

export type ContactField = 'nombre' | 'telefono' | 'email'
export type ContactErrors = Partial<Record<ContactField, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const SENT_QUERY = 'enviado'

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}
  const nombre = payload.nombre.trim()
  const telefono = payload.telefono.trim()
  const email = payload.email.trim()
  const digits = telefono.replace(/\D/g, '')

  if (!nombre) errors.nombre = 'Indica tu nombre.'
  if (!telefono) errors.telefono = 'Indica tu teléfono.'
  else if (digits.length < 7) errors.telefono = 'Indica un teléfono válido.'
  if (!email) errors.email = 'Indica tu correo electrónico.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Indica un correo válido.'

  return errors
}

/** Destino: info@ecostorepr.com (FormSubmit) o VITE_FORM_ENDPOINT. */
export function contactFormAction(): string {
  return (
    (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() ||
    `https://formsubmit.co/${SITE.email}`
  )
}

export function thanksUrl(): string {
  const url = new URL(window.location.href)
  url.searchParams.set(SENT_QUERY, '1')
  url.hash = 'formulario'
  return url.toString()
}

/** Si FormSubmit redirige con ?enviado=1, muestra el éxito y limpia la URL. */
export function consumeSentFlag(): boolean {
  const url = new URL(window.location.href)
  if (url.searchParams.get(SENT_QUERY) !== '1') return false
  url.searchParams.delete(SENT_QUERY)
  const qs = url.searchParams.toString()
  window.history.replaceState(null, '', `${url.pathname}${qs ? `?${qs}` : ''}${url.hash || '#formulario'}`)
  return true
}

export function payloadFromForm(form: HTMLFormElement, interes = ''): ContactPayload {
  const data = new FormData(form)
  return {
    nombre: String(data.get('nombre') ?? ''),
    telefono: String(data.get('telefono') ?? ''),
    email: String(data.get('email') ?? ''),
    tipo: String(data.get('tipo') ?? ''),
    interes,
    mensaje: String(data.get('mensaje') ?? ''),
  }
}
