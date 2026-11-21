/**
 * One build serves two sites. Book 1 lives at its own domain; the press and
 * the other two books live at aiepress.com. vercel.json routes each host and
 * redirects a path that arrives at the wrong one, so every page has exactly
 * one canonical home.
 */
export const BOOK_ORIGIN = 'https://fromcopilottocolleague.com';
export const PRESS_ORIGIN = 'https://aiepress.com';

/** Book 1's origin. Kept under this name because most of the site is book 1. */
export const SITE_ORIGIN = BOOK_ORIGIN;

/** The press homepage. aiepress.com serves it at "/". */
export const PRESS_HOME_PATH = '/press';

/** Paths that belong to aiepress.com. Keep in step with vercel.json. */
export const PRESS_PATH_PREFIXES = [PRESS_HOME_PATH, '/books', '/second-book', '/third-book'];

export const isPressPath = (path: string): boolean =>
  PRESS_PATH_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

/** The public URL of a site path, on whichever domain owns it. */
export const publicUrl = (path: string): string => {
  if (path === PRESS_HOME_PATH) return `${PRESS_ORIGIN}/`;
  return `${isPressPath(path) ? PRESS_ORIGIN : BOOK_ORIGIN}${path}`;
};

/** Build an absolute URL from a site-relative path (or pass through an absolute URL). */
export const absoluteUrl = (urlOrPath: string): string =>
  urlOrPath.startsWith('http') ? urlOrPath : publicUrl(urlOrPath);

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
