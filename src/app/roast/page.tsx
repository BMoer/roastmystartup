'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { usePersona } from '@/context/PersonaContext';
import RoastFrame from '@/components/RoastFrame';
import FilterOverlays from '@/components/FilterOverlays';
import FloatingAnnotations from '@/components/FloatingAnnotations';
import PersonaToggle from '@/components/PersonaToggle';
import CommentatorBar from '@/components/CommentatorBar';
import LoadingState from '@/components/LoadingState';
import type { ScrapedContent } from '@/types';

function RoastContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const { setRoastData, setIsLoading, roastData } = usePersona();
  const [stage, setStage] = useState<'scraping' | 'generating' | 'done'>('scraping');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    async function loadRoast() {
      try {
        // Step 1: Scrape
        setStage('scraping');
        setIsLoading(true);

        const scrapeRes = await fetch('/api/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!scrapeRes.ok) {
          throw new Error('Scraping fehlgeschlagen');
        }

        const scrapedContent: ScrapedContent = await scrapeRes.json();
        if (cancelled) return;

        // Step 2: Generate
        setStage('generating');

        const genRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scrapedContent }),
        });

        if (!genRes.ok) {
          throw new Error('Roast-Generierung fehlgeschlagen');
        }

        const roastData = await genRes.json();
        if (cancelled) return;

        setRoastData(roastData);
        setStage('done');
        setIsLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen');
          setIsLoading(false);
        }
      }
    }

    loadRoast();

    return () => { cancelled = true; };
  }, [url, setRoastData, setIsLoading]);

  if (!url) {
    return (
      <div className="roast-error-page">
        <h1>Keine URL angegeben</h1>
        <a href="/" className="back-link">Zurück zur Startseite</a>
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
        <RoastFrame url={url} />
        <FloatingAnnotations />
        <FilterOverlays />
      </div>

      {/* Persona UI */}
      <PersonaToggle />
      <CommentatorBar persona="vc" />
      <CommentatorBar persona="beamter" />

      {/* Loading overlay */}
      {!roastData && <LoadingState stage={stage} />}
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
