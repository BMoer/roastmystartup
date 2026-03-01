import * as cheerio from 'cheerio';
import { getBridgeScript } from './bridge-script';

/**
 * Validates that a URL is safe to proxy (no private IPs, localhost, etc.)
 */
export function isUrlSafe(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    if (!['http:', 'https:'].includes(url.protocol)) return false;

    const hostname = url.hostname.toLowerCase();

    // Block private ranges
    const blocked = [
      'localhost', '127.0.0.1', '0.0.0.0', '::1',
      '10.', '172.16.', '172.17.', '172.18.', '172.19.',
      '172.20.', '172.21.', '172.22.', '172.23.',
      '172.24.', '172.25.', '172.26.', '172.27.',
      '172.28.', '172.29.', '172.30.', '172.31.',
      '192.168.',
    ];

    for (const prefix of blocked) {
      if (hostname === prefix || hostname.startsWith(prefix)) return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Rewrites HTML to make it work in an iframe:
 * - Injects <base href> for relative URL resolution
 * - Removes X-Frame-Options meta tags
 * - Removes CSP meta tags
 * - Injects bridge script for parent<->iframe communication
 */
export function rewriteHtml(html: string, baseUrl: string): string {
  const $ = cheerio.load(html);

  // Inject <base> tag for relative URL resolution
  const origin = new URL(baseUrl).origin;
  $('head').prepend(`<base href="${origin}/" />`);

  // Remove frame-busting meta tags
  $('meta[http-equiv="X-Frame-Options"]').remove();
  $('meta[http-equiv="Content-Security-Policy"]').remove();

  // Remove frame-busting scripts (common patterns)
  $('script').each((_, el) => {
    const content = $(el).html() || '';
    if (
      content.includes('top.location') ||
      content.includes('parent.location') ||
      content.includes('frameElement') ||
      content.includes('self !== top')
    ) {
      $(el).remove();
    }
  });

  // Inject bridge script at end of body
  const bridgeScript = getBridgeScript();
  $('body').append(`<script>${bridgeScript}</script>`);

  return $.html();
}
