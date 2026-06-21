import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

const LID_OPEN_ANGLE = -118
const OPEN_THRESHOLD = -42

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
  const lidRotateX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const openedRef = useRef(opened)

  openedRef.current = opened

  useEffect(() => {
    if (opened) {
      animate(lidRotateX, LID_OPEN_ANGLE, { duration: 0.65, ease: [0.22, 1, 0.36, 1] })
    }
  }, [opened, lidRotateX])

  const snapLidOpen = () => {
    if (openedRef.current) return
    animate(lidRotateX, LID_OPEN_ANGLE, { duration: 0.55, ease: [0.22, 1, 0.36, 1] })
    onOpen()
  }

  const handleDragStart = () => {
    if (opened) return
    setIsDragging(true)
    onDragStart?.()
  }

  const handleDrag = (_, info) => {
    if (opened) return
    const angle = Math.max(LID_OPEN_ANGLE, Math.min(0, info.offset.y * 1.35))
    lidRotateX.set(angle)
  }

  const handleDragEnd = (_, info) => {
    setIsDragging(false)
    if (opened) return
    const current = lidRotateX.get()
    if (current < OPEN_THRESHOLD || info.offset.y < -38) {
      snapLidOpen()
    } else {
      animate(lidRotateX, 0, { duration: 0.35, ease: 'easeOut' })
    }
  }

  const handleTap = () => {
    if (!opened && !isDragging) snapLidOpen()
  }

  return (
    <div style={{ transformStyle: 'preserve-3d', width: size, height: size }}>
      <Wall size={size} transform={`rotateY(0deg) translateZ(${d}px)`} shade={1.02} />
      <Wall size={size} transform={`rotateY(180deg) translateZ(${d}px)`} shade={0.76} />
      <Wall size={size} transform={`rotateY(90deg) translateZ(${d}px)`} shade={0.86} />
      <Wall size={size} transform={`rotateY(-90deg) translateZ(${d}px)`} shade={0.88} />
      <Wall size={size} transform={`rotateX(-90deg) translateZ(${d}px)`} shade={0.7} />

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

      {/* Lid hinge assembly — drag rotates the visible lid */}
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
          className={`absolute inset-0 ${opened ? '' : 'cursor-grab active:cursor-grabbing touch-none'}`}
          style={{
            transformOrigin: 'center bottom',
            transformStyle: 'preserve-3d',
            rotateX: lidRotateX,
          }}
          drag={opened ? false : 'y'}
          dragConstraints={{ top: -95, bottom: 0 }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onTap={handleTap}
        >
          {/* lid top surface */}
          <div className="w-full h-full cardboard-texture border border-[#5a4030]/55 shadow-lg relative">
            <div className="absolute inset-x-10 top-1/2 h-[3px] bg-[#5a4030]/30 -translate-y-1/2" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/16 to-black/10 pointer-events-none" />
          </div>

          {/* lid thickness — front edge for 3D depth */}
          <div
            className="absolute left-0 right-0 cardboard-texture border border-[#5a4030]/40"
            style={{
              height: 8,
              bottom: 0,
              transform: 'rotateX(-90deg)',
              transformOrigin: 'center top',
            }}
          />

          {!opened && (
            <motion.p
              className="absolute left-1/2 top-[38%] -translate-x-1/2 text-gold text-[11px] font-bold whitespace-nowrap pointer-events-none drop-shadow-md"
              animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            >
              ↑ DRAG LID OPEN
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Inner rim visible when lid lifts */}
      {(opened || isDragging) && (
        <div
          className="absolute pointer-events-none border-2 border-[#5a4030]/60"
          style={{
            width: size - 6,
            height: size - 6,
            left: 3,
            top: 3,
            transform: `rotateX(90deg) translateZ(${d - 2}px)`,
            background: 'rgba(60,45,30,0.5)',
          }}
        />
      )}
    </div>
  )
}

export { LID_OPEN_ANGLE }
