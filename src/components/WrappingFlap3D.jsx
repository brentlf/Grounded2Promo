import { motion } from 'framer-motion'

const FACE_TRANSFORMS = {
  top: (half) => ({
    base: `rotateX(90deg) translateZ(${half + 3}px)`,
    origin: 'center bottom',
    open: 'rotateX(-160deg)',
    drag: 'y',
    threshold: -40,
  }),
  left: (half) => ({
    base: `rotateY(-90deg) translateZ(${half + 3}px)`,
    origin: 'right center',
    open: 'rotateY(-160deg)',
    drag: 'x',
    threshold: -40,
  }),
  right: (half) => ({
    base: `rotateY(90deg) translateZ(${half + 3}px)`,
    origin: 'left center',
    open: 'rotateY(160deg)',
    drag: 'x',
    threshold: 40,
  }),
  bottom: (half) => ({
    base: `rotateY(0deg) translateZ(${half + 3}px)`,
    origin: 'center top',
    open: 'rotateX(160deg)',
    drag: 'y',
    threshold: 40,
  }),
}

export default function WrappingFlap3D({ id, size, half, onOpen, onDragStart }) {
  const face = FACE_TRANSFORMS[id](half)

  return (
    <motion.div
      className="absolute kraft-texture cursor-grab active:cursor-grabbing touch-none overflow-hidden"
      style={{
        width: size,
        height: size,
        transform: face.base,
        transformOrigin: face.origin,
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      }}
      drag={face.drag}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={(_, info) => {
        const offset = face.drag === 'x' ? info.offset.x : info.offset.y
        const passed =
          (face.threshold < 0 && offset < face.threshold) ||
          (face.threshold > 0 && offset > face.threshold)
        if (passed) onOpen()
      }}
      whileDrag={{ scale: 1.02 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.35 },
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
      {/* fold crease */}
      <div
        className="absolute bg-kraft-dark/25"
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
  )
}
