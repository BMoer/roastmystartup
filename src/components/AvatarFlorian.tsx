interface Props {
  size?: number;
  className?: string;
}

export default function AvatarFlorian({ size = 120, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 160"
      width={size}
      height={size * (160 / 120)}
      className={`avatar-florian ${className}`}
      aria-label="Florian Persona"
      role="img"
    >
      {/* Body: Patagonia fleece */}
      <g>
        <path d="M28 92 Q28 78 45 74 L75 74 Q92 78 92 92 L92 148 Q92 155 84 155 L36 155 Q28 155 28 148 Z" fill="#3a7a3a" stroke="#2a6a2a" strokeWidth="0.8"/>
        {/* Fleece texture */}
        <path d="M35 85 Q45 82 55 85 Q65 82 75 85" fill="none" stroke="#2a6a2a" strokeWidth="0.5" opacity="0.3"/>
        <path d="M35 95 Q45 92 55 95 Q65 92 75 95" fill="none" stroke="#2a6a2a" strokeWidth="0.5" opacity="0.3"/>
        <path d="M35 105 Q45 102 55 105 Q65 102 75 105" fill="none" stroke="#2a6a2a" strokeWidth="0.5" opacity="0.3"/>
        {/* Zipper */}
        <line x1="60" y1="78" x2="60" y2="120" stroke="#c8a840" strokeWidth="1.5"/>
        <rect x="57" y="115" width="6" height="8" rx="1" fill="#c8a840" stroke="#a08830" strokeWidth="0.5"/>
        {/* Patagonia-style logo area */}
        <ellipse cx="50" cy="88" rx="6" ry="4" fill="#2a6a2a" opacity="0.5"/>
      </g>

      {/* Neck */}
      <rect x="52" y="66" width="16" height="12" rx="3" fill="#d4a574" opacity="0.9"/>

      {/* Head */}
      <g>
        <ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>

        {/* Hair: man-bun + stubble beard */}
        {/* Sides are shorter */}
        <path d="M36 38 Q36 18 60 14 Q84 18 84 38 Q80 22 60 20 Q40 22 36 38 Z" fill="#5a3818" stroke="#4a2808" strokeWidth="0.5"/>
        {/* Man bun on top */}
        <ellipse cx="60" cy="10" rx="10" ry="8" fill="#5a3818" stroke="#4a2808" strokeWidth="0.5"/>
        <path d="M50 14 Q55 8 60 6 Q65 8 70 14" fill="none" stroke="#4a2808" strokeWidth="0.8" opacity="0.4"/>
        {/* Hair tie */}
        <rect x="54" y="15" width="12" height="3" rx="1.5" fill="#2a6a2a" opacity="0.7"/>

        {/* Eyebrows: soft, slightly concerned */}
        <path d="M40 38 Q46 35 52 38" fill="none" stroke="#4a2808" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M68 38 Q74 35 80 38" fill="none" stroke="#4a2808" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Eyes: thoughtful, slightly sad */}
        <ellipse cx="46" cy="44" rx="4.5" ry="3" fill="#fff"/>
        <circle cx="46" cy="44" r="2.5" fill="#5a7a4a"/>
        <circle cx="46" cy="44" r="1.2" fill="#1a1a1a"/>
        <ellipse cx="74" cy="44" rx="4.5" ry="3" fill="#fff"/>
        <circle cx="74" cy="44" r="2.5" fill="#5a7a4a"/>
        <circle cx="74" cy="44" r="1.2" fill="#1a1a1a"/>
        {/* Slight worry lines */}
        <path d="M42 41 Q46 39 50 41" fill="none" stroke="#b08860" strokeWidth="0.5" opacity="0.3"/>
        <path d="M70 41 Q74 39 78 41" fill="none" stroke="#b08860" strokeWidth="0.5" opacity="0.3"/>

        {/* Nose */}
        <path d="M58 44 Q56 50 54 54 Q57 56 60 56 Q63 56 66 54 Q64 50 62 44" fill="#c49870" opacity="0.3"/>

        {/* Stubble beard */}
        <g opacity="0.25">
          <circle cx="44" cy="62" r="0.5" fill="#5a3818"/>
          <circle cx="47" cy="64" r="0.5" fill="#5a3818"/>
          <circle cx="50" cy="63" r="0.5" fill="#5a3818"/>
          <circle cx="53" cy="65" r="0.5" fill="#5a3818"/>
          <circle cx="56" cy="64" r="0.5" fill="#5a3818"/>
          <circle cx="60" cy="66" r="0.5" fill="#5a3818"/>
          <circle cx="64" cy="64" r="0.5" fill="#5a3818"/>
          <circle cx="67" cy="65" r="0.5" fill="#5a3818"/>
          <circle cx="70" cy="63" r="0.5" fill="#5a3818"/>
          <circle cx="73" cy="64" r="0.5" fill="#5a3818"/>
          <circle cx="76" cy="62" r="0.5" fill="#5a3818"/>
          <circle cx="48" cy="67" r="0.5" fill="#5a3818"/>
          <circle cx="52" cy="68" r="0.5" fill="#5a3818"/>
          <circle cx="56" cy="67" r="0.5" fill="#5a3818"/>
          <circle cx="60" cy="69" r="0.5" fill="#5a3818"/>
          <circle cx="64" cy="67" r="0.5" fill="#5a3818"/>
          <circle cx="68" cy="68" r="0.5" fill="#5a3818"/>
          <circle cx="72" cy="67" r="0.5" fill="#5a3818"/>
        </g>

        {/* Mouth: slightly downturned, concerned */}
        <path d="M50 63 Q55 66 60 65 Q65 66 70 63" fill="none" stroke="#a07850" strokeWidth="1" strokeLinecap="round"/>

        {/* Ears */}
        <ellipse cx="34" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.6"/>
        <ellipse cx="86" cy="46" rx="4" ry="6" fill="#c49870" opacity="0.6"/>
      </g>

      {/* Matcha cup in hand */}
      <g>
        <path d="M88 100 Q100 96 102 84 Q103 78 100 74" fill="none" stroke="#d4a574" strokeWidth="5" strokeLinecap="round"/>
        <rect x="94" y="66" width="14" height="16" rx="3" fill="#e8e0d0" stroke="#ccc" strokeWidth="0.5"/>
        {/* Matcha green */}
        <rect x="95" y="68" width="12" height="8" rx="2" fill="#7ab648" opacity="0.6"/>
        {/* Handle */}
        <path d="M108 70 Q114 72 114 78 Q114 84 108 82" fill="none" stroke="#ccc" strokeWidth="1.5"/>
        {/* Steam */}
        <path d="M98 64 Q100 58 98 54" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.3"/>
        <path d="M103 64 Q105 56 103 52" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.2"/>
      </g>
    </svg>
  );
}
