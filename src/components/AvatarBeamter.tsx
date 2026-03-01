interface Props {
  size?: number;
  className?: string;
}

export default function AvatarBeamter({ size = 120, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 160"
      width={size}
      height={size * (160 / 120)}
      className={`avatar-beamter ${className}`}
      aria-label="Grantler Persona"
      role="img"
    >
      {/* Body: White shirt with suspenders */}
      <g className="grantler-body">
        <path d="M28 92 Q28 78 45 74 L75 74 Q92 78 92 92 L92 148 Q92 155 84 155 L36 155 Q28 155 28 148 Z" fill="#d8d0c4" stroke="#b8b0a4" strokeWidth="0.8"/>
        <path d="M48 74 L52 82 L56 76" fill="#d8d0c4" stroke="#b8b0a4" strokeWidth="0.6"/>
        <path d="M72 74 L68 82 L64 76" fill="#d8d0c4" stroke="#b8b0a4" strokeWidth="0.6"/>
        <path d="M56 76 L60 84 L64 76" fill="#c49870" opacity="0.6"/>
        <line x1="44" y1="78" x2="44" y2="155" stroke="#3a5a7a" strokeWidth="4" strokeLinecap="round"/>
        <line x1="76" y1="78" x2="76" y2="155" stroke="#3a5a7a" strokeWidth="4" strokeLinecap="round"/>
        <path d="M42 86 L46 86" stroke="#5a7a9a" strokeWidth="0.8" opacity="0.5"/>
        <path d="M42 96 L46 96" stroke="#5a7a9a" strokeWidth="0.8" opacity="0.5"/>
        <path d="M74 86 L78 86" stroke="#5a7a9a" strokeWidth="0.8" opacity="0.5"/>
        <path d="M74 96 L78 96" stroke="#5a7a9a" strokeWidth="0.8" opacity="0.5"/>
        <path d="M50 100 Q55 98 52 112" fill="none" stroke="#b8b0a4" strokeWidth="0.5" opacity="0.4"/>
        <path d="M70 105 Q65 102 68 115" fill="none" stroke="#b8b0a4" strokeWidth="0.5" opacity="0.4"/>
      </g>

      {/* Neck */}
      <rect x="52" y="66" width="16" height="12" rx="3" fill="#c49870" opacity="0.9"/>

      {/* Head */}
      <g className="grantler-head">
        <ellipse cx="60" cy="46" rx="25" ry="28" fill="#c49870"/>

        {/* Wild messy hair */}
        <g className="grantler-hair">
          <path d="M34 40 Q30 20 42 14 Q50 10 60 12 Q70 10 78 14 Q90 20 86 40" fill="#c8c0b0" stroke="#a8a090" strokeWidth="0.5"/>
          <path d="M34 38 Q28 32 26 24 Q25 18 30 16" fill="none" stroke="#c8c0b0" strokeWidth="3" strokeLinecap="round"/>
          <path d="M36 34 Q30 26 28 20" fill="none" stroke="#b8b0a0" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M35 42 Q26 38 24 30" fill="none" stroke="#d0c8b8" strokeWidth="2" strokeLinecap="round"/>
          <path d="M86 38 Q92 32 94 24 Q95 18 90 16" fill="none" stroke="#c8c0b0" strokeWidth="3" strokeLinecap="round"/>
          <path d="M84 34 Q90 26 92 20" fill="none" stroke="#b8b0a0" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M85 42 Q94 38 96 30" fill="none" stroke="#d0c8b8" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 14 Q46 6 50 4" fill="none" stroke="#c8c0b0" strokeWidth="2" strokeLinecap="round"/>
          <path d="M58 12 Q60 4 64 3" fill="none" stroke="#b8b0a0" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M70 14 Q74 6 72 4" fill="none" stroke="#d0c8b8" strokeWidth="2" strokeLinecap="round"/>
          <path d="M54 13 Q52 8 55 5" fill="none" stroke="#c0b8a8" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M66 13 Q68 7 66 5" fill="none" stroke="#c0b8a8" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M40 22 Q50 18 60 20 Q70 18 80 22" fill="none" stroke="#a8a090" strokeWidth="0.6" opacity="0.4"/>
          <path d="M38 28 Q50 24 60 26 Q70 24 82 28" fill="none" stroke="#a8a090" strokeWidth="0.5" opacity="0.3"/>
        </g>

        {/* Forehead wrinkles */}
        <path d="M42 28 Q52 25 68 28" fill="none" stroke="#a8804a" strokeWidth="0.9" opacity="0.6"/>
        <path d="M44 32 Q54 29 66 32" fill="none" stroke="#a8804a" strokeWidth="0.8" opacity="0.5"/>
        <path d="M46 35 Q56 33 64 35" fill="none" stroke="#a8804a" strokeWidth="0.6" opacity="0.4"/>

        {/* Eyebrows */}
        <path d="M37 37 Q42 33 53 37" fill="none" stroke="#a09888" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M67 37 Q78 33 83 37" fill="none" stroke="#a09888" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M39 36 Q38 33 40 32" fill="none" stroke="#a09888" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M81 36 Q82 33 80 32" fill="none" stroke="#a09888" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>

        {/* Eyes */}
        <ellipse cx="46" cy="43" rx="4" ry="2.2" fill="#fff"/>
        <circle cx="47" cy="43" r="2" fill="#5a6a5a"/>
        <circle cx="47" cy="43" r="1" fill="#1a1a1a"/>
        <path d="M41 41 Q46 39 51 41" fill="#c49870" stroke="#a8804a" strokeWidth="0.6" opacity="0.8"/>
        <path d="M42 46 Q46 49 50 46" fill="none" stroke="#a07850" strokeWidth="0.8" opacity="0.5"/>
        <path d="M43 48 Q46 50 49 48" fill="none" stroke="#a07850" strokeWidth="0.5" opacity="0.3"/>

        <ellipse cx="74" cy="43" rx="4" ry="2.2" fill="#fff"/>
        <circle cx="73" cy="43" r="2" fill="#5a6a5a"/>
        <circle cx="73" cy="43" r="1" fill="#1a1a1a"/>
        <path d="M69 41 Q74 39 79 41" fill="#c49870" stroke="#a8804a" strokeWidth="0.6" opacity="0.8"/>
        <path d="M70 46 Q74 49 78 46" fill="none" stroke="#a07850" strokeWidth="0.8" opacity="0.5"/>
        <path d="M71 48 Q74 50 77 48" fill="none" stroke="#a07850" strokeWidth="0.5" opacity="0.3"/>

        {/* Nose */}
        <path d="M57 44 Q54 52 51 56 Q55 60 60 61 Q65 60 69 56 Q66 52 63 44" fill="#b48860" opacity="0.5"/>
        <circle cx="55" cy="58" r="1.8" fill="#a07848" opacity="0.25"/>
        <circle cx="65" cy="58" r="1.8" fill="#a07848" opacity="0.25"/>

        {/* Walrus mustache */}
        <g className="grantler-stache">
          <path d="M42 62 Q46 58 54 60 Q57 61 60 61 Q63 61 66 60 Q74 58 78 62 Q76 67 72 70 Q68 72 64 70 Q62 68 60 68 Q58 68 56 70 Q52 72 48 70 Q44 67 42 62 Z" fill="#b8b0a0" stroke="#a09888" strokeWidth="0.5"/>
          <path d="M42 62 Q38 68 36 74 Q35 77 36 78" fill="none" stroke="#b8b0a0" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M44 63 Q40 68 38 73" fill="none" stroke="#a8a090" strokeWidth="2" strokeLinecap="round"/>
          <path d="M78 62 Q82 68 84 74 Q85 77 84 78" fill="none" stroke="#b8b0a0" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M76 63 Q80 68 82 73" fill="none" stroke="#a8a090" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 62 Q54 60 60 61 Q66 60 72 62" fill="none" stroke="#9a9280" strokeWidth="0.5" opacity="0.4"/>
        </g>

        {/* Mouth */}
        <path d="M52 72 Q56 70 60 70 Q64 70 68 72" fill="none" stroke="#8a6848" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>

        {/* Nasolabial folds */}
        <path d="M48 56 Q46 62 44 68" fill="none" stroke="#a07850" strokeWidth="0.8" opacity="0.4"/>
        <path d="M72 56 Q74 62 76 68" fill="none" stroke="#a07850" strokeWidth="0.8" opacity="0.4"/>

        {/* Ears */}
        <ellipse cx="33" cy="46" rx="5" ry="7" fill="#b48860" opacity="0.7"/>
        <ellipse cx="87" cy="46" rx="5" ry="7" fill="#b48860" opacity="0.7"/>
        <path d="M30 42 Q28 40 29 38" fill="none" stroke="#c8c0b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M90 42 Q92 40 91 38" fill="none" stroke="#c8c0b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </g>

      {/* Beer bottle */}
      <g className="grantler-beer">
        <path d="M30 100 Q18 95 15 82 Q14 76 16 72" fill="none" stroke="#c49870" strokeWidth="6" strokeLinecap="round"/>
        <rect x="6" y="52" width="14" height="28" rx="3" fill="#5a3018" stroke="#3a1808" strokeWidth="0.8"/>
        <rect x="9" y="40" width="8" height="14" rx="2" fill="#5a3018" stroke="#3a1808" strokeWidth="0.8"/>
        <rect x="10" y="38" width="6" height="3" rx="1" fill="#c8a840" stroke="#a08830" strokeWidth="0.5"/>
        <rect x="8" y="58" width="10" height="12" rx="1" fill="#d4cfc0" opacity="0.7"/>
        <line x1="10" y1="62" x2="16" y2="62" stroke="#8a7a6a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="10" y1="65" x2="16" y2="65" stroke="#8a7a6a" strokeWidth="0.5" opacity="0.5"/>
        <path d="M10 54 L10 75" fill="none" stroke="#7a4a28" strokeWidth="1" opacity="0.3"/>
      </g>
    </svg>
  );
}
