/**
 * The press's library: what AI Engineer Press publishes, defined once.
 *
 * Two surfaces show the three books — the catalogue homepage and `/books` —
 * and before this module they each carried their own copy of every title,
 * blurb, cover path and maturity label. That is the arrangement where a book
 * is "Drafting" on one page and "First draft" on the other, and nobody finds
 * out until a reader does.
 *
 * Maturity is derived from the chapter counts rather than stated, for the
 * same reason: a label that cannot disagree with the book it describes.
 */
import { BOOK, authorsLine, publicUrl } from './book';
import { chapters } from './bookChapters';
import {
  chaptersTwo,
  chaptersTwoWordCount,
  BOOK_TWO_TITLE,
  BOOK_TWO_SUBTITLE,
  BOOK_TWO_COVER_600,
} from './bookChaptersTwo';
import {
  chaptersThree,
  BOOK_THREE_TITLE,
  BOOK_THREE_SUBTITLE,
  BOOK_THREE_COVER_600,
} from './bookChaptersThree';
import { totalWordCount } from '../lib/readingStats';
import stats from './stats.json';

/**
 * Book 3's planned scope, verified against
 * `99_Meta/third-book-classification.json` on 2026-11-16: 12 chapters, 133
 * distinct talks shortlisted across them.
 *
 * These two are stated, not derived — the website does not import that
 * classification file. They are the only numbers in the library that cannot
 * update themselves, so re-check them when the classification is re-run.
 */
export const PLANNED_CHAPTERS = 12;
export const CLASSIFIED_TALKS = 133;

export type LibraryEntry = {
  id: string;
  title: string;
  /** One line under the title. The book's own subtitle, or its pitch. */
  blurb: string;
  /** The subtitle printed on the cover, for the 3D book's title page. */
  subtitle: string;
  /** Cloth colour of the 3D book's spine. */
  spineColor: string;
  /**
   * Where the book opens, as an absolute URL. Book 1 and the other two live on
   * different domains, so a relative link would open the wrong site.
   */
  href: string;
  cover: string;
  /** Derived from the prose that exists, never stated. */
  status: string;
  /** What actually exists today, in the book's own units. */
  measure: string;
  /**
   * Maturity, for borders and ordering: solid → dashed → dotted reads without
   * a legend.
   */
  maturity: 'published' | 'drafting' | 'early';
  /** Book 1's author line; the press has one author. */
  author: string;
  /** The year the book's current text dates from. */
  year: number;
};

/** The press's year, as the site footer prints it (© 2026). */
const PRESS_YEAR = 2026;

/**
 * A short author bio, assembled from text the site already carries
 * (llms.txt and content/about-the-lab.md). Nothing here is new.
 */
export const AUTHOR_BIO =
  `${authorsLine} wrote ${BOOK.title} and runs the Lab: a public project that produces source-backed ` +
  'books on AI engineering by running research-and-writing loops over a corpus of practitioner talks ' +
  'from the AI Engineer channel. The work is built in public and open source.';

const bookThreeStatus = (): string => {
  if (chaptersThree.length === 0) return 'In design';
  if (chaptersThree.length < PLANNED_CHAPTERS) return 'Drafting';
  return 'First draft';
};

export const LIBRARY: LibraryEntry[] = [
  {
    id: BOOK.id,
    title: BOOK.title,
    blurb: BOOK.subtitle,
    subtitle: BOOK.subtitle,
    spineColor: BOOK.spineColor,
    href: publicUrl('/'),
    cover: '/covers/from-copilot-to-colleague-600w.webp',
    status: 'Published',
    measure: `${chapters.length} chapters · ${totalWordCount.toLocaleString()} words`,
    maturity: 'published',
    author: authorsLine,
    year: PRESS_YEAR,
  },
  {
    id: 'the-model-layer-and-the-long-tail',
    title: BOOK_TWO_TITLE,
    blurb:
      'An early, source-anchored draft on how AI engineering is reshaping training, inference, and the long tail of domains beyond text.',
    subtitle: BOOK_TWO_SUBTITLE,
    spineColor: '#2B3936',
    href: publicUrl('/second-book'),
    cover: BOOK_TWO_COVER_600,
    status: 'Drafting',
    measure:
      `${chaptersTwo.length} chapters · ${chaptersTwoWordCount.toLocaleString()} words · ` +
      `${stats.book2.claims.total} claims · ${stats.book2.anchors.total} anchors`,
    maturity: 'drafting',
    author: authorsLine,
    year: PRESS_YEAR,
  },
  {
    id: 'the-shape-of-the-work',
    title: BOOK_THREE_TITLE,
    blurb:
      'Spec-driven development and the software factory: what happens to the lifecycle when writing the code stops being the constraint.',
    subtitle: BOOK_THREE_SUBTITLE,
    spineColor: '#3A322B',
    href: publicUrl('/third-book'),
    cover: BOOK_THREE_COVER_600,
    status: bookThreeStatus(),
    // Deliberately not "0 chapters · 0 words" when the track is empty: that
    // reads as broken rather than early. It carries what exists instead.
    measure:
      `${chaptersThree.length} of ${PLANNED_CHAPTERS} chapters · ` +
      `${CLASSIFIED_TALKS} talks classified · spec published`,
    maturity: 'early',
    author: authorsLine,
    year: PRESS_YEAR,
  },
];

/** The books either side of `id` in LIBRARY order, for previous / next links. */
export const libraryNeighbours = (
  id: string,
): { prev?: LibraryEntry; next?: LibraryEntry } => {
  const i = LIBRARY.findIndex((b) => b.id === id);
  if (i < 0) return {};
  return { prev: LIBRARY[i - 1], next: LIBRARY[i + 1] };
};

export const libraryEntry = (id: string): LibraryEntry | undefined => LIBRARY.find((b) => b.id === id);

/** The subtitles are the covers' own, so the page and the print agree. */
export const LIBRARY_SUBTITLES = {
  two: BOOK_TWO_SUBTITLE,
  three: BOOK_THREE_SUBTITLE,
};
