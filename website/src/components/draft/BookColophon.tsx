import type { DraftBook } from '../../data/draftBooks';
import { colophonFor } from '../../data/colophon';
import { SectionLabel } from './SectionLabel';

/** The book's colophon: what it is made of, from the data files (data/colophon.ts). */
export const BookColophon = ({ book }: { book: DraftBook }) => (
  <section aria-label="Colophon">
    <SectionLabel as="h2">Colophon</SectionLabel>
    <dl className="m-0 mt-4">
      {colophonFor(book).map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--color-ink)]/30 py-2"
        >
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">{row.label}</dt>
          <dd className="m-0 text-right font-sans text-sm text-[var(--color-ink)] tabular-nums">{row.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
