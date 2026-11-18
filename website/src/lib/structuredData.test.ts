import { describe, it, expect } from 'vitest';
import {
  bookJsonLd,
  chapterJsonLd,
  breadcrumbJsonLd,
  whatIsThisBookJsonLd,
  aboutTheMethodJsonLd,
  chapterVideoJsonLd,
  booksCollectionJsonLd,
  pressJsonLd,
} from './structuredData';
import { chapters } from '../data/bookChapters';
import { SITE_ORIGIN, BOOK } from '../data/book';
import { bookDefinitionEntries } from '../data/geo';
import { chapterVideoFor } from '../data/chapterVideos';
import { LIBRARY } from '../data/library';

const ORIGIN = SITE_ORIGIN;

describe('bookJsonLd', () => {
  const book = bookJsonLd();

  it('is a schema.org Book', () => {
    expect(book['@context']).toBe('https://schema.org');
    expect(book['@type']).toBe('Book');
    expect(book.author).toHaveLength(BOOK.authors.length);
    book.author.forEach((a) => expect(a['@type']).toBe('Person'));
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

  it('carries a non-empty abstract and per-chapter keywords', () => {
    expect(book.abstract.length).toBeGreaterThan(40);
    expect(book.keywords).toEqual(chapters.map((c) => c.title));
  });

  it('cites the claims-ledger method as a CreativeWork', () => {
    expect(book.citation['@type']).toBe('CreativeWork');
    expect(book.citation.url).toBe('https://github.com/isatimur/claims-ledger');
  });
});

describe('whatIsThisBookJsonLd', () => {
  const faq = whatIsThisBookJsonLd();

  it('is a schema.org FAQPage matching the shared definition entries', () => {
    const entries = bookDefinitionEntries();
    expect(faq['@context']).toBe('https://schema.org');
    expect(faq['@type']).toBe('FAQPage');
    expect(faq.mainEntity).toHaveLength(entries.length);
    faq.mainEntity.forEach((q, i) => {
      expect(q['@type']).toBe('Question');
      expect(q.name).toBe(entries[i].question);
      expect(q.acceptedAnswer['@type']).toBe('Answer');
      expect(q.acceptedAnswer.text).toBe(entries[i].answer);
    });
  });

  it('every answer mentions the book title', () => {
    for (const entry of bookDefinitionEntries()) {
      expect(entry.answer.length).toBeGreaterThan(0);
    }
    expect(bookDefinitionEntries()[0].answer).toContain(BOOK.title);
  });
});

describe('aboutTheMethodJsonLd', () => {
  it('is an Article linked back to the Book', () => {
    const node = aboutTheMethodJsonLd();
    expect(node['@type']).toBe('Article');
    expect(node.headline).toContain(BOOK.title);
    expect(node.isPartOf['@type']).toBe('Book');
    expect(node.url).toBe(`${ORIGIN}/`);
  });
});

describe('chapterVideoJsonLd', () => {
  it('is a VideoObject linked to its chapter, with an ISO 8601 duration', () => {
    const chapter = chapters[0];
    const video = chapterVideoFor(chapter.slug);
    expect(video).toBeDefined();
    const node = chapterVideoJsonLd(chapter, video!);
    expect(node['@type']).toBe('VideoObject');
    expect(node.contentUrl).toBe(`${ORIGIN}${video!.src}`);
    expect(node.thumbnailUrl).toBe(`${ORIGIN}${video!.poster}`);
    expect(node.duration).toBe(`PT${video!.durationSeconds}S`);
    expect(node.isPartOf['@type']).toBe('Chapter');
    expect(node.isPartOf.name).toBe(chapter.title);
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

describe('booksCollectionJsonLd', () => {
  const list = booksCollectionJsonLd();

  it('is a schema.org ItemList', () => {
    expect(list['@context']).toBe('https://schema.org');
    expect(list['@type']).toBe('ItemList');
    expect(list.url).toBe(`${ORIGIN}/books`);
  });

  // This asserted a hardcoded length of 2 and was titled "lists both books".
  // Book 3 shipped, the list stayed at two, and the test went on passing —
  // it had pinned the omission as intended behaviour. Asserting against
  // LIBRARY instead means a fourth book cannot be silently left out.
  it('lists every book the press publishes', () => {
    expect(list.itemListElement).toHaveLength(LIBRARY.length);
    expect(list.itemListElement.map((x) => x.position)).toEqual(
      LIBRARY.map((_, i) => i + 1),
    );
    expect(list.itemListElement.map((x) => x.name)).toEqual(
      LIBRARY.map((b) => b.title),
    );
    expect(list.itemListElement.map((x) => x.url)).toEqual(
      LIBRARY.map((b) => `${ORIGIN}${b.href === '/' ? '/' : b.href}`),
    );
  });

  it('includes book three, which the hardcoded list omitted', () => {
    expect(list.itemListElement.map((x) => x.url)).toContain(`${ORIGIN}/third-book`);
  });
});

describe('pressJsonLd', () => {
  const press = pressJsonLd();

  it('describes the imprint, not one of its books', () => {
    expect(press['@type']).toBe('Organization');
    expect(press.name).toBe('AI Engineer Press');
    expect(press.url).toBe(`${ORIGIN}/`);
  });
});

describe('JSON-LD serialization safety', () => {
  it('every node serializes to valid JSON', () => {
    const all = [
      bookJsonLd(),
      chapterJsonLd(chapters[0], 0),
      breadcrumbJsonLd(chapters[0]),
      whatIsThisBookJsonLd(),
      aboutTheMethodJsonLd(),
      chapterVideoJsonLd(chapters[0], chapterVideoFor(chapters[0].slug)!),
      booksCollectionJsonLd(),
    ];
    for (const node of all) {
      expect(() => JSON.parse(JSON.stringify(node))).not.toThrow();
    }
  });
});
