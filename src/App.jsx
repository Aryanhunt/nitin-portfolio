import { useEffect, useRef, useState } from 'react'
import Navbar     from './components/Navbar'
import PortalHero from './components/PortalHero'
import Statement  from './components/Statement'
import Releases   from './components/Releases'
import Roster     from './components/Roster'
import Dates      from './components/Dates'
import Close      from './components/Close'

// ── Film-grain overlay ──
function Grain() {
  return <div className="grain" aria-hidden="true" />
}

// ── Guitar strum sound from file ──
function playGuitarStrum() {
  try {
    const audio = new Audio('/nitin/gutar.wav')
    audio.volume = 0.5
    audio.play()
  } catch (_) {}
}

// ── Guitar cursor ──
function Cursor() {
  const cursorRef = useRef(null)
  const bodyRef   = useRef(null)
  const s1Ref     = useRef(null)
  const s2Ref     = useRef(null)
  const s3Ref     = useRef(null)

  const mouse  = useRef({ x: -200, y: -200 })
  const pos    = useRef({ x: -200, y: -200 })
  const prev   = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }

    const onDown = () => {
      playGuitarStrum()
      // bounce the whole guitar
      bodyRef.current?.classList.remove('guitar-strum')
      void bodyRef.current?.offsetWidth // reflow to restart
      bodyRef.current?.classList.add('guitar-strum')
      // vibrate each string with staggered delay
      ;[s1Ref, s2Ref, s3Ref].forEach((r, i) => {
        r.current?.classList.remove('string-vibe')
        void r.current?.offsetWidth
        r.current?.style.setProperty('--sd', `${i * 40}ms`)
        r.current?.classList.add('string-vibe')
      })
    }

    const tick = () => {
      const lx = pos.current.x
      const ly = pos.current.y
      pos.current.x += (mouse.current.x - pos.current.x) * 0.13
      pos.current.y += (mouse.current.y - pos.current.y) * 0.13

      const dx = pos.current.x - lx
      const dy = pos.current.y - ly
      const speed = Math.sqrt(dx * dx + dy * dy)

      // tilt guitar in direction of movement
      const angle = speed > 0.3 ? Math.atan2(dy, dx) * (180 / Math.PI) + 90 : 0
      const tilt  = Math.min(speed * 3, 22)

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px,${pos.current.y}px) rotate(${angle * (tilt / 22)}deg)`
      }
      prev.current = { x: pos.current.x, y: pos.current.y }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={cursorRef} className="guitar-cursor">
      <div ref={bodyRef} className="guitar-body">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* neck */}
          <rect x="19.5" y="1" width="5" height="18" rx="2.5" fill="#C8A96E" />
          {/* nut */}
          <rect x="18" y="17" width="8" height="2" rx="1" fill="#8B6914" />
          {/* tuning pegs left */}
          <rect x="14" y="3"  width="6" height="3" rx="1.5" fill="var(--amber)" />
          <rect x="14" y="9"  width="6" height="3" rx="1.5" fill="var(--amber)" />
          <rect x="14" y="15" width="6" height="3" rx="1.5" fill="var(--amber)" />
          {/* tuning pegs right */}
          <rect x="24" y="3"  width="6" height="3" rx="1.5" fill="var(--amber)" />
          <rect x="24" y="9"  width="6" height="3" rx="1.5" fill="var(--amber)" />
          <rect x="24" y="15" width="6" height="3" rx="1.5" fill="var(--amber)" />
          {/* body outer */}
          <ellipse cx="22" cy="33" rx="10" ry="11" fill="#C8A96E" />
          {/* body shading */}
          <ellipse cx="22" cy="33" rx="7.5" ry="8.5" fill="#A07840" />
          {/* sound hole */}
          <circle  cx="22" cy="33" r="3.5" fill="#111" />
          {/* bridge */}
          <rect x="17" y="39" width="10" height="2" rx="1" fill="#8B6914" />
          {/* strings — paths so they can wave */}
          <path ref={s1Ref} d="M19 18 Q19 28 19 40" stroke="#E8913C" strokeWidth="0.8" fill="none" opacity="0.85" className="gstr" />
          <path ref={s2Ref} d="M22 18 Q22 28 22 40" stroke="#E8913C" strokeWidth="0.8" fill="none" opacity="0.85" className="gstr" />
          <path ref={s3Ref} d="M25 18 Q25 28 25 40" stroke="#E8913C" strokeWidth="0.8" fill="none" opacity="0.85" className="gstr" />
        </svg>
      </div>
    </div>
  )
}

function ScrollBar() {
  const barRef = useRef(null)
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (barRef.current) barRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{ position:'fixed',top:0,left:0,right:0,height:2,zIndex:600,background:'var(--hair)' }}>
      <div ref={barRef} style={{ height:'100%',background:'var(--amber)',width:'0%',transition:'width .08s linear' }} />
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button
      className={`btt ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >↑</button>
  )
}

export default function App() {
  return (
    <>
      <Grain />
      <Cursor />
      <ScrollBar />
      <BackToTop />
      <Navbar />
      <PortalHero />
      <Statement />
      <Dates />
      <Releases />
      <Roster />
      <Close />
    </>
  )
}
