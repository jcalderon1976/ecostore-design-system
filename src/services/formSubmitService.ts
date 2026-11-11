import { SITE } from '../pages/site'

export type FormSubmitResult =
  | { ok: true }
  | { ok: false; message: string }

type FormSubmitResponse = {
  success?: boolean | string
  message?: string
}

function ajaxUrl(): string {
  const custom = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim()
  if (custom?.includes('/ajax/')) return custom
  if (custom?.includes('formsubmit.co/')) {
    return custom.replace('formsubmit.co/', 'formsubmit.co/ajax/')
  }
  return `https://formsubmit.co/ajax/${SITE.email}`
}

function accepted(data: FormSubmitResponse | null, status: number): boolean {
  if (!data) return false
  const success = data.success === true || data.success === 'true'
  return status >= 200 && status < 300 && success
}

/** POST AJAX a FormSubmit. Vacía _honey. No dispara Analytics. */
export async function submitContactForm(form: HTMLFormElement): Promise<FormSubmitResult> {
  const honey = form.elements.namedItem('_honey')
  if (honey instanceof HTMLInputElement) honey.value = ''

  const body = new FormData(form)
  body.delete('_next')

  try {
    const res = await fetch(ajaxUrl(), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    })
    const data = (await res.json().catch(() => null)) as FormSubmitResponse | null
    if (accepted(data, res.status)) return { ok: true }
    return {
      ok: false,
      message: data?.message || 'No pudimos enviar la solicitud. Inténtalo de nuevo.',
    }
  } catch {
    return { ok: false, message: 'No pudimos enviar la solicitud. Inténtalo de nuevo.' }
  }
}
