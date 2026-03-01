export type PersonaMode = '' | 'vc' | 'beamter';

export interface RoastData {
  vc: {
    floatingAnnotations: string[];
    comments: string[];
  };
  beamter: {
    floatingAnnotations: string[];
    comments: string[];
    stampText: string;
  };
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
}
