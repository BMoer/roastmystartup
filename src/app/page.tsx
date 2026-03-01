'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AVATAR_MAP } from '@/components/avatars';
import { AT_PERSONAS } from '@/types';
import type { ATPersonaId } from '@/types';

const PERSONA_BIOS: Record<ATPersonaId, string> = {
  franky: '52, Favoriten. Stammgast seit 25 Jahren. Kreuzbandriss statt Karriere.',
  pflichtner: '47, Ministerialrat. Doktorat in Jus. Sieht überall Rechtsgrundlagen-Probleme.',
  sabine: '44, Teamleiterin Controlling. 18 Jahre im selben Betrieb. Lebt in Excel.',
  florian: '34, Nachhaltigkeitsberater. 7. Bezirk. Hafer-Matcha und Schuldgefühle.',
  renate: '56, Gewerkschaftssekretärin GPA-djp. 32 Jahre Arbeitskampf.',
};

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
        {AT_PERSONAS.map((persona, i) => {
          const Avatar = AVATAR_MAP[persona.id];
          return (
            <div
              key={persona.id}
              className="landing-avatar"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <Avatar size={80} />
              <div className="landing-avatar-tooltip">
                <span className="landing-avatar-tooltip-name" style={{ color: persona.color }}>
                  {persona.name}
                </span>
                <span className="landing-avatar-tooltip-desc">
                  {PERSONA_BIOS[persona.id as ATPersonaId]}
                </span>
              </div>
            </div>
          );
        })}
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
