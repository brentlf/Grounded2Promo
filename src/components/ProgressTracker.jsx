const STEPS = ['REMOVE TAPE', 'UNTIE RIBBON', 'UNWRAP', 'OPEN']

export default function ProgressTracker({ currentStep, completed }) {
  return (
    <div className="w-full max-w-md mx-auto px-2">
      <div className="flex items-start justify-between relative">
        {/* connector line */}
        <div className="absolute top-[14px] left-[12%] right-[12%] h-[2px] bg-white/15 z-0" />
        <div
          className="absolute top-[14px] left-[12%] h-[2px] bg-accent-green z-0 transition-all duration-500"
          style={{
            width: `${Math.min(completed ? 100 : ((currentStep - 1) / 3) * 76, 76)}%`,
          }}
        />

        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const isComplete = completed || stepNum < currentStep
          const isActive = !completed && stepNum === currentStep

          return (
            <div key={label} className="flex flex-col items-center z-10 flex-1 min-w-0">
              <div
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  border-2 transition-all duration-300
                  ${isComplete
                    ? 'bg-accent-green border-accent-green text-forest-dark'
                    : isActive
                      ? 'bg-accent-bright border-accent-bright text-forest-dark scale-110 shadow-[0_0_12px_rgba(164,214,94,0.6)]'
                      : 'bg-forest-mid/80 border-white/20 text-white/40'
                  }
                `}
              >
                {isComplete ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`
                  mt-1.5 text-[8px] sm:text-[9px] font-bold tracking-wide text-center leading-tight
                  ${isActive ? 'text-accent-bright' : isComplete ? 'text-accent-green/80' : 'text-white/30'}
                `}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
