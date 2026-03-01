import { NextRequest, NextResponse } from 'next/server';
import { isUrlSafe } from '@/lib/proxy';
import { scrapeHtml } from '@/lib/scraper';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    if (!isUrlSafe(url)) {
      return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const html = await response.text();
    const scraped = scrapeHtml(html, url);

    return NextResponse.json(scraped);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Scraping failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
