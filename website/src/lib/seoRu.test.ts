import { describe, it, expect } from 'vitest';
import {
  bookJsonLd,
  chapterJsonLd,
  conceptJsonLd,
  ruBookJsonLd,
  ruBreadcrumbJsonLd,
  ruChapterJsonLd,
} from './structuredData';
import { chapters, chapterPath } from '../data/bookChapters';
import { BOOK_RU, ruChapters, ruChapterPath } from '../data/bookChaptersRu';
import { publicUrl } from '../data/book';
import { chapterMetaDescription, ruChapterMetaDescription } from '../data/geo';
import { manifest } from './manifest';
import { hreflangLinks } from '../components/Seo';
import { ruChapterTitleTag } from '../pages/RuChapterDetail';

/**
 * Search and answer-engine metadata added for the Russian edition, the
 * Visual Guide concepts and the chapter pages. Every value must come from
 * data the page already shows.
 */

describe('hreflangLinks', () => {
  const pair = [
    { hrefLang: 'en', path: '/read/01-the-shift' },
    { hrefLang: 'ru', path: '/ru/read/01-the-shift' },
  ];

  it('adds x-default, pointing at the English original', () => {
    expect(hreflangLinks(pair)).toEqual([
      { hrefLang: 'en', href: publicUrl('/read/01-the-shift') },
      { hrefLang: 'ru', href: publicUrl('/ru/read/01-the-shift') },
      { hrefLang: 'x-default', href: publicUrl('/read/01-the-shift') },
    ]);
  });

  it('emits nothing for a page with no language versions', () => {
    expect(hreflangLinks(undefined)).toEqual([]);
    expect(hreflangLinks([])).toEqual([]);
  });
});

describe('Russian edition JSON-LD', () => {
  it('has at least one translated chapter to describe', () => {
    expect(ruChapters.length).toBeGreaterThan(0);
  });

  it('declares the Russian book a translation of book 1, with every translated chapter', () => {
    const book = ruBookJsonLd();
    expect(book['@type']).toBe('Book');
    expect(book.name).toBe(BOOK_RU);
    expect(book.inLanguage).toBe('ru');
    expect(book.translationOfWork.name).toBe(bookJsonLd().name);
    expect(book.hasPart.map((p) => p.url)).toEqual(ruChapters.map((c) => publicUrl(ruChapterPath(c))));
  });

  it('links book 1 to its translation, both ways', () => {
    expect(bookJsonLd().workTranslation?.url).toBe(ruBookJsonLd().url);
    const c = ruChapters[0];
    const en = chapters.find((x) => x.number === c.number)!;
    expect(chapterJsonLd(en, 0).workTranslation?.url).toBe(publicUrl(ruChapterPath(c)));
    expect(ruChapterJsonLd(c, 0).translationOfWork.url).toBe(publicUrl(chapterPath(c)));
  });

  it('gives each Russian chapter its own URL, language and breadcrumb', () => {
    ruChapters.forEach((c, i) => {
      const node = ruChapterJsonLd(c, i);
      expect(node.url).toBe(publicUrl(ruChapterPath(c)));
      expect(node.inLanguage).toBe('ru');
      expect(node.description).toBe(c.promise);
      const crumbs = ruBreadcrumbJsonLd(c).itemListElement;
      expect(crumbs.at(-1)?.item).toBe(node.url);
    });
  });
});

describe('conceptJsonLd', () => {
  it('describes each concept with the summary printed on its page', () => {
    for (const concept of manifest.concepts) {
      const [term, crumbs] = conceptJsonLd(concept);
      expect(term['@type']).toBe('DefinedTerm');
      expect(term.name).toBe(concept.title);
      expect(term.description).toBe(concept.summary);
      expect(crumbs['@type']).toBe('BreadcrumbList');
    }
  });
});

describe('chapter meta descriptions', () => {
  it('lead with the chapter promise and fit a search snippet', () => {
    for (const c of chapters) {
      const d = chapterMetaDescription(c);
      expect(d.startsWith(c.promise)).toBe(true);
      expect(d.length).toBeLessThanOrEqual(160);
    }
    for (const c of ruChapters) {
      const d = ruChapterMetaDescription(c);
      expect(d.startsWith(c.promise)).toBe(true);
      expect(d.length).toBeLessThanOrEqual(160);
    }
  });
});

describe('ruChapterTitleTag', () => {
  it('keeps the book name when it fits, and drops it when the title is long', () => {
    expect(ruChapterTitleTag('Вкус')).toBe(`Вкус — ${BOOK_RU}`);
    const long = 'Х'.repeat(60);
    expect(ruChapterTitleTag(long)).toBe(long);
  });
});
