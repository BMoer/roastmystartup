interface Props {
  size?: number;
  className?: string;
}

export default function AvatarSabine({ size = 120, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 160"
      width={size}
      height={size * (160 / 120)}
      className={`avatar-sabine ${className}`}
      aria-label="Sabine Persona"
      role="img"
    >
      {/* Body: Blouse/cardigan */}
      <g>
        <path d="M28 92 Q28 78 45 74 L75 74 Q92 78 92 92 L92 148 Q92 155 84 155 L36 155 Q28 155 28 148 Z" fill="#2d6a3e" stroke="#1d5a2e" strokeWidth="0.8"/>
        {/* Blouse collar */}
        <path d="M48 74 L54 86 L60 78" fill="#e8e0d4" stroke="#d0c8b4" strokeWidth="0.5"/>
        <path d="M72 74 L66 86 L60 78" fill="#e8e0d4" stroke="#d0c8b4" strokeWidth="0.5"/>
        {/* Cardigan opening */}
        <line x1="60" y1="78" x2="60" y2="155" stroke="#1d5a2e" strokeWidth="1"/>
        {/* Buttons */}
        <circle cx="60" cy="95" r="2" fill="#1d5a2e" stroke="#0f4a1e" strokeWidth="0.5"/>
        <circle cx="60" cy="110" r="2" fill="#1d5a2e" stroke="#0f4a1e" strokeWidth="0.5"/>
        <circle cx="60" cy="125" r="2" fill="#1d5a2e" stroke="#0f4a1e" strokeWidth="0.5"/>
      </g>

      {/* Neck */}
      <rect x="52" y="66" width="16" height="12" rx="3" fill="#d4a574" opacity="0.9"/>

      {/* Head */}
      <g>
        <ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>

        {/* Hair: practical bob cut */}
        <path d="M34 40 Q32 14 60 10 Q88 14 86 40 Q84 20 60 16 Q36 20 34 40 Z" fill="#6a4428" stroke="#5a3418" strokeWidth="0.5"/>
        {/* Side hair */}
        <path d="M34 40 L32 58 Q33 62 36 60 L36 42" fill="#6a4428"/>
        <path d="M86 40 L88 58 Q87 62 84 60 L84 42" fill="#6a4428"/>
        {/* Hair texture */}
        <path d="M42 14 Q52 10 62 12" fill="none" stroke="#5a3418" strokeWidth="0.5" opacity="0.4"/>

        {/* Eyes: slightly tired */}
        <ellipse cx="46" cy="44" rx="4" ry="2.5" fill="#fff"/>
        <circle cx="47" cy="44" r="2" fill="#5a7a5a"/>
        <circle cx="47" cy="44" r="1" fill="#1a1a1a"/>
        <ellipse cx="74" cy="44" rx="4" ry="2.5" fill="#fff"/>
        <circle cx="73" cy="44" r="2" fill="#5a7a5a"/>
        <circle cx="73" cy="44" r="1" fill="#1a1a1a"/>
        {/* Slight bags under eyes */}
        <path d="M42 47 Q46 49 50 47" fill="none" stroke="#b08860" strokeWidth="0.6" opacity="0.4"/>
        <path d="M70 47 Q74 49 78 47" fill="none" stroke="#b08860" strokeWidth="0.6" opacity="0.4"/>

        {/* Eyebrows: slightly raised, polite-tired */}
        <path d="M40 39 Q46 36 52 39" fill="none" stroke="#5a3418" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M68 39 Q74 36 80 39" fill="none" stroke="#5a3418" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Nose */}
        <path d="M58 44 Q56 50 54 54 Q57 56 60 56 Q63 56 66 54 Q64 50 62 44" fill="#c49870" opacity="0.3"/>

        {/* Mouth: polite half-smile */}
        <path d="M50 62 Q55 66 60 66 Q65 66 70 62" fill="none" stroke="#a07850" strokeWidth="1" strokeLinecap="round"/>

        {/* Ears */}
        <ellipse cx="34" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.5"/>
        <ellipse cx="86" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.5"/>
        {/* Earrings */}
        <circle cx="33" cy="54" r="2" fill="#c8a840" opacity="0.6"/>
        <circle cx="87" cy="54" r="2" fill="#c8a840" opacity="0.6"/>
      </g>

      {/* Laptop in hand */}
      <g>
        <path d="M88 100 Q100 96 104 84 Q105 78 102 74" fill="none" stroke="#d4a574" strokeWidth="5" strokeLinecap="round"/>
        <rect x="94" y="64" width="18" height="12" rx="2" fill="#555" stroke="#444" strokeWidth="0.8"/>
        <rect x="95" y="65" width="16" height="10" rx="1" fill="#333"/>
        {/* Screen glow */}
        <rect x="96" y="66" width="14" height="8" rx="0.5" fill="#2d6a3e" opacity="0.3"/>
        {/* Keyboard part */}
        <rect x="94" y="76" width="18" height="2" rx="0.5" fill="#666" stroke="#555" strokeWidth="0.3"/>
      </g>
    </svg>
  );
}
