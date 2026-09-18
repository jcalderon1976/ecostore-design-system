/**
 * Recorrido por la casa (portado de Example 6).
 * Un escenario sticky, un espaciador y un valor de scroll. Solo transform y opacity.
 */
type SceneEl = HTMLElement & { _ox: number; _oy: number }
type CoEl = HTMLElement & {
  _len: number
  _line: SVGLineElement
  _dot: HTMLElement
  _ring: HTMLElement
  _label: HTMLElement
  _a: number
  _b: number
}

type Seg = { id: string; len: number; room: string; start: number; span: number }

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1)
const eo = (t: number) => 1 - Math.pow(1 - t, 3)
const ei = (t: number) => t * t * t
const ec = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function initHouseTour(root: HTMLElement): () => void {
  const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) =>
    r.querySelector(s) as T | null
  const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) =>
    Array.prototype.slice.call(r.querySelectorAll(s)) as T[]

  const nav = window.navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }
  let RM = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]rm=1/.test(location.search)
  let LITE =
    /[?&]lite=1/.test(location.search) ||
    (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) ||
    Boolean(nav.connection?.saveData)
  const isMobile = () => innerWidth < 768
  if (RM) root.classList.add('rm')
  if (LITE) root.classList.add('lite')
  root.classList.add('js')

  const tour = root
  const stageNode = $('#stage')
  if (!stageNode) return () => undefined
  const stage = stageNode

  const P: Record<string, HTMLElement> = {}
  $$('[data-plane]').forEach((el) => {
    P[el.dataset.plane!] = el
  })
  const S: Record<string, SceneEl> = {}
  $$('.scene').forEach((el) => {
    S[el.dataset.scene!] = el as SceneEl
  })
  const roomChip = $('#roomChip')
  const finalTitle = $('#finalTitle')
  const finalCta = $('#finalCta') as HTMLAnchorElement | null
  const finalLegend = $('#finalLegend')
  const legendItems = $$('#finalLegend li')
  const caption = S.entrada ? $('[data-cap]', S.entrada) : null
  const progress = $('.tour-progress')
  const rtPath = $('#rtPath') as unknown as SVGPathElement | null
  const rtDot = $('#rtDot') as unknown as SVGCircleElement | null
  const route = $('#route')
  const routeLabel = $('#routeLabel')

  const SEGS: Seg[] = [
    { id: 'hero', len: 1, room: '', start: 0, span: 0 },
    { id: 'house', len: 2, room: 'Exterior', start: 0, span: 0 },
    { id: 'entrada', len: 1.5, room: 'Entrada', start: 0, span: 0 },
    { id: 'inverter', len: 2.5, room: 'Cuarto técnico', start: 0, span: 0 },
    { id: 'sala', len: 2, room: 'Sala', start: 0, span: 0 },
    { id: 'bano', len: 2, room: 'Baño', start: 0, span: 0 },
    { id: 'final', len: 2.5, room: 'Tu hogar con EcoStore', start: 0, span: 0 },
  ]
  let TOTAL = 0
  let VW = 0
  let VH = 0
  let ZMAX = 1.35

  const COS = $$('.co') as CoEl[]
  const coClicks: Array<[HTMLElement, () => void]> = []
  COS.forEach((co) => {
    if (isMobile() && co.dataset.m) {
      const m = co.dataset.m.split(' ')
      co.dataset.side = m[0]
      co.style.setProperty('--dx', m[1])
      co.style.setProperty('--dy', m[2])
    }
    const cs = getComputedStyle(co)
    const k = parseFloat(cs.getPropertyValue('--k')) || 1
    const dx = parseFloat(cs.getPropertyValue('--dx')) * k
    const dy = parseFloat(cs.getPropertyValue('--dy')) * k
    const line = $('line', co) as SVGLineElement | null
    if (!line) return
    const len = Math.hypot(dx, dy)
    line.setAttribute('x2', String(dx))
    line.setAttribute('y2', String(dy))
    line.style.strokeDasharray = String(len)
    line.style.strokeDashoffset = String(len)
    co._len = len
    co._line = line
    co._dot = $('.co-dot', co)!
    co._ring = $('.co-ring', co)!
    co._label = $('.co-label', co)!
    const at = (co.dataset.at || '0 1').split(' ').map(Number)
    co._a = at[0]
    co._b = at[1]
    const onDot = () => {
      co.classList.toggle('open')
    }
    co._dot.addEventListener('click', onDot)
    coClicks.push([co._dot, onDot])
  })

  function setCo(co: CoEl, t: number) {
    if (!co._line) return
    const d = seg(t, 0, 0.3)
    const l = seg(t, 0.2, 0.6)
    const lb = seg(t, 0.5, 1)
    co._dot.style.opacity = String(d)
    co._dot.style.transform = 'scale(' + lerp(0.6, 1, eo(d)) + ')'
    const ring = seg(t, 0.15, 0.6)
    co._ring.style.opacity = ring > 0 && ring < 1 ? String((1 - ring) * 0.9) : '0'
    co._ring.style.transform = 'scale(' + lerp(1, 3.2, ring) + ')'
    co._line.style.strokeDashoffset = String(co._len * (1 - eo(l)))
    co._label.style.opacity = String(lb)
    const base =
      co.dataset.side === 'left'
        ? 'translate(-100%,-50%)'
        : co.dataset.side === 'up'
          ? 'translate(-50%,-100%)'
          : co.dataset.side === 'down'
            ? 'translate(-50%,0)'
            : 'translate(0,-50%)'
    co._label.style.transform = base + ' translateY(' + (1 - eo(lb)) * 8 + 'px)'
  }

  function layoutScene(sc: SceneEl) {
    const w = +sc.dataset.w!
    const h = +sc.dataset.h!
    let s: number
    if (sc.dataset.contain) {
      s = isMobile() ? VW / w : Math.min((VW * 0.92) / w, (VH * 0.74) / h)
    } else {
      s = Math.max(VW / w, VH / h)
    }
    const bw = w * s
    const bh = h * s
    sc.style.width = bw + 'px'
    sc.style.height = bh + 'px'
    sc.style.left = (VW - bw) / 2 + 'px'
    sc.style.top = sc.dataset.contain
      ? isMobile()
        ? VH * 0.4 - bh / 2 + 'px'
        : VH * 0.42 - bh / 2 + 'px'
      : (VH - bh) / 2 + 'px'
    sc.style.transformOrigin = sc.dataset.origin || '50% 50%'
    sc._ox = bw - VW
    sc._oy = bh - VH
  }

  function focusX(sc: SceneEl, p: number) {
    let fx = +sc.dataset.fx!
    if (isMobile() && sc.dataset.fxm) {
      const pan = (sc.dataset.pan || '0 1').split(' ').map(Number)
      fx = LITE ? +sc.dataset.fxm : lerp(+sc.dataset.fxm, +sc.dataset.fxm2!, ec(seg(p, pan[0], pan[1])))
    }
    return (0.5 - fx) * sc._ox
  }
  function focusY(sc: SceneEl) {
    return (0.5 - (+sc.dataset.fy! || 0.5)) * sc._oy
  }
  function coT(sc: SceneEl, co: CoEl, p: number) {
    let t = seg(p, co._a, co._b)
    if (isMobile() && !LITE && sc.dataset.pan) {
      const pan = sc.dataset.pan.split(' ').map(Number)
      if (co._b <= pan[0] + 0.01) t *= 1 - seg(p, pan[0], pan[1])
    }
    return t
  }

  function layout() {
    VW = stage.clientWidth || innerWidth
    VH = stage.clientHeight || innerHeight
    if (VH < 120) VH = innerHeight
    let f = isMobile() ? 0.7 : 1
    if (LITE) f *= 0.7
    TOTAL = 0
    SEGS.forEach((s) => {
      s.start = TOTAL
      s.span = s.len * f
      TOTAL += s.span
    })
    tour.style.height = (TOTAL + 1) * VH + 'px'
    ZMAX = isMobile() ? 1.25 : 1.35
    if (P.copy && P.house) {
      const copyH = P.copy.offsetHeight
      const houseTop = Math.max(VH * (isMobile() ? 0.5 : 0.56), copyH + 8)
      P.house.style.top = houseTop + 'px'
      P.house.style.transform = ''
    }
    Object.keys(S).forEach((k) => layoutScene(S[k]))
  }

  const loaded: Record<string, boolean> = {}
  function ensure(id: string) {
    const sc = S[id]
    if (!sc || loaded[id]) return
    const img = $('img', sc) as HTMLImageElement | null
    if (img && img.dataset.srcset) {
      img.srcset = img.dataset.srcset
      img.src = img.dataset.src || ''
    }
    loaded[id] = true
  }

  function T(el: HTMLElement | null | undefined, o: number, x?: number, y?: number, s?: number) {
    if (!el) return
    o = clamp(o, 0, 1)
    el.style.opacity = String(o)
    el.style.transform = 'translate3d(' + (x || 0) + 'px,' + (y || 0) + 'px,0) scale(' + (s || 1) + ')'
    const vis = o > 0.003
    el.style.visibility = vis ? 'visible' : 'hidden'
    el.classList.toggle('live', vis)
  }
  function hide(el: HTMLElement | null | undefined) {
    if (!el) return
    el.style.opacity = '0'
    el.style.visibility = 'hidden'
    el.classList.remove('live')
  }

  let lastSeg = -1
  function render(Pv: number) {
    let i = SEGS.length - 1
    for (let j = 0; j < SEGS.length; j++) if (Pv >= SEGS[j].start) i = j
    const sg = SEGS[i]
    const p = clamp((Pv - sg.start) / sg.span, 0, 1)
    if (i !== lastSeg) {
      lastSeg = i
      ensure(sg.id)
      if (SEGS[i + 1]) ensure(SEGS[i + 1].id)
      if (i >= 1) ensure('entrada')
    }
    const H1 = (+getComputedStyle(root).getPropertyValue('--h1') || 44) / 100 * VH
    const H2 = (+getComputedStyle(root).getPropertyValue('--h2') || 34) / 100 * VH
    const zoom = (a: number, b: number, t: number) => (LITE ? 1 : lerp(a, b, t))
    const pan = (a: number, b: number, t: number) => (LITE ? 0 : lerp(a, b, t))

    hide(S.entrada)
    hide(S.inverter)
    hide(S.sala)
    hide(S.bano)
    hide(S.final)
    if (P.vignette) P.vignette.style.opacity = '0'
    if (P.finalScrim) P.finalScrim.style.opacity = '0'
    if (caption) caption.style.opacity = '0'
    if (finalTitle) finalTitle.style.opacity = '0'
    if (finalCta) finalCta.style.opacity = '0'
    if (finalLegend) finalLegend.style.opacity = '0'
    COS.forEach((co) => {
      if (!co.classList.contains('open')) setCo(co, 0)
      else setCo(co, 1)
    })

    const heroVisible = i <= 1
    P.rays?.classList.toggle('breathe', i === 0)
    if (heroVisible) {
      const hp = i === 0 ? p : 1
      T(P.copy, 1 - seg(hp, 0.1, 0.6), 0, -hp * 0.18 * VH, 1)
      T(P.rays, 1, 0, -hp * 0.04 * VH, 1)
      T(P.clouds, 1, 0, hp * 0.06 * VH, 1)
      T(P.haze, 1 - seg(hp, 0, 0.7), 0, hp * 0.12 * VH, 1)
      if (i === 0) {
        T(P.house, 1, 0, -p * H1, zoom(1, 1.1, p))
        if (P.door) P.door.style.opacity = '0'
      } else {
        const z = zoom(1.1, ZMAX, ec(seg(p, 0.2, 0.8)))
        T(P.house, 1, 0, -H1 - p * H2, z)
        if (P.door) P.door.style.opacity = String(seg(p, 0.5, 0.8) * 0.35)
        const o = seg(p, 0.8, 1)
        if (o > 0) T(S.entrada, o, focusX(S.entrada, 0), focusY(S.entrada), zoom(1.08, 1, eo(o)))
      }
    } else {
      hide(P.copy)
      hide(P.haze)
      T(P.rays, 1, 0, -0.04 * VH, 1)
      T(P.clouds, 1, 0, 0.06 * VH, 1)
      hide(P.house)
      if (P.door) P.door.style.opacity = '0'
    }

    if (i === 2) {
      const z2 = zoom(1, 1.22, ec(seg(p, 0, 0.7)))
      const o2 = seg(p, 0.8, 1)
      T(S.entrada, 1 - o2, focusX(S.entrada, p) + pan(0, -0.06 * VW, ei(o2)), focusY(S.entrada), z2)
      if (caption) caption.style.opacity = String(seg(p, 0.22, 0.32) * (1 - seg(p, 0.68, 0.78)))
      if (o2 > 0)
        T(S.inverter, o2, focusX(S.inverter, 0) + pan(0.08 * VW, 0, eo(o2)), focusY(S.inverter), zoom(1.1, 1, eo(o2)))
    }
    if (i === 3) {
      const out3 = seg(p, 0.84, 1)
      T(S.inverter, 1 - out3, focusX(S.inverter, p) + pan(0, -0.2 * VW, ei(out3)), focusY(S.inverter), zoom(1, 1.06, ei(out3)))
      $$('.co', S.inverter).forEach((co) => setCo(co as CoEl, coT(S.inverter, co as CoEl, p) * (1 - out3)))
      if (out3 > 0)
        T(S.sala, out3, focusX(S.sala, 0) + pan(0.2 * VW, 0, eo(out3)), focusY(S.sala), zoom(1.04, 1, eo(out3)))
    }
    if (i === 4) {
      const out4 = seg(p, 0.8, 1)
      T(S.sala, 1, focusX(S.sala, p), focusY(S.sala), zoom(1, 1.2, ei(out4)))
      $$('.co', S.sala).forEach((co) => setCo(co as CoEl, coT(S.sala, co as CoEl, p) * (1 - out4)))
      if (P.vignette) P.vignette.style.opacity = String(0.75 * out4)
      if (out4 > 0.6) {
        const oo = seg(out4, 0.6, 1)
        T(S.bano, oo, focusX(S.bano, 0), focusY(S.bano), zoom(1.15, 1.12, oo))
      }
    }
    if (i === 5) {
      const inn = seg(p, 0, 0.18)
      const out5 = seg(p, 0.8, 1)
      T(S.bano, 1, focusX(S.bano, p), focusY(S.bano), zoom(lerp(1.12, 1, eo(inn)), 0.92, ei(out5)))
      $$('.co', S.bano).forEach((co) => setCo(co as CoEl, coT(S.bano, co as CoEl, p) * (1 - out5)))
      if (P.vignette) P.vignette.style.opacity = String(Math.max(0.75 * (1 - inn), out5))
    }
    if (i === 6) {
      const in6 = seg(p, 0, 0.24)
      if (in6 < 1) T(S.bano, 1 - seg(p, 0, 0.12), 0, 0, 0.92)
      T(S.final, seg(p, 0, 0.12), 0, 0, zoom(1.4, 1, eo(in6)))
      if (P.vignette) P.vignette.style.opacity = String(1 - eo(in6))
      $$('.co', S.final).forEach((co) => {
        const k = +(co as HTMLElement).dataset.i!
        setCo(co as CoEl, seg(p, 0.24 + k * 0.03, 0.3 + k * 0.03))
      })
      if (finalLegend) finalLegend.style.opacity = String(seg(p, 0.16, 0.24))
      legendItems.forEach((li, k) => {
        const t = eo(seg(p, 0.24 + k * 0.03, 0.3 + k * 0.03))
        li.style.opacity = String(0.25 + 0.75 * t)
        li.style.transform = 'translateY(' + (4 - 4 * t) + 'px)'
      })
      const f = seg(p, 0.7, 0.84)
      if (P.finalScrim) P.finalScrim.style.opacity = String(seg(p, 0.6, 0.8))
      if (finalTitle) {
        finalTitle.style.opacity = String(f)
        finalTitle.style.clipPath = 'inset(' + (100 - 100 * eo(f)) + '% 0 0 0)'
      }
      if (finalCta) {
        finalCta.style.opacity = String(f)
        finalCta.style.transform = 'translateY(' + (1 - eo(f)) * 10 + 'px)'
        finalCta.tabIndex = f > 0.5 ? 0 : -1
      }
    }

    if (roomChip) {
      if (i >= 2) {
        roomChip.textContent = sg.room
        roomChip.style.opacity = String(
          seg(p, 0.04, 0.14) * (1 - seg(p, i === 6 ? 0.55 : 0.86, i === 6 ? 0.68 : 0.96)),
        )
      } else roomChip.style.opacity = '0'
    }

    if (progress) progress.style.transform = 'scaleX(' + Pv / TOTAL + ')'
    routeUpdate(i, p, Pv)
  }

  const rooms: Record<string, HTMLElement> = {}
  $$('.rt-room').forEach((r) => {
    rooms[r.dataset.room!] = r
  })
  const pathLen = rtPath && 'getTotalLength' in rtPath ? rtPath.getTotalLength() : 0
  const legs = [30, 46, 46, 46, 76]
  const legStart = [0]
  legs.forEach((l, k) => {
    legStart.push(legStart[k] + l)
  })
  const legOf: Record<string, number> = {
    hero: 0,
    house: 0,
    entrada: 1,
    inverter: 2,
    sala: 3,
    bano: 4,
    final: 5,
  }
  const roomOf: Record<string, string> = {
    entrada: 'entrada',
    inverter: 'inverter',
    sala: 'sala',
    bano: 'bano',
  }

  function routeUpdate(i: number, p: number, Pv: number) {
    if (!rtPath || !rtDot || !route) return
    const id = SEGS[i].id
    let L = 0
    if (id === 'hero') L = 0
    else if (id === 'house') L = 30 * p
    else if (id === 'final') L = legStart[4] + (p < 0.3 ? 0 : 76 * eo(seg(p, 0.3, 0.9)))
    else {
      const k = legOf[id]
      L = legStart[k - 1] + legs[k - 1] * (p < 0.15 ? p / 0.15 : 1)
    }
    const pt = rtPath.getPointAtLength(clamp(L, 0, pathLen))
    rtDot.setAttribute('cx', pt.x.toFixed(1))
    rtDot.setAttribute('cy', pt.y.toFixed(1))
    Object.keys(rooms).forEach((r) => {
      rooms[r].classList.toggle('on', roomOf[id] === r && p > 0.12 && p < 0.9)
    })
    if (routeLabel) routeLabel.textContent = SEGS[i].room || 'Exterior'
    route.classList.toggle('show', Pv > 0.3 && Pv < TOTAL - 0.05)
  }

  const roomClicks: Array<[HTMLElement, () => void]> = []
  $$('.rt-room').forEach((r) => {
    const onClick = () => {
      const sg = SEGS.find((s) => s.id === r.dataset.room)
      if (sg) {
        const top = tour.offsetTop + (sg.start + sg.span * 0.3) * VH
        scrollTo({ top, behavior: RM ? 'auto' : 'smooth' })
      }
    }
    r.addEventListener('click', onClick)
    roomClicks.push([r, onClick])
  })

  let target = 0
  let cur = 0
  let raf: number | null = null
  let lastTs = 0
  let slow = 0
  let frames = 0

  function onScroll() {
    if (!VH || !TOTAL) layout()
    const y = scrollY - tour.offsetTop
    target = clamp(y / VH, 0, TOTAL)
    if (!isFinite(target)) target = 0
    if (!raf) raf = requestAnimationFrame(tick)
  }
  function tick(ts: number) {
    const dt = lastTs ? ts - lastTs : 16
    lastTs = ts
    const kb = isMobile() ? 0.35 : 0.16
    const k = 1 - Math.pow(1 - kb, dt / 16.7)
    const d = target - cur
    if (Math.abs(d) < 0.0004) {
      cur = target
      render(cur)
      raf = null
      lastTs = 0
      return
    }
    cur += d * k
    render(cur)
    if (!LITE) {
      frames++
      if (dt > 40) slow++
      if (frames > 90) {
        if (slow / frames > 0.5) {
          LITE = true
          root.classList.add('lite')
        }
        frames = 0
        slow = 0
      }
    }
    raf = requestAnimationFrame(tick)
  }

  let lastW = innerWidth
  let lastH = stage.clientHeight
  function onResize() {
    if (innerWidth === lastW && Math.abs(stage.clientHeight - lastH) < 60) return
    lastW = innerWidth
    lastH = stage.clientHeight
    const frac = TOTAL ? cur / TOTAL : 0
    layout()
    cur = target = frac * TOTAL
    render(cur)
  }
  function onLoad() {
    layout()
    onScroll()
    cur = target
    render(cur)
  }

  const legends: HTMLElement[] = []
  if (RM) {
    Object.keys(S).forEach((k) => ensure(k))
    P.rays?.classList.remove('breathe')
    ;(['entrada', 'inverter', 'sala', 'bano'] as const).forEach((k) => {
      const sc = S[k]
      if (!sc) return
      const labels = $$('.co-label', sc)
      if (!labels.length) return
      const ul = document.createElement('ul')
      ul.className = 'scene-legend'
      labels.forEach((l) => {
        const li = document.createElement('li')
        li.innerHTML = l.innerHTML
        ul.appendChild(li)
      })
      sc.insertAdjacentElement('afterend', ul)
      legends.push(ul)
    })
  } else {
    layout()
    ensure('entrada')
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onResize)
    addEventListener('load', onLoad)
    onScroll()
    cur = target
    render(cur)
  }

  return () => {
    if (raf) cancelAnimationFrame(raf)
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onResize)
    removeEventListener('load', onLoad)
    coClicks.forEach(([el, fn]) => el.removeEventListener('click', fn))
    roomClicks.forEach(([el, fn]) => el.removeEventListener('click', fn))
    legends.forEach((el) => el.remove())
    root.classList.remove('rm', 'lite', 'js')
    root.style.height = ''
  }
}
