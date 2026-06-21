import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER, SIZE } from './presentConstants'

const BOW_SCALE = SIZE / 200
const BOW_W = 104
const BOW_H = 88

/** One puffy ribbon loop built from stacked 3D layers */
function RibbonLoop({ flip = false }) {
  const x = flip ? 52 : 8
  const tilt = flip ? 28 : -28

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: 14,
        width: 38,
        height: 30,
        transformStyle: 'preserve-3d',
        transform: `rotateZ(${tilt}deg)`,
      }}
    >
      {[10, 7, 4, 1].map((z, i) => (
        <div
          key={z}
          className="absolute inset-0 ribbon-satin rounded-[50%]"
          style={{
            transform: `translateZ(${z}px) scale(${1 - i * 0.04})`,
            filter: `brightness(${1.05 - i * 0.08})`,
            boxShadow: i === 0 ? '0 4px 12px rgba(0,0,0,0.45)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

/** Center knot — raised in Z */
function BowKnot() {
  return (
    <div
      className="absolute left-1/2 top-[22px] -translate-x-1/2"
      style={{ width: 18, height: 18, transformStyle: 'preserve-3d' }}
    >
      {[6, 3, 0].map((z) => (
        <div
          key={z}
          className="absolute inset-0 ribbon-satin rounded-full"
          style={{ transform: `translateZ(${z}px)`, filter: `brightness(${1.1 - z * 0.05})` }}
        />
      ))}
    </div>
  )
}

/** Short tails hanging off the knot toward the front edge of the top face */
function BowTails() {
  return (
    <>
      <div
        className="absolute ribbon-satin rounded-b-lg"
        style={{
          width: 10,
          height: 28,
          left: '46%',
          top: 36,
          transform: 'rotateZ(-8deg) translateZ(2px)',
          transformStyle: 'preserve-3d',
        }}
      />
      <div
        className="absolute ribbon-satin rounded-b-lg"
        style={{
          width: 10,
          height: 28,
          left: '52%',
          top: 36,
          transform: 'rotateZ(8deg) translateZ(2px)',
          transformStyle: 'preserve-3d',
        }}
      />
    </>
  )
}

export default function Bow3D({ interactive = true, onRemove, onDragStart }) {
  const handleDragEnd = (_, info) => {
    if (!interactive) return
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (distance > 28) onRemove()
  }

  return (
    <FaceAnchor
      face="top"
      zOffset={LAYER.BOW}
      style={interactive ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
    >
      <motion.div
        className={`absolute ${interactive ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-none'}`}
        style={{
          left: SIZE / 2 - 52 * BOW_SCALE,
          top: SIZE / 2 - 38 * BOW_SCALE,
          width: BOW_W * BOW_SCALE,
          height: BOW_H * BOW_SCALE,
          transformStyle: 'preserve-3d',
        }}
        drag={interactive}
        dragElastic={0.18}
        dragMomentum={false}
        onDragStart={interactive ? onDragStart : undefined}
        onDragEnd={handleDragEnd}
        whileDrag={
          interactive
            ? {
                z: 28,
                scale: 1.06,
                rotateX: -8,
                rotateZ: 5,
              }
            : {}
        }
      >
        {/* Invisible generous hit pad */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(0px)' }} />

        <div
          className="relative"
          style={{
            width: BOW_W,
            height: BOW_H,
            transform: `scale(${BOW_SCALE})`,
            transformOrigin: 'top left',
            transformStyle: 'preserve-3d',
          }}
        >
          <RibbonLoop flip={false} />
          <RibbonLoop flip={true} />
          <BowKnot />
          <BowTails />
        </div>

        {interactive && (
          <motion.div
            className="absolute left-1/2 -bottom-2 -translate-x-1/2 pointer-events-none"
            style={{ transform: 'translateZ(14px)' }}
            animate={{ y: [0, 4, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <span className="text-gold text-xs font-bold whitespace-nowrap drop-shadow-md">
              ↓ PULL BOW
            </span>
          </motion.div>
        )}
      </motion.div>
    </FaceAnchor>
  )
}
