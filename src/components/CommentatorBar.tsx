'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { AVATAR_MAP } from './avatars';
import { AT_PERSONAS } from '@/types';
import type { ATPersonaId } from '@/types';

const AT_IDS: ATPersonaId[] = ['franky', 'pflichtner', 'sabine', 'florian', 'renate'];
const CYCLE_INTERVAL = 5000;

interface Props {
  visibleSectionId: string | null;
}

export default function CommentatorBar({ visibleSectionId }: Props) {
  const { roastData } = usePersona();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const prevSectionRef = useRef<string | null>(null);
  const cycleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get comments for current section from all AT personas
  const comments = AT_IDS.map(id => {
    const persona = roastData?.[id];
    if (!persona?.sectionRoasts) return null;
    if (visibleSectionId && persona.sectionRoasts[visibleSectionId]) {
      return persona.sectionRoasts[visibleSectionId].comment;
    }
    // Fallback: first section
    const firstKey = Object.keys(persona.sectionRoasts)[0];
    return firstKey ? persona.sectionRoasts[firstKey].comment : null;
  });

  const hasAnyComment = comments.some(c => !!c);

  // Reset to first persona when section changes
  useEffect(() => {
    if (prevSectionRef.current !== visibleSectionId && prevSectionRef.current !== null) {
      setIsFading(true);
      const timeout = setTimeout(() => {
        setActiveIndex(0);
        setIsFading(false);
      }, 300);
      prevSectionRef.current = visibleSectionId;
      return () => clearTimeout(timeout);
    }
    prevSectionRef.current = visibleSectionId;
  }, [visibleSectionId]);

  // Auto-cycle through personas
  useEffect(() => {
    if (!hasAnyComment) return;

    if (cycleTimer.current) clearInterval(cycleTimer.current);
    cycleTimer.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % AT_IDS.length);
        setIsFading(false);
      }, 300);
    }, CYCLE_INTERVAL);

    return () => {
      if (cycleTimer.current) clearInterval(cycleTimer.current);
    };
  }, [hasAnyComment, visibleSectionId]);

  const switchTo = useCallback((idx: number) => {
    if (idx === activeIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsFading(false);
    }, 200);
    // Reset cycle timer
    if (cycleTimer.current) clearInterval(cycleTimer.current);
    cycleTimer.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % AT_IDS.length);
        setIsFading(false);
      }, 300);
    }, CYCLE_INTERVAL);
  }, [activeIndex]);

  if (!roastData || !hasAnyComment) return null;

  const currentId = AT_IDS[activeIndex];
  const meta = AT_PERSONAS.find(p => p.id === currentId)!;
  const Avatar = AVATAR_MAP[currentId];
  const comment = comments[activeIndex] || '';

  return (
    <div className="persona-commentator is-visible" style={{ borderTopColor: `rgba(${meta.colorRgb}, 0.3)` }}>
      <div className="avatar-wrap">
        <Avatar size={60} />
      </div>
      <div className="commentator-content">
        <div className="commentator-meta">
          <span className="commentator-name" style={{ color: meta.color }}>{meta.name}</span>
          <span className="commentator-title">{meta.title}</span>
        </div>
        <div className="speech-bubble" style={{
          background: `rgba(${meta.colorRgb}, 0.06)`,
          borderColor: `rgba(${meta.colorRgb}, 0.15)`,
          color: meta.color,
        }}>
          <span className={`speech-text ${isFading ? 'is-fading' : ''}`}>
            {comment}
          </span>
        </div>
      </div>
      <div className="commentator-dots">
        {AT_IDS.map((id, idx) => {
          const pMeta = AT_PERSONAS.find(p => p.id === id)!;
          return (
            <button
              key={id}
              className={`commentator-dot ${idx === activeIndex ? 'is-active' : ''}`}
              style={{ background: idx === activeIndex ? pMeta.color : undefined }}
              onClick={() => switchTo(idx)}
              aria-label={pMeta.name}
              title={pMeta.name}
            />
          );
        })}
      </div>
    </div>
  );
}
