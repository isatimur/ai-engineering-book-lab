import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DraftBook } from '../../data/draftBooks';
import { loadDraftLastChapter } from '../../lib/draftProgress';

const linkClass =
  'font-mono text-[10px] uppercase tracking-widest border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors';

/**
 * A draft book's landing-page links: continue where the reader left off, the
 * evidence graph and the figures gallery. The bookmark is read after mount, so
 * the prerendered HTML never depends on one reader's storage.
 */
export const DraftBookIndexLinks = ({ book }: { book: DraftBook }) => {
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  useEffect(() => setLastSlug(loadDraftLastChapter(book.key)), [book.key]);
  const last = lastSlug ? book.byParam(lastSlug) : undefined;

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {last && (
        <Link to={book.chapterPath(last)} className={linkClass}>
          Continue: Ch {last.number} · {last.title} →
        </Link>
      )}
      <Link to={book.graph.graphUrl()} className={linkClass}>
        Evidence graph →
      </Link>
      <Link to={`${book.indexPath}/figures`} className={linkClass}>
        All figures →
      </Link>
    </div>
  );
};
