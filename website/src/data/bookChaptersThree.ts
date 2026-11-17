import type { BookChapter } from './bookChapters';
import chapter01 from '../content-3/chapter-01.md?raw';
import chapter02 from '../content-3/chapter-02.md?raw';
import chapter03 from '../content-3/chapter-03.md?raw';
import chapter04 from '../content-3/chapter-04.md?raw';
import chapter05 from '../content-3/chapter-05.md?raw';
import chapter06 from '../content-3/chapter-06.md?raw';
import chapter07 from '../content-3/chapter-07.md?raw';
import chapter08 from '../content-3/chapter-08.md?raw';
import chapter09 from '../content-3/chapter-09.md?raw';
import chapter10 from '../content-3/chapter-10.md?raw';
import chapter11 from '../content-3/chapter-11.md?raw';
import chapter12 from '../content-3/chapter-12.md?raw';

// Third book — a sibling data file to bookChapters.ts and bookChaptersTwo.ts,
// not a merge into either. Reuses book 1's `BookChapter` shape so the generic
// reading components work unmodified, but keeps its own array so book 1's
// `chapters.length` assumptions elsewhere (gen-llms.mjs's sanity check,
// readingStats.ts, etc.) are untouched.
//
// The track is EMPTY for now: public/drafting-3/ has no chapters yet, so
// src/content-3/ has no files to `?raw`-import. Do not import files that do
// not exist; the build fails. When Chapter 1 arrives, run
// `node scripts/sync-third-book.mjs`, then add the import and the entry:
//
//   import chapter01 from '../content-3/chapter-01.md?raw';
//   ...
//   {
//     number: '01',
//     slug: 'the-chapter-slug',
//     title: 'Chapter title',
//     promise: 'One sentence on what the reader gains.',
//     status: 'Drafting',
//     content: chapter01,
//     wordCount: countWords(chapter01),
//   },
//
// Keep the literal field order `number`, then `slug`, each with single quotes.
// scripts/gen-sitemap.mjs parses book 2's file with
// /number: '(\d+)',\s*slug: '([^']+)'/g, and the same regex will read this one.

const countWords = (content: string) => content.trim().split(/\s+/).filter(Boolean).length;

// Interim, unconfirmed public title — matches ThirdBookReader's own <h1> so
// both pages agree, but the author has not finalized a title for book 3 yet.
// Taken from the working title in
// docs/superpowers/specs/2026-11-15-third-book-design.md, which is a real
// placeholder rather than a slot-filler: "Book Three (Foundations)" named the
// build track, not the book, and it was rendering on the public /books page.
export const BOOK_THREE_TITLE = 'The Shape of the Work';

export const chaptersThree: BookChapter[] = [
  {
    number: '01',
    slug: 'the-bottleneck-moved',
    title: 'The Bottleneck Moved',
    promise:
      'Why "code generation was never the bottleneck" reframes the whole lifecycle — and why the feeling of going faster is not evidence that you are.',
    status: 'Drafting',
    content: chapter01,
    wordCount: countWords(chapter01),
  },
  {
    number: '02',
    slug: 'intent-before-specification',
    title: 'Intent Before Specification',
    promise:
      'What has to be settled before any document helps — and why the instinct to specify first fails on capabilities nobody has mapped yet.',
    status: 'Drafting',
    content: chapter02,
    wordCount: countWords(chapter02),
  },
  {
    number: '03',
    slug: 'what-a-specification-is-for',
    title: 'What a Specification Is For',
    promise:
      'Code is a lossy projection of the reasoning that produced it. A specification is the surface you argue on before that reasoning is lost.',
    status: 'Drafting',
    content: chapter03,
    wordCount: countWords(chapter03),
  },
  {
    number: '04',
    slug: 'decomposition-and-the-plan',
    title: 'Decomposition and the Plan',
    promise:
      'Why the size of a planned step is a context constraint rather than a matter of taste, and why a bad line in a plan costs a hundred bad lines of code.',
    status: 'Drafting',
    content: chapter04,
    wordCount: countWords(chapter04),
  },
  {
    number: '05',
    slug: 'execution-under-a-spec',
    title: 'Execution Under a Spec',
    promise:
      'A specification binds through exactly two mechanisms — what the agent can reach, and what gets checked afterwards. Everything else is advisory.',
    status: 'Drafting',
    content: chapter05,
    wordCount: countWords(chapter05),
  },
  {
    number: '06',
    slug: 'the-independence-problem',
    title: 'The Independence Problem',
    promise:
      'A judge that nearly doubled a benchmark score, and why the most dangerous gate in your pipeline is the one you wrote yourself.',
    status: 'Drafting',
    content: chapter06,
    wordCount: countWords(chapter06),
  },
  {
    number: '07',
    slug: 'gates-that-can-actually-fail',
    title: 'Gates That Can Actually Fail',
    promise:
      'Gates die two ways: crying wolf, or never objecting. The second is silent, gets praised, and is far more dangerous.',
    status: 'Drafting',
    content: chapter07,
    wordCount: countWords(chapter07),
  },
  {
    number: '08',
    slug: 'shipping-and-the-gap-between-merged-and-live',
    title: 'Shipping, and the Gap Between Merged and Live',
    promise:
      'Thirty consecutive commits that deployed nothing while every indicator said success — and why an absence produces no artifact.',
    status: 'Drafting',
    content: chapter08,
    wordCount: countWords(chapter08),
  },
  {
    number: '09',
    slug: 'brownfield-and-spec-rot',
    title: 'Brownfield and Spec Rot',
    promise:
      'When the system is too large to hold in view, every slice is locally correct and the whole drifts. Three different decays hide under one phrase.',
    status: 'Drafting',
    content: chapter09,
    wordCount: countWords(chapter09),
  },
  {
    number: '10',
    slug: 'the-review-wall',
    title: 'The Review Wall',
    promise:
      'Lines of code up 2,450%. Commits up 240%. Releases up 30%. The gap is inventory, and "human in the loop" is where it gets relabelled as control.',
    status: 'Drafting',
    content: chapter10,
    wordCount: countWords(chapter10),
  },
  {
    number: '11',
    slug: 'the-factory-and-its-discontents',
    title: 'The Factory and Its Discontents',
    promise:
      'A factory makes the same thing repeatedly. Software never makes the same thing twice — which is why the metaphor works for some work and strains everywhere else.',
    status: 'Drafting',
    content: chapter11,
    wordCount: countWords(chapter11),
  },
  {
    number: '12',
    slug: 'how-much-process-and-how-far-out-of-the-loop',
    title: 'How Much Process, and How Far Out of the Loop',
    promise:
      'Two measured rounds where ceremony cost a third more tokens for an identical scorecard — and the one result no scorecard could see.',
    status: 'Drafting',
    content: chapter12,
    wordCount: countWords(chapter12),
  },
];

/** Total word count across all book-3 chapters — mirrors `totalWordCount` in `../lib/readingStats`. */
export const chaptersThreeWordCount = chaptersThree.reduce((sum, c) => sum + c.wordCount, 0);

/** Canonical per-chapter URL, e.g. `/third-book/some-slug`. */
export const chapterThreePath = (c: BookChapter): string => `/third-book/${c.slug}`;

/** The `:slug` route param for a book-3 chapter. */
export const chapterThreeParam = (c: BookChapter): string => c.slug;

/** Resolve a book-3 chapter from a `:slug` route param. */
export const chapterThreeByParam = (param: string): BookChapter | undefined =>
  chaptersThree.find((c) => c.slug === param);

