import { motion } from 'framer-motion'

export default function Ribbon({ onRemove, onDragStart }) {
  const handleDragEnd = (_, info) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    if (distance > 50 || info.offset.y > 40) {
      onRemove()
    }
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* horizontal ribbon */}
      <div className="absolute top-1/2 left-0 right-0 h-[18px] -translate-y-1/2 ribbon-satin pointer-events-none" />

      {/* vertical ribbon */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[18px] -translate-x-1/2 ribbon-satin pointer-events-none" />

      {/* bow */}
      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 z-25 pointer-events-none">
        <div className="relative w-[60px] h-[40px]">
          <div
            className="absolute left-0 top-2 w-[28px] h-[22px] ribbon-satin rounded-full"
            style={{ transform: 'rotate(-30deg)' }}
          />
          <div
            className="absolute right-0 top-2 w-[28px] h-[22px] ribbon-satin rounded-full"
            style={{ transform: 'rotate(30deg)' }}
          />
          <div className="absolute left-1/2 top-[14px] -translate-x-1/2 w-[14px] h-[14px] ribbon-satin rounded-full" />
          {/* dangling ends */}
          <div className="absolute left-[18px] top-[28px] w-[8px] h-[30px] ribbon-satin rounded-b-full" />
          <div className="absolute right-[18px] top-[28px] w-[8px] h-[30px] ribbon-satin rounded-b-full" />
        </div>
      </div>

      {/* draggable ribbon end */}
      <motion.div
        className="absolute bottom-[-20px] right-[30%] z-30 cursor-grab active:cursor-grabbing touch-none pointer-events-auto"
        style={{ width: 16, height: 50 }}
        drag
        dragElastic={0.15}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.1 }}
        exit={{
          y: 120,
          opacity: 0,
          rotate: 30,
          transition: { duration: 0.6, ease: 'easeIn' },
        }}
      >
        <div className="w-full h-full ribbon-satin rounded-b-lg shadow-lg" />
        {/* drag hint arrow */}
        <motion.div
          className="absolute -right-8 top-1/2 text-gold text-lg"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  )
}
