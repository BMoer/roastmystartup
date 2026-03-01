'use client';

import { useState } from 'react';

interface Props {
  url: string;
}

export default function RoastFrame({ url }: Props) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

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
