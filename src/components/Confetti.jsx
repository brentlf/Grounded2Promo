import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Confetti({ active }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        color: ['#7cb342', '#f5c842', '#e8913a', '#a4d65e', '#ffd966'][i % 5],
        delay: Math.random() * 0.5,
        size: 4 + Math.random() * 4,
        rotation: Math.random() * 360,
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '40%',
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: 1,
          }}
          initial={{ opacity: 0, y: 0, rotate: p.rotation }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-20, -80 - Math.random() * 60],
            x: (Math.random() - 0.5) * 80,
            rotate: p.rotation + 180,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
