import { describe, it, expect } from 'vitest';
import { LIBRARY, type LibraryEntry } from '../data/library';
import {
  BOOK_SOURCES,
  buildCatalog,
  formatDuration,
  pressLlmsTxt,
  readHref,
  watchTiles,
  type BookSource,
} from './catalog';

describe('formatDuration', () => {
  it('formats seconds as m:ss', () => {
    expect(formatDuration(34)).toBe('0:34');
    expect(formatDuration(125)).toBe('2:05');
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(59.6)).toBe('1:00');
  });
});

describe('BOOK_SOURCES', () => {
  it('has chapters for every book on the shelf', () => {
    for (const book of LIBRARY) {
      expect(BOOK_SOURCES[book.id], book.id).toBeDefined();
      expect(BOOK_SOURCES[book.id].chapters.length, book.id).toBeGreaterThan(0);
    }
  });
});

describe('readHref', () => {
  it('opens each book at its first chapter, on the right domain', () => {
    const [one, two, three] = LIBRARY;
    expect(readHref(one, BOOK_SOURCES[one.id])).toBe('https://fromcopilottocolleague.com/read/01-the-shift');
    expect(readHref(two, BOOK_SOURCES[two.id])).toMatch(/^https:\/\/aiepress\.com\/second-book\/[a-z0-9-]+$/);
    expect(readHref(three, BOOK_SOURCES[three.id])).toMatch(/^https:\/\/aiepress\.com\/third-book\/[a-z0-9-]+$/);
  });

  it('falls back to the landing page when a book has no chapters', () => {
    const empty: BookSource = { chapters: [], chapterPath: () => '/x', videos: [] };
    expect(readHref(LIBRARY[2], empty)).toBe(LIBRARY[2].href);
    expect(readHref(LIBRARY[2], undefined)).toBe(LIBRARY[2].href);
  });
});

describe('watchTiles', () => {
  it('gives one tile per book, in shelf order, linking to the chapter page', () => {
    const tiles = watchTiles();
    expect(tiles.map((t) => t.bookId)).toEqual(LIBRARY.map((b) => b.id));
    for (const t of tiles) {
      expect(t.chapterNumber).toBe('01');
      expect(t.href).toMatch(/^https:\/\//);
      expect(t.poster).toMatch(/^\/video\/.+\.(png|jpg)$/);
      expect(t.duration).toMatch(/^\d+:\d{2}$/);
    }
  });

  it('skips a book with no video instead of faking a tile', () => {
    const sources = { ...BOOK_SOURCES, [LIBRARY[1].id]: { ...BOOK_SOURCES[LIBRARY[1].id], videos: [] } };
    expect(watchTiles(LIBRARY, sources).map((t) => t.bookId)).toEqual([LIBRARY[0].id, LIBRARY[2].id]);
  });

  it('skips a book with no source', () => {
    const stranger: LibraryEntry = { ...LIBRARY[0], id: 'not-a-book' };
    expect(watchTiles([stranger])).toEqual([]);
  });
});

describe('buildCatalog', () => {
  const catalog = buildCatalog();

  it('lists every book with every chapter', () => {
    expect(catalog.books.map((b) => b.id)).toEqual(LIBRARY.map((b) => b.id));
    for (const book of catalog.books) {
      expect(book.chapters.length).toBe(BOOK_SOURCES[book.id].chapters.length);
      expect(book.readUrl).toBe(book.chapters[0].url);
    }
  });

  it('uses absolute URLs only', () => {
    const urls = catalog.books.flatMap((b) => [
      b.url,
      b.readUrl,
      b.cover,
      ...b.chapters.flatMap((c) => [c.url, c.video?.url, c.video?.poster].filter(Boolean) as string[]),
    ]);
    for (const u of urls) expect(u).toMatch(/^https:\/\/(aiepress|fromcopilottocolleague)\.com\//);
  });

  it('attaches a video exactly where one was rendered', () => {
    for (const book of catalog.books) {
      const rendered = new Set(BOOK_SOURCES[book.id].videos.map((v) => v.chapterSlug));
      for (const c of book.chapters) expect(c.video !== null, `${book.id}/${c.slug}`).toBe(rendered.has(c.slug));
    }
  });

  it('carries no build timestamp, so the committed file is stable', () => {
    expect(JSON.stringify(buildCatalog())).toBe(JSON.stringify(catalog));
    expect(JSON.stringify(catalog)).not.toMatch(/generated/i);
  });
});

describe('pressLlmsTxt', () => {
  const catalog = buildCatalog();
  const txt = pressLlmsTxt(catalog);

  it('follows llms.txt: one H1, a blockquote summary, then H2 sections', () => {
    expect(txt.match(/^# /gm)).toHaveLength(1);
    expect(txt).toMatch(/^# AI Engineer Press\n\n> /);
    expect(txt).toContain('## Reference');
  });

  it('lists every book and every chapter URL from the catalogue', () => {
    for (const book of catalog.books) {
      expect(txt).toContain(`## ${book.title}: ${book.subtitle}`);
      expect(txt).toContain(`(${book.url})`);
      for (const c of book.chapters) expect(txt).toContain(`(${c.url}): ${c.promise}`);
    }
  });

  it('states each book’s status, so drafts read as drafts', () => {
    for (const book of catalog.books) expect(txt).toContain(`Status: ${book.status} (${book.measure}).`);
  });
});
