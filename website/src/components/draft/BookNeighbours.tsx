import { Link } from 'react-router-dom';
import { bookThree, bookTwo, type DraftBook } from '../../data/draftBooks';
import { libraryNeighbours, type LibraryEntry } from '../../data/library';
import { CATALOGUE_PATH } from '../../hooks/useEscToCatalogue';
import { SectionLabel } from './SectionLabel';

const DRAFT_BOOKS = [bookTwo, bookThree];

/**
 * A neighbour's link target. Books 2 and 3 live on this site, so they route
 * in-app; book 1 lives on its own domain and needs its absolute URL.
 */
export const neighbourTarget = (entry: LibraryEntry): { to: string; internal: boolean } => {
  const draft = DRAFT_BOOKS.find((b) => b.libraryId === entry.id);
  return draft ? { to: draft.indexPath, internal: true } : { to: entry.href, internal: false };
};

const Neighbour = ({ entry, dir }: { entry: LibraryEntry; dir: 'prev' | 'next' }) => {
  const { to, internal } = neighbourTarget(entry);
  const className = `group flex flex-col gap-1 ${dir === 'next' ? 'items-end text-right' : ''}`;
  const body = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
        {dir === 'prev' ? '← Previous book' : 'Next book →'}
      </span>
      <span className="font-serif text-xl italic text-[var(--color-ink)] group-hover:text-[var(--color-accent)] group-hover:underline">
        {entry.title}
      </span>
      <span className="font-sans text-xs text-[var(--color-ink-muted)]">{entry.status}</span>
    </>
  );
  return internal ? (
    <Link to={to} className={className}>
      {body}
    </Link>
  ) : (
    <a href={to} className={className}>
      {body}
    </a>
  );
};

/**
 * Previous and next book, in LIBRARY order, and the way back to the
 * catalogue. `escHint` says Esc works; only the landing pages bind it.
 */
export const BookNeighbours = ({ book, escHint = false }: { book: DraftBook; escHint?: boolean }) => {
  const { prev, next } = libraryNeighbours(book.libraryId);
  return (
    <nav aria-label="Other books" className="mx-auto max-w-6xl px-6 lg:px-12">
      <SectionLabel>More from the press</SectionLabel>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3 sm:items-start">
        <div>{prev && <Neighbour entry={prev} dir="prev" />}</div>
        <div className="sm:text-center">
          <Link
            to={CATALOGUE_PATH}
            className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4 hover:text-[var(--color-accent)]"
          >
            {escHint && <span className="hidden sm:inline">[Esc] </span>}
            All books
          </Link>
        </div>
        <div className="sm:flex sm:justify-end">{next && <Neighbour entry={next} dir="next" />}</div>
      </div>
    </nav>
  );
};
