import { motion } from 'framer-motion'

export default function Ribbon3D({ size, half, onRemove, onDragStart }) {
  const handleDragEnd = (_, info) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (distance > 50 || info.offset.y > 40) onRemove()
  }

  const band = 20

  return (
    <div style={{ transformStyle: 'preserve-3d' }}>
      {/* horizontal band — front */}
      <div
        className="absolute ribbon-satin"
        style={{
          width: size,
          height: band,
          top: size / 2 - band / 2,
          transform: `rotateY(0deg) translateZ(${half + 1}px)`,
          boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
        }}
      />

      {/* horizontal band — wraps to top */}
      <div
        className="absolute ribbon-satin"
        style={{
          width: size,
          height: band,
          left: 0,
          transform: `rotateX(90deg) translateZ(${half - size / 2 + band / 2}px) translateY(${-size / 2 + band / 2}px)`,
          transformOrigin: 'center center',
        }}
      />

      {/* horizontal band — right side */}
      <div
        className="absolute ribbon-satin"
        style={{
          width: band,
          height: size,
          left: size / 2 - band / 2,
          transform: `rotateY(90deg) translateZ(${half + 1}px)`,
        }}
      />

      {/* vertical band — front */}
      <div
        className="absolute ribbon-satin"
        style={{
          width: band,
          height: size,
          left: size / 2 - band / 2,
          transform: `rotateY(0deg) translateZ(${half + 2}px)`,
        }}
      />

      {/* vertical band — top */}
      <div
        className="absolute ribbon-satin"
        style={{
          width: band,
          height: size,
          left: size / 2 - band / 2,
          transform: `rotateX(90deg) translateZ(${half + 1}px) translateY(${-size / 2}px)`,
          transformOrigin: 'top center',
        }}
      />

      {/* bow — sits above top face */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 70,
          height: 50,
          left: size / 2 - 35,
          transform: `rotateX(90deg) translateZ(${half + 8}px) translateY(${-size / 2 - 10}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute left-0 top-3 w-[30px] h-[24px] ribbon-satin rounded-full"
          style={{ transform: 'rotateZ(-30deg)', boxShadow: '0 4px 8px rgba(0,0,0,0.4)' }}
        />
        <div
          className="absolute right-0 top-3 w-[30px] h-[24px] ribbon-satin rounded-full"
          style={{ transform: 'rotateZ(30deg)', boxShadow: '0 4px 8px rgba(0,0,0,0.4)' }}
        />
        <div
          className="absolute left-1/2 top-[18px] -translate-x-1/2 w-[16px] h-[16px] ribbon-satin rounded-full"
          style={{ transform: 'translateZ(4px)' }}
        />
      </div>

      {/* dangling tail — draggable */}
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing touch-none"
        style={{
          width: 14,
          height: 48,
          left: size * 0.62,
          top: size / 2 + 20,
          transform: `rotateY(0deg) translateZ(${half + 4}px)`,
          transformStyle: 'preserve-3d',
        }}
        drag
        dragElastic={0.15}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.08, z: 20 }}
      >
        <div className="w-full h-full ribbon-satin rounded-b-xl shadow-lg" />
        <motion.span
          className="absolute -right-7 top-1/2 text-gold text-base pointer-events-none"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </div>
  )
}
