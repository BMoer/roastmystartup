'use client';

import { useCallback } from 'react';
import { usePersona } from '@/context/PersonaContext';
import AvatarVC from './AvatarVC';
import AvatarBeamter from './AvatarBeamter';
import type { ScrapedContent } from '@/types';

interface Props {
  scrapedContent: ScrapedContent | null;
  visible: boolean;
}

export default function ShareCard({ scrapedContent, visible }: Props) {
  const { roastData } = usePersona();

  const handleShareLinkedIn = useCallback(() => {
    const shareUrl = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  }, []);

  const handleDownloadPng = useCallback(async () => {
    const cardEl = document.getElementById('share-card-content');
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

  if (!visible || !roastData) return null;

  const title = scrapedContent?.title || 'Startup';
  const logoUrl = scrapedContent?.logoUrl;

  return (
    <div className="share-card-overlay">
      <div className="share-card" id="share-card-content">
        {/* Header with logo + title */}
        <div className="share-card-header">
          {logoUrl && (
            <img
              src={logoUrl}
              alt=""
              className="share-card-logo"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <h2 className="share-card-title">{title}</h2>
          <p className="share-card-subtitle">wurde geroasted!</p>
        </div>

        {/* VC quote */}
        <div className="share-card-quote share-card-quote--vc">
          <div className="share-card-avatar">
            <AvatarVC size={48} />
          </div>
          <p>{roastData.vc.shareQuote}</p>
        </div>

        {/* Beamter quote */}
        <div className="share-card-quote share-card-quote--beamter">
          <div className="share-card-avatar">
            <AvatarBeamter size={48} />
          </div>
          <p>{roastData.beamter.shareQuote}</p>
        </div>

        <div className="share-card-branding">roastmystartup.com</div>
      </div>

      {/* Buttons outside the card for PNG capture */}
      <div className="share-card-actions">
        <button className="share-btn share-btn--linkedin" onClick={handleShareLinkedIn}>
          Share on LinkedIn
        </button>
        <button className="share-btn share-btn--download" onClick={handleDownloadPng}>
          Download for Instagram
        </button>
      </div>
    </div>
  );
}
