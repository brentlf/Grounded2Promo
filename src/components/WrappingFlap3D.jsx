import { useState } from 'react'
import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER } from './presentConstants'

const FLAP_FACES = {
  top: { face: 'top', origin: 'center bottom', peelAxis: 'x', peelOpen: -150, drag: 'y', threshold: -40 },
  left: { face: 'left', origin: 'right center', peelAxis: 'y', peelOpen: -150, drag: 'x', threshold: -40 },
  right: { face: 'right', origin: 'left center', peelAxis: 'y', peelOpen: 150, drag: 'x', threshold: 40 },
  bottom: { face: 'front', origin: 'center top', peelAxis: 'x', peelOpen: 150, drag: 'y', threshold: 40 },
}

export default function WrappingFlap3D({ id, onOpen, onDragStart }) {
  const cfg = FLAP_FACES[id]
  const [peeled, setPeeled] = useState(false)

  const handleDragEnd = (_, info) => {
    const offset = cfg.drag === 'x' ? info.offset.x : info.offset.y
    const passed =
      (cfg.threshold < 0 && offset < cfg.threshold) ||
      (cfg.threshold > 0 && offset > cfg.threshold)
    if (passed) {
      setPeeled(true)
      setTimeout(onOpen, 380)
    }
  }

  const peelAnim =
    cfg.peelAxis === 'x'
      ? { rotateX: peeled ? cfg.peelOpen : 0 }
      : { rotateY: peeled ? cfg.peelOpen : 0 }

  return (
    <FaceAnchor face={cfg.face} zOffset={LAYER.FLAP}>
      <motion.div
        className="absolute inset-0 kraft-texture cursor-grab active:cursor-grabbing touch-none overflow-hidden"
        style={{
          transformOrigin: cfg.origin,
          transformStyle: 'preserve-3d',
          boxShadow: peeled ? 'none' : '0 4px 18px rgba(0,0,0,0.3)',
        }}
        drag={peeled ? false : cfg.drag}
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
        animate={peeled ? { ...peelAnim, opacity: 0, z: 30 } : { rotateX: 0, rotateY: 0, opacity: 1, z: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/22 pointer-events-none" />
        <div
          className="absolute bg-kraft-dark/30"
          style={
            id === 'top' || id === 'bottom'
              ? { left: 0, right: 0, height: 3, [id === 'top' ? 'bottom' : 'top']: 0 }
              : { top: 0, bottom: 0, width: 3, [id === 'left' ? 'right' : 'left']: 0 }
          }
        />
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 100 100">
          <path d="M10 20 Q30 10 50 15 Q70 8 90 20" fill="none" stroke="#5a4020" strokeWidth="0.6" />
          <circle cx="35" cy="55" r="2" fill="#3a5828" />
        </svg>
      </motion.div>
    </FaceAnchor>
  )
}
