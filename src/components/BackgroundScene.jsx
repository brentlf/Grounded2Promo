import { useMemo } from 'react'

function Particle({ style, type }) {
  if (type === 'bug') {
    return (
      <svg style={style} width="8" height="8" viewBox="0 0 16 16" className="absolute pointer-events-none">
        <ellipse cx="8" cy="9" rx="4" ry="3" fill="#3a5a2a" opacity="0.6" />
        <circle cx="8" cy="5" r="2.5" fill="#4a6a3a" opacity="0.7" />
        <line x1="5" y1="4" x2="3" y2="2" stroke="#3a5a2a" strokeWidth="0.8" opacity="0.5" />
        <line x1="11" y1="4" x2="13" y2="2" stroke="#3a5a2a" strokeWidth="0.8" opacity="0.5" />
      </svg>
    )
  }
  if (type === 'leaf') {
    return (
      <svg style={style} width="10" height="10" viewBox="0 0 16 16" className="absolute pointer-events-none">
        <path d="M8 1C8 1 2 6 2 11C2 14 8 15 8 15C8 15 14 14 14 11C14 6 8 1 8 1Z" fill="#5a8f3a" opacity="0.5" />
      </svg>
    )
  }
  return (
    <div
      style={style}
      className="absolute rounded-full bg-accent-green/30 pointer-events-none"
    />
  )
}

export default function BackgroundScene() {
  const particles = useMemo(() => {
    const types = ['bug', 'leaf', 'mote']
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      type: types[i % 3],
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 4 + Math.random() * 6,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* dark forest gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1810] via-[#1a2418] to-[#0d150a]" />

      {/* warm golden light from above */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(245,200,66,0.15)_0%,transparent_60%)]" />

      {/* ground layer */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#2a1f10]/80 to-transparent" />

        {/* soil texture */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%] opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #3d2a15 1px, transparent 1px),
              radial-gradient(circle at 60% 70%, #2a1a0a 1px, transparent 1px),
              radial-gradient(circle at 80% 90%, #4a3520 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px, 45px 45px, 25px 25px',
          }}
        />

        {/* grass blades */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={`grass-${i}`}
            className="absolute bottom-0 origin-bottom"
            style={{
              left: `${(i / 30) * 100}%`,
              height: `${20 + Math.random() * 40}px`,
              width: '3px',
              background: `linear-gradient(to top, #1a3018, ${Math.random() > 0.5 ? '#3a6a2a' : '#2d5020'})`,
              transform: `rotate(${-15 + Math.random() * 30}deg)`,
              opacity: 0.5 + Math.random() * 0.3,
            }}
          />
        ))}

        {/* pinecone */}
        <svg className="absolute bottom-[8%] left-[8%] w-8 h-10 opacity-30" viewBox="0 0 32 40">
          <ellipse cx="16" cy="20" rx="10" ry="14" fill="#4a3520" />
          {[...Array(6)].map((_, i) => (
            <ellipse key={i} cx="16" cy={8 + i * 5} rx={9 - i} ry="3" fill="#5a4530" />
          ))}
        </svg>

        {/* small mushroom */}
        <svg className="absolute bottom-[12%] right-[12%] w-6 h-8 opacity-25" viewBox="0 0 24 32">
          <ellipse cx="12" cy="10" rx="10" ry="6" fill="#8a6050" />
          <rect x="9" y="10" width="6" height="14" rx="2" fill="#c4a080" />
        </svg>
      </div>

      {/* floating particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          type={p.type}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  )
}
