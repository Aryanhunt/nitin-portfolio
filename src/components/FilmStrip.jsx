const ROW1 = [
  '/nitin/photoshoot/model/Copy of DSC00275.jpg',
  '/nitin/photoshoot/model/Copy of DSC00290.jpg',
  '/nitin/photoshoot/model/Copy of DSC00318.jpg',
  '/nitin/photoshoot/model/Copy of DSC00337.jpg',
  '/nitin/photoshoot/model/Copy of DSC00354.jpg',
  '/nitin/photoshoot/model/Copy of DSC00357.jpg',
  '/nitin/photoshoot/model/Copy of DSC00397.jpg',
  '/nitin/photoshoot/model/Copy of DSC00521.jpg',
]

const ROW2 = [
  '/nitin/photoshoot/shehnaazgill/WhatsApp Image 2025-04-23 at 21.33.01_048954b8.jpg',
  '/nitin/photoshoot/shehnaazgill/WhatsApp Image 2025-04-23 at 21.33.29_d2d3b065.jpg',
  '/nitin/photoshoot/shehnaazgill/WhatsApp Image 2025-04-23 at 21.33.31_7c3ecfb9.jpg',
  '/nitin/photoshoot/shehnaazgill/WhatsApp Image 2025-04-23 at 21.33.31_982ec8cb.jpg',
  '/nitin/photoshoot/shehnaazgill/WhatsApp Image 2025-04-23 at 21.33.32_08804aec.jpg',
  '/nitin/photoshoot/shehnaazgill/WhatsApp Image 2025-04-23 at 21.34.27_4086a265.jpg',
  '/nitin/photoshoot/bhoolchukmaf/_DSC5958.JPG',
  '/nitin/photoshoot/bhoolchukmaf/final.png',
  '/nitin/photoshoot/bhoolchukmaf/final(1).png',
  '/nitin/graphics/graphic1.png',
  '/nitin/graphics/graphic2.png',
  '/nitin/graphics/graphic3.png',
]

function Strip({ photos, direction }) {
  // triple-duplicate so the loop is seamless at any screen width
  const items = [...photos, ...photos, ...photos]
  return (
    <div className="fs-row-outer">
      <div className={`fs-row fs-row--${direction}`}>
        {items.map((src, i) => (
          <div key={i} className="fs-frame">
            <img
              src={src}
              alt=""
              loading="lazy"
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FilmStrip() {
  return (
    <div className="fs-wrap">
      <Strip photos={ROW1} direction="left"  />
      <Strip photos={ROW2} direction="right" />
      <div className="fs-fade-l" />
      <div className="fs-fade-r" />
    </div>
  )
}
