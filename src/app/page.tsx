'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AvatarFranky from '@/components/AvatarFranky';
import AvatarPflichtner from '@/components/AvatarPflichtner';
import AvatarSabine from '@/components/AvatarSabine';
import AvatarFlorian from '@/components/AvatarFlorian';
import AvatarRenate from '@/components/AvatarRenate';

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
      setError('Das sieht nicht nach einer g\u00fcltigen URL aus');
      return;
    }

    router.push(`/roast?url=${encodeURIComponent(finalUrl)}`);
  }

  return (
    <main className="landing">
      <div className="landing-avatars">
        <div className="landing-avatar" style={{ animationDelay: '0s' }}>
          <AvatarFranky size={80} />
        </div>
        <div className="landing-avatar" style={{ animationDelay: '0.3s' }}>
          <AvatarPflichtner size={80} />
        </div>
        <div className="landing-avatar" style={{ animationDelay: '0.6s' }}>
          <AvatarSabine size={80} />
        </div>
        <div className="landing-avatar" style={{ animationDelay: '0.9s' }}>
          <AvatarFlorian size={80} />
        </div>
        <div className="landing-avatar" style={{ animationDelay: '1.2s' }}>
          <AvatarRenate size={80} />
        </div>
      </div>

      <h1 className="landing-title">
        Roast my Startup
      </h1>
      <p className="landing-edition">Austria Edition</p>
      <p className="landing-subtitle">
        F&uuml;nf &ouml;sterreichische Archetypen + ein Silicon-Valley-VC-Bro bewerten deine Website.
        <br />
        Finde heraus, was &Ouml;sterreich wirklich von deiner Idee h&auml;lt.
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
            Roast it
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
