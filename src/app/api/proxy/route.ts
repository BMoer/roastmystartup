import { NextRequest, NextResponse } from 'next/server';
import { isUrlSafe, rewriteHtml } from '@/lib/proxy';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  if (!isUrlSafe(url)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const contentType = response.headers.get('content-type') || '';

    // Only proxy HTML pages
    if (!contentType.includes('text/html')) {
      // For non-HTML resources, pipe through directly
      const body = await response.arrayBuffer();
      return new NextResponse(body, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    const html = await response.text();

    // Check size limit (5MB)
    if (html.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Page too large' }, { status: 413 });
    }

    const rewritten = rewriteHtml(html, url);

    return new NextResponse(rewritten, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        // Explicitly allow framing
        'X-Frame-Options': 'ALLOWALL',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch URL';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
