import { useRef } from 'react'
import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER } from './presentConstants'

function Wall({ size, transform, shade = 1 }) {
  return (
    <div
      className="absolute cardboard-texture border border-[#5a4030]/45 overflow-hidden"
      style={{
        width: size,
        height: size,
        transform,
        backfaceVisibility: 'hidden',
        filter: `brightness(${shade})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/6 to-black/12 pointer-events-none" />
    </div>
  )
}

export default function OpenBox3D({ size, half, opened, onOpen, onDragStart, showGlow }) {
  const d = half - 4
  const dragged = useRef(false)

  const tryOpen = () => {
    if (!opened) onOpen()
  }

  const handleDragStart = () => {
    dragged.current = true
    onDragStart?.()
  }

  const handleDragEnd = (_, info) => {
    const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (dist > 18 || info.offset.y < -20) tryOpen()
    setTimeout(() => { dragged.current = false }, 80)
  }

  const handleTap = () => {
    if (!dragged.current && !opened) tryOpen()
  }

  return (
    <div style={{ transformStyle: 'preserve-3d', width: size, height: size }}>
      {/* Closed box — 5 fixed walls (same size as step 3 cardboard) */}
      <Wall size={size} transform={`rotateY(0deg) translateZ(${d}px)`} shade={1.02} />
      <Wall size={size} transform={`rotateY(180deg) translateZ(${d}px)`} shade={0.76} />
      <Wall size={size} transform={`rotateY(90deg) translateZ(${d}px)`} shade={0.86} />
      <Wall size={size} transform={`rotateY(-90deg) translateZ(${d}px)`} shade={0.88} />
      <Wall size={size} transform={`rotateX(-90deg) translateZ(${d}px)`} shade={0.7} />

      {/* Interior glow */}
      {showGlow && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: size - 28,
            height: size - 28,
            left: 14,
            top: 14,
            transform: `rotateX(-90deg) translateZ(${d - 22}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full h-full box-glow rounded-full blur-lg animate-pulse" />
        </motion.div>
      )}

      {/* Shredded paper when open */}
      {opened && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: size - 20,
            height: size - 20,
            left: 10,
            top: 10,
            transform: `rotateX(-90deg) translateZ(${d - 16}px)`,
          }}
        >
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-[#d4b896]"
              style={{
                left: `${(i * 17) % 85}%`,
                top: `${(i * 23) % 85}%`,
                width: `${8 + (i % 5) * 2}px`,
                height: '3px',
                transform: `rotate(${(i * 47) % 360}deg)`,
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      )}

      {/* Hinged lid — sits flush as top face when closed */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `rotateX(90deg) translateZ(${d}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          style={{
            width: size,
            height: size,
            transformOrigin: 'center bottom',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateX: opened ? -115 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-full cardboard-texture border border-[#5a4030]/50 shadow-lg relative">
            <div className="absolute inset-x-10 top-1/2 h-[3px] bg-[#5a4030]/30 -translate-y-1/2" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/14 to-black/8 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Interactive lid hit area — top face, tap or pull any direction */}
      {!opened && (
        <FaceAnchor face="top" zOffset={LAYER.LID_HINT} style={{ pointerEvents: 'auto' }}>
          <motion.div
            className="absolute cursor-grab active:cursor-grabbing touch-none"
            style={{
              left: size * 0.12,
              top: size * 0.12,
              width: size * 0.76,
              height: size * 0.76,
            }}
            drag
            dragElastic={0.15}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
            whileDrag={{ z: 20, scale: 1.02 }}
          >
            <motion.p
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[11px] font-bold whitespace-nowrap pointer-events-none drop-shadow-md"
              animate={{ y: [0, -4, 0], opacity: [0.75, 1, 0.75] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            >
              ↑ TAP OR PULL LID
            </motion.p>
          </motion.div>
        </FaceAnchor>
      )}
    </div>
  )
}
