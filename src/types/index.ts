export type ATPersonaId = 'franky' | 'pflichtner' | 'sabine' | 'florian' | 'renate';
export type PersonaId = ATPersonaId | 'chad';
export type Phase = 'loading' | 'website' | 'transition' | 'chad' | 'share';

export interface PersonaMeta {
  id: PersonaId;
  name: string;
  title: string;
  color: string;
  colorRgb: string;
}

export const AT_PERSONAS: PersonaMeta[] = [
  { id: 'franky', name: 'Franky', title: 'Der Grantler', color: '#C0392B', colorRgb: '192,57,43' },
  { id: 'pflichtner', name: 'Dr. Pflichtner', title: 'Der Beamte', color: '#1a3a5c', colorRgb: '26,58,92' },
  { id: 'sabine', name: 'Sabine', title: 'Die Pragmatikerin', color: '#2d6a3e', colorRgb: '45,106,62' },
  { id: 'florian', name: 'Florian', title: 'Der Grüne', color: '#3a7a3a', colorRgb: '58,122,58' },
  { id: 'renate', name: 'Renate', title: 'Die Gewerkschafterin', color: '#8B1A1A', colorRgb: '139,26,26' },
];

export const CHAD_META: PersonaMeta = {
  id: 'chad', name: 'Chad', title: 'Der VC Bro', color: '#00E5FF', colorRgb: '0,229,255',
};

export const ALL_PERSONAS: PersonaMeta[] = [...AT_PERSONAS, CHAD_META];

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

export interface ChadRoast {
  tooSmall: string;
  blowUp: string;
  shareQuote: string;
}

export interface RoastData {
  franky: PersonaRoast;
  pflichtner: PersonaRoast;
  sabine: PersonaRoast;
  florian: PersonaRoast;
  renate: PersonaRoast;
  chad: ChadRoast;
}
