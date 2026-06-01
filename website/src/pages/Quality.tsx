import { Fragment } from 'react';
import { chapters } from '../data/bookChapters';
import {
  judgeScores,
  scoreForChapter,
  hasJudgeData,
  labelColor,
  DIMS,
  DIM_LABELS,
  type DimName,
  type WeakParagraph,
} from '../lib/judgeScores';

const fmt = (n: number | null | undefined): string =>
  n === null || n === undefined ? '—' : String(Math.round(n));

const titleFor = (num: string): string =>
  chapters.find((c) => c.number === num)?.title ?? `Chapter ${num}`;

const Header = () => {
  const r = judgeScores.run;
  const cost = r.total_cost_usd != null ? `$${r.total_cost_usd.toFixed(2)}` : '—';
  const date = r.finished_at ? r.finished_at.slice(0, 10) : '—';
  const hash = r.corpus_snapshot_hash ? r.corpus_snapshot_hash.replace('sha256:', '').slice(0, 12) : '—';
  const cov = r.coverage ?? {};
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span>run {r.run_id ?? '—'}</span>
        <span>{date}</span>
        <span>cost {cost}</span>
        <span>mash {r.book_mash_version ?? '—'}</span>
        <span>snapshot {hash}</span>
        <span>status {r.status ?? '—'}</span>
      </div>
      {r.partial && (
        <div
          className="mb-8 border px-4 py-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em]"
          style={{ borderColor: labelColor('weak'), color: labelColor('weak') }}
        >
          Partial run — some dimensions were rate-limited and not every paragraph was
          scored. Shown numbers are computed from the paragraphs that were. Coverage:{' '}
          {DIMS.map((d) => {
            const c = cov[d];
            return c && c.total ? `${DIM_LABELS[d]} ${c.scored}/${c.total}` : null;
          })
            .filter(Boolean)
            .join(' · ')}
        </div>
      )}
    </>
  );
};

const Cell = ({ label, score }: { label: string; score: number | null | undefined }) => {
  const color = labelColor(label as never);
  return (
    <td className="border border-[var(--color-border)] p-0">
      <div
        className="flex h-full flex-col items-center justify-center px-2 py-3"
        style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}
        title={label}
      >
        <span className="font-serif text-lg leading-none" style={{ color }}>
          {fmt(score)}
        </span>
      </div>
    </td>
  );
};

const Heatmap = () => {
  const covered = chapters.filter((c) => scoreForChapter(c.number));
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="border border-[var(--color-border)] px-3 py-2 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              Chapter
            </th>
            {DIMS.map((d) => (
              <th
                key={d}
                className="border border-[var(--color-border)] px-2 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]"
              >
                {DIM_LABELS[d]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border border-[var(--color-border)] px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.15em]">
              Book
            </th>
            {DIMS.map((d) => {
              const score = judgeScores.book[d];
              const label =
                score == null ? 'error' : score >= 80 ? 'strong' : score >= 50 ? 'moderate' : score >= 20 ? 'weak' : 'fail';
              return (
                <Fragment key={d}>
                  <Cell label={label} score={score} />
                </Fragment>
              );
            })}
          </tr>
          {covered.map((c) => {
            const sc = scoreForChapter(c.number)!;
            return (
              <tr key={c.number}>
                <th className="border border-[var(--color-border)] px-3 py-2 text-left font-serif text-sm">
                  <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">{c.number}</span>{' '}
                  {titleFor(c.number)}
                </th>
                {DIMS.map((d) => (
                  <Fragment key={d}>
                    <Cell label={sc.labels[d]} score={sc.rollup[d as DimName]} />
                  </Fragment>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ShipBlockers = () => {
  const rows: { num: string; blocker: WeakParagraph }[] = [];
  for (const c of chapters) {
    const sc = scoreForChapter(c.number);
    if (!sc) continue;
    for (const b of sc.ship_blockers) rows.push({ num: c.number, blocker: b });
  }
  if (rows.length === 0) {
    return (
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        No ship-blockers — every claim defensible against the ledger.
      </p>
    );
  }
  return (
    <ul className="list-none space-y-4 p-0">
      {rows.map((r, i) => (
        <li key={i} className="border-l-2 pl-4" style={{ borderColor: labelColor('fail') }}>
          <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: labelColor('fail') }}>
            Ch {r.num} · defensibility {fmt(r.blocker.score)}
            {r.blocker.para_excerpt && (
              <span className="ml-2 text-[var(--color-ink-muted)]">&ldquo;{r.blocker.para_excerpt}&rdquo;</span>
            )}
          </div>
          <p className="font-serif text-sm leading-[1.5]">{r.blocker.reasoning}</p>
        </li>
      ))}
    </ul>
  );
};

export const Quality = () => {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
        <a href="/" className="hover:opacity-60">← Catalogue</a>
        <span>From Copilot to Colleague · Quality</span>
        <a href="/read" className="hover:opacity-60">Reader →</a>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-12">
        <h1 className="mb-3 font-serif text-4xl italic leading-none md:text-5xl">
          What the AI judges see
        </h1>
        <p className="mb-12 max-w-2xl font-sans text-sm text-[var(--color-ink-muted)]">
          Every chapter is scored by the MASH judges across six dimensions — three of
          craft (humanness, voice, usefulness) and three of epistemics (evidence
          density, claim defensibility, non-redundancy). Higher is better; colour marks
          the band.
        </p>

        {!hasJudgeData() ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            No judge run has been published yet. Scores appear here after the next MASH run.
          </p>
        ) : (
          <>
            <Header />
            <Heatmap />

            <h2 className="mb-6 mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              Ship-blockers — unsupported claims
            </h2>
            <ShipBlockers />

            <h2 className="mb-4 mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              Trend over versions
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              Version-over-version trends appear once a second judge run is published.
            </p>
          </>
        )}
      </section>
    </div>
  );
};
