import { motion } from 'framer-motion'
import { VOUCHER_CODE, LETS_GO_URL } from '../config'

const VOUCHER_IMAGE = '/assets/voucher-card.png'

export default function VoucherCard({ copied, onCopy, onPlayAgain }) {
  return (
    <motion.div
      className="relative z-30 w-full max-w-[min(520px,96vw)] flex flex-col items-center justify-center max-h-[min(78dvh,820px)]"
      initial={{ opacity: 0, y: 50, rotateX: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Plaque — fills most of the reveal area */}
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute inset-0 rounded-xl bg-[#5a4030] shadow-2xl scale-[0.98]"
          style={{ transform: 'translateZ(-12px) translateY(6px)' }}
        />
        <div
          className="absolute inset-0 rounded-xl bg-[#3d2e20] scale-[0.99]"
          style={{ transform: 'translateZ(-6px) translateY(3px)' }}
        />

        <div className="gold-plaque-frame rounded-xl p-1 sm:p-1.5 shadow-[0_20px_56px_rgba(0,0,0,0.7)] w-full">
          <div className="rounded-lg overflow-hidden bg-[#1a1208] relative w-full">
            <img
              src={VOUCHER_IMAGE}
              alt="Grounded 2 birthday voucher"
              className="w-full h-auto max-h-[min(62dvh,580px)] object-contain object-center block mx-auto"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd966]/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Compact actions below the plaque */}
      <div className="w-full flex-shrink-0 mt-2 sm:mt-3 space-y-1.5">
        <button
          type="button"
          onClick={onCopy}
          className="w-full py-2.5 sm:py-3 rounded-xl bg-accent-green text-forest-dark font-extrabold text-sm tracking-wide hover:bg-accent-bright transition-colors active:scale-[0.98] shadow-lg"
        >
          {copied ? '✓ CODE COPIED!' : 'COPY CODE'}
        </button>
        <p className="text-center font-mono text-gold/75 text-[10px] sm:text-xs tracking-wider select-all truncate px-2">
          {VOUCHER_CODE}
        </p>
        <div className="flex gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 py-2 sm:py-2.5 rounded-xl bg-black/45 backdrop-blur-sm border border-white/10 text-white/80 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 hover:bg-black/60 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            PLAY AGAIN
          </button>
          <a
            href={LETS_GO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 sm:py-2.5 rounded-xl bg-accent-green text-forest-dark text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-accent-bright transition-colors"
          >
            🌿 LET&apos;S GO!
          </a>
        </div>
      </div>
    </motion.div>
  )
}
