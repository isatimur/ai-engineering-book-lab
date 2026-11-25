/**
 * The press catalogue as data: each book in LIBRARY joined to its chapters,
 * chapter URLs and explainer videos.
 *
 * Two readers use it. The press homepage (pages/Press.tsx) takes the "Read"
 * link and the Watch row from here. scripts/gen-catalog.mjs bundles this
 * module and writes public/catalog.json, so agents get the same list the page
 * shows.
 *
 * Read-only: it derives from library.ts, the chapter files and chapterVideos.ts,
 * and changes none of them.
 */
import { BOOK, PRESS_ORIGIN, publicUrl } from '../data/book';
import { LIBRARY, type LibraryEntry } from '../data/library';
import { chapters, chapterPath, type BookChapter } from '../data/bookChapters';
import { chaptersTwo, chapterTwoPath } from '../data/bookChaptersTwo';
import { chaptersThree, chapterThreePath } from '../data/bookChaptersThree';
import { chapterVideos, bookTwoVideos, bookThreeVideos, type ChapterVideo } from '../data/chapterVideos';

/** Where one book's chapters and videos live. */
export type BookSource = {
  chapters: BookChapter[];
  /** Site-relative chapter path, e.g. `/second-book/the-turn-to-rl`. */
  chapterPath: (c: BookChapter) => string;
  videos: ChapterVideo[];
};

/** Keyed by LibraryEntry.id. A test checks that every LIBRARY book has one. */
export const BOOK_SOURCES: Record<string, BookSource> = {
  [BOOK.id]: { chapters, chapterPath, videos: chapterVideos },
  'the-model-layer-and-the-long-tail': {
    chapters: chaptersTwo,
    chapterPath: chapterTwoPath,
    videos: bookTwoVideos,
  },
  'the-shape-of-the-work': {
    chapters: chaptersThree,
    chapterPath: chapterThreePath,
    videos: bookThreeVideos,
  },
};

/** `34` → `0:34`, `125` → `2:05`. */
export const formatDuration = (seconds: number): string => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/** Where "Read" goes: the first chapter, or the landing page when there is none. */
export const readHref = (book: LibraryEntry, source: BookSource | undefined): string => {
  const first = source?.chapters[0];
  return first ? publicUrl(source.chapterPath(first)) : book.href;
};

export type WatchTile = {
  bookId: string;
  bookTitle: string;
  chapterNumber: string;
  chapterTitle: string;
  /** Absolute chapter URL. */
  href: string;
  /** Site-relative poster path. Static files are served on both domains. */
  poster: string;
  width: number;
  height: number;
  duration: string;
};

/**
 * The Watch row: the first chapter with a video in each book, in shelf order.
 * A book with no rendered video is skipped, never faked.
 */
export const watchTiles = (
  library: LibraryEntry[] = LIBRARY,
  sources: Record<string, BookSource> = BOOK_SOURCES,
): WatchTile[] =>
  library.flatMap((book) => {
    const source = sources[book.id];
    if (!source) return [];
    const chapter = source.chapters.find((c) => source.videos.some((v) => v.chapterSlug === c.slug));
    if (!chapter) return [];
    const video = source.videos.find((v) => v.chapterSlug === chapter.slug)!;
    return [
      {
        bookId: book.id,
        bookTitle: book.title,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        href: publicUrl(source.chapterPath(chapter)),
        poster: video.poster,
        width: video.width,
        height: video.height,
        duration: formatDuration(video.durationSeconds),
      },
    ];
  });

/** A site-relative asset path as an absolute URL on the press domain. */
const assetUrl = (path: string): string => (path.startsWith('http') ? path : `${PRESS_ORIGIN}${path}`);

export type CatalogChapter = {
  number: string;
  slug: string;
  title: string;
  promise: string;
  status: string;
  wordCount: number;
  url: string;
  video: { url: string; poster: string; durationSeconds: number } | null;
};

export type CatalogBook = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  status: string;
  maturity: LibraryEntry['maturity'];
  measure: string;
  url: string;
  readUrl: string;
  cover: string;
  chapters: CatalogChapter[];
};

export type Catalog = {
  name: string;
  url: string;
  description: string;
  books: CatalogBook[];
};

/**
 * The public catalogue. No build timestamp, on purpose: the file is committed,
 * and a date would change it on every build.
 */
export const buildCatalog = (
  library: LibraryEntry[] = LIBRARY,
  sources: Record<string, BookSource> = BOOK_SOURCES,
): Catalog => ({
  name: 'AI Engineer Press',
  url: `${PRESS_ORIGIN}/`,
  description:
    'Every book from AI Engineer Press, with its chapters, their URLs and status, and the explainer video for each chapter that has one.',
  books: library.map((book) => {
    const source = sources[book.id];
    return {
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      blurb: book.blurb,
      status: book.status,
      maturity: book.maturity,
      measure: book.measure,
      url: book.href,
      readUrl: readHref(book, source),
      cover: assetUrl(book.cover),
      chapters: (source?.chapters ?? []).map((c) => {
        const video = source!.videos.find((v) => v.chapterSlug === c.slug);
        return {
          number: c.number,
          slug: c.slug,
          title: c.title,
          promise: c.promise,
          status: c.status,
          wordCount: c.wordCount,
          url: publicUrl(source!.chapterPath(c)),
          video: video
            ? { url: assetUrl(video.src), poster: assetUrl(video.poster), durationSeconds: video.durationSeconds }
            : null,
        };
      }),
    };
  }),
});
