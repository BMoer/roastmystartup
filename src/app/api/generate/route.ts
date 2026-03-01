import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { AT_SYSTEM_PROMPTS, CHAD_SYSTEM_PROMPT, buildRoastPrompt, buildChadPrompt } from '@/lib/prompts';
import type { ScrapedContent, RoastData, ATPersonaId, PersonaRoast, ChadRoast } from '@/types';

const anthropic = new Anthropic();

const AT_PERSONA_IDS: ATPersonaId[] = ['franky', 'pflichtner', 'sabine', 'florian', 'renate'];

function parseJSON(raw: string): unknown {
  let jsonStr = raw.trim();
  // Strip markdown code fences (could appear at start and/or end)
  jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?\s*```\s*$/, '').trim();
  // Attempt 1: direct parse
  try { return JSON.parse(jsonStr); } catch { /* continue */ }

  // Attempt 2: fix unescaped newlines inside string values
  let fixed = jsonStr.replace(/(?<=:\s*"(?:[^"\\]|\\.)*)(\n)(?=(?:[^"\\]|\\.)*")/g, '\\n');
  try { return JSON.parse(fixed); } catch { /* continue */ }

  // Attempt 3: truncated JSON — salvage what we can
  fixed = jsonStr;
  // If we're inside an unterminated string, close it
  let inString = false;
  let escaped = false;
  for (let i = 0; i < fixed.length; i++) {
    if (escaped) { escaped = false; continue; }
    if (fixed[i] === '\\') { escaped = true; continue; }
    if (fixed[i] === '"') { inString = !inString; }
  }
  if (inString) {
    // We're inside an open string — trim back to last complete key-value pair
    const lastGoodQuote = fixed.lastIndexOf('"');
    fixed = fixed.slice(0, lastGoodQuote) + '"';
  }
  // Remove trailing comma if present
  fixed = fixed.replace(/,\s*$/, '');
  // Close open braces and brackets
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

  // Give up
  throw new Error(`Failed to parse JSON: ${jsonStr.slice(0, 200)}...`);
}

const FALLBACK_SECTION_ROAST = { annotation: '...', comment: 'Kein Kommentar verfügbar.' };

function makeFallbackPersonaRoast(sectionIds: string[]): PersonaRoast {
  const sectionRoasts: Record<string, { annotation: string; comment: string }> = {};
  for (const id of sectionIds) {
    sectionRoasts[id] = FALLBACK_SECTION_ROAST;
  }
  return { sectionRoasts, shareQuote: 'Kein Kommentar.' };
}

const FALLBACK_CHAD: ChadRoast = {
  tooSmall: 'I love the energy, but this is a feature, not a company.',
  blowUp: 'What if we make this the AI layer for... everything? $500B TAM, easy.',
  shareQuote: 'Too small. Think bigger. 10x bigger.',
};

export async function POST(request: NextRequest) {
  try {
    const { scrapedContent } = (await request.json()) as { scrapedContent: ScrapedContent };

    if (!scrapedContent?.url) {
      return NextResponse.json({ error: 'Missing scraped content' }, { status: 400 });
    }

    const userPrompt = buildRoastPrompt(scrapedContent);
    const chadUserPrompt = buildChadPrompt(scrapedContent);
    const sectionIds = scrapedContent.sections.map(s => s.id);

    // 5 AT persona calls (Haiku) + 1 Chad call (Sonnet) — all in parallel
    const atPromises = AT_PERSONA_IDS.map(personaId =>
      anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        system: AT_SYSTEM_PROMPTS[personaId],
        messages: [{ role: 'user', content: userPrompt }],
      })
    );

    const chadPromise = anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: CHAD_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: chadUserPrompt }],
    });

    const results = await Promise.allSettled([...atPromises, chadPromise]);

    // Parse AT persona results
    const atRoasts: Record<string, PersonaRoast> = {};
    for (let i = 0; i < AT_PERSONA_IDS.length; i++) {
      const personaId = AT_PERSONA_IDS[i];
      const result = results[i];

      if (result.status === 'fulfilled') {
        try {
          const textBlock = result.value.content.find(b => b.type === 'text');
          if (textBlock && textBlock.type === 'text') {

            const parsed = parseJSON(textBlock.text) as PersonaRoast;
            if (parsed.sectionRoasts) {
              atRoasts[personaId] = {
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

      // Fallback
      atRoasts[personaId] = makeFallbackPersonaRoast(sectionIds);
    }

    // Parse Chad result
    let chadRoast: ChadRoast = FALLBACK_CHAD;
    const chadResult = results[AT_PERSONA_IDS.length];
    if (chadResult.status === 'fulfilled') {
      try {
        const textBlock = chadResult.value.content.find(b => b.type === 'text');
        if (textBlock && textBlock.type === 'text') {

          const parsed = parseJSON(textBlock.text) as ChadRoast;
          if (parsed.tooSmall && parsed.blowUp) {
            chadRoast = {
              tooSmall: parsed.tooSmall,
              blowUp: parsed.blowUp,
              shareQuote: parsed.shareQuote || `This startup? Too small. Let's 10x it.`,
            };
          } else {
            console.error('chad parsed but missing fields. Keys:', Object.keys(parsed));
          }
        }
      } catch (e) {
        console.error('Failed to parse Chad response:', e);
      }
    } else {
      console.error('Chad call failed:', chadResult.reason);
    }

    const roastData: RoastData = {
      franky: atRoasts.franky,
      pflichtner: atRoasts.pflichtner,
      sabine: atRoasts.sabine,
      florian: atRoasts.florian,
      renate: atRoasts.renate,
      chad: chadRoast,
    };

    return NextResponse.json(roastData);
  } catch (err) {
    console.error('Generate error:', err);
    const message = err instanceof Error ? err.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
