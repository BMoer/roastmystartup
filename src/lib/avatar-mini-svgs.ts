/**
 * Minimal head-only SVG strings for each persona.
 * Used inside the iframe bridge script where React components are not available.
 */
import type { PersonaId } from '@/types';

export const AVATAR_MINI_SVGS: Record<PersonaId, string> = {
  franky: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 100" width="28" height="28" style="flex-shrink:0">
<ellipse cx="60" cy="46" rx="25" ry="28" fill="#c49870"/>
<path d="M34 40 Q30 20 42 14 Q50 10 60 12 Q70 10 78 14 Q90 20 86 40" fill="#c8c0b0" stroke="#a8a090" stroke-width="0.5"/>
<path d="M34 38 Q28 32 26 24" fill="none" stroke="#c8c0b0" stroke-width="3" stroke-linecap="round"/>
<path d="M86 38 Q92 32 94 24" fill="none" stroke="#c8c0b0" stroke-width="3" stroke-linecap="round"/>
<path d="M37 37 Q42 33 53 37" fill="none" stroke="#a09888" stroke-width="2.5" stroke-linecap="round"/>
<path d="M67 37 Q78 33 83 37" fill="none" stroke="#a09888" stroke-width="2.5" stroke-linecap="round"/>
<ellipse cx="46" cy="43" rx="4" ry="2.2" fill="#fff"/><circle cx="47" cy="43" r="2" fill="#5a6a5a"/>
<ellipse cx="74" cy="43" rx="4" ry="2.2" fill="#fff"/><circle cx="73" cy="43" r="2" fill="#5a6a5a"/>
<path d="M42 62 Q46 58 54 60 Q57 61 60 61 Q63 61 66 60 Q74 58 78 62 Q76 67 72 70 Q68 72 64 70 Q62 68 60 68 Q58 68 56 70 Q52 72 48 70 Q44 67 42 62 Z" fill="#b8b0a0"/>
</svg>`,

  pflichtner: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 100" width="28" height="28" style="flex-shrink:0">
<ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>
<path d="M38 36 Q38 16 60 14 Q82 16 82 36 Q78 24 60 22 Q42 24 38 36 Z" fill="#4a3828"/>
<rect x="37" y="38" width="18" height="12" rx="2" fill="none" stroke="#333" stroke-width="1.5"/>
<rect x="65" y="38" width="18" height="12" rx="2" fill="none" stroke="#333" stroke-width="1.5"/>
<line x1="55" y1="44" x2="65" y2="44" stroke="#333" stroke-width="1"/>
<ellipse cx="46" cy="44" rx="3" ry="2" fill="#fff"/><circle cx="46" cy="44" r="1.5" fill="#3a4a5a"/>
<ellipse cx="74" cy="44" rx="3" ry="2" fill="#fff"/><circle cx="74" cy="44" r="1.5" fill="#3a4a5a"/>
<path d="M50 63 Q55 65 60 65 Q65 65 70 63" fill="none" stroke="#8a6848" stroke-width="1.2" stroke-linecap="round"/>
</svg>`,

  sabine: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 100" width="28" height="28" style="flex-shrink:0">
<ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>
<path d="M34 40 Q32 14 60 10 Q88 14 86 40 Q84 20 60 16 Q36 20 34 40 Z" fill="#6a4428"/>
<path d="M34 40 L32 58 Q33 62 36 60 L36 42" fill="#6a4428"/>
<path d="M86 40 L88 58 Q87 62 84 60 L84 42" fill="#6a4428"/>
<ellipse cx="46" cy="44" rx="4" ry="2.5" fill="#fff"/><circle cx="47" cy="44" r="2" fill="#5a7a5a"/>
<ellipse cx="74" cy="44" rx="4" ry="2.5" fill="#fff"/><circle cx="73" cy="44" r="2" fill="#5a7a5a"/>
<path d="M50 62 Q55 66 60 66 Q65 66 70 62" fill="none" stroke="#a07850" stroke-width="1" stroke-linecap="round"/>
<circle cx="33" cy="54" r="2" fill="#c8a840" opacity="0.6"/>
<circle cx="87" cy="54" r="2" fill="#c8a840" opacity="0.6"/>
</svg>`,

  florian: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 100" width="28" height="28" style="flex-shrink:0">
<ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>
<path d="M36 38 Q36 18 60 14 Q84 18 84 38 Q80 22 60 20 Q40 22 36 38 Z" fill="#5a3818"/>
<ellipse cx="60" cy="10" rx="10" ry="8" fill="#5a3818"/>
<rect x="54" y="15" width="12" height="3" rx="1.5" fill="#2a6a2a" opacity="0.7"/>
<ellipse cx="46" cy="44" rx="4.5" ry="3" fill="#fff"/><circle cx="46" cy="44" r="2.5" fill="#5a7a4a"/>
<ellipse cx="74" cy="44" rx="4.5" ry="3" fill="#fff"/><circle cx="74" cy="44" r="2.5" fill="#5a7a4a"/>
<path d="M50 63 Q55 66 60 65 Q65 66 70 63" fill="none" stroke="#a07850" stroke-width="1" stroke-linecap="round"/>
</svg>`,

  renate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 100" width="28" height="28" style="flex-shrink:0">
<ellipse cx="60" cy="46" rx="24" ry="28" fill="#d4a574"/>
<path d="M34 38 Q32 14 60 10 Q88 14 86 38 Q82 18 60 16 Q38 18 34 38 Z" fill="#8a6848"/>
<path d="M34 38 Q30 32 32 24" fill="none" stroke="#8a6848" stroke-width="3" stroke-linecap="round"/>
<path d="M86 38 Q90 32 88 24" fill="none" stroke="#8a6848" stroke-width="3" stroke-linecap="round"/>
<path d="M38 28 Q44 20 52 18" fill="none" stroke="#b0a090" stroke-width="1.5" opacity="0.4"/>
<ellipse cx="46" cy="43" rx="4.5" ry="2.8" fill="#fff"/><circle cx="46" cy="43" r="2.2" fill="#4a3a2a"/>
<ellipse cx="74" cy="43" rx="4.5" ry="2.8" fill="#fff"/><circle cx="74" cy="43" r="2.2" fill="#4a3a2a"/>
<path d="M48 62 Q54 68 60 68 Q66 68 72 62" fill="none" stroke="#a07850" stroke-width="1.2" stroke-linecap="round"/>
<circle cx="33" cy="54" r="1.5" fill="#c8a840" opacity="0.5"/>
<circle cx="87" cy="54" r="1.5" fill="#c8a840" opacity="0.5"/>
</svg>`,

  chad: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 100 100" width="28" height="28" style="flex-shrink:0">
<ellipse cx="60" cy="48" rx="24" ry="28" fill="#d4a574"/>
<path d="M36 42 Q36 15 60 12 Q84 15 84 42 Q80 30 60 28 Q40 30 36 42 Z" fill="#1a0a00"/>
<rect x="54" y="40" width="12" height="3" rx="1" fill="#111"/>
<rect x="37" y="36" width="20" height="14" rx="4" fill="#111" stroke="#333" stroke-width="1"/>
<rect x="63" y="36" width="20" height="14" rx="4" fill="#111" stroke="#333" stroke-width="1"/>
<polyline points="67,46 72,46 75,44 78,38" fill="none" stroke="#00E5FF" stroke-width="1.5" opacity="0.8"/>
<polyline points="41,46 46,46 49,44 52,38" fill="none" stroke="#00E5FF" stroke-width="1.5" opacity="0.8"/>
<path d="M44 58 Q52 68 60 68 Q68 68 76 58" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
<path d="M47 60 Q53 66 60 66 Q67 66 73 60" fill="#fff" opacity="0.9"/>
<ellipse cx="34" cy="50" rx="3" ry="5" fill="#e8e8e8" stroke="#ccc" stroke-width="0.5"/>
<ellipse cx="86" cy="50" rx="3" ry="5" fill="#e8e8e8" stroke="#ccc" stroke-width="0.5"/>
</svg>`,
};
