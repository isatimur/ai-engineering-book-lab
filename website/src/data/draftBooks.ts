import type { BookChapter } from './bookChapters';
import {
  BOOK_TWO_TITLE,
  chaptersTwo,
  chapterTwoByParam,
  chapterTwoPath,
} from './bookChaptersTwo';
import {
  BOOK_THREE_TITLE,
  chaptersThree,
  chapterThreeByParam,
  chapterThreePath,
} from './bookChaptersThree';
import evidenceTwoJson from '../evidence-2.json';
import evidenceThreeJson from '../evidence-3.json';
import type { EvidenceIndex } from '../EvidenceRail';
import { figuresTwo } from './figuresTwo';
import { figuresThree } from './figuresThree';
import type { FigureBook } from './bookFigures';
import { createEvidenceGraphApi } from '../lib/evidenceGraph';
import type { GraphBook } from '../lib/graphBooks';

/**
 * Everything the shared reader pages need to know about one of the draft books
 * (2 and 3). Book 1 keeps its own pages and data imports; books 2 and 3 share
 * one set of pages (pages/DraftBook*.tsx) and differ only in this record.
 */
export type DraftBook = {
  /** Storage-key prefix, e.g. "book2". */
  key: 'book2' | 'book3';
  title: string;
  /** Short label for headers, e.g. "Second Book (Draft)". */
  label: string;
  /** The book's landing page, e.g. "/second-book". */
  indexPath: string;
  chapters: BookChapter[];
  byParam: (param: string) => BookChapter | undefined;
  chapterPath: (c: BookChapter) => string;
  evidence: EvidenceIndex;
  figures: FigureBook;
  graph: GraphBook;
  /** The chapter's 1200x630 share card, rendered by remotion's render:og:draft. */
  ogCard: (c: BookChapter) => string;
};

/** Share cards live under the book's own path, e.g. /og/second-book/chapter-04.png. */
const ogCardFor = (indexPath: string) => (c: BookChapter) => `/og${indexPath}/chapter-${c.number}.png`;

const makeGraph = (
  evidence: EvidenceIndex,
  chapters: BookChapter[],
  indexPath: string,
  chapterPath: (c: BookChapter) => string,
): GraphBook => ({
  api: createEvidenceGraphApi(evidence, chapters),
  graphUrl: (n) => (n ? `${indexPath}/graph?chapter=${n.padStart(2, '0')}` : `${indexPath}/graph`),
  chapterUrl: (n) => {
    const ch = chapters.find((c) => c.number === n.padStart(2, '0'));
    return ch ? chapterPath(ch) : indexPath;
  },
});

const evidenceTwo = evidenceTwoJson as EvidenceIndex;
// JSON imports widen `kind` to string; build_evidence.py only emits the four ADR-0003 kinds.
const evidenceThree = evidenceThreeJson as EvidenceIndex;

export const bookTwo: DraftBook = {
  key: 'book2',
  title: BOOK_TWO_TITLE,
  label: 'Second Book (Draft)',
  indexPath: '/second-book',
  chapters: chaptersTwo,
  byParam: chapterTwoByParam,
  chapterPath: chapterTwoPath,
  evidence: evidenceTwo,
  figures: figuresTwo,
  graph: makeGraph(evidenceTwo, chaptersTwo, '/second-book', chapterTwoPath),
  ogCard: ogCardFor('/second-book'),
};

export const bookThree: DraftBook = {
  key: 'book3',
  title: BOOK_THREE_TITLE,
  label: 'Third Book (Draft)',
  indexPath: '/third-book',
  chapters: chaptersThree,
  byParam: chapterThreeByParam,
  chapterPath: chapterThreePath,
  evidence: evidenceThree,
  figures: figuresThree,
  graph: makeGraph(evidenceThree, chaptersThree, '/third-book', chapterThreePath),
  ogCard: ogCardFor('/third-book'),
};
