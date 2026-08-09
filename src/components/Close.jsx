export default function Close() {
  return (
    <section className="close-sec" id="contact">

      {/* ── Main contact block ── */}
      <div className="close-inner">
        <div>
          <div className="sec-label">Get in touch</div>
          <h2 className="close-h">
            Let's make something<span style={{ color:'var(--amber)' }}>.</span>
          </h2>
          <p className="close-quote">
            "Every frame, every frequency, every word — crafted with intent."
          </p>
        </div>

        {/* Contact details + social */}
        <div className="close-contact-block">
          <div className="close-contact-row">
            <span className="close-contact-label">Email</span>
            <a href="mailto:shivaynitin11@gmail.com" className="close-contact-val">shivaynitin11@gmail.com</a>
          </div>
          <div className="close-contact-row">
            <span className="close-contact-label">Phone</span>
            <span className="close-contact-val">+91-7836884870</span>
          </div>
          <div className="close-contact-row">
            <span className="close-contact-label">Location</span>
            <span className="close-contact-val">Karol Bagh, New Delhi</span>
          </div>
          <div className="close-contact-row">
            <span className="close-contact-label">Instagram</span>
            <a href="https://www.instagram.com/shivaynitin11" target="_blank" rel="noopener noreferrer" className="close-contact-val close-contact-link">@shivaynitin11</a>
          </div>
          <div className="close-contact-row">
            <span className="close-contact-label">LinkedIn</span>
            <a href="https://www.linkedin.com/in/nitin-chaubey-9ab90726a" target="_blank" rel="noopener noreferrer" className="close-contact-val close-contact-link">Nitin Chaubey</a>
          </div>

          <div className="close-btns" style={{ marginTop:'2rem' }}>
            <a href="mailto:shivaynitin11@gmail.com" className="btn-solid">Send a message</a>
            <a href="https://www.instagram.com/shivaynitin11" target="_blank" rel="noopener noreferrer" className="btn-ghost">Instagram</a>
            <a href="https://www.linkedin.com/in/nitin-chaubey-9ab90726a" target="_blank" rel="noopener noreferrer" className="btn-ghost">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* ── Big watermark ── */}
      <div className="close-wm">NITIN<span>.</span></div>

      {/* ── Footer bar ── */}
      <div className="close-footer">
        <span>© 2025 Nitin Chaubey · BJMC, BVICAM · New Delhi</span>
        <span>@shivaynitin11</span>
      </div>

      {/* ── Credit — very bottom ── */}
      <div className="close-credit">
        Designed &amp; built by{' '}
        <a href="https://github.com/Aryanhunt" target="_blank" rel="noopener noreferrer">Aryan Chaubey</a>
        {' '}·{' '}
        <a href="mailto:aryavrath9@gmail.com">aryavrath9@gmail.com</a>
      </div>

    </section>
  )
}
