/**
 * Hero scroll de Example 7: intro, casa que sube y hotspots.
 * Solo transform y opacity. Devuelve cleanup para desmontar en React.
 */

type Side = 'l' | 'r'

type Product = {
  id: string
  x: number
  y: number
  side: Side
  len: number
  dy?: number
  title: string
  sub: string
  desc: string
}

const ICONS: Record<string, string> = {
  solar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 18h18l-3-12H6z"/><path d="M4.5 12h15M9 6l-1 12M15 6l1 12M12 18v3M8 21h8"/></svg>',
  heater:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="6" rx="3"/><path d="M6 9l-2 12M10 9l-1 12M14 9l1 12M18 9l2 12"/></svg>',
  ac:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="14" rx="2"/><circle cx="9" cy="11" r="4"/><path d="M9 7v8M5 11h8M16 8h3M16 11h3M16 14h3M5 21h14"/></svg>',
  ev:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="4" y="3" width="10" height="18" rx="2"/><path d="M10 7l-3 5h4l-3 5"/><path d="M14 10h2a2 2 0 0 1 2 2v4a2 2 0 0 0 4 0V8l-2-2"/></svg>',
  filter:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="6" width="6" height="15" rx="2"/><rect x="13" y="6" width="6" height="15" rx="2"/><path d="M8 6V3h8v3M8 11v5M16 11v5"/></svg>',
  led:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>',
}

const PRODUCTS: Product[] = [
  { id: 'solar', x: 29, y: 15, side: 'l', len: 90, title: 'Placas Solares', sub: 'Energía fotovoltaica', desc: 'Reduce hasta un 90% tu factura de luz con paneles de alta eficiencia y baterías de respaldo.' },
  { id: 'heater', x: 54, y: 8, side: 'l', len: 150, title: 'Calentador Solar', sub: 'Agua caliente gratis', desc: 'Tubos al vacío que calientan el agua con el sol, sin consumo eléctrico.' },
  { id: 'ac', x: 80, y: 18, side: 'r', len: 70, dy: 24, title: 'A/C Inverter', sub: 'Confort eficiente', desc: 'Climatización con tecnología inverter que consume hasta 60% menos energía.' },
  { id: 'led', x: 36, y: 63, side: 'l', len: 120, title: 'Iluminación LED', sub: 'Luz que ahorra', desc: 'Luminarias LED interiores y exteriores con larga vida útil y bajo consumo.' },
  { id: 'ev', x: 93, y: 64, side: 'l', len: 110, title: 'Cargador Eléctrico', sub: 'Para tu vehículo EV', desc: 'Estaciones de carga Nivel 2 instaladas en tu marquesina, listas para solar.' },
  { id: 'filter', x: 81, y: 83, side: 'r', len: 110, title: 'Filtración de Agua', sub: 'Agua pura en casa', desc: 'Sistemas de filtración y suavizadores para toda la casa. Agua limpia en cada llave.' },
]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
const ease = (t: number) => 1 - Math.pow(1 - t, 3)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const T0 = 0.34
const T1 = 0.94
const STEP = (T1 - T0) / PRODUCTS.length

function tipHTML(p: Product) {
  return `<div class="tip__icon">${ICONS[p.id]}</div><h3>${p.title}</h3><p>${p.sub}</p><small>${p.desc}</small>`
}

