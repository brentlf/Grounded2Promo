import { motion } from 'framer-motion'
import { VOUCHER_CODE, LETS_GO_URL } from '../config'

const VOUCHER_IMAGE = '/assets/voucher-card.png'

export default function VoucherCard({ copied, onCopy, onPlayAgain }) {
  return (
    <motion.div
      className="relative z-30 w-[min(300px,90vw)]"
      initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Plaque mount — thick cardboard + gold frame */}
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* cardboard depth layers */}
        <div
          className="absolute inset-0 rounded-lg bg-[#5a4030] shadow-2xl"
          style={{ transform: 'translateZ(-12px) translateY(5px)' }}
        />
        <div
          className="absolute inset-0 rounded-lg bg-[#3d2e20]"
          style={{ transform: 'translateZ(-6px) translateY(3px)' }}
        />

        {/* gold plaque bezel */}
        <div className="gold-plaque-frame rounded-xl p-[5px] shadow-[0_16px_48px_rgba(0,0,0,0.65)]">
          <div className="rounded-lg overflow-hidden bg-[#1a1208] relative">
            <img
              src={VOUCHER_IMAGE}
              alt="Grounded 2 birthday voucher"
              className="w-full h-auto block"
              draggable={false}
            />
            {/* subtle gold sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd966]/12 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* side edge — cardboard thickness */}
        <div
          className="absolute -bottom-2 left-2 right-2 h-3 rounded-b-md bg-[#4a3828] opacity-90"
          style={{ transform: 'translateZ(-4px)' }}
        />
      </div>

      {/* Copy uses config code (update src/config.js to match your card) */}
      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={onCopy}
          className="w-full py-3 rounded-xl bg-accent-green text-forest-dark font-extrabold text-sm tracking-wide hover:bg-accent-bright transition-colors active:scale-[0.98] shadow-lg"
        >
          {copied ? '✓ CODE COPIED!' : 'COPY CODE'}
        </button>
        <p className="text-center font-mono text-gold/80 text-xs tracking-wider select-all">
          {VOUCHER_CODE}
        </p>
      </div>

      <div className="flex gap-3 mt-3">
        <button
          type="button"
          onClick={onPlayAgain}
          className="flex-1 py-2.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-black/60 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
          </svg>
          PLAY AGAIN
        </button>
        <a
          href={LETS_GO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-accent-green text-forest-dark text-xs font-extrabold flex items-center justify-center gap-1.5 hover:bg-accent-bright transition-colors"
        >
          🌿 LET&apos;S GO!
        </a>
      </div>
    </motion.div>
  )
}
