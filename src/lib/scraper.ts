import * as cheerio from 'cheerio';
import type { ScrapedContent } from '@/types';

const BUZZWORD_LIST = [
  'AI', 'ML', 'blockchain', 'Web3', 'NFT', 'token', 'decentralized', 'SaaS',
  'cloud', 'scalable', 'disruption', 'innovative', 'platform', 'ecosystem',
  'synergy', 'paradigm', 'leverage', 'agile', 'pivot', 'unicorn', 'moonshot',
  'deep tech', 'no-code', 'low-code', 'GPT', 'LLM', 'generative', 'automation',
  'real-time', 'edge computing', 'IoT', 'metaverse', 'AR', 'VR', 'quantum',
  'sustainability', 'green', 'impact', 'mission-driven', 'data-driven',
];

export function scrapeHtml(html: string, url: string): ScrapedContent {
  const $ = cheerio.load(html);

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
      // Avoid duplicates
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
  };
}
