import * as cheerio from 'cheerio';
import type { ScrapedContent, ScrapedSection } from '@/types';

const BUZZWORD_LIST = [
  'AI', 'ML', 'blockchain', 'Web3', 'NFT', 'token', 'decentralized', 'SaaS',
  'cloud', 'scalable', 'disruption', 'innovative', 'platform', 'ecosystem',
  'synergy', 'paradigm', 'leverage', 'agile', 'pivot', 'unicorn', 'moonshot',
  'deep tech', 'no-code', 'low-code', 'GPT', 'LLM', 'generative', 'automation',
  'real-time', 'edge computing', 'IoT', 'metaverse', 'AR', 'VR', 'quantum',
  'sustainability', 'green', 'impact', 'mission-driven', 'data-driven',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function extractLogoUrl($: cheerio.CheerioAPI, url: string): string | null {
  const origin = new URL(url).origin;

  // 1. og:image
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) {
    try { return new URL(ogImage, origin).href; } catch { /* skip */ }
  }

  // 2. apple-touch-icon
  const appleIcon = $('link[rel="apple-touch-icon"]').attr('href');
  if (appleIcon) {
    try { return new URL(appleIcon, origin).href; } catch { /* skip */ }
  }

  // 3. favicon (prefer larger ones)
  const favicon = $('link[rel="icon"][sizes], link[rel="shortcut icon"], link[rel="icon"]').first().attr('href');
  if (favicon) {
    try { return new URL(favicon, origin).href; } catch { /* skip */ }
  }

  // 4. img with "logo" in class, alt, or src
  let logoImg: string | null = null;
  $('img').each((_, el) => {
    if (logoImg) return;
    const cls = ($(el).attr('class') || '').toLowerCase();
    const alt = ($(el).attr('alt') || '').toLowerCase();
    const src = ($(el).attr('src') || '').toLowerCase();
    if (cls.includes('logo') || alt.includes('logo') || src.includes('logo')) {
      const rawSrc = $(el).attr('src');
      if (rawSrc) {
        try { logoImg = new URL(rawSrc, origin).href; } catch { /* skip */ }
      }
    }
  });

  return logoImg;
}

function extractSections($: cheerio.CheerioAPI): ScrapedSection[] {
  const sections: ScrapedSection[] = [];
  const usedSlugs = new Set<string>();

  // Collect all h1/h2/h3 elements in DOM order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headingEls: { el: any; tag: 'h1' | 'h2' | 'h3' }[] = [];
  $('h1, h2, h3').each((_, el) => {
    const tag = (el as { tagName?: string }).tagName?.toLowerCase() as 'h1' | 'h2' | 'h3';
    if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
      headingEls.push({ el, tag });
    }
  });

  for (let i = 0; i < headingEls.length; i++) {
    const { el, tag } = headingEls[i];
    const heading = $(el).text().trim();
    if (!heading || heading.length < 3 || heading.length > 200) continue;

    // Collect text content between this heading and the next
    const contentParts: string[] = [];
    let current = $(el).next();
    const nextHeadingEl = i + 1 < headingEls.length ? headingEls[i + 1].el : null;

    let collected = 0;
    while (current.length && collected < 500) {
      // Stop if we hit the next heading
      if (nextHeadingEl && current[0] === nextHeadingEl) break;
      if (current.is('h1, h2, h3')) break;

      const text = current.text().trim();
      if (text && text.length > 5) {
        contentParts.push(text);
        collected += text.length;
      }
      current = current.next();
    }

    // Generate stable unique slug
    let slug = slugify(heading);
    if (!slug) slug = `section-${i}`;
    if (usedSlugs.has(slug)) {
      slug = `${slug}-${i}`;
    }
    usedSlugs.add(slug);

    sections.push({
      id: slug,
      heading,
      headingTag: tag,
      content: contentParts.join(' ').slice(0, 500),
    });
  }

  return sections.slice(0, 12);
}

export function scrapeHtml(html: string, url: string): ScrapedContent {
  const $ = cheerio.load(html);

  // Extract logo before removing noise
  const logoUrl = extractLogoUrl($, url);

  // Extract sections before removing noise (but after load)
  const sections = extractSections($);

  // Remove noise
  $('script, style, noscript, nav, footer, iframe, svg, [aria-hidden="true"]').remove();

  const title = $('title').text().trim() || $('h1').first().text().trim() || '';
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() ||
    $('meta[property="og:description"]').attr('content')?.trim() || '';

  // Headings
  const headings: string[] = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 2 && text.length < 200) {
      headings.push(text);
    }
  });

  // Key paragraphs (first substantial ones)
  const keyParagraphs: string[] = [];
  $('p, [class*="description"], [class*="subtitle"], [class*="hero"] span, [class*="hero"] p').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 30 && text.length < 1000 && keyParagraphs.length < 8) {
      if (!keyParagraphs.some(p => p.includes(text) || text.includes(p))) {
        keyParagraphs.push(text);
      }
    }
  });

  // Pricing info
  let pricingInfo: string | null = null;
  const pricingSection = $('[class*="pricing"], [class*="price"], [id*="pricing"], [id*="price"]');
  if (pricingSection.length) {
    const pricingText = pricingSection.text().trim().slice(0, 500);
    if (pricingText.length > 10) pricingInfo = pricingText;
  }

  // Team info
  let teamInfo: string | null = null;
  const teamSection = $('[class*="team"], [class*="about"], [id*="team"], [id*="about"]');
  if (teamSection.length) {
    const teamText = teamSection.text().trim().slice(0, 500);
    if (teamText.length > 10) teamInfo = teamText;
  }

  // CTA button texts
  const ctaTexts: string[] = [];
  $('a[class*="btn"], a[class*="cta"], button[class*="btn"], button[class*="cta"], a[class*="button"], button').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 1 && text.length < 50 && ctaTexts.length < 6) {
      if (!ctaTexts.includes(text)) ctaTexts.push(text);
    }
  });

  // Detect buzzwords
  const fullText = $('body').text().toLowerCase();
  const techBuzzwords = BUZZWORD_LIST.filter(bw => fullText.includes(bw.toLowerCase()));

  return {
    url,
    title,
    metaDescription,
    headings: headings.slice(0, 10),
    keyParagraphs: keyParagraphs.slice(0, 6),
    pricingInfo,
    teamInfo,
    ctaTexts: ctaTexts.slice(0, 6),
    techBuzzwords: techBuzzwords.slice(0, 10),
    sections,
    logoUrl,
  };
}
