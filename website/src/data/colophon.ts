import type { DraftBook } from './draftBooks';
import { libraryEntry } from './library';
import stats from './stats.json';

/**
 * The typefaces the site sets, in the order index.css declares them
 * (--font-serif, --font-sans, --font-mono). colophon.test.ts reads index.css,
 * so this list cannot drift from the fonts the page actually uses.
 */
export const TYPEFACES = ['EB Garamond', 'Inter', 'Space Mono'] as const;

type BookStats = {
  claims: { total: number };
  anchors: { total: number };
  source_anchors?: { total: number };
};

export type ColophonRow = { label: string; value: string };

/** Distinct talks the book's evidence cites, by video id. */
export const talksCited = (book: DraftBook): number => {
  const ids = new Set<string>();
  for (const claims of Object.values(book.evidence)) {
    for (const claim of claims) {
      for (const anchor of claim.anchors ?? []) {
        if (anchor.video_id) ids.add(anchor.video_id);
      }
    }
  }
  return ids.size;
};

/**
 * Book 2's anchors are all source anchors. Book 3 also anchors claims in
 * artifacts (commits, runs, files), and stats.json counts those apart.
 */
const anchorsLine = (s: BookStats): string =>
  s.source_anchors
    ? `${(s.source_anchors.total + s.anchors.total).toLocaleString('en-US')} ` +
      `(${s.source_anchors.total} source · ${s.anchors.total} artifact)`
    : s.anchors.total.toLocaleString('en-US');

/**
 * The book's colophon. Every number comes from stats.json, the evidence file
 * or the chapters themselves, so the block updates when the book does.
 */
export const colophonFor = (book: DraftBook): ColophonRow[] => {
  const s = (stats as unknown as Record<string, BookStats>)[book.key];
  const words = book.chapters.reduce((sum, c) => sum + c.wordCount, 0);
  return [
    { label: 'Words', value: words.toLocaleString('en-US') },
    { label: 'Talks cited', value: talksCited(book).toLocaleString('en-US') },
    { label: 'Claims', value: s.claims.total.toLocaleString('en-US') },
    { label: 'Anchors', value: anchorsLine(s) },
    { label: 'Typefaces', value: TYPEFACES.join(', ') },
    { label: 'Last updated', value: stats.generated_at.slice(0, 10) },
    { label: 'Status', value: libraryEntry(book.libraryId)?.status ?? 'Drafting' },
  ];
};
