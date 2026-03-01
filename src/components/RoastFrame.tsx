'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { AT_PERSONAS } from '@/types';
import type { ScrapedContent, ATPersonaId } from '@/types';

interface Props {
  url: string;
  scrapedContent: ScrapedContent | null;
  onSectionVisible: (sectionId: string) => void;
  onReachedBottom: () => void;
}

export default function RoastFrame({ url, scrapedContent, onSectionVisible, onReachedBottom }: Props) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const bridgeReady = useRef(false);
  const pendingInit = useRef(false);
  const { roastData } = usePersona();

  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

  // Build persona color map from AT_PERSONAS
  const personaColors: Record<string, string> = {};
  for (const p of AT_PERSONAS) {
    personaColors[p.id] = p.color;
  }

  // Build AT-only roast data (exclude chad)
  const atRoastData = roastData ? {
    franky: roastData.franky,
    pflichtner: roastData.pflichtner,
    sabine: roastData.sabine,
    florian: roastData.florian,
    renate: roastData.renate,
  } : null;

  const sendInit = useCallback(() => {
    if (!bridgeReady.current || !atRoastData || !scrapedContent) {
      pendingInit.current = true;
      return;
    }
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const sectionIds = scrapedContent.sections.map(s => s.id);
    iframe.contentWindow.postMessage({
      type: 'roast-init',
      sectionIds,
      atRoastData,
      personaColors,
    }, '*');
    pendingInit.current = false;
  }, [roastData, scrapedContent]); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for bridge messages
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      const msg = e.data;
      if (!msg || !msg.type) return;

      if (msg.type === 'roast-bridge-loaded') {
        bridgeReady.current = true;
        if (pendingInit.current || roastData) {
          sendInit();
        }
      }

      if (msg.type === 'roast-section-visible' && msg.sectionId) {
        onSectionVisible(msg.sectionId);
      }

      if (msg.type === 'roast-reached-bottom') {
        onReachedBottom();
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [sendInit, onSectionVisible, onReachedBottom, roastData]);

  // Re-send init when roastData or scrapedContent becomes available
  useEffect(() => {
    if (roastData && scrapedContent && bridgeReady.current) {
      sendInit();
    }
  }, [roastData, scrapedContent, sendInit]);

  return (
    <div className="roast-frame">
      {isLoading && (
        <div className="frame-loading">
          <div className="frame-loading-spinner" />
          <span>Website wird geladen...</span>
        </div>
      )}

      {hasError && (
        <div className="frame-error">
          <p>Website konnte nicht geladen werden.</p>
          <p className="frame-error-detail">Manche Websites blockieren das Einbetten. Versuch eine andere URL.</p>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={proxyUrl}
        className="roast-iframe"
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setIsLoading(false)}
        onError={() => { setIsLoading(false); setHasError(true); }}
        title="Startup Website"
        style={{ display: hasError ? 'none' : 'block' }}
      />
    </div>
  );
}
