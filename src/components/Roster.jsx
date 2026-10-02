import { useEffect, useState } from 'react'

const ROSTER = [
  { label:'Film',        img:'/nitin/darpan.jpeg', video:'https://drive.google.com/file/d/1vFX7cOZCLxkdcOAPay9rDTJ7YPOexxFU/preview', name:'DARPAN — Short Film', sub:'Music Producer & Assistant Director. Worked as a Music Producer and Assistant Director on the short film Darpan, collaborating with the creative team throughout the production process. Handled the film\'s music production and contributed an original song, while also assisting with direction, production coordination, scene execution, and on-set operations.', count:'Original song' },
  { label:'Radio',       name:'All India Radio — AIR Rainbow 100.1 FM', sub:'News writing, bulletin preparation & 6 original compositions broadcasted on Rainbow 100.1 FM including Northeast Diary.', count:'6 compositions' },
  { label:'Broadcast',   name:'Radio Bharati — Shuru Ka Safar',          sub:'Hosted 20+ episodes as producer and on-air presenter. Wrote scripts, composed 4 original songs for the show.', count:'20+ episodes' },
  { label:'Media',       name:'Delhi Police — Media & PR Cell',           sub:'Digital Executive & Event Management Intern. Official event coverage, public relations and digital communication.', count:'Digital Executive' },
  { label:'Production',  name:'Entertainment Ka Tadka',                   sub:'On-ground event coverage, DSLR shooting, video editing and digital content production across Delhi.', count:'3 productions' },
  { label:'Photography', name:'Aryavrath Official',                       sub:'High-end product photography for leather goods, luxury handbags and accessories for the Aryavrath brand.', count:'Product catalogue' },
]

export default function Roster() {
  const [video, setVideo] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const rows = document.querySelectorAll('.roster-row')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } })
    }, { threshold: 0.08 })
    rows.forEach(r => { r.classList.add('reveal'); io.observe(r) })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!video) return
    const fn = e => { if (e.key === 'Escape') setVideo(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [video])

  return (
    <section className="roster" id="catalogue">
      <div className="sec-label" style={{ marginBottom:'2rem' }}>Catalogue</div>
      {ROSTER.map((r,i) => (
        <div key={i} className={`roster-row ${r.img ? 'roster-row--poster' : ''}`}>
          <span className="roster-label">{r.label}</span>
          {r.img && (
            r.video
              ? <button className="roster-poster roster-poster--btn" onClick={() => setVideo(r.video)} aria-label={`Watch ${r.name}`}>
                  <img src={r.img} alt={r.name} loading="lazy" />
                  <span className="roster-poster-play">▶</span>
                </button>
              : <div className="roster-poster">
                  <img src={r.img} alt={r.name} loading="lazy" />
                </div>
          )}
          <div className="roster-main">
            <div className="roster-name">{r.name}</div>
            <div className="roster-sub">{r.sub}</div>
            {r.video && (
              <button className="roster-watch" onClick={() => setVideo(r.video)}>▶ Watch Film</button>
            )}
          </div>
          <span className="roster-count">{r.count}</span>
        </div>
      ))}

      {video && (
        <div className="lb-overlay" onClick={() => setVideo(null)}>
          <div className="lb-video" onClick={e => e.stopPropagation()}>
            <iframe
              src={video}
              title="DARPAN — Short Film"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button className="lb-close" onClick={() => setVideo(null)}>Close</button>
        </div>
      )}
    </section>
  )
}