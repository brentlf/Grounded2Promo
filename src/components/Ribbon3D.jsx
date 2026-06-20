import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER, SIZE } from './presentConstants'

export default function Ribbon3D({ interactive = true, onRemove, onDragStart }) {
  const handleDragEnd = (_, info) => {
    if (!interactive) return
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (distance > 45 || info.offset.y > 35) onRemove()
  }

  const band = 20
  const cx = SIZE / 2 - band / 2

  return (
    <motion.div
      style={{ transformStyle: 'preserve-3d' }}
      exit={{
        opacity: 0,
        z: -40,
        rotateY: 30,
        transition: { duration: 0.55, ease: 'easeIn' },
      }}
    >
      {/* ── Front face bands ── */}
      <FaceAnchor face="front" zOffset={LAYER.RIBBON}>
        <div
          className="absolute ribbon-satin left-0 right-0"
          style={{ top: cx, height: band, boxShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
        />
        <div
          className="absolute ribbon-satin top-0 bottom-0"
          style={{ left: cx, width: band }}
        />
      </FaceAnchor>

      {/* ── Right face vertical wrap ── */}
      <FaceAnchor face="right" zOffset={LAYER.RIBBON}>
        <div
          className="absolute ribbon-satin top-0 bottom-0"
          style={{ left: cx, width: band }}
        />
      </FaceAnchor>

      {/* ── Left face vertical wrap ── */}
      <FaceAnchor face="left" zOffset={LAYER.RIBBON}>
        <div
          className="absolute ribbon-satin top-0 bottom-0"
          style={{ left: cx, width: band }}
        />
      </FaceAnchor>

      {/* ── Top face horizontal wrap ── */}
      <FaceAnchor face="top" zOffset={LAYER.RIBBON}>
        <div
          className="absolute ribbon-satin left-0 right-0"
          style={{ top: cx, height: band }}
        />
      </FaceAnchor>

      {/* ── Back face horizontal (ribbon continues around) ── */}
      <FaceAnchor face="back" zOffset={LAYER.RIBBON}>
        <div
          className="absolute ribbon-satin left-0 right-0"
          style={{ top: cx, height: band }}
        />
      </FaceAnchor>

      {/* ── Bow on top face ── */}
      <FaceAnchor face="top" zOffset={LAYER.RIBBON + 4}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[46px]">
          <div
            className="absolute left-0 top-2 w-[30px] h-[22px] ribbon-satin rounded-full"
            style={{ transform: 'rotate(-32deg)', boxShadow: '0 4px 10px rgba(0,0,0,0.45)' }}
          />
          <div
            className="absolute right-0 top-2 w-[30px] h-[22px] ribbon-satin rounded-full"
            style={{ transform: 'rotate(32deg)', boxShadow: '0 4px 10px rgba(0,0,0,0.45)' }}
          />
          <div className="absolute left-1/2 top-[15px] -translate-x-1/2 w-[15px] h-[15px] ribbon-satin rounded-full" />
        </div>
      </FaceAnchor>

      {/* ── Draggable tail — front face, below bow ── */}
      <FaceAnchor face="front" zOffset={LAYER.RIBBON_CROSS + 1}>
        <motion.div
          className={`absolute touch-none ${interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
          style={{
            width: 13,
            height: 44,
            left: SIZE * 0.58,
            top: SIZE / 2 + 14,
            transformStyle: 'preserve-3d',
          }}
          drag={interactive}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={interactive ? onDragStart : undefined}
          onDragEnd={handleDragEnd}
          whileDrag={interactive ? { z: 16, rotateX: -15 } : {}}
        >
          <div className="w-full h-full ribbon-satin rounded-b-xl shadow-lg" />
          {interactive && (
            <motion.span
              className="absolute -right-6 top-1/2 text-gold text-sm pointer-events-none"
              style={{ transform: 'translateZ(4px)' }}
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
            >
              ↓
            </motion.span>
          )}
        </motion.div>
      </FaceAnchor>
    </motion.div>
  )
}
