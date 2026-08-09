import { useRef, useState, useCallback, useEffect } from 'react'

const GROUPS = [
  {
    key: 'Model', label: 'Model Shoot', code: 'NC-M',
    cards: [
      { img:'/nitin/photoshoot/model/model-01.jpg', code:'NC-M01', title:'Model Shoot — I'    },
      { img:'/nitin/photoshoot/model/model-02.jpg', code:'NC-M02', title:'Model Shoot — II'   },
      { img:'/nitin/photoshoot/model/model-03.jpg', code:'NC-M03', title:'Model Shoot — III'  },
      { img:'/nitin/photoshoot/model/model-04.jpg', code:'NC-M04', title:'Model Shoot — IV'   },
      { img:'/nitin/photoshoot/model/model-05.jpg', code:'NC-M05', title:'Model Shoot — V'    },
      { img:'/nitin/photoshoot/model/model-06.jpg', code:'NC-M06', title:'Model Shoot — VI'   },
      { img:'/nitin/photoshoot/model/model-07.jpg', code:'NC-M07', title:'Model Shoot — VII'  },
      { img:'/nitin/photoshoot/model/model-08.jpg', code:'NC-M08', title:'Model Shoot — VIII' },
    ]
  },
  {
    key: 'Shehnaaz', label: 'Shehnaaz Gill', code: 'NC-S',
    cards: [
      { img:'/nitin/photoshoot/shehnaazgill/sg-01.jpg', code:'NC-S01', title:'Shehnaaz Gill — I'   },
      { img:'/nitin/photoshoot/shehnaazgill/sg-02.jpg', code:'NC-S02', title:'Shehnaaz Gill — II'  },
      { img:'/nitin/photoshoot/shehnaazgill/sg-03.jpg', code:'NC-S03', title:'Shehnaaz Gill — III' },
      { img:'/nitin/photoshoot/shehnaazgill/sg-04.jpg', code:'NC-S04', title:'Shehnaaz Gill — IV'  },
      { img:'/nitin/photoshoot/shehnaazgill/sg-05.jpg', code:'NC-S05', title:'Shehnaaz Gill — V'   },
      { img:'/nitin/photoshoot/shehnaazgill/sg-06.jpg', code:'NC-S06', title:'Shehnaaz Gill — VI'  },
    ]
  },
  {
    key: 'Bhool Chuk', label: 'Bhool Chuk Maaf', code: 'NC-B',
    cards: [
      { img:'/nitin/photoshoot/bhoolchukmaf/bcm-01.jpg', code:'NC-B01', title:'Bhool Chuk Maaf — I'   },
      { img:'/nitin/photoshoot/bhoolchukmaf/bcm-02.png', code:'NC-B02', title:'Bhool Chuk Maaf — II'  },
      { img:'/nitin/photoshoot/bhoolchukmaf/bcm-03.png', code:'NC-B03', title:'Bhool Chuk Maaf — III' },
      { img:'/nitin/photoshoot/bhoolchukmaf/bcm-04.png', code:'NC-B04', title:'Bhool Chuk Maaf — IV'  },
    ]
  },
  {
    key: 'Graphics', label: 'Graphics & Design', code: 'NC-G',
    cards: [
      { img:'/nitin/graphics/graphic1.png', code:'NC-G01', title:'Music Event Poster'      },
      { img:'/nitin/graphics/graphic2.png', code:'NC-G02', title:'YouTube Thumbnail'       },
      { img:'/nitin/graphics/graphic3.png', code:'NC-G03', title:'Tarang — Brand Identity' },
    ]
  },
]

const OFFSETS = [
  { x:0,  y:0,  rot:0,    scale:1    },
  { x:6,  y:5,  rot:1.6,  scale:.97  },
  { x:-5, y:9,  rot:-1.3, scale:.94  },
  { x:9,  y:13, rot:2.4,  scale:.91  },
  { x:-8, y:17, rot:-2.0, scale:.88  },
]

// ── Lightbox ──
function Lightbox({ cards, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx)
  const prev = () => setIdx(i => (i - 1 + cards.length) % cards.length)
  const next = () => setIdx(i => (i + 1) % cards.length)
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [cards.length])
  return (
    <div className="lb-overlay" onClick={onClose}>
      <img src={cards[idx].img} alt={cards[idx].title} onClick={e => e.stopPropagation()} />
      <button className="lb-close" onClick={onClose}>Close</button>
      {cards.length > 1 && <>
        <button className="lb-nav lb-nav-l" onClick={e => { e.stopPropagation(); prev() }}>‹</button>
        <button className="lb-nav lb-nav-r" onClick={e => { e.stopPropagation(); next() }}>›</button>
      </>}
      <div className="lb-caption">{cards[idx].code} — {cards[idx].title}</div>
    </div>
  )
}

