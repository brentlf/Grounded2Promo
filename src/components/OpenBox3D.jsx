import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER } from './presentConstants'

export default function OpenBox3D({ size, half, opened, onOpen, onDragStart, showGlow }) {
  const innerHalf = half - 4

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -40) onOpen()
  }

  return (
    <div style={{ transformStyle: 'preserve-3d' }}>
      {/* bottom */}
      <div
        className="absolute cardboard-texture border border-[#5a4030]/40 overflow-hidden"
        style={{
          width: size,
          height: size,
          transform: `rotateX(-90deg) translateZ(${innerHalf}px)`,
          backfaceVisibility: 'hidden',
          filter: 'brightness(0.75)',
        }}
      >
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div
        className="absolute cardboard-texture border border-[#5a4030]/40 overflow-hidden"
        style={{
          width: size,
          height: size,
          transform: `rotateY(180deg) translateZ(${innerHalf}px)`,
          backfaceVisibility: 'hidden',
          filter: 'brightness(0.8)',
        }}
      />
      <div
        className="absolute cardboard-texture border border-[#5a4030]/40 overflow-hidden"
        style={{
          width: size,
          height: size,
          transform: `rotateY(-90deg) translateZ(${innerHalf}px)`,
          backfaceVisibility: 'hidden',
          filter: 'brightness(0.9)',
        }}
      />
      <div
        className="absolute cardboard-texture border border-[#5a4030]/40 overflow-hidden"
        style={{
          width: size,
          height: size,
          transform: `rotateY(90deg) translateZ(${innerHalf}px)`,
          backfaceVisibility: 'hidden',
          filter: 'brightness(0.88)',
        }}
      />

      {showGlow && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: size - 24,
            height: size - 24,
            left: 12,
            top: 12,
            transform: `rotateX(-90deg) translateZ(${innerHalf - 25}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full h-full box-glow rounded-full blur-lg animate-pulse" />
        </motion.div>
      )}

      {opened && (
        <div
          className="absolute overflow-hidden"
          style={{
            width: size - 16,
            height: size - 16,
            left: 8,
            top: 8,
            transform: `rotateX(-90deg) translateZ(${innerHalf - 18}px)`,
          }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-[#d4b896]"
              style={{
                left: `${Math.random() * 88}%`,
                top: `${Math.random() * 88}%`,
                width: `${8 + Math.random() * 10}px`,
                height: `${2 + Math.random() * 3}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      )}

      {/* front wall — folds down in 3D */}
      <motion.div
        className="absolute cardboard-texture border border-[#5a4030]/40 overflow-hidden"
        style={{
          width: size,
          height: size,
          transformOrigin: 'center top',
          transform: `rotateY(0deg) translateZ(${innerHalf}px)`,
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
        animate={opened ? { rotateX: -72 } : { rotateX: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/5" />
      </motion.div>

      {/* hinged lid on top face */}
      <motion.div
        className="absolute touch-none"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom',
          transform: `rotateX(90deg) translateZ(${innerHalf}px)`,
        }}
        animate={opened ? { rotateX: 158 } : { rotateX: 90 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={`absolute inset-0 ${opened ? '' : 'cursor-grab active:cursor-grabbing'}`}
          style={{ transformStyle: 'preserve-3d' }}
          drag={opened ? false : 'y'}
          dragConstraints={{ top: -70, bottom: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={onDragStart}
          onDragEnd={handleDragEnd}
          onClick={() => !opened && onOpen()}
          whileDrag={opened ? {} : { rotateX: -22 }}
        >
          <div className="w-full h-full cardboard-texture border border-[#5a4030]/50 shadow-xl relative">
            <div className="absolute inset-x-8 top-1/2 h-[3px] bg-[#5a4030]/35 -translate-y-1/2" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-black/10" />
          </div>
        </motion.div>
      </motion.div>

      {/* hint on lid — anchored to top face in 3D */}
      {!opened && (
        <FaceAnchor face="top" zOffset={LAYER.LID_HINT}>
          <motion.p
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[10px] font-bold whitespace-nowrap pointer-events-none"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↑ TAP OR DRAG LID
          </motion.p>
        </FaceAnchor>
      )}
    </div>
  )
}
