'use client';

import { useState, useCallback } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { AVATAR_MAP } from './avatars';
import { ALL_PERSONAS } from '@/types';
import type { PersonaId, ScrapedContent } from '@/types';

interface Props {
  scrapedContent: ScrapedContent | null;
}

export default function ShareScreen({ scrapedContent }: Props) {
  const { roastData } = usePersona();
  const [selectedId, setSelectedId] = useState<PersonaId | null>(null);

  const getShareQuote = (id: PersonaId): string => {
    if (!roastData) return '';
    return roastData[id]?.shareQuote || '';
  };

  const handleShareLinkedIn = useCallback(() => {
    const startupUrl = scrapedContent?.url || '';
    const shareText = `Mein Startup wurde geroasted! 🔥\n${startupUrl}\n\nroastmystartup.com — Austria Edition`;

    if (navigator.share) {
      navigator.share({
        title: 'Roast my Startup',
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    }
  }, [scrapedContent]);

  const handleDownloadPng = useCallback(async () => {
    const cardEl = document.getElementById('share-screen-card');
    if (!cardEl) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardEl, {
        backgroundColor: '#0e0d0b',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `roast-${scrapedContent?.title || 'startup'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate PNG:', err);
    }
  }, [scrapedContent]);

  if (!roastData) return null;

  const title = scrapedContent?.title || 'Startup';
  const logoUrl = scrapedContent?.logoUrl;

  return (
    <div className="share-screen">
      <div className="share-screen-inner">
        <h2 className="share-screen-title">W&auml;hle deine Lieblingsperspektive</h2>
        <p className="share-screen-subtitle">Wer hat den besten Roast geliefert?</p>

        {/* Persona grid */}
        <div className="share-persona-grid">
          {ALL_PERSONAS.map(meta => {
            const Avatar = AVATAR_MAP[meta.id];
            const isSelected = selectedId === meta.id;
            return (
              <button
                key={meta.id}
                className={`share-persona-card ${isSelected ? 'is-selected' : ''}`}
                style={{
                  borderColor: isSelected ? meta.color : undefined,
                  boxShadow: isSelected ? `0 0 20px rgba(${meta.colorRgb}, 0.3)` : undefined,
                }}
                onClick={() => setSelectedId(meta.id)}
              >
                <Avatar size={56} />
                <span className="share-persona-name" style={{ color: meta.color }}>{meta.name}</span>
                <span className="share-persona-title">{meta.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected persona quote card */}
        {selectedId && (
          <div className="share-quote-section" id="share-screen-card">
            <div className="share-quote-card" style={{
              borderColor: ALL_PERSONAS.find(p => p.id === selectedId)!.color,
            }}>
              {/* Header */}
              <div className="share-quote-header">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt=""
                    className="share-quote-logo"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <div>
                  <h3 className="share-quote-startup">{title}</h3>
                  {scrapedContent?.url && (
                    <p className="share-quote-url">{scrapedContent.url}</p>
                  )}
                  <p className="share-quote-label">wurde geroasted!</p>
                </div>
              </div>

              {/* Quote */}
              <div className="share-quote-body">
                {(() => {
                  const Avatar = AVATAR_MAP[selectedId];
                  const meta = ALL_PERSONAS.find(p => p.id === selectedId)!;
                  return (
                    <>
                      <Avatar size={48} />
                      <div>
                        <span className="share-quote-persona" style={{ color: meta.color }}>
                          {meta.name} &mdash; {meta.title}
                        </span>
                        <p className="share-quote-text" style={{ color: meta.color }}>
                          &ldquo;{getShareQuote(selectedId)}&rdquo;
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="share-quote-branding">roastmystartup.com &mdash; Austria Edition</div>
            </div>

            {/* Action buttons */}
            <div className="share-actions">
              <button className="share-btn share-btn--linkedin" onClick={handleShareLinkedIn}>
                Share on LinkedIn
              </button>
              <button className="share-btn share-btn--download" onClick={handleDownloadPng}>
                Download for Instagram
              </button>
            </div>
          </div>
        )}

        {/* Back to start */}
        <a href="/" className="share-back">Neue URL roasten</a>
      </div>
    </div>
  );
}
