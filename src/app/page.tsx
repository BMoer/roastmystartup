'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AvatarVC from '@/components/AvatarVC';
import AvatarBeamter from '@/components/AvatarBeamter';

export default function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    let finalUrl = url.trim();
    if (!finalUrl) {
      setError('Bitte eine URL eingeben');
      return;
    }

    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    try {
      new URL(finalUrl);
    } catch {
      setError('Das sieht nicht nach einer gültigen URL aus');
      return;
    }

    router.push(`/roast?url=${encodeURIComponent(finalUrl)}`);
  }

  return (
    <main className="landing">
      <div className="landing-avatars">
        <div className="landing-avatar landing-avatar--vc">
          <AvatarVC size={100} />
        </div>
        <div className="landing-avatar landing-avatar--beamter">
          <AvatarBeamter size={100} />
        </div>
      </div>

      <h1 className="landing-title">
        Roast my Startup
      </h1>
      <p className="landing-subtitle">
        Zwei Perspektiven, die kein Startup hören will.<br />
        Ein VC-Bro und ein Wiener Grantler bewerten deine Website.
      </p>

      <form onSubmit={handleSubmit} className="url-form">
        <div className="url-input-wrap">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="startup-url.com"
            className="url-input"
            autoFocus
          />
          <button type="submit" className="url-submit">
            Roast it 🔥
          </button>
        </div>
        {error && <p className="url-error">{error}</p>}
      </form>

      <div className="landing-examples">
        <span className="landing-examples-label">Beispiele:</span>
        <button onClick={() => setUrl('https://linear.app')} className="example-chip">linear.app</button>
        <button onClick={() => setUrl('https://notion.so')} className="example-chip">notion.so</button>
        <button onClick={() => setUrl('https://vercel.com')} className="example-chip">vercel.com</button>
      </div>
    </main>
  );
}
