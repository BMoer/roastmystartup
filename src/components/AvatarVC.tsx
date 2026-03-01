interface Props {
  size?: number;
  className?: string;
}

export default function AvatarVC({ size = 120, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 160"
      width={size}
      height={size * (160 / 120)}
      className={`avatar-vc ${className}`}
      aria-label="VC Persona"
      role="img"
    >
      {/* Body: Patagonia vest over hoodie */}
      <g className="vc-body">
        <path d="M30 95 Q30 80 45 75 L75 75 Q90 80 90 95 L90 145 Q90 155 80 155 L40 155 Q30 155 30 145 Z" fill="#1a1a2e" stroke="#00E5FF" strokeWidth="1.5" opacity="0.9"/>
        <line x1="52" y1="78" x2="52" y2="90" stroke="#555" strokeWidth="1"/>
        <line x1="68" y1="78" x2="68" y2="90" stroke="#555" strokeWidth="1"/>
        <path d="M38 85 L38 145 Q38 150 43 150 L50 150 L50 85 Z" fill="#2d4a3e" stroke="#00E5FF" strokeWidth="1" opacity="0.8"/>
        <path d="M82 85 L82 145 Q82 150 77 150 L70 150 L70 85 Z" fill="#2d4a3e" stroke="#00E5FF" strokeWidth="1" opacity="0.8"/>
        <line x1="60" y1="78" x2="60" y2="150" stroke="#00E5FF" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5"/>
      </g>

      {/* Neck */}
      <rect x="52" y="68" width="16" height="12" rx="3" fill="#d4a574" opacity="0.9"/>

      {/* Head */}
      <g className="vc-head">
        <ellipse cx="60" cy="48" rx="24" ry="28" fill="#d4a574"/>
        <path d="M36 42 Q36 15 60 12 Q84 15 84 42 Q80 30 60 28 Q40 30 36 42 Z" fill="#1a0a00" stroke="#111" strokeWidth="0.5"/>
        <path d="M45 20 Q55 16 65 20" fill="none" stroke="#00E5FF" strokeWidth="0.5" opacity="0.4"/>

        {/* Sunglasses */}
        <g className="vc-sunglasses">
          <rect x="54" y="40" width="12" height="3" rx="1" fill="#111"/>
          <rect x="37" y="36" width="20" height="14" rx="4" fill="#111" stroke="#333" strokeWidth="1"/>
          <rect x="63" y="36" width="20" height="14" rx="4" fill="#111" stroke="#333" strokeWidth="1"/>
          <polyline points="67,46 72,46 75,44 78,38" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.8"/>
          <polyline points="41,46 46,46 49,44 52,38" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.8"/>
          <line x1="37" y1="42" x2="33" y2="40" stroke="#333" strokeWidth="1.5"/>
          <line x1="83" y1="42" x2="87" y2="40" stroke="#333" strokeWidth="1.5"/>
        </g>

        {/* Grin */}
        <path d="M44 58 Q52 68 60 68 Q68 68 76 58" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <path d="M47 60 Q53 66 60 66 Q67 66 73 60 L73 61 Q67 64 60 64 Q53 64 47 61 Z" fill="#fff" opacity="0.9"/>

        {/* AirPods */}
        <ellipse cx="34" cy="50" rx="3" ry="5" fill="#e8e8e8" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="34" y1="55" x2="35" y2="62" stroke="#e8e8e8" strokeWidth="1.5"/>
        <ellipse cx="86" cy="50" rx="3" ry="5" fill="#e8e8e8" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="86" y1="55" x2="85" y2="62" stroke="#e8e8e8" strokeWidth="1.5"/>
      </g>

      {/* Phone */}
      <g className="vc-phone">
        <path d="M88 100 Q100 95 102 80 Q103 75 100 72" fill="none" stroke="#d4a574" strokeWidth="6" strokeLinecap="round"/>
        <rect x="93" y="60" width="16" height="26" rx="3" fill="#111" stroke="#00E5FF" strokeWidth="1"/>
        <rect x="95" y="63" width="12" height="20" rx="1" fill="#0a0d14"/>
        <polyline points="97,79 100,77 103,75 105,68" fill="none" stroke="#00E5FF" strokeWidth="1.5"/>
        <rect x="95" y="63" width="12" height="20" rx="1" fill="#00E5FF" opacity="0.1"/>
      </g>

      {/* Cyan glow */}
      <ellipse cx="60" cy="100" rx="50" ry="60" fill="#00E5FF" opacity="0.03"/>
    </svg>
  );
}
