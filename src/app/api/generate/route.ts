import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, buildRoastPrompt } from '@/lib/prompts';
import type { ScrapedContent, RoastData } from '@/types';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { scrapedContent } = (await request.json()) as { scrapedContent: ScrapedContent };

    if (!scrapedContent?.url) {
      return NextResponse.json({ error: 'Missing scraped content' }, { status: 400 });
    }

    const userPrompt = buildRoastPrompt(scrapedContent);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Extract text from response
    const textBlock = message.content.find(b => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No text in response' }, { status: 500 });
    }

    // Parse JSON from response (handle potential markdown wrapping)
    let jsonStr = textBlock.text.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const roastData: RoastData = JSON.parse(jsonStr);

    // Validate new structure
    if (!roastData.vc?.sectionRoasts || !roastData.vc?.shareQuote ||
        !roastData.beamter?.sectionRoasts || !roastData.beamter?.shareQuote) {
      return NextResponse.json({ error: 'Invalid response structure' }, { status: 500 });
    }

    return NextResponse.json(roastData);
  } catch (err) {
    console.error('Generate error:', err);
    const message = err instanceof Error ? err.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
