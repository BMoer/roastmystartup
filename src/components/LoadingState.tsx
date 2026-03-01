'use client';

import AvatarFranky from './AvatarFranky';
import AvatarPflichtner from './AvatarPflichtner';
import AvatarSabine from './AvatarSabine';
import AvatarFlorian from './AvatarFlorian';
import AvatarRenate from './AvatarRenate';

interface Props {
  stage: 'scraping' | 'generating' | 'done';
}

export default function LoadingState({ stage }: Props) {
  if (stage === 'done') return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-avatars">
          <div className="loading-avatar" style={{ animationDelay: '0s' }}>
            <AvatarFranky size={64} />
          </div>
          <div className="loading-avatar" style={{ animationDelay: '0.2s' }}>
            <AvatarPflichtner size={64} />
          </div>
          <div className="loading-avatar" style={{ animationDelay: '0.4s' }}>
            <AvatarSabine size={64} />
          </div>
          <div className="loading-avatar" style={{ animationDelay: '0.6s' }}>
            <AvatarFlorian size={64} />
          </div>
          <div className="loading-avatar" style={{ animationDelay: '0.8s' }}>
            <AvatarRenate size={64} />
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
