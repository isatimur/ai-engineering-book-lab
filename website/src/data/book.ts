/** Canonical production origin — used to build absolute canonical, OG, and JSON-LD URLs. */
export const SITE_ORIGIN = 'https://fromcopilottocolleague.com';

/** Build an absolute URL from a site-relative path (or pass through an absolute URL). */
export const absoluteUrl = (urlOrPath: string): string =>
  urlOrPath.startsWith('http') ? urlOrPath : `${SITE_ORIGIN}${urlOrPath}`;

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage: string;
  spineColor: string;
  category: string;
};

/** Single source of truth for book-level metadata (UI, SEO, and structured data). */
export const BOOK: Book = {
  id: 'from-copilot-to-colleague',
  title: 'From Copilot to Colleague',
  subtitle: 'How AI Engineering Turns Models into Dependable Systems',
  author: 'Timur Isachenko',
  coverImage: '/covers/from-copilot-to-colleague.png',
  spineColor: '#1A1A1A',
  category: 'AI Engineering',
};
