/** Colourful backyard doodles on gift wrap — original art only */
export default function WrapDoodles({ variant = 'front' }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ladybug */}
      <g transform="translate(25, 35)">
        <ellipse cx="9" cy="10" rx="9" ry="7" fill="#e85030" />
        <line x1="9" y1="4" x2="9" y2="16" stroke="#5a2010" strokeWidth="0.6" />
        <circle cx="6" cy="8" r="1.5" fill="#1a1010" />
        <circle cx="12" cy="8" r="1.5" fill="#1a1010" />
        <circle cx="5" cy="12" r="1" fill="#1a1010" opacity="0.7" />
        <circle cx="13" cy="11" r="1" fill="#1a1010" opacity="0.7" />
      </g>

      {/* orange mushroom */}
      <g transform="translate(145, 25)">
        <ellipse cx="11" cy="9" rx="12" ry="7" fill="#e87830" />
        <circle cx="7" cy="7" r="2" fill="#ffe8c0" opacity="0.7" />
        <circle cx="14" cy="6" r="1.5" fill="#ffe8c0" opacity="0.6" />
        <rect x="8" y="9" width="7" height="12" rx="2" fill="#f5d8b0" />
      </g>

      {/* bright leaf */}
      <path d="M55 155 Q68 130 82 158 Q68 178 55 155" fill="#5cb838" />
      <path d="M62 155 Q68 142 74 155" fill="#7ad848" opacity="0.6" />
      <line x1="68" y1="155" x2="68" y2="138" stroke="#2a6020" strokeWidth="0.6" />

      {/* caterpillar */}
      <g transform="translate(115, 130)">
        {[0, 7, 14, 21].map((x, i) => (
          <circle key={x} cx={x} cy={8} r={5 - i * 0.3} fill={i === 0 ? '#7cb342' : '#8fd04a'} />
        ))}
        <circle cx="0" cy="7" r="2" fill="#1a2810" />
      </g>

      {/* yellow flower */}
      <g transform="translate(38, 120)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx={8 + Math.cos((a * Math.PI) / 180) * 7}
            cy={8 + Math.sin((a * Math.PI) / 180) * 7}
            rx="4"
            ry="2.5"
            fill="#f5c842"
            transform={`rotate(${a} 8 8)`}
          />
        ))}
        <circle cx="8" cy="8" r="3" fill="#e8913a" />
      </g>

      {/* beetle */}
      <g transform="translate(160, 145)">
        <ellipse cx="9" cy="9" rx="9" ry="6" fill="#4a3880" />
        <line x1="9" y1="3" x2="9" y2="15" stroke="#2a1848" strokeWidth="0.5" />
        <circle cx="9" cy="4" r="2.5" fill="#6a58a0" />
      </g>

      {/* grass */}
      <g transform="translate(170, 85)" opacity="0.8">
        <path d="M0 12 Q2 0 4 12" fill="none" stroke="#4a9030" strokeWidth="1.4" />
        <path d="M5 12 Q8 -3 10 12" fill="none" stroke="#6ab840" strokeWidth="1.4" />
        <path d="M11 12 Q14 2 16 12" fill="none" stroke="#4a9030" strokeWidth="1.4" />
      </g>

      {variant === 'top' && (
        <circle cx="100" cy="100" r="18" fill="none" stroke="#f5c842" strokeWidth="1.5" opacity="0.35" strokeDasharray="4 3" />
      )}
    </svg>
  )
}
