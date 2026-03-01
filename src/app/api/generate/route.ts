import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PERSONA_SYSTEM_PROMPTS, buildRoastPrompt } from '@/lib/prompts';
import type { ScrapedContent, RoastData, PersonaId, PersonaRoast } from '@/types';

const anthropic = new Anthropic();

const PERSONA_IDS: PersonaId[] = ['franky', 'pflichtner', 'sabine', 'florian', 'renate', 'chad'];

function parseJSON(raw: string): unknown {
  let jsonStr = raw.trim();
  jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?\s*```\s*$/, '').trim();
  try { return JSON.parse(jsonStr); } catch { /* continue */ }

  let fixed = jsonStr.replace(/(?<=:\s*"(?:[^"\\]|\\.)*)(\n)(?=(?:[^"\\]|\\.)*")/g, '\\n');
  try { return JSON.parse(fixed); } catch { /* continue */ }

  fixed = jsonStr;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < fixed.length; i++) {
    if (escaped) { escaped = false; continue; }
    if (fixed[i] === '\\') { escaped = true; continue; }
    if (fixed[i] === '"') { inString = !inString; }
  }
  if (inString) {
    const lastGoodQuote = fixed.lastIndexOf('"');
    fixed = fixed.slice(0, lastGoodQuote) + '"';
  }
  fixed = fixed.replace(/,\s*$/, '');
  let braces = 0;
  let brackets = 0;
  for (const c of fixed) {
    if (c === '{') braces++;
    if (c === '}') braces--;
    if (c === '[') brackets++;
    if (c === ']') brackets--;
  }
  while (brackets > 0) { fixed += ']'; brackets--; }
  while (braces > 0) { fixed += '}'; braces--; }
  try { return JSON.parse(fixed); } catch { /* continue */ }

  throw new Error(`Failed to parse JSON: ${jsonStr.slice(0, 200)}...`);
}

const FALLBACK_ANNOTATION = '...';
const FALLBACK_SECTION_ROAST = { annotation: FALLBACK_ANNOTATION, comment: 'Kein Kommentar verfügbar.' };

function makeFallbackPersonaRoast(sectionIds: string[]): PersonaRoast {
  const sectionRoasts: Record<string, { annotation: string; comment: string }> = {};
  for (const id of sectionIds) {
    sectionRoasts[id] = FALLBACK_SECTION_ROAST;
  }
  return { sectionRoasts, shareQuote: 'Kein Kommentar.' };
}

export async function POST(request: NextRequest) {
  try {
    const { scrapedContent } = (await request.json()) as { scrapedContent: ScrapedContent };

    if (!scrapedContent?.url) {
      return NextResponse.json({ error: 'Missing scraped content' }, { status: 400 });
    }

    const userPrompt = buildRoastPrompt(scrapedContent);
    const sectionIds = scrapedContent.sections.map(s => s.id);

    // All 6 persona calls (Sonnet) in parallel
    const promises = PERSONA_IDS.map(personaId =>
      anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        system: PERSONA_SYSTEM_PROMPTS[personaId],
        messages: [{ role: 'user', content: userPrompt }],
      })
    );

    const results = await Promise.allSettled(promises);

    // Parse all persona results
    const roasts: Record<string, PersonaRoast> = {};
    for (let i = 0; i < PERSONA_IDS.length; i++) {
      const personaId = PERSONA_IDS[i];
      const result = results[i];

      if (result.status === 'fulfilled') {
        try {
          const textBlock = result.value.content.find(b => b.type === 'text');
          if (textBlock && textBlock.type === 'text') {
            const parsed = parseJSON(textBlock.text) as PersonaRoast;
            if (parsed.sectionRoasts) {
              roasts[personaId] = {
                sectionRoasts: parsed.sectionRoasts,
                shareQuote: parsed.shareQuote || 'Kein Kommentar zu diesem Startup.',
              };
              continue;
            } else {
              console.error(`${personaId} parsed but missing sectionRoasts. Keys:`, Object.keys(parsed));
            }
          } else {
            console.error(`${personaId} no text block. Content:`, result.value.content);
          }
        } catch (e) {
          console.error(`Failed to parse ${personaId} response:`, e);
        }
      } else {
        console.error(`${personaId} call failed:`, result.reason);
      }

      roasts[personaId] = makeFallbackPersonaRoast(sectionIds);
    }

    // Retry failed personas once with higher max_tokens
    const failedPersonas = PERSONA_IDS.filter(id => {
      const roast = roasts[id];
      if (!roast?.sectionRoasts) return true;
      const firstEntry = Object.values(roast.sectionRoasts)[0];
      return firstEntry?.annotation === FALLBACK_ANNOTATION;
    });

    if (failedPersonas.length > 0) {
      console.log(`Retrying ${failedPersonas.length} failed persona(s): ${failedPersonas.join(', ')}`);
      const retryPromises = failedPersonas.map(personaId =>
        anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 3500,
          system: PERSONA_SYSTEM_PROMPTS[personaId],
          messages: [{ role: 'user', content: userPrompt }],
        })
      );

      const retryResults = await Promise.allSettled(retryPromises);
      for (let i = 0; i < failedPersonas.length; i++) {
        const personaId = failedPersonas[i];
        const result = retryResults[i];
        if (result.status === 'fulfilled') {
          try {
            const textBlock = result.value.content.find(b => b.type === 'text');
            if (textBlock && textBlock.type === 'text') {
              const parsed = parseJSON(textBlock.text) as PersonaRoast;
              if (parsed.sectionRoasts) {
                roasts[personaId] = {
                  sectionRoasts: parsed.sectionRoasts,
                  shareQuote: parsed.shareQuote || 'Kein Kommentar zu diesem Startup.',
                };
                console.log(`Retry succeeded for ${personaId}`);
              }
            }
          } catch (e) {
            console.error(`Retry parse failed for ${personaId}:`, e);
          }
        } else {
          console.error(`Retry call failed for ${personaId}:`, result.reason);
        }
      }
    }

    const roastData: RoastData = {
      franky: roasts.franky,
      pflichtner: roasts.pflichtner,
      sabine: roasts.sabine,
      florian: roasts.florian,
      renate: roasts.renate,
      chad: roasts.chad,
    };

    return NextResponse.json(roastData);
  } catch (err) {
    console.error('Generate error:', err);
    const message = err instanceof Error ? err.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
