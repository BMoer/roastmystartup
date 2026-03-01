'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import AvatarVC from './AvatarVC';
import AvatarBeamter from './AvatarBeamter';
import type { PersonaMode } from '@/types';

const PROMPT_DELAY = 3000;
const STORAGE_PROMPTED = 'roast-prompted';

export default function PersonaToggle() {
  const { mode, setMode, roastData } = usePersona();
  const [showBubbles, setShowBubbles] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  // Show persona bubbles after delay (only once)
  useEffect(() => {
    if (!roastData) return;

    const wasPrompted = localStorage.getItem(STORAGE_PROMPTED) === '1';

    if (wasPrompted || mode) {
      setShowToggle(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowBubbles(true);
    }, PROMPT_DELAY);

    return () => clearTimeout(timer);
  }, [roastData, mode]);

  function pickMode(m: PersonaMode) {
    setMode(m);
    setShowBubbles(false);
    setShowToggle(true);
    localStorage.setItem(STORAGE_PROMPTED, '1');
  }

  function dismissBubbles() {
    setShowBubbles(false);
    setShowToggle(true);
    localStorage.setItem(STORAGE_PROMPTED, '1');
  }

  if (!roastData) return null;

  return (
    <>
      {/* Persona speech bubbles */}
      <div
        className={`persona-bubble persona-bubble--vc ${showBubbles ? 'is-visible' : 'is-hidden'}`}
        onClick={() => pickMode('vc')}
        role="button"
        tabIndex={0}
      >
        <button className="persona-bubble-dismiss" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); dismissBubbles(); }}>&times;</button>
        <div className="persona-bubble-avatar">
          <AvatarVC size={70} />
        </div>
        <span className="persona-bubble-label">VC Hype</span>
        <span className="persona-bubble-teaser">&ldquo;Das wird RIESIG!&rdquo;</span>
      </div>

      <div
        className={`persona-bubble persona-bubble--beamter ${showBubbles ? 'is-visible' : 'is-hidden'}`}
        onClick={() => pickMode('beamter')}
        role="button"
        tabIndex={0}
      >
        <button className="persona-bubble-dismiss" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); dismissBubbles(); }}>&times;</button>
        <div className="persona-bubble-avatar">
          <AvatarBeamter size={70} />
        </div>
        <span className="persona-bubble-label">Grantler</span>
        <span className="persona-bubble-teaser">&ldquo;Des interessiert eh kan.&rdquo;</span>
      </div>

      {/* Mini toggle bar */}
      <div className={`annotation-mini-toggle ${showToggle ? 'is-visible' : ''}`}>
        <button
          className={`amt-btn ${mode === '' ? 'is-active' : ''}`}
          data-mode=""
          onClick={() => pickMode('')}
          aria-label="Neutral"
          title="Neutral"
        >—</button>
        <button
          className={`amt-btn ${mode === 'vc' ? 'is-active' : ''}`}
          data-mode="vc"
          onClick={() => pickMode('vc')}
          aria-label="VC Hype"
          title="VC Hype"
        >🚀</button>
        <button
          className={`amt-btn ${mode === 'beamter' ? 'is-active' : ''}`}
          data-mode="beamter"
          onClick={() => pickMode('beamter')}
          aria-label="Grantler"
          title="Grantler"
        >📋</button>
      </div>
    </>
  );
}
