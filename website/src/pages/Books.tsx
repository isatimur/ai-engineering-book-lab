import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { BOOK, SITE_ORIGIN, absoluteUrl } from '../data/book';
import { chapters } from '../data/bookChapters';
import { chaptersTwo } from '../data/bookChaptersTwo';
import stats from '../data/stats.json';

const countBook2Words = () => chaptersTwo.reduce((sum, c) => sum + c.wordCount, 0);

const booksCollectionJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Books — AI Engineer Press',
  url: `${SITE_ORIGIN}/books`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: `${SITE_ORIGIN}/`,
      name: BOOK.title,
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: `${SITE_ORIGIN}/second-book`,
      name: 'The Model Layer',
    },
  ],
});

const Header = () => (
  <header className="no-print flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <Link to="/" className="hover:opacity-60">← Catalogue</Link>
    <span>AI Engineer Press · Books</span>
    <span className="opacity-0" aria-hidden>spacer</span>
  </header>
);

export const Books = () => {
  const book2Words = countBook2Words();

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="Books — AI Engineer Press"
        description="The AI Engineer Press library: From Copilot to Colleague, plus works in progress."
        path="/books"
        type="website"
      />
      <JsonLd data={booksCollectionJsonLd()} />
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          AI Engineer Press
        </p>
        <h1 className="mb-10 font-serif text-4xl italic leading-tight md:text-5xl">
          Books
        </h1>

        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="block rounded-sm border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-6 text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
              {BOOK.category}
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              {BOOK.title}
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed opacity-80">
              {BOOK.subtitle}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-60">
              {chapters.length} chapters · {stats.chapters.total} drafted
            </p>
          </Link>

          <Link
            to="/second-book"
            className="block rounded-sm border border-dashed border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-ink)]"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              Drafting
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              The Model Layer
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
              An early, source-anchored draft on how AI engineering is reshaping training, inference, and the long tail of domains beyond text.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              {chaptersTwo.length} chapters · {book2Words.toLocaleString()} words · {stats.book2.claims.total} claims · {stats.book2.anchors.total} anchors
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};
