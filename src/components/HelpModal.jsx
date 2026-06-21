import { motion, AnimatePresence } from 'framer-motion'

export default function HelpModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-forest-mid border border-white/10 rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto no-scrollbar shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl text-accent-bright mb-4">HOW TO UNWRAP</h2>
            <ol className="space-y-3 text-sm text-white/85">
              <li><strong className="text-accent-green">1.</strong> Pull the bow on top of the gift to untie it.</li>
              <li><strong className="text-accent-green">2.</strong> Drag each piece of tape off the package.</li>
              <li><strong className="text-accent-green">3.</strong> Peel all 3 wrapping flaps — top, front, and side (counter shows progress).</li>
              <li><strong className="text-accent-green">4.</strong> Tap or drag the box lid upward to open!</li>
            </ol>
            <p className="mt-4 text-xs text-white/50">
              Having trouble? Use the &ldquo;Skip to reveal&rdquo; link at the bottom.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full py-2.5 rounded-xl bg-accent-green text-forest-dark font-bold hover:bg-accent-bright transition-colors"
            >
              GOT IT!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
