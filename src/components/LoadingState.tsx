'use client';

import AvatarVC from './AvatarVC';
import AvatarBeamter from './AvatarBeamter';

interface Props {
  stage: 'scraping' | 'generating' | 'done';
}

export default function LoadingState({ stage }: Props) {
  if (stage === 'done') return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-avatars">
          <div className="loading-avatar loading-avatar--vc">
            <AvatarVC size={80} />
          </div>
          <div className="loading-avatar loading-avatar--beamter">
            <AvatarBeamter size={80} />
          </div>
        </div>
        <div className="loading-text">
          {stage === 'scraping' && (
            <>
              <div className="loading-spinner" />
              <p>Website wird analysiert...</p>
            </>
          )}
          {stage === 'generating' && (
            <>
              <div className="loading-spinner" />
              <p>Roast wird generiert...</p>
              <p className="loading-sub">Die Personas lesen sich ein</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
