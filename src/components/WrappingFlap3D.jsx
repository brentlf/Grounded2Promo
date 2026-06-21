import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import WrapDoodles from './WrapDoodles'
import { LAYER } from './presentConstants'

const FLAPS = {
  top: {
    face: 'top',
    origin: 'center bottom',
    peel: { rotateX: -130 },
    hint: '↑',
    hintStyle: { bottom: 8, left: '50%', transform: 'translateX(-50%)' },
  },
  right: {
    face: 'right',
    origin: 'left center',
    peel: { rotateY: -130 },
    hint: '→',
    hintStyle: { right: 8, top: '50%', transform: 'translateY(-50%)' },
  },
  front: {
    face: 'front',
    origin: 'center top',
    peel: { rotateX: 130 },
    hint: '↓',
    hintStyle: { bottom: 12, left: '50%', transform: 'translateX(-50%)' },
  },
}

export default function WrappingFlap3D({ id, onOpen, onDragStart }) {
  const cfg = FLAPS[id]
  const [peeled, setPeeled] = useState(false)
  const dragged = useRef(false)

  const peel = () => {
    if (peeled) return
    setPeeled(true)
    onOpen()
  }

  const handleDragStart = () => {
    dragged.current = true
    onDragStart?.()
  }

  const handleDragEnd = (_, info) => {
    const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (dist > 22) {
      peel()
    }
    setTimeout(() => { dragged.current = false }, 50)
  }

  const handleTap = () => {
    if (!dragged.current && !peeled) peel()
  }

  return (
    <FaceAnchor face={cfg.face} zOffset={LAYER.FLAP} style={{ pointerEvents: 'auto' }}>
      <motion.div
        className="absolute inset-0 gift-wrap-texture cursor-grab active:cursor-grabbing touch-none overflow-hidden"
        style={{
          transformOrigin: cfg.origin,
          transformStyle: 'preserve-3d',
          boxShadow: peeled ? 'none' : '0 6px 20px rgba(0,0,0,0.35)',
        }}
        drag={!peeled}
        dragElastic={0.14}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
        whileDrag={{ z: 24, scale: 1.015 }}
        animate={
          peeled
            ? { ...cfg.peel, opacity: 0, z: 40, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }
            : { rotateX: 0, rotateY: 0, opacity: 1, z: 0 }
        }
      >
        <WrapDoodles variant={id === 'top' ? 'top' : 'front'} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/15 pointer-events-none" />

        {/* fold crease at hinge */}
        <div
          className="absolute bg-[#2a5038]/40"
          style={
            id === 'top' || id === 'front'
              ? { left: 0, right: 0, height: 4, [id === 'top' ? 'bottom' : 'top']: 0 }
              : { top: 0, bottom: 0, width: 4, right: 0 }
          }
        />

        {!peeled && (
          <motion.span
            className="absolute text-gold text-lg font-bold pointer-events-none drop-shadow-md"
            style={cfg.hintStyle}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            {cfg.hint}
          </motion.span>
        )}
      </motion.div>
    </FaceAnchor>
  )
}
