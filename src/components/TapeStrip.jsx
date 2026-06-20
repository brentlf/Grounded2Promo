import { motion } from 'framer-motion'

export default function TapeStrip({
  id,
  initialX,
  initialY,
  rotation,
  onRemove,
  onDragStart,
  depth = false,
  interactive = true,
}) {
  const handleDragEnd = (_, info) => {
    if (!interactive) return
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (distance > 60) {
      onRemove(id)
    }
  }

  return (
    <motion.div
      className={`absolute z-30 ${interactive ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-none'}`}
      style={{
        left: initialX,
        top: initialY,
        width: 70,
        height: 22,
        rotate: rotation,
        opacity: interactive ? 1 : 0.85,
      }}
      drag={interactive}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={interactive ? onDragStart : undefined}
      onDragEnd={handleDragEnd}
      whileDrag={
        interactive
          ? {
              scale: 1.05,
              rotate: rotation + 15,
              zIndex: 50,
              rotateX: depth ? -30 : 0,
              z: depth ? 30 : 0,
            }
          : {}
      }
      exit={{
        opacity: 0,
        scale: 0.5,
        rotate: rotation + 45,
        transition: { duration: 0.3 },
      }}
    >
      <div className={`tape-gloss w-full h-full rounded-sm relative overflow-hidden ${depth ? 'shadow-lg' : ''}`}>
        <div className="absolute inset-0 bg-white/10" />
        <div
          className="absolute top-0 left-[20%] w-[30%] h-full bg-white/25"
          style={{ transform: 'skewX(-10deg)' }}
        />
      </div>
    </motion.div>
  )
}
