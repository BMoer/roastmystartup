'use client';

import { useState, useEffect, useRef } from 'react';
import { usePersona } from '@/context/PersonaContext';
import AvatarVC from './AvatarVC';
import AvatarBeamter from './AvatarBeamter';

const COMMENT_INTERVAL = 6000;

interface Props {
  persona: 'vc' | 'beamter';
}

export default function CommentatorBar({ persona }: Props) {
  const { mode, setMode, roastData } = usePersona();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isVisible = mode === persona;
  const comments = roastData?.[persona]?.comments || [];

  // Rotate comments
  useEffect(() => {
    if (!isVisible || comments.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % comments.length);
        setIsFading(false);
      }, 400);
    }, COMMENT_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, comments.length]);

  // Reset index when mode changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFading(false);
  }, [mode]);

  if (comments.length === 0) return null;

  const Avatar = persona === 'vc' ? AvatarVC : AvatarBeamter;

  return (
    <div className={`persona-commentator persona-commentator--${persona} ${isVisible ? 'is-visible' : ''}`}>
      <div className="avatar-wrap">
        <Avatar size={60} />
      </div>
      <div className="speech-bubble">
        <span className={`speech-text ${isFading ? 'is-fading' : ''}`}>
          {comments[currentIndex]}
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
