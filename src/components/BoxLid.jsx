import { motion } from 'framer-motion'

export default function BoxLid({ onOpen, onDragStart, opened }) {
  if (opened) {
    return (
      <motion.div
        className="absolute -top-[6px] left-[-4px] right-[-4px] h-[14px] z-10"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: -110, y: -30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full bg-[#8a6840] rounded-t-sm border border-[#6a5030] shadow-md" />
      </motion.div>
    )
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -40) onOpen()
  }

  return (
    <motion.div
      className="absolute -top-[6px] left-[-4px] right-[-4px] h-[14px] z-10 cursor-grab active:cursor-grabbing touch-none"
      drag="y"
      dragConstraints={{ top: -80, bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onOpen()}
      whileDrag={{ y: -10 }}
    >
      <div className="w-full h-full bg-[#8a6840] rounded-t-sm border border-[#6a5030] shadow-md relative">
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[2px] bg-[#6a5030]/50" />
      </div>
      <motion.p
        className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold text-xs font-bold whitespace-nowrap"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        ↑ TAP OR DRAG
      </motion.p>
    </motion.div>
  )
}
