import { useState } from 'react';
import type { CSSProperties } from 'react';
import { BOOK, BOOK_ORIGIN, publicUrl } from '../../data/book';
import { chapters } from '../../data/bookChapters';
import { chaptersTwo, BOOK_TWO_TITLE } from '../../data/bookChaptersTwo';
import explainer from '../../data/press-explainer.json';
import stats from '../../data/stats.json';
import { useReveal } from './useReveal';

/**
 * How the chapters of a book hold together: an arc joins two chapters that
 * cite the same ledger entry, and its weight is how many entries they share.
 * Data comes from press-explainer.json, which the build derives from the
 * evidence files. Book 3 has no ledger yet, so it has no web to draw.
 */

const BOOKS = {
  1: {
    title: BOOK.title,
    chapters: chapters.map((c) => ({ n: Number(c.number), title: c.title, href: `${BOOK_ORIGIN}/read/${c.number}-${c.slug}` })),
  },
  2: {
    title: BOOK_TWO_TITLE,
    chapters: chaptersTwo.map((c) => ({ n: Number(c.number), title: c.title, href: publicUrl(`/second-book/${c.slug}`) })),
  },
} as const;

type BookId = keyof typeof BOOKS;

const W = 1000;
const BASE = 300;

export const ChapterWeb = () => {
  const ref = useReveal<HTMLDivElement>();
  const [bookId, setBookId] = useState<BookId>(1);
  // Hover previews a chapter; a click (or tap, or Enter) pins it, so the
  // pointer can leave the chapter and still reach the link in the panel.
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const focus = hover ?? pinned;
  const web = explainer.webs.find((w) => w.book === bookId)!;
  const meta = BOOKS[bookId];
  const n = web.chapters.length;
  const x = (c: number) => ((web.chapters.findIndex((ch) => ch.n === c) + 0.5) / n) * W;
  const maxShared = Math.max(...web.links.map((l) => l.shared));
  const touches = (l: { a: number; b: number }) => focus !== null && (l.a === focus || l.b === focus);
  const focusMeta = focus === null ? null : meta.chapters.find((c) => c.n === focus);
  const focusLinks = focus === null ? [] : web.links.filter(touches);
  const focusClaims = web.chapters.find((c) => c.n === focus)?.claims ?? 0;

  const arc = (l: { a: number; b: number }) => {
    const xa = x(l.a);
    const xb = x(l.b);
    const rx = (xb - xa) / 2;
    return `M${xa} ${BASE} A ${rx} ${Math.min(rx * 0.62, BASE - 12)} 0 0 1 ${xb} ${BASE}`;
  };

  return (
    <div ref={ref} className="hiw-layer">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {([1, 2] as BookId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setBookId(id);
              setHover(null);
              setPinned(null);
            }}
            aria-pressed={bookId === id}
            className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${bookId === id ? 'border-[#D9A55B]/70 text-[#D9A55B]' : 'border-white/15 text-white/50 hover:text-white/80'}`}
          >
            Book {id} · {BOOKS[id].title}
          </button>
        ))}
      </div>

      <div className="rv" style={{ '--d': '100ms' } as CSSProperties}>
        <svg viewBox={`0 0 ${W} ${BASE + 24}`} className="h-auto w-full" aria-hidden>
          <line x1={0} x2={W} y1={BASE} y2={BASE} stroke="rgba(249,247,241,0.12)" />
          {web.links.map((l, k) => {
            const on = touches(l);
            return (
              <path
                key={`${bookId}-${l.a}-${l.b}`}
                className="hiw-draw"
                style={{
                  transition: `stroke-dashoffset 1100ms cubic-bezier(0.65, 0, 0.35, 1) ${200 + k * 30}ms, stroke-opacity 300ms, stroke 300ms`,
                }}
                d={arc(l)}
                fill="none"
                stroke={on ? '#D9A55B' : 'rgba(249,247,241,0.55)'}
                strokeOpacity={focus === null ? 0.25 + 0.55 * (l.shared / maxShared) : on ? 0.95 : 0.06}
                strokeWidth={0.8 + 4 * (l.shared / maxShared)}
                pathLength={1}
              />
            );
          })}
          {focusLinks.map((l) => (
            <path key={`flow-${l.a}-${l.b}`} className="hiw-flow" d={arc(l)} fill="none" stroke="#F4D9A8" strokeWidth={1.5} pathLength={1} />
          ))}
          {web.chapters.map((c) => (
            <circle
              key={c.n}
              cx={x(c.n)}
              cy={BASE}
              r={5 + Math.sqrt(c.claims) * 2}
              fill={focus === c.n ? '#D9A55B' : '#1F1D1B'}
              stroke={focus === c.n ? '#D9A55B' : 'rgba(249,247,241,0.5)'}
              onMouseEnter={() => setHover(c.n)}
              onMouseLeave={() => setHover(null)}
              style={{ transition: 'fill 200ms' }}
            />
          ))}
        </svg>
        <ol className="mt-3 grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {web.chapters.map((c) => (
            <li key={c.n} className="flex justify-center">
              <button
                type="button"
                aria-label={`Chapter ${c.n}: show the claims it shares`}
                aria-pressed={pinned === c.n}
                onMouseEnter={() => setHover(c.n)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  setHover(null);
                  setPinned(pinned === c.n ? null : c.n);
                }}
                className={`h-8 w-8 rounded-full font-mono text-[10px] transition-colors ${focus === c.n ? 'text-[#D9A55B]' : 'text-white/45 hover:text-white'}`}
              >
                {c.n}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-8 min-h-[7.5rem] max-w-2xl text-center" aria-live="polite">
        {focusMeta ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D9A55B]">Chapter {focusMeta.n}</p>
            <p className="mt-2 font-serif text-xl italic text-white/90">
              <a href={focusMeta.href} className="hover:text-white">
                {focusMeta.title}
              </a>
            </p>
            <p className="mt-3 font-sans text-sm font-light text-white/60">
              Cites {focusClaims} ledger {focusClaims === 1 ? 'entry' : 'entries'}, and shares at least one with{' '}
              {focusLinks.length} of the other {n - 1} chapters.
            </p>
          </>
        ) : (
          <>
            <p className="font-serif text-3xl text-white/90 md:text-4xl">
              {web.shared} of {web.claims} claims
            </p>
            <p className="mt-3 font-sans text-sm font-light text-white/60">
              appear in two or more chapters of {meta.title}. Each arc joins two chapters that cite the same ledger entry;
              a thicker arc means more shared entries. Point at a chapter to see its links; click it to keep them.
            </p>
          </>
        )}
      </div>
      {stats.book3.claims.total === 0 && (
        <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
          Book 3 has no ledger yet, so it has no web to draw
        </p>
      )}
    </div>
  );
};
