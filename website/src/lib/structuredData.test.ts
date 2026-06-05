import { describe, it, expect } from 'vitest';
import { bookJsonLd, chapterJsonLd, breadcrumbJsonLd } from './structuredData';
import { chapters } from '../data/bookChapters';
import { SITE_ORIGIN } from '../data/book';

const ORIGIN = SITE_ORIGIN;

describe('bookJsonLd', () => {
  const book = bookJsonLd();

  it('is a schema.org Book', () => {
    expect(book['@context']).toBe('https://schema.org');
    expect(book['@type']).toBe('Book');
    expect(book.author['@type']).toBe('Person');
  });

  it('lists every chapter as a part in reading order', () => {
    expect(book.hasPart).toHaveLength(chapters.length);
    book.hasPart.forEach((part, i) => {
      expect(part['@type']).toBe('Chapter');
      expect(part.position).toBe(i + 1);
      expect(part.url.startsWith(`${ORIGIN}/read/`)).toBe(true);
    });
  });

  it('uses absolute URLs', () => {
    expect(book.url).toBe(`${ORIGIN}/`);
    expect(book.image.startsWith(ORIGIN)).toBe(true);
  });
});

describe('chapterJsonLd', () => {
  it('maps a chapter to a Chapter node linked to the Book', () => {
    const node = chapterJsonLd(chapters[4], 4);
    expect(node['@type']).toBe('Chapter');
    expect(node.name).toBe(chapters[4].title);
    expect(node.description).toBe(chapters[4].promise);
    expect(node.position).toBe(5);
    expect(node.isPartOf['@type']).toBe('Book');
    expect(node.url).toBe(`${ORIGIN}/read/${chapters[4].number}-${chapters[4].slug}`);
  });
});

describe('breadcrumbJsonLd', () => {
  it('builds a 3-level trail ending at the chapter', () => {
    const crumb = breadcrumbJsonLd(chapters[0]);
    expect(crumb['@type']).toBe('BreadcrumbList');
    expect(crumb.itemListElement).toHaveLength(3);
    expect(crumb.itemListElement.map((x) => x.position)).toEqual([1, 2, 3]);
    expect(crumb.itemListElement[2].name).toBe(chapters[0].title);
  });
});

describe('JSON-LD serialization safety', () => {
  it('every node serializes to valid JSON', () => {
    const all = [bookJsonLd(), chapterJsonLd(chapters[0], 0), breadcrumbJsonLd(chapters[0])];
    for (const node of all) {
      expect(() => JSON.parse(JSON.stringify(node))).not.toThrow();
    }
  });
});
