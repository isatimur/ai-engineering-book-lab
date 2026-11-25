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
import { bookTwoVideos, bookThreeVideos, type ChapterVideo } from './chapterVideos';
import type { GraphBook } from '../lib/graphBooks';
import type { BookTheme } from '../lib/bookTheme';

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
  /** The chapter's explainer video, when one has been rendered. */
  video: (c: BookChapter) => ChapterVideo | undefined;
  /** Every rendered explainer, in chapter order. */
  videos: ChapterVideo[];
  /** The book's id in LIBRARY (data/library.ts), for cover, status and neighbours. */
  libraryId: string;
  /** The book's colours, set as CSS variables on its pages. */
  theme: BookTheme;
  /**
   * The landing page's description: 2–4 sentences, written only from the
   * chapters' own promises. Rewrite it when a chapter's promise changes.
   */
  description: string;
};

const videoFrom = (videos: ChapterVideo[]) => (c: BookChapter) => videos.find((v) => v.chapterSlug === c.slug);

/** Videos that belong to a real chapter, in the chapters' order. */
const inChapterOrder = (videos: ChapterVideo[], chapters: BookChapter[]): ChapterVideo[] =>
  chapters.flatMap((c) => videos.filter((v) => v.chapterSlug === c.slug));

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
  video: videoFrom(bookTwoVideos),
  videos: inChapterOrder(bookTwoVideos, chaptersTwo),
  libraryId: 'the-model-layer-and-the-long-tail',
  // Teal. bookTheme.test.ts checks every text pair against WCAG AA.
  theme: { accent: '#0F6B63', paper: '#EDF3F0', ink: '#0E1F1C' },
  description:
    'Part I is the model layer: why model-building moved from pre-training to post-training and ' +
    'reinforcement learning, why serving a model is where the cost and the latency live, and why the ' +
    'frontier is now crowded rather than a two-lab race. Part II is the long tail: speech, media, ' +
    'perception and action converging on one LLM-shaped design; robotics, where the physical world adds ' +
    'constraints the standard harness never has to handle; regulated domains, which need a different ' +
    'engineering posture; and creative, education and game work, which keeps the model in a narrow lane ' +
    'while structured systems hold the ground truth. The last chapter puts the two ' +
    'together: capability consolidates, accountability does not.',
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
  video: videoFrom(bookThreeVideos),
  videos: inChapterOrder(bookThreeVideos, chaptersThree),
  libraryId: 'the-shape-of-the-work',
  // Burnt orange, the house accent. bookTheme.test.ts checks WCAG AA.
  theme: { accent: '#C2410C', paper: '#F7F1EA', ink: '#21160F' },
  description:
    'This book starts from one reframe: code generation was never the bottleneck. It follows the ' +
    'lifecycle once writing the code stops being the constraint — intent before specification, what a ' +
    'specification is for, plans sized to the context, and the two mechanisms through which a spec ' +
    'actually binds an agent. Then it turns to the gates: a judge that nearly doubled a benchmark score, ' +
    'gates that never object, and thirty commits that deployed nothing while every indicator said ' +
    'success. It ends at the review wall, the factory metaphor, and how much process a team really needs.',
};
