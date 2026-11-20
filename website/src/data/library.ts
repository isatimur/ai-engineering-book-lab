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
import { BOOK } from './book';
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
  /** Where the book opens. */
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
};

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
    href: '/',
    cover: '/covers/from-copilot-to-colleague-600w.webp',
    status: 'Published',
    measure: `${chapters.length} chapters · ${totalWordCount.toLocaleString()} words`,
    maturity: 'published',
  },
  {
    id: 'the-model-layer-and-the-long-tail',
    title: BOOK_TWO_TITLE,
    blurb:
      'An early, source-anchored draft on how AI engineering is reshaping training, inference, and the long tail of domains beyond text.',
    href: '/second-book',
    cover: BOOK_TWO_COVER_600,
    status: 'Drafting',
    measure:
      `${chaptersTwo.length} chapters · ${chaptersTwoWordCount.toLocaleString()} words · ` +
      `${stats.book2.claims.total} claims · ${stats.book2.anchors.total} anchors`,
    maturity: 'drafting',
  },
  {
    id: 'the-shape-of-the-work',
    title: BOOK_THREE_TITLE,
    blurb:
      'Spec-driven development and the software factory: what happens to the lifecycle when writing the code stops being the constraint.',
    href: '/third-book',
    cover: BOOK_THREE_COVER_600,
    status: bookThreeStatus(),
    // Deliberately not "0 chapters · 0 words" when the track is empty: that
    // reads as broken rather than early. It carries what exists instead.
    measure:
      `${chaptersThree.length} of ${PLANNED_CHAPTERS} chapters · ` +
      `${CLASSIFIED_TALKS} talks classified · spec published`,
    maturity: 'early',
  },
];

/** The subtitles are the covers' own, so the page and the print agree. */
export const LIBRARY_SUBTITLES = {
  two: BOOK_TWO_SUBTITLE,
  three: BOOK_THREE_SUBTITLE,
};
