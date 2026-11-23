import { lazy, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { DraftBook } from '../data/draftBooks';
import { Seo } from '../components/Seo';

const EvidenceGraphView = lazy(() =>
  import('../components/evidence/EvidenceGraphView').then((m) => ({ default: m.EvidenceGraphView })),
);

/**
 * A draft book's evidence graph: its claims, the practitioners who back them
 * and the talks they come from, optionally filtered to one chapter
 * (`?chapter=NN`). The book-2/3 counterpart of book 1's /read/graph.
 */
export const DraftBookGraphPage = ({ book }: { book: DraftBook }) => {
  const [params] = useSearchParams();
  const active = params.get('chapter') ?? undefined;
  const chapter = active ? book.chapters.find((c) => c.number === active.padStart(2, '0')) : undefined;
  const stats = book.graph.api.getGraph().stats;

  return (
    <>
      <Seo
        title={`Evidence Graph${chapter ? ` — Chapter ${chapter.number}` : ''} — ${book.label}`}
        description={`How the claims of ${book.title} connect to practitioners and the talks they come from.`}
        path={`${book.indexPath}/graph`}
        noindex
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to={book.indexPath} className="hover:text-[var(--color-ink)]">← {book.label}</Link>
          <span>Evidence graph</span>
          <Link to={`${book.indexPath}/figures`} className="hover:text-[var(--color-ink)]">All figures</Link>
        </header>
        <main id="main" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            {book.title}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4 max-w-3xl">
            {chapter ? `Chapter ${chapter.number}: how claims connect to sources` : 'How claims connect to practitioners and talks'}
          </h1>
          <p className="font-serif text-lg text-[var(--color-ink-muted)] mb-8 max-w-3xl">
            {stats.claims} claims · {stats.speakers} practitioners · {stats.videos} talks · {stats.anchors} anchored quotes.
            {chapter && (
              <>
                {' '}
                <Link to={book.chapterPath(chapter)} className="underline">Read chapter {chapter.number} →</Link>{' '}
                <Link to={book.graph.graphUrl()} className="underline">Whole book →</Link>
              </>
            )}
          </p>
          <Suspense
            fallback={
              <div className="h-[560px] border border-[var(--color-border)] flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                Loading graph…
              </div>
            }
          >
            <EvidenceGraphView chapterNumber={chapter?.number} book={book.graph} />
          </Suspense>
        </main>
      </div>
    </>
  );
};
