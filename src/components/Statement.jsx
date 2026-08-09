import { useEffect, useRef } from 'react'

const SKILLS = [
  { label:'Adobe Premiere Pro', type:'amber' },
  { label:'DSLR Camera',        type:'amber' },
  { label:'Audio Editing',      type:'teal'  },
  { label:'Radio Production',   type:'teal'  },
  { label:'News Writing',       type:''      },
  { label:'Video Editing',      type:''      },
  { label:'Photoshop',          type:''      },
  { label:'Script Writing',     type:''      },
  { label:'Event Coverage',     type:''      },
  { label:'Social Media',       type:''      },
  { label:'Broadcast Journalism',type:'amber'},
  { label:'Photography',        type:'teal'  },
]

export default function Statement() {
  const imgRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      if (!imgRef.current) return
      const rect = imgRef.current.closest('section').getBoundingClientRect()
      const prog = Math.max(0, Math.min(1, -rect.top / window.innerHeight))
      imgRef.current.style.transform = `translateY(${prog * -55}px) rotate(${prog * 10}deg)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const els = document.querySelectorAll('.statement .reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="statement" id="about">
      <div className="statement-inner">
        <div className="statement-text">
          <div className="statement-label reveal">Media Producer</div>
          <h2 className="statement-h reveal">
            Six original songs on national radio.{' '}
            <span className="a">Twenty episodes hosted.</span>{' '}
            One city covered frame by frame.
          </h2>
          <p style={{ fontSize:15, color:'var(--ink2)', lineHeight:1.8, maxWidth:'38ch' }} className="reveal">
            Nitin Chaubey is a broadcast journalist, music composer, and visual producer based in New Delhi — BJMC graduate from BVICAM with a final CGPA of&nbsp;
            <span style={{ color:'var(--amber)', fontWeight:600 }}>9.62</span>.
          </p>

          {/* Skills strip */}
          <div className="skills-strip reveal">
            {SKILLS.map(s => (
              <span key={s.label} className={`skill-pill ${s.type}`}>{s.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div ref={imgRef} className="statement-img">
        <img src="/nitin/profile/profile.jpeg" alt="" />
      </div>
      <div className="statement-index">01</div>
    </section>
  )
}