// ── Swipe deck — pure CSS transitions, no rAF ──
function SwipeDeck({ cards, onTap }) {
  const [order, setOrder]   = useState(() => cards.map((_, i) => i))
  const [thrown, setThrown] = useState(false)
  const [dragX, setDragX]   = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const deckRef   = useRef(null)

  useEffect(() => {
    setOrder(cards.map((_, i) => i))
  }, [cards])

  const topIdx = order[0]

  const throwCard = useCallback((dir) => {
    if (thrown || order.length < 2) return
    setThrown(true)
    setDragX(dir * 120) // CSS transition handles the rest via class
    setTimeout(() => {
      setDragX(0)
      setDragging(false)
      setThrown(false)
      setOrder(prev => [...prev.slice(1), prev[0]])
    }, 420)
  }, [thrown, order.length])

  // keyboard
  useEffect(() => {
    const fn = e => {
      if (e.key === 'ArrowRight') throwCard(1)
      if (e.key === 'ArrowLeft')  throwCard(-1)
    }
    const el = deckRef.current
    el?.addEventListener('keydown', fn)
    return () => el?.removeEventListener('keydown', fn)
  }, [throwCard])

  const onPointerDown = useCallback(e => {
    if (thrown) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStart.current = { x: e.clientX, moved: false }
    setDragging(true)
  }, [thrown])

  const onPointerMove = useCallback(e => {
    if (!dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    if (Math.abs(dx) > 4) dragStart.current.moved = true
    setDragX(dx)
  }, [])

  const onPointerUp = useCallback(e => {
    if (!dragStart.current) return
    const { moved } = dragStart.current
    const dx = dragX
    const w  = deckRef.current?.offsetWidth || 360
    dragStart.current = null
    setDragging(false)
    if (!moved) { setDragX(0); onTap(order[0]); return }
    if (Math.abs(dx) > w * 0.22) {
      throwCard(dx > 0 ? 1 : -1)
    } else {
      setDragX(0)
    }
  }, [dragX, throwCard, order, onTap])

  const pos = cards.length - order.length + 1

  return (
    <div style={{ position:'relative' }}>
      <div ref={deckRef} className="deck-container" tabIndex={0}>
        {[...order].reverse().map((cardIdx, revPos) => {
          const stackPos = order.length - 1 - revPos
          if (stackPos >= 5) return null
          const off   = OFFSETS[Math.min(stackPos, OFFSETS.length - 1)]
          const isTop = stackPos === 0
          const card  = cards[cardIdx]
          if (!card) return null

          // top card follows drag; others use static offset
          const tx  = isTop ? off.x + dragX : off.x
          const rot = isTop ? off.rot + dragX * 0.04 : off.rot
          const sc  = isTop && dragging ? off.scale * 1.02 : off.scale

          return (
            <div
              key={cardIdx}
              className="deck-card"
              style={{
                transform: `translate(${tx}px,${off.y}px) rotate(${rot}deg) scale(${sc})`,
                zIndex: isTop ? 10 : stackPos,
                transition: isTop && dragging ? 'none' : 'transform .42s cubic-bezier(.2,.8,.3,1)',
                willChange: isTop ? 'transform' : 'auto',
              }}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop   ? onPointerUp   : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <img
                src={card.img}
                alt={card.title}
                loading="lazy"
                onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='var(--g2)' }}
              />
              {isTop && (
                <div className="deck-card-meta">
                  <div className="deck-card-code">{card.code}</div>
                  <div className="deck-card-title">{card.title}</div>
                  <div style={{ fontSize:9, color:'var(--muted)', marginTop:'.3rem', letterSpacing:'.1em' }}>TAP TO EXPAND · DRAG TO THROW</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="deck-hint">
        <span>Drag or</span>
        <span style={{ color:'var(--amber)' }}>← →</span>
        <span>to browse</span>
        <span style={{ marginLeft:'auto', color:'var(--muted)', fontSize:10 }}>{pos} / {cards.length}</span>
      </div>
      <div className="deck-dots">
        {cards.map((_, i) => <div key={i} className={`deck-dot ${order[0] === i ? 'on' : ''}`} />)}
      </div>
    </div>
  )
}

// ── Group section with scroll reveal ──
function DeckGroup({ group, globalOffset, onOpen }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.1 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`deck-group ${visible ? 'deck-group--in' : ''}`}>
      <div className="deck-group-header">
        <span className="deck-group-code">{group.code}</span>
        <h3 className="deck-group-label">{group.label}</h3>
        <span className="deck-group-count">{group.cards.length} frames</span>
      </div>
      <SwipeDeck
        cards={group.cards}
        onTap={localIdx => onOpen(globalOffset + localIdx)}
      />
    </div>
  )
}

export default function Deck() {
  const [lb, setLb] = useState(null)
  const allCards = GROUPS.flatMap(g => g.cards)
  let offset = 0
  const grouped = GROUPS.map(g => { const o = offset; offset += g.cards.length; return { ...g, offset: o } })

  return (
    <>
      {lb !== null && <Lightbox cards={allCards} startIdx={lb} onClose={() => setLb(null)} />}
      <div className="deck-groups-wrap">
        {grouped.map(g => (
          <DeckGroup key={g.key} group={g} globalOffset={g.offset} onOpen={setLb} />
        ))}
      </div>
    </>
  )
}
