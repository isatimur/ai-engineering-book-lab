import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { bookTwo, bookThree } from './draftBooks';
import { LIBRARY, AUTHOR_BIO, libraryEntry, libraryNeighbours } from './library';
import { authorsLine } from './book';
import { colophonFor, talksCited, TYPEFACES } from './colophon';
import stats from './stats.json';
import { contrastRatio, themeStyle } from '../lib/bookTheme';

const website = resolve(__dirname, '../..');
const indexCss = readFileSync(resolve(website, 'src/index.css'), 'utf8');
const inkMuted = /--color-ink-muted:\s*(#[0-9a-fA-F]{6})/.exec(indexCss)?.[1] ?? '';

describe('book themes', () => {
  it.each([bookTwo, bookThree])('$key passes WCAG AA for every text pair', (book) => {
    const { paper, ink, accent } = book.theme;
    expect(contrastRatio(ink, paper)).toBeGreaterThanOrEqual(7);
    expect(contrastRatio(accent, paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(inkMuted, paper)).toBeGreaterThanOrEqual(4.5);
    // The video tile's duration chip: paper text on ink.
    expect(contrastRatio(paper, ink)).toBeGreaterThanOrEqual(4.5);
  });

  it('gives book 3 the house accent and book 2 a teal', () => {
    expect(bookThree.theme.accent).toBe('#C2410C');
    const n = parseInt(bookTwo.theme.accent.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    expect(g).toBeGreaterThan(r);
    expect(b).toBeGreaterThan(r);
  });

  it('sets the theme as CSS variables', () => {
    const style = themeStyle(bookTwo.theme) as Record<string, string>;
    expect(style['--color-paper']).toBe(bookTwo.theme.paper);
    expect(style['--color-ink']).toBe(bookTwo.theme.ink);
    expect(style['--color-accent']).toBe(bookTwo.theme.accent);
  });

  it('computes known contrast ratios', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#777777', '#777777')).toBeCloseTo(1, 5);
  });
});

describe('library entries', () => {
  it('carry Book 1’s author and a year', () => {
    for (const entry of LIBRARY) {
      expect(entry.author).toBe(authorsLine);
      expect(entry.year).toBeGreaterThanOrEqual(2026);
    }
    expect(AUTHOR_BIO).toContain(authorsLine);
  });

  it('link every draft book to its entry', () => {
    expect(libraryEntry(bookTwo.libraryId)?.title).toBe(bookTwo.title);
    expect(libraryEntry(bookThree.libraryId)?.title).toBe(bookThree.title);
  });

  it('give neighbours in LIBRARY order', () => {
    const two = libraryNeighbours(bookTwo.libraryId);
    expect(two.prev?.id).toBe(LIBRARY[0].id);
    expect(two.next?.id).toBe(bookThree.libraryId);
    const three = libraryNeighbours(bookThree.libraryId);
    expect(three.prev?.id).toBe(bookTwo.libraryId);
    expect(three.next).toBeUndefined();
    expect(libraryNeighbours('no-such-book')).toEqual({});
  });
});

describe('descriptions', () => {
  it.each([bookTwo, bookThree])('$key has 2–4 sentences', (book) => {
    const sentences = book.description.split(/(?<=[.!?])\s+/).filter(Boolean);
    expect(sentences.length).toBeGreaterThanOrEqual(2);
    expect(sentences.length).toBeLessThanOrEqual(4);
  });
});

describe('videos', () => {
  it.each([bookTwo, bookThree])('$key lists posters that exist, in chapter order', (book) => {
    const order = book.chapters.map((c) => c.slug);
    const slugs = book.videos.map((v) => v.chapterSlug);
    expect(slugs).toEqual([...slugs].sort((a, b) => order.indexOf(a) - order.indexOf(b)));
    for (const v of book.videos) expect(existsSync(resolve(website, 'public', v.poster.slice(1)))).toBe(true);
  });
});

describe('colophon', () => {
  const row = (book: typeof bookTwo, label: string) => colophonFor(book).find((r) => r.label === label)?.value;

  it('has every row the landing page promises', () => {
    expect(colophonFor(bookTwo).map((r) => r.label)).toEqual([
      'Words',
      'Talks cited',
      'Claims',
      'Anchors',
      'Typefaces',
      'Last updated',
      'Status',
    ]);
  });

  it('takes its numbers from the data files', () => {
    const words = bookTwo.chapters.reduce((s, c) => s + c.wordCount, 0);
    expect(row(bookTwo, 'Words')).toBe(words.toLocaleString('en-US'));
    expect(row(bookTwo, 'Claims')).toBe(String(stats.book2.claims.total));
    expect(row(bookThree, 'Claims')).toBe(String(stats.book3.claims.total));
    expect(row(bookTwo, 'Anchors')).toBe(String(stats.book2.anchors.total));
    expect(row(bookThree, 'Anchors')).toContain(String(stats.book3.source_anchors.total));
    expect(row(bookTwo, 'Last updated')).toBe(stats.generated_at.slice(0, 10));
    expect(row(bookThree, 'Status')).toBe(libraryEntry(bookThree.libraryId)?.status);
  });

  it('counts distinct cited talks', () => {
    expect(talksCited(bookTwo)).toBeGreaterThan(0);
    expect(row(bookTwo, 'Talks cited')).toBe(String(talksCited(bookTwo)));
  });

  it('names the typefaces index.css declares', () => {
    const declared = ['serif', 'sans', 'mono'].map(
      (k) => new RegExp(`--font-${k}:\\s*"([^"]+)"`).exec(indexCss)?.[1],
    );
    expect(declared).toEqual([...TYPEFACES]);
  });
});
