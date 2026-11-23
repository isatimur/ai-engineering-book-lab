import { Link } from 'react-router-dom';
import type { DraftBook } from '../data/draftBooks';
import { Seo } from '../components/Seo';
import { LightboxProvider, useLightbox } from '../lib/lightbox';
import type { BookFigure } from '../data/bookFigures';

const FigureCard = ({ book, fig }: { book: DraftBook; fig: BookFigure }) => {
  const { open } = useLightbox();
  const src = book.figures.src(fig);
  return (
    <figure className="border border-[var(--color-border)] bg-white">
      <button
        type="button"
        onClick={() => open(src, fig.title)}
        className="block w-full cursor-zoom-in p-2"
        aria-label={`Enlarge: ${fig.title}`}
      >
        <img src={src} alt={fig.title} className="block w-full h-auto" loading="lazy" />
      </button>
      <figcaption className="border-t border-[var(--color-border)] px-4 py-3 font-serif text-sm">
        <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">
          {fig.kind === 'opener' ? 'The argument' : 'How it works'}
        </span>
        {fig.title}
      </figcaption>
    </figure>
  );
};

/**
 * Every figure of a draft book, chapter by chapter: the book-2/3 counterpart
 * of book 1's Visual Guide. Reads the same figure spec the chapter pages use.
 */
export const DraftBookFiguresPage = ({ book }: { book: DraftBook }) => {
  const byChapter = book.chapters
    .map((c) => ({ chapter: c, figures: book.figures.figures.filter((f) => f.chapter === c.number) }))
    .filter((g) => g.figures.length > 0);

  return (
    <LightboxProvider>
      <Seo
        title={`Figures — ${book.label}`}
        description={`Every "how it works" figure in ${book.title}, chapter by chapter.`}
        path={`${book.indexPath}/figures`}
        noindex
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to={book.indexPath} className="hover:text-[var(--color-ink)]">← {book.label}</Link>
          <span>Figures</span>
          <Link to={book.graph.graphUrl()} className="hover:text-[var(--color-ink)]">Evidence graph</Link>
        </header>
        <main id="main" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">{book.title}</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">How it works, in pictures</h1>
          <p className="font-serif text-lg text-[var(--color-ink-muted)] mb-12 max-w-3xl">
            {book.figures.figures.length} figures. Each one cites the claims and talks it draws on.
          </p>
          {byChapter.length === 0 && (
            <p className="font-serif text-[var(--color-ink-muted)]">No figures yet.</p>
          )}
          {byChapter.map(({ chapter, figures }) => (
            <section key={chapter.slug} className="mb-16">
              <h2 className="font-serif text-2xl mb-6">
                <span className="font-mono text-[11px] text-[var(--color-ink-muted)] mr-3">{chapter.number}</span>
                <Link to={book.chapterPath(chapter)} className="hover:underline">{chapter.title}</Link>
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {figures.map((fig) => (
                  <FigureCard key={fig.id} book={book} fig={fig} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </LightboxProvider>
  );
};
