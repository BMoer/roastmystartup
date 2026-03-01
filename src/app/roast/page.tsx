'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { usePersona } from '@/context/PersonaContext';
import RoastFrame from '@/components/RoastFrame';
import ShareScreen from '@/components/ShareScreen';
import LoadingState from '@/components/LoadingState';
import type { ScrapedContent } from '@/types';

function RoastContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const { phase, setPhase, setRoastData, setIsLoading, roastData } = usePersona();
  const [stage, setStage] = useState<'scraping' | 'generating' | 'done'>('scraping');
  const [error, setError] = useState('');
  const [scrapedContent, setScrapedContent] = useState<ScrapedContent | null>(null);
  const [visibleSectionId, setVisibleSectionId] = useState<string | null>(null);

  const handleSectionVisible = useCallback((sectionId: string) => {
    setVisibleSectionId(sectionId);
  }, []);

  const handleReachedBottom = useCallback(() => {
    if (roastData) {
      setPhase('share');
    }
  }, [roastData, setPhase]);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    async function loadRoast() {
      try {
        // Step 1: Scrape
        setStage('scraping');
        setIsLoading(true);
        setPhase('loading');

        const scrapeRes = await fetch('/api/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!scrapeRes.ok) {
          throw new Error('Scraping fehlgeschlagen');
        }

        const scraped: ScrapedContent = await scrapeRes.json();
        if (cancelled) return;
        setScrapedContent(scraped);

        // Step 2: Generate
        setStage('generating');

        const genRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scrapedContent: scraped }),
        });

        if (!genRes.ok) {
          throw new Error('Roast-Generierung fehlgeschlagen');
        }

        const roastData = await genRes.json();
        if (cancelled) return;

        setRoastData(roastData);
        setStage('done');
        setIsLoading(false);
        setPhase('website');
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen');
          setIsLoading(false);
        }
      }
    }

    loadRoast();

    return () => { cancelled = true; };
  }, [url, setRoastData, setIsLoading, setPhase]);

  if (!url) {
    return (
      <div className="roast-error-page">
        <h1>Keine URL angegeben</h1>
        <a href="/" className="back-link">Zur&uuml;ck zur Startseite</a>
      </div>
    );
  }

  if (error) {
    return (
      <div className="roast-error-page">
        <h1>Fehler</h1>
        <p>{error}</p>
        <a href="/" className="back-link">Neue URL eingeben</a>
      </div>
    );
  }

  // Phase: Share screen
  if (phase === 'share') {
    return <ShareScreen scrapedContent={scrapedContent} />;
  }

  // Phase: loading or website (with iframe)
  return (
    <div className="roast-container">
      {/* URL bar */}
      <div className="roast-topbar">
        <a href="/" className="topbar-logo">Roast my Startup</a>
        <div className="topbar-url">{url}</div>
        <a href="/" className="topbar-new">Neue URL</a>
      </div>

      {/* Main content */}
      <div className="roast-main">
        <RoastFrame
          url={url}
          scrapedContent={scrapedContent}
          onSectionVisible={handleSectionVisible}
          onReachedBottom={handleReachedBottom}
        />
      </div>

      {/* Loading overlay */}
      {phase === 'loading' && <LoadingState stage={stage} />}
    </div>
  );
}

export default function RoastPage() {
  return (
    <Suspense fallback={<div className="loading-overlay"><div className="loading-spinner" /></div>}>
      <RoastContent />
    </Suspense>
  );
}
