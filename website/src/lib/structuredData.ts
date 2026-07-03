import { BOOK, SITE_ORIGIN, absoluteUrl } from '../data/book';
import { chapters, chapterPath, type BookChapter } from '../data/bookChapters';
import type { EventLedger } from './eventLedgers';
import { listEventLedgers, ledgerStats } from './eventLedgers';

/**
 * schema.org JSON-LD builders. Every field traces to real book/chapter data —
 * no invented metadata. Returned as plain objects; the <JsonLd> component
 * serializes them into the document head at build time.
 */

const author = () => ({ '@type': 'Person', name: BOOK.author });

/** The Book node — emitted on the landing page. Lists chapters as parts. */
export const bookJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: BOOK.title,
  alternativeName: BOOK.subtitle,
  author: author(),
  description: BOOK.subtitle,
  url: `${SITE_ORIGIN}/`,
  image: absoluteUrl(BOOK.coverImage),
  inLanguage: 'en',
  genre: BOOK.category,
  bookFormat: 'https://schema.org/EBook',
  isAccessibleForFree: true,
  hasPart: chapters.map((c, i) => ({
    '@type': 'Chapter',
    position: i + 1,
    name: c.title,
    url: absoluteUrl(chapterPath(c)),
  })),
});

/** A Chapter node — emitted on each /read/:slug page, linked back to the Book. */
export const chapterJsonLd = (chapter: BookChapter, index: number) => ({
  '@context': 'https://schema.org',
  '@type': 'Chapter',
  name: chapter.title,
  description: chapter.promise,
  url: absoluteUrl(chapterPath(chapter)),
  position: index + 1,
  author: author(),
  inLanguage: 'en',
  isPartOf: {
    '@type': 'Book',
    name: BOOK.title,
    url: `${SITE_ORIGIN}/`,
  },
});

/** CollectionPage for /ledgers index. */
export const ledgersIndexJsonLd = () => {
  const ledgers = listEventLedgers();
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Fact-checked event ledgers',
    description:
      'Source-anchored claim ledgers from the AI Engineer practitioner corpus — every claim links to the exact second of the talk.',
    url: `${SITE_ORIGIN}/ledgers`,
    isPartOf: {
      '@type': 'Book',
      name: BOOK.title,
      url: `${SITE_ORIGIN}/`,
    },
    hasPart: ledgers.map((ledger) => ({
      '@type': 'CreativeWork',
      name: ledger.title,
      url: `${SITE_ORIGIN}/ledgers/${ledger.slug}`,
    })),
  };
};

/** Individual event ledger page — Article with citation anchors. */
export const eventLedgerJsonLd = (ledger: EventLedger) => {
  const stats = ledgerStats(ledger);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ledger.title,
    description: `${stats.claims} source-anchored claims · ${ledger.subtitle}`,
    url: `${SITE_ORIGIN}/ledgers/${ledger.slug}`,
    author: { '@type': 'Organization', name: 'claims-ledger' },
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Fact-checked event ledgers',
      url: `${SITE_ORIGIN}/ledgers`,
    },
    citation: ledger.claims.flatMap((claim) =>
      claim.anchors.map((anchor) => ({
        '@type': 'CreativeWork',
        name: anchor.label,
        url: `https://www.youtube.com/watch?v=${anchor.video_id}&t=${anchor.start_seconds}s`,
      })),
    ),
  };
};

/** Breadcrumb trail: Home → The Book → Chapter N. */
export const breadcrumbJsonLd = (chapter: BookChapter) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'The Book', item: `${SITE_ORIGIN}/read` },
    {
      '@type': 'ListItem',
      position: 3,
      name: chapter.title,
      item: absoluteUrl(chapterPath(chapter)),
    },
  ],
});
