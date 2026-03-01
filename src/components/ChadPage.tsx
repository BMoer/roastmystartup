'use client';

import { usePersona } from '@/context/PersonaContext';
import AvatarChad from './AvatarChad';

export default function ChadPage() {
  const { roastData, setPhase } = usePersona();

  if (!roastData?.chad) return null;

  const { tooSmall, blowUp } = roastData.chad;

  return (
    <div className="chad-page">
      <div className="chad-page-inner">
        <div className="chad-page-avatar">
          <AvatarChad size={120} />
        </div>

        <h2 className="chad-page-intro">Here&apos;s the thing...</h2>

        <div className="chad-page-section chad-page-too-small">
          <h3 className="chad-page-label">Why this is too small</h3>
          <p className="chad-page-text">{tooSmall}</p>
        </div>

        <div className="chad-page-section chad-page-blow-up">
          <h3 className="chad-page-label">How to 10x this</h3>
          <div className="chad-page-glow-card">
            <p className="chad-page-text">{blowUp}</p>
          </div>
        </div>

        <button
          className="chad-page-continue"
          onClick={() => setPhase('share')}
        >
          Show me the results
        </button>
      </div>
    </div>
  );
}
