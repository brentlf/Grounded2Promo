import { motion } from 'framer-motion'
import { BROTHER_NAME, VOUCHER_CODE, LETS_GO_URL } from '../config'

/** Original adventure-themed illustration — no copyrighted characters */
function AdventureIllustration() {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-auto">
      {/* sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a8ab0" />
          <stop offset="100%" stopColor="#2a5a40" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a8f3a" />
          <stop offset="100%" stopColor="#3a6028" />
        </linearGradient>
      </defs>
      <rect width="280" height="120" fill="url(#sky)" rx="4" />

      {/* giant grass blades */}
      {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
        <path
          key={x}
          d={`M${x} 120 Q${x + (i % 2 ? 10 : -10)} ${60 + (i % 3) * 10} ${x + 5} 40`}
          fill="none"
          stroke={`hsl(${100 + i * 5}, 45%, ${25 + i * 3}%)`}
          strokeWidth={3 + (i % 2)}
        />
      ))}

      {/* ground */}
      <rect y="90" width="280" height="30" fill="url(#ground)" />

      {/* tiny adventurers (original silhouettes) */}
      {/* character 1 */}
      <g transform="translate(70, 72)">
        <rect x="-4" y="8" width="8" height="14" rx="2" fill="#c44" />
        <circle cx="0" cy="4" r="5" fill="#e8c4a0" />
        <line x1="-6" y1="14" x2="-10" y2="24" stroke="#8a6840" strokeWidth="2" />
        <line x1="6" y1="14" x2="12" y2="22" stroke="#8a6840" strokeWidth="2" />
        <line x1="0" y1="10" x2="0" y2="-8" stroke="#666" strokeWidth="1.5" />
      </g>

      {/* character 2 */}
      <g transform="translate(140, 70)">
        <rect x="-5" y="10" width="10" height="16" rx="2" fill="#48a" />
        <circle cx="0" cy="5" r="6" fill="#d4a880" />
        <line x1="-8" y1="16" x2="-14" y2="26" stroke="#8a6840" strokeWidth="2" />
        <line x1="8" y1="16" x2="14" y2="26" stroke="#8a6840" strokeWidth="2" />
        <line x1="2" y1="12" x2="8" y2="-4" stroke="#666" strokeWidth="1.5" />
      </g>

      {/* character 3 */}
      <g transform="translate(200, 74)">
        <rect x="-4" y="8" width="8" height="12" rx="2" fill="#6a4" />
        <circle cx="0" cy="3" r="4.5" fill="#c8a888" />
        <line x1="-5" y1="12" x2="-8" y2="22" stroke="#8a6840" strokeWidth="2" />
        <line x1="5" y1="12" x2="8" y2="22" stroke="#8a6840" strokeWidth="2" />
        <rect x="-3" y="-2" width="6" height="4" rx="1" fill="#555" />
      </g>

      {/* oversized dewdrop */}
      <ellipse cx="230" cy="50" rx="8" ry="12" fill="rgba(150,200,255,0.4)" />
    </svg>
  )
}

export default function VoucherCard({ copied, onCopy, onPlayAgain }) {
  return (
    <motion.div
      className="relative z-30 w-[min(260px,85vw)]"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="bg-gradient-to-b from-[#f5f0e8] to-[#e8dfd0] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-2 border-[#8a8070]">
        {/* card header */}
        <div className="bg-gradient-to-r from-[#3a6830] to-[#5a9040] px-4 py-2 text-center">
          <p className="font-display text-xl text-gold tracking-wide">HAPPY BIRTHDAY!</p>
        </div>

        <div className="p-3">
          <p className="text-center font-bold text-[#2a3820] text-sm sm:text-base leading-snug mb-2">
            Happy Birthday, {BROTHER_NAME}!
          </p>
          <p className="text-center text-[#4a5840] text-xs sm:text-sm font-semibold mb-3">
            Your Grounded 2 adventure starts here.
          </p>

          <AdventureIllustration />

          <div className="mt-3 bg-[#2a3820] rounded-lg px-3 py-2.5 text-center">
            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Voucher Code</p>
            <p className="font-mono font-bold text-gold text-sm sm:text-base tracking-wider select-all">
              {VOUCHER_CODE}
            </p>
          </div>

          <button
            type="button"
            onClick={onCopy}
            className="mt-3 w-full py-2.5 rounded-lg bg-accent-green text-forest-dark font-extrabold text-sm hover:bg-accent-bright transition-colors active:scale-[0.98]"
          >
            {copied ? '✓ COPIED!' : 'COPY CODE'}
          </button>
        </div>
      </div>

      {/* action buttons below card */}
      <div className="flex gap-3 mt-4">
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
