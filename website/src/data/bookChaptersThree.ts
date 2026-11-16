import type { BookChapter } from './bookChapters';

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

export const chaptersThree: BookChapter[] = [];

/** Total word count across all book-3 chapters — mirrors `totalWordCount` in `../lib/readingStats`. */
export const chaptersThreeWordCount = chaptersThree.reduce((sum, c) => sum + c.wordCount, 0);

/** Canonical per-chapter URL, e.g. `/third-book/some-slug`. */
export const chapterThreePath = (c: BookChapter): string => `/third-book/${c.slug}`;

/** The `:slug` route param for a book-3 chapter. */
export const chapterThreeParam = (c: BookChapter): string => c.slug;

/** Resolve a book-3 chapter from a `:slug` route param. */
export const chapterThreeByParam = (param: string): BookChapter | undefined =>
  chaptersThree.find((c) => c.slug === param);

// `countWords` is used by the chapter entries above once they exist. Reference
// it so an empty track does not trip noUnusedLocals.
void countWords;
