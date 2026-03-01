'use client';

import { usePersona } from '@/context/PersonaContext';
import AvatarChad from './AvatarChad';

interface Props {
  visible: boolean;
}

export default function ChadTransition({ visible }: Props) {
  const { setPhase } = usePersona();

  return (
    <div className={`chad-transition ${visible ? 'is-visible' : ''}`}>
      <div className="chad-transition-backdrop" />
      <div className="chad-transition-content">
        <div className="chad-transition-avatar">
          <AvatarChad size={80} />
        </div>
        <div className="chad-transition-text">
          <p className="chad-transition-whisper">Psst... hey...</p>
          <p className="chad-transition-pitch">
            Klingt m&uuml;hsam, oder? Die ganzen Bedenken, Paragraphen, Prozesse...
            <br />
            Willst du raus aus dieser Kleingeistigkeit?
          </p>
        </div>
        <button
          className="chad-transition-btn"
          onClick={() => setPhase('chad')}
        >
          Ja, nimm mich mit
        </button>
      </div>
    </div>
  );
}
