interface Props {
  size?: number;
  className?: string;
}

export default function AvatarRenate({ size = 120, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 160"
      width={size}
      height={size * (160 / 120)}
      className={`avatar-renate ${className}`}
      aria-label="Renate Persona"
      role="img"
    >
      {/* Body: Blazer */}
      <g>
        <path d="M28 92 Q28 78 45 74 L75 74 Q92 78 92 92 L92 148 Q92 155 84 155 L36 155 Q28 155 28 148 Z" fill="#8B1A1A" stroke="#6B0A0A" strokeWidth="0.8"/>
        {/* Lapels */}
        <path d="M48 74 L55 96 L60 82" fill="#7B0A0A" stroke="#6B0A0A" strokeWidth="0.6"/>
        <path d="M72 74 L65 96 L60 82" fill="#7B0A0A" stroke="#6B0A0A" strokeWidth="0.6"/>
        {/* Blouse underneath */}
        <path d="M52 76 L57 88 L60 82 L63 88 L68 76" fill="#e8e0d4" stroke="#d0c8b4" strokeWidth="0.3"/>
        {/* Blazer pockets */}
        <rect x="34" y="110" width="14" height="2" rx="1" fill="#7B0A0A" opacity="0.6"/>
        <rect x="72" y="110" width="14" height="2" rx="1" fill="#7B0A0A" opacity="0.6"/>
        {/* Union pin */}
        <circle cx="42" cy="88" r="4" fill="#c8a840" stroke="#a08830" strokeWidth="0.5"/>
        <text x="42" y="90" textAnchor="middle" fontSize="4" fill="#8B1A1A" fontWeight="bold">GPA</text>
      </g>

      {/* Neck */}
      <rect x="52" y="66" width="16" height="12" rx="3" fill="#d4a574" opacity="0.9"/>

      {/* Head */}
      <g>
        <ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>

        {/* Hair: short, practical, determined style */}
        <path d="M34 38 Q32 14 60 10 Q88 14 86 38 Q82 18 60 16 Q38 18 34 38 Z" fill="#8a6848" stroke="#7a5838" strokeWidth="0.5"/>
        {/* Side waves */}
        <path d="M34 38 Q30 32 32 24" fill="none" stroke="#8a6848" strokeWidth="3" strokeLinecap="round"/>
        <path d="M86 38 Q90 32 88 24" fill="none" stroke="#8a6848" strokeWidth="3" strokeLinecap="round"/>
        {/* Volume on top */}
        <path d="M42 16 Q50 8 60 6 Q70 8 78 16" fill="none" stroke="#7a5838" strokeWidth="1" opacity="0.3"/>
        {/* Grey streaks */}
        <path d="M38 28 Q44 20 52 18" fill="none" stroke="#b0a090" strokeWidth="1.5" opacity="0.4"/>
        <path d="M82 28 Q76 20 68 18" fill="none" stroke="#b0a090" strokeWidth="1.5" opacity="0.4"/>

        {/* Eyebrows: strong, determined */}
        <path d="M38 36 Q44 32 52 36" fill="none" stroke="#6a4828" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M68 36 Q76 32 82 36" fill="none" stroke="#6a4828" strokeWidth="2.5" strokeLinecap="round"/>

        {/* Eyes: sharp, determined */}
        <ellipse cx="46" cy="43" rx="4.5" ry="2.8" fill="#fff"/>
        <circle cx="46" cy="43" r="2.2" fill="#4a3a2a"/>
        <circle cx="46" cy="43" r="1.1" fill="#1a1a1a"/>
        <ellipse cx="74" cy="43" rx="4.5" ry="2.8" fill="#fff"/>
        <circle cx="74" cy="43" r="2.2" fill="#4a3a2a"/>
        <circle cx="74" cy="43" r="1.1" fill="#1a1a1a"/>

        {/* Slight crow's feet — experienced */}
        <path d="M36 42 L33 40" fill="none" stroke="#b08860" strokeWidth="0.5" opacity="0.4"/>
        <path d="M36 44 L33 46" fill="none" stroke="#b08860" strokeWidth="0.5" opacity="0.4"/>
        <path d="M84 42 L87 40" fill="none" stroke="#b08860" strokeWidth="0.5" opacity="0.4"/>
        <path d="M84 44 L87 46" fill="none" stroke="#b08860" strokeWidth="0.5" opacity="0.4"/>

        {/* Nose */}
        <path d="M58 44 Q56 50 54 54 Q57 56 60 56 Q63 56 66 54 Q64 50 62 44" fill="#c49870" opacity="0.3"/>

        {/* Mouth: determined, speaking */}
        <path d="M48 62 Q54 68 60 68 Q66 68 72 62" fill="none" stroke="#a07850" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M50 63 Q55 67 60 67 Q65 67 70 63" fill="#a07850" opacity="0.2"/>

        {/* Ears */}
        <ellipse cx="34" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.5"/>
        <ellipse cx="86" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.5"/>
        {/* Earrings */}
        <circle cx="33" cy="54" r="1.5" fill="#c8a840" opacity="0.5"/>
        <circle cx="87" cy="54" r="1.5" fill="#c8a840" opacity="0.5"/>
      </g>

      {/* Raised fist */}
      <g>
        <path d="M22 96 Q12 88 8 76" fill="none" stroke="#d4a574" strokeWidth="5.5" strokeLinecap="round"/>
        {/* Fist */}
        <ellipse cx="6" cy="72" rx="8" ry="6" fill="#d4a574" stroke="#c49870" strokeWidth="0.5"/>
        {/* Finger lines */}
        <path d="M2 68 L10 68" fill="none" stroke="#c49870" strokeWidth="0.5" opacity="0.5"/>
        <path d="M2 70 L10 70" fill="none" stroke="#c49870" strokeWidth="0.5" opacity="0.5"/>
        <path d="M2 72 L10 72" fill="none" stroke="#c49870" strokeWidth="0.5" opacity="0.5"/>
        {/* Thumb */}
        <path d="M10 74 Q14 74 14 70" fill="#d4a574" stroke="#c49870" strokeWidth="0.5"/>
      </g>
    </svg>
  );
}
