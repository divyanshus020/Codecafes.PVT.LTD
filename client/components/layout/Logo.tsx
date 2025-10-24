export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Coffee Cup with Steam */}
      <g transform="translate(0, 0)">
        {/* Curly braces */}
        <path
          d="M 100 50 Q 90 70 90 90 Q 90 110 100 130"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 280 50 Q 290 70 290 90 Q 290 110 280 130"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Coffee cup */}
        <ellipse cx="190" cy="130" rx="60" ry="15" fill="currentColor" opacity="0.3" />
        <path
          d="M 130 130 L 140 80 Q 140 70 150 70 L 230 70 Q 240 70 240 80 L 250 130"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Cup handle */}
        <path
          d="M 250 90 Q 270 90 270 110 Q 270 120 260 120"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Steam lines */}
        <path
          d="M 160 50 Q 165 35 160 20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 190 45 Q 195 30 190 15"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 220 50 Q 225 35 220 20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
      
      {/* Text: DCodeCafe */}
      <text
        x="310"
        y="110"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="72"
        fontWeight="700"
        fill="currentColor"
      >
        DCodeCafe
      </text>
    </svg>
  );
}
