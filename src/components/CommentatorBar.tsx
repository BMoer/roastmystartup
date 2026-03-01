'use client';

import { useState, useEffect, useRef } from 'react';
import { usePersona } from '@/context/PersonaContext';
import AvatarVC from './AvatarVC';
import AvatarBeamter from './AvatarBeamter';

interface Props {
  persona: 'vc' | 'beamter';
  visibleSectionId: string | null;
}

export default function CommentatorBar({ persona, visibleSectionId }: Props) {
  const { mode, setMode, roastData } = usePersona();
  const [displayedComment, setDisplayedComment] = useState('');
  const [isFading, setIsFading] = useState(false);
  const prevSectionRef = useRef<string | null>(null);

  const isVisible = mode === persona;
  const sectionRoasts = roastData?.[persona]?.sectionRoasts;

  // Update comment when visible section changes
  useEffect(() => {
    if (!isVisible || !sectionRoasts) return;

    // Determine which comment to show
    let comment = '';
    if (visibleSectionId && sectionRoasts[visibleSectionId]) {
      comment = sectionRoasts[visibleSectionId].comment;
    } else {
      // Fallback: first section's comment
      const firstKey = Object.keys(sectionRoasts)[0];
      if (firstKey) {
        comment = sectionRoasts[firstKey].comment;
      }
    }

    if (!comment) return;

    // If the section changed, fade transition
    if (prevSectionRef.current !== visibleSectionId && prevSectionRef.current !== null) {
      setIsFading(true);
      const timeout = setTimeout(() => {
        setDisplayedComment(comment);
        setIsFading(false);
      }, 400);
      prevSectionRef.current = visibleSectionId;
      return () => clearTimeout(timeout);
    } else {
      setDisplayedComment(comment);
      prevSectionRef.current = visibleSectionId;
    }
  }, [isVisible, visibleSectionId, sectionRoasts]);

  // Reset when mode changes
  useEffect(() => {
    prevSectionRef.current = null;
    setIsFading(false);
  }, [mode]);

  if (!displayedComment) return null;

  const Avatar = persona === 'vc' ? AvatarVC : AvatarBeamter;

  return (
    <div className={`persona-commentator persona-commentator--${persona} ${isVisible ? 'is-visible' : ''}`}>
      <div className="avatar-wrap">
        <Avatar size={60} />
      </div>
      <div className="speech-bubble">
        <span className={`speech-text ${isFading ? 'is-fading' : ''}`}>
          {displayedComment}
        </span>
      </div>
      <button
        className="commentator-close"
        aria-label="Modus beenden"
        title="Neutral"
        onClick={() => setMode('')}
      >
        &times;
      </button>
    </div>
  );
}
