export default function Header({ soundEnabled, onToggleSound, onOpenHelp }) {
  return (
    <header className="relative z-20 px-4 pt-3 pb-1">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onToggleSound}
          className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/50 transition-colors"
          aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenHelp}
          className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/50 transition-colors text-sm font-bold"
          aria-label="Help"
        >
          ?
        </button>
      </div>

      <h1 className="font-display title-gradient text-[clamp(2rem,8vw,3.2rem)] leading-none text-center tracking-wide">
        BIRTHDAY SUPPLY DROP
      </h1>
      <p className="text-center text-white/70 text-sm sm:text-base mt-1 font-semibold">
        A special delivery for my brother!
      </p>
    </header>
  )
}
