/** Canonical production origin — used to build absolute canonical, OG, and JSON-LD URLs. */
export const SITE_ORIGIN = 'https://aiepress.com';

/** Build an absolute URL from a site-relative path (or pass through an absolute URL). */
export const absoluteUrl = (urlOrPath: string): string =>
  urlOrPath.startsWith('http') ? urlOrPath : `${SITE_ORIGIN}${urlOrPath}`;

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  coverImage: string;
  spineColor: string;
  category: string;
};

/** Single source of truth for book-level metadata (UI, SEO, and structured data). */
export const BOOK: Book = {
  id: 'from-copilot-to-colleague',
  title: 'From Copilot to Colleague',
  subtitle: 'How AI Engineering Turns Models into Dependable Systems',
  authors: ['Timur Isachenko'],
  coverImage: '/covers/from-copilot-to-colleague.png',
  // The closed-book slab on /catalogue, shown before the cover swings open.
  // Near-black belonged to the old cover; this is the specimen plate's own
  // darkest ink, so the spine and the board it opens onto are one object.
  spineColor: '#3B2F20',
  category: 'AI Engineering',
};

/** Full author names joined for display and text metadata. */
export const authorsLine = BOOK.authors.join(' & ');

/** Surname-only line for narrow surfaces (book spine). */
export const authorsSpineLine = BOOK.authors.map((a) => a.split(' ').slice(-1)[0]).join(' \u00b7 ');
