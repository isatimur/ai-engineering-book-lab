import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { DraftBook } from '../../data/draftBooks';
import { AUTHOR_BIO, LIBRARY } from '../../data/library';
import { formatReadingTime } from '../../lib/readingStats';
import { themeStyle } from '../../lib/bookTheme';
import { CATALOGUE_PATH, useEscToCatalogue } from '../../hooks/useEscToCatalogue';
import { Book3D } from '../Book3D';
import { BookColophon } from './BookColophon';
import { BookNeighbours } from './BookNeighbours';
import { DraftBookIndexLinks } from './DraftBookIndexLinks';
import { SectionLabel } from './SectionLabel';
import { WatchRow } from './WatchRow';

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--color-ink)]/30 py-2">
    <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">{label}</dt>
    <dd className="m-0 font-sans text-sm text-[var(--color-ink)]">{value}</dd>
  </div>
);

/**
 * A draft book's landing page (books 2 and 3): the book's colours, a
 * two-column hero (cover left; label, title, author, description, facts and
 * actions right), then the contents the page passes in, the explainer films,
 * the author, the colophon and the neighbouring books. `fullText` follows
 * last. Esc returns to the catalogue.
 */
export const DraftBookLanding = ({
  book,
  contents,
  fullText,
  plannedChapters,
}: {
  book: DraftBook;
  contents: ReactNode;
  fullText?: ReactNode;
  /** For a book with no prose yet: how many chapters the outline plans. */
  plannedChapters?: number;
}) => {
  useEscToCatalogue();
  const index = LIBRARY.findIndex((b) => b.id === book.libraryId);
  const entry = LIBRARY[index];
  const words = book.chapters.reduce((sum, c) => sum + c.wordCount, 0);
  const first = book.chapters[0];
  const isEmpty = book.chapters.length === 0;

  return (
    <div
      style={themeStyle(book.theme)}
      className="min-h-screen bg-[var(--color-paper)] pb-24 text-[var(--color-ink)] antialiased"
    >
      <header className="flex items-center justify-between border-b border-[var(--color-ink)]/25 px-6 py-5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] lg:px-12">
        <Link to={CATALOGUE_PATH} className="hover:text-[var(--color-ink)]">
          ← <span className="hidden sm:inline">[Esc] </span>Catalogue
        </Link>
        <span>{book.label}</span>
        <span className="hidden w-20 sm:block" />
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pt-10 lg:grid-cols-2 lg:gap-14 lg:px-12 lg:pt-14">
          <div>
            <div
              className="flex items-center justify-center py-16 lg:py-24"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--color-accent) 26%, var(--color-paper)), color-mix(in srgb, var(--color-accent) 10%, var(--color-paper)) 70%)',
              }}
            >
              {entry && (
                <div className="lg:scale-125">
                  <Book3D book={entry} href={first ? book.chapterPath(first) : book.indexPath} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel>{`Book ${index + 1} · ${entry?.status ?? 'Draft'}`}</SectionLabel>
              <h1 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl">{book.title}</h1>
              {entry && (
                <p className="mt-3 font-serif text-lg italic text-[var(--color-ink-muted)] md:text-xl">
                  {entry.subtitle}
                </p>
              )}
              <p className="mt-4 font-sans text-base text-[var(--color-ink)]">
                by <span className="text-[var(--color-accent)]">{entry?.author}</span>
              </p>
            </div>

            <div>
              <SectionLabel>About the book</SectionLabel>
              <p className="mt-4 font-serif text-lg leading-relaxed text-[var(--color-ink)]">
                {book.description}
              </p>
            </div>

            <dl className="m-0">
              <MetaRow label="Status" value={entry?.status ?? 'Drafting'} />
              <MetaRow
                label="Chapters"
                value={isEmpty && plannedChapters ? `${plannedChapters} planned` : String(book.chapters.length)}
              />
              {!isEmpty && <MetaRow label="Reading time" value={formatReadingTime(words).replace(/ read$/, '')} />}
            </dl>

            <div>
              <SectionLabel>Read</SectionLabel>
              <div className="mt-3">
                <DraftBookIndexLinks book={book} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pt-20 lg:px-12">
          <SectionLabel as="h2">Contents</SectionLabel>
          <div className="mt-6 max-w-3xl">{contents}</div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-12">
          <WatchRow book={book} />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-16 lg:grid-cols-2 lg:px-12">
          <section aria-label="About the author">
            <SectionLabel as="h2">Author</SectionLabel>
            <p className="mt-4 font-serif text-lg italic text-[var(--color-ink)]">{entry?.author}</p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-ink)]">{AUTHOR_BIO}</p>
          </section>
          <BookColophon book={book} />
        </div>

        <div className="pt-16">
          <BookNeighbours book={book} escHint />
        </div>

        {fullText && (
          <section aria-label="The full text" className="pt-16">
            <div className="mx-auto max-w-6xl px-6 lg:px-12">
              <SectionLabel as="h2">The full text</SectionLabel>
            </div>
            <div className="mt-6">{fullText}</div>
          </section>
        )}
      </main>
    </div>
  );
};
