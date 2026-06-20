import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER } from './presentConstants'

export default function TapeStrip3D({
  id,
  x,
  y,
  rot,
  w,
  h,
  interactive,
  onRemove,
  onDragStart,
}) {
  return (
    <FaceAnchor
      face="front"
      zOffset={LAYER.TAPE}
      style={interactive ? undefined : { pointerEvents: 'none' }}
    >
      <TapeOnFace
        id={id}
        x={x}
        y={y}
        rot={rot}
        w={w}
        h={h}
        interactive={interactive}
        onRemove={onRemove}
        onDragStart={onDragStart}
      />
    </FaceAnchor>
  )
}

function TapeOnFace({ id, x, y, rot, w, h, interactive, onRemove, onDragStart }) {
  const handleDragEnd = (_, info) => {
    if (!interactive) return
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (distance > 50) onRemove(id)
  }

  return (
    <motion.div
      className={`absolute ${interactive ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-none'}`}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        rotate: rot,
        transformStyle: 'preserve-3d',
        opacity: interactive ? 1 : 0.9,
      }}
      drag={interactive}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={interactive ? onDragStart : undefined}
      onDragEnd={handleDragEnd}
      whileDrag={
        interactive
          ? {
              scale: 1.04,
              rotate: rot + 12,
              z: 20,
              rotateX: -40,
            }
          : {}
      }
      exit={{
        opacity: 0,
        scale: 0.6,
        rotate: rot + 60,
        z: 80,
        rotateX: -90,
        transition: { duration: 0.35 },
      }}
    >
      <div
        className="tape-gloss w-full h-full rounded-sm relative overflow-hidden shadow-lg"
        style={{ transform: 'translateZ(1px)' }}
      >
        <div className="absolute inset-0 bg-white/10" />
        <div
          className="absolute top-0 left-[18%] w-[35%] h-full bg-white/30"
          style={{ transform: 'skewX(-8deg)' }}
        />
      </div>
    </motion.div>
  )
}
