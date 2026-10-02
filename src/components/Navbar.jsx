import { useState, useEffect } from 'react'

const LINKS = [['Music','#music'],['Video','#video'],['Photos','#photos'],['Films','#catalogue'],['About','#about']]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // close drawer on scroll
  useEffect(() => {
    const fn = () => setOpen(false)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className="nav">
        <a href="#" className="nav-wm">NITIN CHAUBEY<span>.</span></a>
        <div className="nav-links">
          {LINKS.map(([l,h]) => <a key={l} href={h} className="nav-link">{l}</a>)}
          <a href="#contact" className="nav-pill">Contact</a>
        </div>
        {/* Hamburger */}
        <button className={`nav-burger ${open?'open':''}`} onClick={() => setOpen(o=>!o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${open?'open':''}`}>
        {LINKS.map(([l,h]) => <a key={l} href={h} onClick={close}>{l}</a>)}
        <a href="#contact" onClick={close} style={{color:'var(--amber)'}}>Contact</a>
      </div>
    </>
  )
}
