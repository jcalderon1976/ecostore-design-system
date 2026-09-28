import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cx } from '../../utils/cx'
import { MaximizeIcon, MinimizeIcon, PlayIcon } from '../../icons'
import styles from './YouTubePlayer.module.css'

export interface YouTubePlayerProps {
  videoId: string
  title?: string
  customThumbnail?: string
  defaultExpanded?: boolean
  /** Tarjeta más chica (móvil): sin kicker ni título. */
  compact?: boolean
  onExpandedChange?: (expanded: boolean) => void
  className?: string
}

function extractVideoId(id: string) {
  if (!id.includes('youtube.com') && !id.includes('youtu.be')) return id
  try {
    const url = new URL(id)
    if (id.includes('youtube.com')) return url.searchParams.get('v') || id
    return url.pathname.replace(/^\//, '')
  } catch {
    return id
  }
}

function embedSrc(id: string, autoplay = false) {
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    enablejsapi: '1',
    playsinline: '1',
    origin,
  })
  if (autoplay) params.set('autoplay', '1')
  return `https://www.youtube.com/embed/${id}?${params}`
}

function playEmbed(frame: HTMLIFrameElement | null) {
  const win = frame?.contentWindow
  if (!win) return
  win.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*')
  win.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*')
}

const PRECONNECT = ['https://www.youtube.com', 'https://i.ytimg.com'] as const

function ensurePreconnect() {
  for (const href of PRECONNECT) {
    if (document.head.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }
}

function sweepOrphans() {
  document.querySelectorAll('[data-eco-yt], [data-eco-yt-host]').forEach((el) => el.remove())
}

/**
 * Reproductor de YouTube en el flujo del documento.
 * El lightbox (ampliar) es el único portal, para no duplicar la tarjeta.
 */
export function YouTubePlayer({
  videoId,
  title,
  customThumbnail,
  defaultExpanded = false,
  compact = false,
  onExpandedChange,
  className,
}: YouTubePlayerProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const reduce = useReducedMotion()
  const actualVideoId = extractVideoId(videoId)
  const thumb = customThumbnail || (actualVideoId ? `https://i.ytimg.com/vi/${actualVideoId}/hqdefault.jpg` : '')
  const src = actualVideoId ? embedSrc(actualVideoId) : ''
  const showPoster = !playing || !ready

  const onExpandedChangeRef = useRef(onExpandedChange)
  onExpandedChangeRef.current = onExpandedChange

  const setOpen = (next: boolean) => {
    setExpanded(next)
    onExpandedChangeRef.current?.(next)
  }

  useEffect(() => {
    ensurePreconnect()
    sweepOrphans()
    if (thumb) {
      const img = new Image()
      img.src = thumb
    }
    return () => onExpandedChangeRef.current?.(false)
  }, [thumb])

  useEffect(() => {
    if (!expanded) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [expanded])

  const start = () => {
    setPlaying(true)
    playEmbed(frameRef.current)
    if (window.matchMedia('(max-width: 639px)').matches) setOpen(true)
  }

  useEffect(() => {
    if (!playing || !ready) return
    playEmbed(frameRef.current)
  }, [playing, ready])

  const stage = (inLightbox: boolean) => (
    <div className={styles.stage}>
      {src && (
        <iframe
          ref={inLightbox ? undefined : frameRef}
          src={inLightbox && playing ? embedSrc(actualVideoId, true) : src}
          title={title || 'Video de YouTube'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.frame}
          onLoad={() => { if (!inLightbox) setReady(true) }}
        />
      )}

      {showPoster && (
        <div className={styles.poster}>
          {thumb && (
            <img className={styles.thumb} src={thumb} alt={title || 'Miniatura del video'} />
          )}
          <div className={styles.veil} />
          <div className={styles.center}>
            <button
              type="button"
              className={cx(styles.play, playing && styles.playWait)}
              onClick={start}
              aria-label={playing ? 'Cargando video' : 'Reproducir video'}
              disabled={playing && !ready}
            >
              <PlayIcon size={22} />
            </button>
            {title && !playing && !compact && <p className={styles.title}>{title}</p>}
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.expand}
        onClick={() => setOpen(!expanded)}
        aria-label={expanded ? 'Minimizar video' : 'Ampliar video'}
      >
        {expanded ? <MinimizeIcon size={16} /> : <MaximizeIcon size={16} />}
      </button>
    </div>
  )

  return (
    <div className={cx(styles.wrap, compact && styles.compact, className)}>
      {!compact && <p className={styles.kicker}>Ver demostración</p>}
      <div className={cx(styles.card, expanded && styles.cardHidden)}>
        {stage(false)}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {expanded && (
            <>
              <motion.button
                type="button"
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                onClick={() => setOpen(false)}
                aria-label="Cerrar video"
              />
              <div className={styles.lightbox}>
                <motion.div
                  className={cx(styles.card, styles.cardExpanded)}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: reduce ? 0 : 0.22 }}
                >
                  {stage(true)}
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

export function preconnectYouTube() {
  if (typeof document === 'undefined') return
  ensurePreconnect()
}
