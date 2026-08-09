import { useEffect, useRef, useState } from 'react'

const MUSIC_VIDS = [
  { code:'NC-M01', title:'Northeast Diary — AIR Feature',   id:'LUFcPwnLcd0' },
  { code:'NC-M02', title:'AIR Rainbow Composition II',       id:'RB3IoPRlqJI' },
  { code:'NC-M03', title:'AIR Rainbow Composition III',      id:'zgMhqLHbfmo' },
]

const PROD_VIDS = [
  { code:'NC-V01', title:'Entertainment Ka Tadka — I',       id:'dHuMRL364JM' },
  { code:'NC-V02', title:'Entertainment Ka Tadka — II',      id:'j1QkS9cfvPc' },
  { code:'NC-V03', title:'Entertainment Ka Tadka — III',     id:'ceQUsGrmGLk' },
]

function VideoGrid({ items }) {
  const [playing, setPlaying] = useState(null)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.2rem',
    }}>
      {items.map(v => (
        <div key={v.id} className="vid-card">
          <div className="vid-thumb" onClick={() => setPlaying(v.id)} style={{ cursor: playing === v.id ? 'default' : 'pointer' }}>
            {playing === v.id ? (
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
              />
            ) : (
              <>
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} />
                <div className="vid-play">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </>
            )}
          </div>
          <div className="vid-foot">
            <div className="vid-code">{v.code}</div>
            <div className="vid-title">{v.title}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Dates() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const els = ref.current?.querySelectorAll('.reveal') || []
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ borderTop:'1px solid var(--hair)', padding:'100px 5vw' }} id="music">

      {/* ── MUSIC / AIR ── */}
      <div style={{ marginBottom:'5rem' }}>
        <div className="sec-label reveal">All India Radio</div>
        <h2 className="sec-h reveal" style={{ marginBottom:'2rem' }}>
          Music &amp; Broadcasts<span style={{ color:'var(--amber)' }}>.</span>
        </h2>
        <VideoGrid items={MUSIC_VIDS} />
      </div>

      {/* ── VIDEO PRODUCTION ── */}
      <div id="video">
        <div className="sec-label reveal">Video Production</div>
        <h2 className="sec-h reveal" style={{ marginBottom:'2rem' }}>
          Entertainment Ka Tadka<span style={{ color:'var(--teal)' }}>.</span>
        </h2>
        <VideoGrid items={PROD_VIDS} />
      </div>

    </section>
  )
}
