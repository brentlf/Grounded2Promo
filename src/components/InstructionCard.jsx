import { motion } from 'framer-motion'

export default function InstructionCard({ text }) {
  return (
    <motion.div
      key={text}
      className="torn-paper px-5 py-3 mx-auto max-w-xs text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <p className="font-extrabold text-xs sm:text-sm tracking-widest uppercase">{text}</p>
    </motion.div>
  )
}
