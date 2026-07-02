import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { chapters } from '../data/bookChapters';
import { GLOSSARY } from '../data/glossary';
import { buildSearchIndex, search, type MatchRange, type SearchResult } from '../lib/search';

/** Render a snippet with its matched ranges wrapped in <mark>. */
const Highlighted = ({ text, matches }: { text: string; matches: MatchRange[] }) => {
  if (matches.length === 0) return <>{text}</>;
  const out: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.start > cursor) out.push(text.slice(cursor, m.start));
    out.push(
      <mark key={i} className="bg-[var(--color-ink)]/10 text-[var(--color-ink)] rounded-[1px] px-0.5">
        {text.slice(m.start, m.end)}
      </mark>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) out.push(text.slice(cursor));
  return <>{out}</>;
};

const ResultRow = ({ r }: { r: SearchResult }) => (
  <Link
    to={r.href}
    className="block border-b border-[var(--color-border)] py-4 group hover:bg-[var(--color-ink)]/[0.015] transition-colors"
  >
    <div className="mb-1 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
      <span className="border border-[var(--color-border)] rounded-sm px-1.5 py-0.5">
        {r.kind === 'glossary' ? 'Term' : `Ch ${r.chapterNumber}`}
      </span>
      <span className="truncate">{r.title}{r.section ? ` · ${r.section}` : ''}</span>
    </div>
    <p className="font-serif text-[15px] leading-[1.55] text-[var(--color-ink)]">
      <Highlighted text={r.snippet} matches={r.matches} />
    </p>
  </Link>
);

export const Search = () => {
  const [query, setQuery] = useState('');
  const index = useMemo(() => buildSearchIndex(chapters, GLOSSARY), []);
  const results = useMemo(() => search(index, query, 30), [index, query]);
  const trimmed = query.trim();

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo title="Search — From Copilot to Colleague" description="Search across every chapter and glossary term of the book." path="/search" noindex />
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
        <Link to="/" className="hover:opacity-60">← Catalogue</Link>
        <span>From Copilot to Colleague · Search</span>
        <Link to="/read" className="hover:opacity-60">Reader →</Link>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <h1 className="mb-8 font-serif text-4xl italic leading-none md:text-5xl">Search the book</h1>

        <div className="relative mb-2">
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters and glossary…"
            aria-label="Search the book"
            className="w-full border-b-2 border-[var(--color-ink)] bg-transparent py-3 pr-10 font-serif text-xl placeholder:text-[var(--color-ink-muted)]/60 focus:outline-none"
          />
        </div>

        <div className="mb-10 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
          {trimmed.length === 0
            ? 'Type to search across all 10 chapters and the glossary.'
            : `${results.length} result${results.length === 1 ? '' : 's'} for "${trimmed}"`}
        </div>

        {trimmed.length > 0 && results.length === 0 ? (
          <p className="font-serif text-lg text-[var(--color-ink-muted)]">
            No matches. Try a single keyword — a concept, a name, or a term.
          </p>
        ) : (
          <div>
            {results.map((r, i) => (
              <ResultRow key={`${r.href}-${i}`} r={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
