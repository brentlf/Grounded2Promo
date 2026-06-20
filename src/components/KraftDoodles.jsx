/** Original hand-drawn-style doodles for kraft paper — no copyrighted assets */
export default function KraftDoodles() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ant */}
      <g transform="translate(30, 40)">
        <ellipse cx="8" cy="12" rx="3" ry="2" fill="#2a4018" />
        <ellipse cx="14" cy="12" rx="3" ry="2" fill="#2a4018" />
        <ellipse cx="20" cy="12" rx="3" ry="2" fill="#2a4018" />
        <circle cx="5" cy="10" r="3" fill="#3a5028" />
        <line x1="2" y1="8" x2="0" y2="5" stroke="#2a4018" strokeWidth="0.8" />
        <line x1="2" y1="12" x2="0" y2="14" stroke="#2a4018" strokeWidth="0.8" />
      </g>

      {/* mushroom */}
      <g transform="translate(150, 30)">
        <ellipse cx="10" cy="8" rx="10" ry="6" fill="#5a4030" />
        <circle cx="6" cy="6" r="1.5" fill="#f5ead8" opacity="0.5" />
        <circle cx="12" cy="5" r="1" fill="#f5ead8" opacity="0.4" />
        <rect x="7" y="8" width="6" height="10" rx="2" fill="#c4a080" />
      </g>

      {/* leaf */}
      <path d="M60 160 Q70 140 80 160 Q70 175 60 160" fill="#3a6028" />
      <line x1="70" y1="160" x2="70" y2="148" stroke="#2a4018" strokeWidth="0.5" />

      {/* beetle */}
      <g transform="translate(120, 140)">
        <ellipse cx="10" cy="10" rx="8" ry="6" fill="#2a3818" />
        <line x1="10" y1="4" x2="10" y2="16" stroke="#1a2810" strokeWidth="0.5" />
        <circle cx="10" cy="5" r="2" fill="#3a4828" />
      </g>

      {/* grass tuft */}
      <g transform="translate(40, 150)">
        <path d="M0 15 Q3 0 5 15" fill="none" stroke="#3a5828" strokeWidth="1.2" />
        <path d="M5 15 Q8 -2 10 15" fill="none" stroke="#4a6838" strokeWidth="1.2" />
        <path d="M10 15 Q13 2 15 15" fill="none" stroke="#3a5828" strokeWidth="1.2" />
      </g>

      {/* tiny spider */}
      <g transform="translate(170, 100)">
        <circle cx="5" cy="5" r="3" fill="#2a3018" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="5"
            y1="5"
            x2={5 + Math.cos((angle * Math.PI) / 180) * 6}
            y2={5 + Math.sin((angle * Math.PI) / 180) * 6}
            stroke="#2a3018"
            strokeWidth="0.6"
          />
        ))}
      </g>

      {/* another leaf */}
      <path d="M160 170 Q175 155 180 175 Q170 185 160 170" fill="#4a7030" opacity="0.7" />
    </svg>
  )
}
