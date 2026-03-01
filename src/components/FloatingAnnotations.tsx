'use client';

import { usePersona } from '@/context/PersonaContext';

const POSITIONS = [
  { top: '8%', left: '3%', rot: -3, size: '16px' },
  { top: '30%', right: '2%', rot: 4, size: '18px' },
  { top: '55%', left: '5%', rot: -2, size: '15px' },
  { top: '75%', right: '4%', rot: 3, size: '17px' },
];

export default function FloatingAnnotations() {
  const { mode, roastData } = usePersona();

  if (!mode || !roastData) return null;

  const annotations = roastData[mode]?.floatingAnnotations || [];
  const stampText = mode === 'beamter' ? roastData.beamter.stampText : null;

  return (
    <div className="floating-annotations-layer">
      {annotations.map((text, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        return (
          <div
            key={`${mode}-${i}`}
            className={`annotation-overlay annotation-overlay--${mode}`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              '--ann-rot': `${pos.rot}deg`,
              '--ann-size': pos.size,
            } as React.CSSProperties}
          >
            {text}
          </div>
        );
      })}

      {stampText && mode === 'beamter' && (
        <div
          className="ann-stamp"
          style={{
            top: '45%',
            right: '10%',
            '--stamp-rot': '-12deg',
          } as React.CSSProperties}
        >
          {stampText}
        </div>
      )}
    </div>
  );
}
