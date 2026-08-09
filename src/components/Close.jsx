export default function Close() {
  return (
    <section className="close-sec" id="contact">
      <div className="close-inner">
        <div>
          <div className="sec-label">Get in touch</div>
          <h2 className="close-h">
            Let's make something<span style={{ color:'var(--amber)' }}>.</span>
          </h2>
          <p className="close-fine">
            shivaynitin11@gmail.com&nbsp;&nbsp;·&nbsp;&nbsp;+91-7836884870&nbsp;&nbsp;·&nbsp;&nbsp;Karol Bagh, New Delhi
          </p>
          <p className="close-quote">
            "Every frame, every frequency, every word — crafted with intent."
          </p>
        </div>
        <div className="close-btns">
          <a href="mailto:shivaynitin11@gmail.com" className="btn-solid">Send a message</a>
          <a href="https://www.linkedin.com/in/nitin-chaubey-9ab90726a" target="_blank" rel="noopener noreferrer" className="btn-ghost">LinkedIn</a>
          <a href="https://www.instagram.com/shivaynitin11" target="_blank" rel="noopener noreferrer" className="btn-ghost">Instagram</a>
        </div>
      </div>

      <div className="close-footer">
        <span>© 2025 Nitin Chaubey · BJMC, BVICAM · New Delhi</span>
        <span style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
          <a href="https://www.instagram.com/shivaynitin11" target="_blank" rel="noopener noreferrer"
            style={{ color:'var(--muted)', transition:'color .2s' }}
            onMouseEnter={e=>e.target.style.color='var(--amber)'}
            onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >@shivaynitin11</a>
          <span style={{ color:'var(--amber)' }}>·</span>
          <a href="https://www.instagram.com/aryavrath_official" target="_blank" rel="noopener noreferrer"
            style={{ color:'var(--muted)', transition:'color .2s' }}
            onMouseEnter={e=>e.target.style.color='var(--amber)'}
            onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >@aryavrath_official</a>
        </span>
      </div>

      <div className="close-wm">NITIN<span>.</span></div>
    </section>
  )
}
