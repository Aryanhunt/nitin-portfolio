import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—'

function scramble(el, finalText, duration = 900) {
  const chars = CHARS
  let start = null
  const len = finalText.length

  const tick = (ts) => {
    if (!start) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    const revealed = Math.floor(progress * len)

    let display = ''
    for (let i = 0; i < len; i++) {
      if (finalText[i] === ' ') { display += ' '; continue }
      if (i < revealed) {
        display += finalText[i]
      } else {
        display += chars[Math.floor(Math.random() * chars.length)]
      }
    }
    el.textContent = display
    if (progress < 1) requestAnimationFrame(tick)
    else el.textContent = finalText
  }
  requestAnimationFrame(tick)
}

// ── Static banner image ──
function BannerImg() {
  return (
    <div style={{ position:'absolute', inset:0, zIndex:0 }}>
      <img
        src="/nitin/nitin.jpeg"
        alt="Nitin Chaubey"
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }}
      />
    </div>
  )
}

export default function PortalHero() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const duoRef     = useRef(null)
  const panelLRef  = useRef(null)
  const panelRRef  = useRef(null)
  const dotARef    = useRef(null)
  const dotTRef    = useRef(null)
  const titleRef   = useRef(null)
  const spanLRef   = useRef(null)
  const spanRRef   = useRef(null)

  // scramble on mount
  useEffect(() => {
    const delay = 400
    setTimeout(() => {
      if (spanLRef.current) scramble(spanLRef.current, 'NITIN',   900)
    }, delay)
    setTimeout(() => {
      if (spanRRef.current) scramble(spanRRef.current, 'CHAUBEY', 1100)
    }, delay + 120)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const stage   = stageRef.current

    function onScroll() {
      const rect  = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const raw   = Math.max(0, Math.min(1, -rect.top / total))
      const open  = Math.max(0, Math.min(1, raw / 0.6))
      const t     = open < 0.5 ? 2 * open * open : -1 + (4 - 2 * open) * open

      const panelW = stage.offsetWidth * 0.52
      panelLRef.current.style.transform = `translateX(${-t * panelW * 1.05}px)`
      panelRRef.current.style.transform = `translateX(${t * panelW * 1.05}px)`

      duoRef.current.style.opacity = t * 0.18

      const hw = stage.offsetWidth  * 0.38
      const hh = stage.offsetHeight * 0.38
      dotARef.current.style.transform = `translate(${t * hw}px, ${-t * hh}px)`
      dotTRef.current.style.transform = `translate(${-t * hw}px, ${t * hh}px)`
      dotARef.current.style.opacity   = 0.7 + t * 0.3
      dotTRef.current.style.opacity   = 0.7 + t * 0.3

      const titleScale = 1 + t * 0.18
      const ls         = -0.02 - t * 0.04
      titleRef.current.style.transform     = `translate(-50%,-50%) scale(${titleScale})`
      titleRef.current.style.letterSpacing = `${ls}em`

      const hw2 = titleRef.current.offsetWidth * 0.5 * t
      spanLRef.current.style.transform = `translateX(${-hw2}px)`
      spanRRef.current.style.transform = `translateX(${hw2}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="portal-section">
      <div ref={stageRef} className="portal-stage">

        <BannerImg />

        <div ref={duoRef} className="portal-duotone" />
        <div className="portal-veil" />

        <div ref={panelLRef} className="portal-panel portal-panel-l" />
        <div ref={panelRRef} className="portal-panel portal-panel-r" />

        <div ref={dotARef} className="portal-dot portal-dot-a" style={{ opacity: 0.7 }} />
        <div ref={dotTRef} className="portal-dot portal-dot-t" style={{ opacity: 0.7 }} />

        <div ref={titleRef} className="portal-title">
          <span ref={spanLRef}>NITIN</span>
          <span style={{ color:'var(--amber)', margin:'0 .12em', display:'inline-block' }}>·</span>
          <span ref={spanRRef}>CHAUBEY</span>
        </div>

        {/* Artist name */}
        <div className="portal-artist-name">
          <span className="portal-artist-aka">aka</span>
          <span className="portal-artist-label">Shivay Nitin</span>
        </div>

        <div className="portal-scroll-cue">Scroll</div>

        <div className="portal-meta portal-meta-tl">
          Broadcast<span className="accent"> · </span>Music<span className="accent"> · </span>Film
        </div>
        <div className="portal-meta portal-meta-tr">
          New Delhi<span className="accent"> · </span>India
        </div>
        <div className="portal-meta portal-meta-bl">
          AIR Rainbow 100.1 FM<span className="accent"> ·</span>
        </div>
        <div className="portal-meta portal-meta-br">
          BJMC <span className="accent">·</span> CGPA 9.62
        </div>
      </div>
    </section>
  )
}
