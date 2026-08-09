import { useEffect } from 'react'
import Deck from './Deck'

export default function Releases() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const els = document.querySelectorAll('.releases-left .reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="photos" style={{ borderTop:'1px solid var(--hair)', padding:'120px 0 80px' }}>
      <div className="releases-left" style={{ padding:'0 5vw', marginBottom:'4rem' }}>
        <div className="sec-label reveal">Photography &amp; Visual Work</div>
        <h2 className="sec-h reveal">
          The catalogue<span style={{ color:'var(--amber)' }}>.</span>
        </h2>
        <p className="releases-lede reveal">
          Model shoots, editorial sessions, and on-ground production stills — grouped by shoot, laid out like prints from the archive.
        </p>
        <div className="releases-btns reveal">
          <a href="https://www.instagram.com/shivaynitin11" target="_blank" rel="noopener noreferrer" className="btn-solid">
            View on Instagram
          </a>
        </div>
      </div>
      <Deck />
    </section>
  )
}
