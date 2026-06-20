import { motion } from 'framer-motion'

const FLAPS = [
  { id: 'top', label: 'top', style: { top: -4, left: 0, right: 0, height: '50%', transformOrigin: 'top center' }, dragDir: 'y', threshold: -40 },
  { id: 'left', label: 'left', style: { top: 0, bottom: 0, left: -4, width: '50%', transformOrigin: 'left center' }, dragDir: 'x', threshold: -40 },
  { id: 'right', label: 'right', style: { top: 0, bottom: 0, right: -4, width: '50%', transformOrigin: 'right center' }, dragDir: 'x', threshold: 40 },
  { id: 'bottom', label: 'bottom', style: { bottom: -4, left: 0, right: 0, height: '50%', transformOrigin: 'bottom center' }, dragDir: 'y', threshold: 40 },
]

export default function WrappingFlaps({ openedFlaps, onFlapOpen, onDragStart }) {
  const allOpen = FLAPS.every((f) => openedFlaps[f.id])

  if (allOpen) return null

  return (
    <>
      {FLAPS.map((flap) => {
        if (openedFlaps[flap.id]) return null

        return (
          <motion.div
            key={flap.id}
            className="absolute z-15 kraft-texture cursor-grab active:cursor-grabbing touch-none overflow-hidden"
            style={flap.style}
            drag={flap.dragDir === 'x' ? 'x' : 'y'}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDragEnd={(_, info) => {
              const offset = flap.dragDir === 'x' ? info.offset.x : info.offset.y
              const passed =
                (flap.threshold < 0 && offset < flap.threshold) ||
                (flap.threshold > 0 && offset > flap.threshold)
              if (passed) onFlapOpen(flap.id)
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.4 },
            }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M10 20 Q30 10 50 15 Q70 8 90 20" fill="none" stroke="#5a4020" strokeWidth="0.5" />
              <circle cx="30" cy="40" r="2" fill="#3a5828" />
              <circle cx="70" cy="60" r="1.5" fill="#3a5828" />
            </svg>
            {/* fold line */}
            <div
              className="absolute bg-kraft-dark/30"
              style={
                flap.id === 'top' || flap.id === 'bottom'
                  ? { left: 0, right: 0, height: 2, [flap.id]: 0 }
                  : { top: 0, bottom: 0, width: 2, [flap.id]: 0 }
              }
            />
          </motion.div>
        )
      })}
    </>
  )
}
