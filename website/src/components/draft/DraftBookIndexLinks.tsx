import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { DraftBook } from '../../data/draftBooks';
import { loadDraftLastChapter } from '../../lib/draftProgress';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/** The id of the landing page's Watch row, which "Watch the explainers" jumps to. */
export const WATCH_ANCHOR = 'watch';

export type IndexAction = {
  key: string;
  label: string;
  detail?: string;
  to: string;
  /** In-page anchors are plain links; routes go through the router. */
  anchor?: boolean;
};

/**
 * The rows, in order. Pure, so the tests can check the list without a DOM.
 * There is no Subscribe row: the site has no subscribe path yet.
 */
export const indexActions = (book: DraftBook, lastSlug: string | null): IndexAction[] => {
  const last = lastSlug ? book.byParam(lastSlug) : undefined;
  const first = book.chapters[0];
  const rows: IndexAction[] = [];
  if (last) {
    rows.push({
      key: 'read',
      label: 'Continue reading',
      detail: `Ch ${last.number} · ${last.title}`,
      to: book.chapterPath(last),
    });
  } else if (first) {
    rows.push({
      key: 'read',
      label: 'Start reading',
      detail: `Ch ${first.number} · ${first.title}`,
      to: book.chapterPath(first),
    });
  }
  if (book.videos.length > 0) {
    rows.push({
      key: 'watch',
      label: 'Watch the explainers',
      detail: `${book.videos.length} short films`,
      to: `#${WATCH_ANCHOR}`,
      anchor: true,
    });
  }
  rows.push({ key: 'figures', label: 'Figures', detail: 'Every diagram in the book', to: `${book.indexPath}/figures` });
  rows.push({ key: 'graph', label: 'Evidence graph', detail: 'Claims, talks and anchors', to: book.graph.graphUrl() });
  return rows;
};

/**
 * A draft book's landing-page actions, as a ruled list: one row each. The
 * bookmark is read after mount, so the prerendered HTML never depends on one
 * reader's storage.
 */
export const DraftBookIndexLinks = ({ book }: { book: DraftBook }) => {
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  useEffect(() => setLastSlug(loadDraftLastChapter(book.key)), [book.key]);
  const reduced = usePrefersReducedMotion();
  const arrow = reduced ? '' : 'transition-transform duration-200 group-hover:translate-x-1';

  const rowClass =
    'group flex items-baseline justify-between gap-4 py-3 px-1 hover:bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]';
  const body = (a: IndexAction): ReactNode => (
    <>
      <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
        <span className="font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
          {a.label}
        </span>
        {a.detail && <span className="font-sans text-sm text-[var(--color-ink-muted)]">{a.detail}</span>}
      </span>
      <span aria-hidden="true" className={`font-mono text-sm text-[var(--color-accent)] ${arrow}`}>
        {a.anchor ? '↓' : '→'}
      </span>
    </>
  );

  return (
    <ul className="m-0 list-none border-t border-[var(--color-ink)]/25 p-0">
      {indexActions(book, lastSlug).map((a) => (
        <li key={a.key} className="border-b border-dotted border-[var(--color-ink)]/30">
          {a.anchor ? (
            <a href={a.to} className={rowClass}>
              {body(a)}
            </a>
          ) : (
            <Link to={a.to} className={rowClass}>
              {body(a)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
