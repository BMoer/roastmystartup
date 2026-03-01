interface Props {
  size?: number;
  className?: string;
}

export default function AvatarPflichtner({ size = 120, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 160"
      width={size}
      height={size * (160 / 120)}
      className={`avatar-pflichtner ${className}`}
      aria-label="Dr. Pflichtner Persona"
      role="img"
    >
      {/* Body: Dark navy suit */}
      <g>
        <path d="M28 92 Q28 78 45 74 L75 74 Q92 78 92 92 L92 148 Q92 155 84 155 L36 155 Q28 155 28 148 Z" fill="#1a3a5c" stroke="#0f2a44" strokeWidth="0.8"/>
        {/* Lapels */}
        <path d="M48 74 L55 92 L60 82" fill="#152e4a" stroke="#0f2a44" strokeWidth="0.6"/>
        <path d="M72 74 L65 92 L60 82" fill="#152e4a" stroke="#0f2a44" strokeWidth="0.6"/>
        {/* Tie */}
        <path d="M57 82 L60 130 L63 82 Z" fill="#8B0000" opacity="0.8"/>
        <path d="M56 78 L60 84 L64 78 Z" fill="#8B0000"/>
        {/* Shirt collar */}
        <path d="M52 76 L57 82 L48 74" fill="#e8e0d4"/>
        <path d="M68 76 L63 82 L72 74" fill="#e8e0d4"/>
        {/* Pocket */}
        <rect x="70" y="96" width="10" height="2" rx="1" fill="#152e4a" opacity="0.6"/>
        {/* Pen in pocket */}
        <line x1="73" y1="90" x2="73" y2="98" stroke="#c8a840" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="73" cy="89" r="1.5" fill="#c8a840"/>
      </g>

      {/* Neck */}
      <rect x="52" y="66" width="16" height="12" rx="3" fill="#d4a574" opacity="0.9"/>

      {/* Head */}
      <g>
        <ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>

        {/* Hair: receding, neatly combed */}
        <path d="M38 36 Q38 16 60 14 Q82 16 82 36 Q78 24 60 22 Q42 24 38 36 Z" fill="#4a3828" stroke="#3a2818" strokeWidth="0.5"/>
        <path d="M38 36 Q42 30 50 28" fill="none" stroke="#3a2818" strokeWidth="0.5" opacity="0.4"/>
        <path d="M82 36 Q78 30 70 28" fill="none" stroke="#3a2818" strokeWidth="0.5" opacity="0.4"/>

        {/* Glasses: rectangular, stern */}
        <g>
          <rect x="37" y="38" width="18" height="12" rx="2" fill="none" stroke="#333" strokeWidth="1.5"/>
          <rect x="65" y="38" width="18" height="12" rx="2" fill="none" stroke="#333" strokeWidth="1.5"/>
          <line x1="55" y1="44" x2="65" y2="44" stroke="#333" strokeWidth="1"/>
          <line x1="37" y1="44" x2="33" y2="42" stroke="#333" strokeWidth="1"/>
          <line x1="83" y1="44" x2="87" y2="42" stroke="#333" strokeWidth="1"/>
          {/* Lens reflection */}
          <rect x="39" y="40" width="3" height="5" rx="1" fill="#fff" opacity="0.15"/>
          <rect x="67" y="40" width="3" height="5" rx="1" fill="#fff" opacity="0.15"/>
        </g>

        {/* Eyes behind glasses */}
        <ellipse cx="46" cy="44" rx="3" ry="2" fill="#fff"/>
        <circle cx="46" cy="44" r="1.5" fill="#3a4a5a"/>
        <circle cx="46" cy="44" r="0.8" fill="#1a1a1a"/>
        <ellipse cx="74" cy="44" rx="3" ry="2" fill="#fff"/>
        <circle cx="74" cy="44" r="1.5" fill="#3a4a5a"/>
        <circle cx="74" cy="44" r="0.8" fill="#1a1a1a"/>

        {/* Stern eyebrows */}
        <path d="M38 36 Q44 33 54 36" fill="none" stroke="#3a2818" strokeWidth="2" strokeLinecap="round"/>
        <path d="M66 36 Q76 33 82 36" fill="none" stroke="#3a2818" strokeWidth="2" strokeLinecap="round"/>

        {/* Nose */}
        <path d="M58 44 Q56 52 54 56 Q57 58 60 58 Q63 58 66 56 Q64 52 62 44" fill="#c49870" opacity="0.4"/>

        {/* Mouth: thin, pressed lips */}
        <path d="M50 63 Q55 65 60 65 Q65 65 70 63" fill="none" stroke="#8a6848" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M52 64 Q56 62 60 62 Q64 62 68 64" fill="none" stroke="#a07850" strokeWidth="0.5" opacity="0.3"/>

        {/* Ears */}
        <ellipse cx="34" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.7"/>
        <ellipse cx="86" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.7"/>
      </g>

      {/* Documents in hand */}
      <g>
        <path d="M22 100 Q14 95 10 82" fill="none" stroke="#d4a574" strokeWidth="5" strokeLinecap="round"/>
        <rect x="2" y="68" width="16" height="22" rx="1" fill="#f0ead4" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="5" y1="73" x2="15" y2="73" stroke="#999" strokeWidth="0.5"/>
        <line x1="5" y1="76" x2="15" y2="76" stroke="#999" strokeWidth="0.5"/>
        <line x1="5" y1="79" x2="12" y2="79" stroke="#999" strokeWidth="0.5"/>
        <line x1="5" y1="82" x2="15" y2="82" stroke="#999" strokeWidth="0.5"/>
        <rect x="5" y="70" width="4" height="1.5" rx="0.5" fill="#8B0000" opacity="0.5"/>
      </g>
    </svg>
  );
}
