/** Quita la casa fija de LCP para que no se quede pegada al hacer scroll. */
export function dismissLcpHouse() {
  const el = document.querySelector('.lcp-house')
  if (!el) return
  el.classList.add('is-done')
  el.setAttribute('hidden', '')
  el.remove()
}
