const ROW1 = [
  '/nitin/photoshoot/model/model-01.jpg',
  '/nitin/photoshoot/model/model-02.jpg',
  '/nitin/photoshoot/model/model-03.jpg',
  '/nitin/photoshoot/model/model-04.jpg',
  '/nitin/photoshoot/model/model-05.jpg',
  '/nitin/photoshoot/model/model-06.jpg',
  '/nitin/photoshoot/model/model-07.jpg',
  '/nitin/photoshoot/model/model-08.jpg',
]

const ROW2 = [
  '/nitin/photoshoot/shehnaazgill/sg-01.jpg',
  '/nitin/photoshoot/shehnaazgill/sg-02.jpg',
  '/nitin/photoshoot/shehnaazgill/sg-03.jpg',
  '/nitin/photoshoot/shehnaazgill/sg-04.jpg',
  '/nitin/photoshoot/shehnaazgill/sg-05.jpg',
  '/nitin/photoshoot/shehnaazgill/sg-06.jpg',
  '/nitin/photoshoot/bhoolchukmaf/bcm-01.jpg',
  '/nitin/photoshoot/bhoolchukmaf/bcm-02.png',
  '/nitin/photoshoot/bhoolchukmaf/bcm-03.png',
  '/nitin/photoshoot/bhoolchukmaf/bcm-04.png',
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
