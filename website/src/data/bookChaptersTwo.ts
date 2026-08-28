import chapter01 from '../content-2/chapter-01.md?raw';
import chapter02 from '../content-2/chapter-02.md?raw';
import chapter03 from '../content-2/chapter-03.md?raw';
import chapter04 from '../content-2/chapter-04.md?raw';
import chapter05 from '../content-2/chapter-05.md?raw';
import chapter06 from '../content-2/chapter-06.md?raw';
import chapter07 from '../content-2/chapter-07.md?raw';
import type { BookChapter } from './bookChapters';

// Second book ("The Model Layer" / "The Long Tail") — a sibling data file to
// bookChapters.ts, not a merge into it. Reuses book 1's `BookChapter` shape
// (structurally: number/slug/title/promise/status/wordCount/content) so the
// generic reading components (MarkdownBlock, ExpandableSummary) work
// unmodified, but keeps its own array so book 1's `chapters.length`
// assumptions elsewhere (gen-llms.mjs's sanity check, readingStats.ts, etc.)
// are untouched. See programs/second_book_website_wiring.md, decision 2.

const countWords = (content: string) => content.trim().split(/\s+/).filter(Boolean).length;

// Interim, unconfirmed public title — matches SecondBookReader's own <h1> so
// both pages agree, but the author has not finalized a title for book 2 yet.
// See research_passes/2026-08-28-books-collection-page.md.
export const BOOK_TWO_TITLE = 'The Model Layer & The Long Tail';

export const chaptersTwo: BookChapter[] = [
  {
    number: '01',
    slug: 'the-turn-to-rl',
    title: 'Training and the Turn to RL',
    promise: 'Why the center of gravity in model-building moved from pre-training to post-training — and reinforcement learning above all.',
    status: 'Drafting',
    content: chapter01,
    wordCount: countWords(chapter01),
  },
  {
    number: '02',
    slug: 'inference-economics',
    title: 'Inference Economics',
    promise: 'Why serving a model, not training it, is where the cost, the latency, and most AI engineering careers actually live.',
    status: 'Drafting',
    content: chapter02,
    wordCount: countWords(chapter02),
  },
  {
    number: '03',
    slug: 'frontier-models',
    title: 'Building Frontier Models',
    promise: 'Why building a frontier model became its own engineering culture, and why the frontier is now crowded rather than a two-lab race.',
    status: 'Drafting',
    content: chapter03,
    wordCount: countWords(chapter03),
  },
  {
    number: '04',
    slug: 'beyond-text',
    title: 'Beyond Text: Models for Speech, Media, Perception, and Action',
    seoTitle: 'Beyond Text',
    promise: 'How speech, media, recommendation, driving, and embodiment models are all converging on the same LLM-shaped design.',
    status: 'Drafting',
    content: chapter04,
    wordCount: countWords(chapter04),
  },
  {
    number: '05',
    slug: 'robotics',
    title: 'Robotics and the Physical World',
    promise: 'Why robotics is not "agents plus a body" — the physical world adds constraints the standard harness never has to handle.',
    status: 'Drafting',
    content: chapter05,
    wordCount: countWords(chapter05),
  },
  {
    number: '06',
    slug: 'high-stakes-domains',
    title: 'Regulated and High-Stakes Domains',
    promise: 'Why finance, legal, insurance, and medicine need a different engineering posture, not just a smarter general model.',
    status: 'Drafting',
    content: chapter06,
    wordCount: countWords(chapter06),
  },
  {
    number: '07',
    slug: 'creative-and-games',
    title: 'Creative, Education, and Games',
    promise: 'Why creative, educational, and game applications keep the model in a narrow lane while structured systems hold the ground truth.',
    status: 'Drafting',
    content: chapter07,
    wordCount: countWords(chapter07),
  },
];

/** Total word count across all book-2 chapters — mirrors `totalWordCount` in `../lib/readingStats`. */
export const chaptersTwoWordCount = chaptersTwo.reduce((sum, c) => sum + c.wordCount, 0);

/** Canonical per-chapter URL, e.g. `/second-book/the-turn-to-rl`. */
export const chapterTwoPath = (c: BookChapter): string => `/second-book/${c.slug}`;

/** The `:slug` route param for a book-2 chapter. */
export const chapterTwoParam = (c: BookChapter): string => c.slug;

/** Resolve a book-2 chapter from a `:slug` route param. */
export const chapterTwoByParam = (param: string): BookChapter | undefined =>
  chaptersTwo.find((c) => c.slug === param);