export function initEcoHero(root: HTMLElement): () => void {
  const $ = (s: string) => root.querySelector(s) as HTMLElement | null

  const house = $('[data-el="house"]')
  const rail = $('[data-el="rail"]')
  const mobileCard = $('[data-el="mobileCard"]')
  const bg = $('[data-el="bg"]')
  const intro = $('[data-el="intro"]')
  const heroLogo = $('[data-el="heroLogo"]')
  const headline = $('[data-el="headline"]')
  const hint = $('[data-el="hint"]')
  const caption = $('[data-el="caption"]')
  const capNum = $('[data-el="capNum"]')
  const capName = $('[data-el="capName"]')
  const capTotal = $('[data-el="capTotal"]')
  const particles = $('[data-el="particles"]')
  if (capTotal) capTotal.textContent = String(PRODUCTS.length)

  if (!house || !rail || !bg || !intro || !heroLogo || !headline || !hint || !caption) {
    return () => undefined
  }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const spots: Array<{ el: HTMLElement; dot: HTMLButtonElement }> = []
  const cleanups: Array<() => void> = []

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    const el = document.createElement('div')
    el.className = `spot ${p.side} ${p.x >= 50 ? 'east' : 'west'}`
    el.style.left = p.x + '%'
    el.style.top = p.y + '%'
    el.style.setProperty('--len', p.len + 'px')
    if (p.dy) el.style.setProperty('--dy', p.dy + 'px')
    el.innerHTML = `<button class="pin" type="button" aria-label="${p.title}"></button><span class="line"></span><div class="tip">${tipHTML(p)}</div>`
    const pin = el.querySelector('.pin') as HTMLButtonElement
    const onPin = () => jumpTo(i)
    pin.addEventListener('click', onPin)
    cleanups.push(() => pin.removeEventListener('click', onPin))
    house.appendChild(el)

    const dot = document.createElement('button')
    dot.type = 'button'
    dot.setAttribute('aria-label', p.title)
    const onDot = () => jumpTo(i)
    dot.addEventListener('click', onDot)
    cleanups.push(() => dot.removeEventListener('click', onDot))
    rail.appendChild(dot)

    spots.push({ el, dot })
  }

  if (particles) {
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span')
      s.style.left = Math.random() * 100 + '%'
      s.style.top = Math.random() * 60 + '%'
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's'
      s.style.animationDuration = (3 + Math.random() * 3).toFixed(2) + 's'
      particles.appendChild(s)
    }
  }

  let mouseX = 0
  let mouseY = 0
  let curMX = 0
  let curMY = 0
  let lastActive = -2
  let raf = 0
  let running = true

  function heroProgress() {
    const r = root.getBoundingClientRect()
    return clamp(-r.top / (root.offsetHeight - innerHeight))
  }

  function jumpTo(i: number) {
    const p = T0 + STEP * (i + 0.5)
    const top = root.offsetTop + p * (root.offsetHeight - innerHeight)
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  function frame() {
    if (!running) return
    const p = heroProgress()
    const vh = innerHeight
    const mobile = innerWidth <= 760
    curMX += (mouseX - curMX) * 0.06
    curMY += (mouseY - curMY) * 0.06

    const a = ease(range(p, 0, 0.32))
    const bgTravel = Math.max(0, bg!.offsetHeight - vh)
    bg!.style.transform = `translate3d(${curMX * -8}px, ${-bgTravel * 0.42 * ease(range(p, 0, 0.6)) + curMY * -6}px, 0) scale(1.04)`

    heroLogo!.style.transform = `translate3d(${curMX * 10}px, ${-a * vh * 0.35}px, 0) scale(${1 - a * 0.25})`
    headline!.style.transform = `translate3d(${curMX * 16}px, ${-a * vh * 0.5}px, 0)`
    intro!.style.opacity = String(1 - range(p, 0.06, 0.26))
    hint!.style.opacity = String(1 - range(p, 0, 0.05))

    const houseH = house!.offsetHeight
    const navH = parseFloat(getComputedStyle(root).getPropertyValue('--eco-nav-h')) || 84
    const cardReserve = mobile ? Math.min(156, vh * 0.24) : 0
    const s0 = mobile ? 1 : 0.92
    const s1 = mobile
      ? Math.min(1, (vh - navH - cardReserve) / houseH)
      : Math.min(1, (vh * 0.8) / houseH)
    const introBottom = intro!.offsetTop + intro!.offsetHeight
    const startTop = Math.min(Math.max(introBottom + 12, vh * 0.5), vh * 0.82)
    const restTop = mobile
      ? navH + Math.max(4, (vh - navH - cardReserve - houseH * s1) / 2)
      : navH + Math.max(0, (vh - navH - houseH * s1) / 2)
    const s = lerp(s0, s1, a)
    const y = lerp(startTop - vh + houseH * s0, restTop - vh + houseH * s1, a)
    house!.style.transform = `translate3d(${curMX * 22}px, ${y + curMY * 10}px, 0) scale(${s})`

    let active = -1
    for (let i = 0; i < spots.length; i++) {
      const start = T0 + STEP * i
      const on = p >= start
      spots[i].el.classList.toggle('on', on)
      if (on) active = i
      spots[i].dot.classList.toggle('done', on)
    }
    if (p > T1 + 0.03) active = mobile ? spots.length - 1 : -1
    for (let i = 0; i < spots.length; i++) {
      spots[i].el.classList.toggle('active', i === active)
      spots[i].dot.classList.toggle('active', i === active)
    }
    rail!.classList.toggle('show', p > T0 - 0.02 && p < 0.999)
    caption!.style.opacity = active >= 0 ? '1' : '0'

    if (active !== lastActive) {
      lastActive = active
      if (active >= 0 && capNum && capName && mobileCard) {
        capNum.textContent = String(active + 1)
        capName.textContent = PRODUCTS[active].title
        mobileCard.innerHTML = `${tipHTML(PRODUCTS[active])}<span class="mobile-card__count">${active + 1} / ${PRODUCTS.length}</span>`
        mobileCard.classList.remove('on')
        requestAnimationFrame(() => mobileCard.classList.add('on'))
      } else if (mobileCard) {
        mobileCard.classList.remove('on')
      }
    }

    raf = requestAnimationFrame(frame)
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduce) return
    mouseX = e.clientX / innerWidth - 0.5
    mouseY = e.clientY / innerHeight - 0.5
  }
  addEventListener('pointermove', onMove)

  raf = requestAnimationFrame(frame)

  return () => {
    running = false
    cancelAnimationFrame(raf)
    removeEventListener('pointermove', onMove)
    for (let i = 0; i < cleanups.length; i++) cleanups[i]()
    for (let i = 0; i < spots.length; i++) {
      spots[i].el.remove()
      spots[i].dot.remove()
    }
    if (particles) particles.replaceChildren()
    if (mobileCard) {
      mobileCard.replaceChildren()
      mobileCard.classList.remove('on')
    }
  }
}
