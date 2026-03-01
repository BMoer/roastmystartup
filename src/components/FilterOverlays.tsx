'use client';

import { usePersona } from '@/context/PersonaContext';

export default function FilterOverlays() {
  const { mode } = usePersona();

  return (
    <>
      {/* VC LSD trip overlay */}
      <div
        id="filter-overlay-vc"
        aria-hidden="true"
        style={{ opacity: mode === 'vc' ? 1 : 0 }}
      />

      {/* Beamter desaturation + rain overlay */}
      <div
        id="filter-overlay-beamter"
        aria-hidden="true"
        style={{ opacity: mode === 'beamter' ? 1 : 0 }}
      >
        <div className="beamter-desat" />
        <div className="beamter-rain" />
      </div>
    </>
  );
}
