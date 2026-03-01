export type PersonaMode = '' | 'vc' | 'beamter';

export interface ScrapedSection {
  id: string;
  heading: string;
  headingTag: 'h1' | 'h2' | 'h3';
  content: string;
}

export interface ScrapedContent {
  url: string;
  title: string;
  metaDescription: string;
  headings: string[];
  keyParagraphs: string[];
  pricingInfo: string | null;
  teamInfo: string | null;
  ctaTexts: string[];
  techBuzzwords: string[];
  sections: ScrapedSection[];
  logoUrl: string | null;
}

export interface SectionRoast {
  annotation: string;
  comment: string;
}

export interface PersonaRoast {
  sectionRoasts: Record<string, SectionRoast>;
  shareQuote: string;
}

export interface RoastData {
  vc: PersonaRoast;
  beamter: PersonaRoast;
}
