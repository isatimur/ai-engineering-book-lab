import { useState } from 'react';
import {
  scoreForChapter,
  labelColor,
  weakestForDim,
  DIMS,
  DIM_LABELS,
  type DimName,
  type ChapterScore,
} from '../../lib/judgeScores';

const fmtScore = (n: number | null): string =>
  n === null || n === undefined ? '—' : String(Math.round(n));

const DimBadge = ({
  dim,
  chapter,
  active,
  onToggle,
}: {
  dim: DimName;
  chapter: ChapterScore;
  active: boolean;
  onToggle: () => void;
}) => {
  const label = chapter.labels[dim];
  const score = chapter.rollup[dim];
  const color = labelColor(label);
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={active}
      className="flex flex-col items-start gap-1 border bg-white px-3 py-2 text-left transition-colors hover:bg-black/[0.02]"
      style={{ borderColor: active ? color : 'var(--color-border)' }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        {DIM_LABELS[dim]}
      </span>
      <span className="flex items-baseline gap-2">
        <span className="font-serif text-xl leading-none" style={{ color }}>
          {fmtScore(score)}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.15em]"
          style={{ color }}
        >
          {label}
        </span>
      </span>
    </button>
  );
};

const WeakList = ({ chapter, dim }: { chapter: ChapterScore; dim: DimName }) => {
  const items = weakestForDim(chapter, dim);
  if (items.length === 0) {
    return (
      <p className="px-1 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        No weak paragraphs flagged for {DIM_LABELS[dim]}.
      </p>
    );
  }
  return (
    <ul className="list-none space-y-4 p-0">
      {items.map((w, i) => (
        <li key={`${dim}-${i}`} className="border-l-2 pl-4" style={{ borderColor: labelColor(w.label) }}>
          <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            <span style={{ color: labelColor(w.label) }}>{w.label} · {fmtScore(w.score)}</span>
            {w.para_excerpt && <span className="truncate">&ldquo;{w.para_excerpt}&rdquo;</span>}
          </div>
          <p className="font-serif text-sm leading-[1.5] text-[var(--color-ink)]">{w.reasoning}</p>
        </li>
      ))}
    </ul>
  );
};

export const JudgeScorecard = ({ chapterNumber }: { chapterNumber: string }) => {
  const chapter = scoreForChapter(chapterNumber);
  const [openDim, setOpenDim] = useState<DimName | null>(null);
  if (!chapter) {
    return null;
  }

  const blockers = chapter.ship_blockers;

  return (
    <section className="mt-4">
      {blockers.length > 0 && (
        <div
          className="mb-6 border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em]"
          style={{ borderColor: labelColor('fail'), color: labelColor('fail') }}
        >
          {blockers.length} unsupported {blockers.length === 1 ? 'claim' : 'claims'} — ship-blocker
        </div>
      )}

      <ul className="grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 lg:grid-cols-6">
        {DIMS.map((dim) => (
          <li key={dim}>
            <DimBadge
              dim={dim}
              chapter={chapter}
              active={openDim === dim}
              onToggle={() => setOpenDim(openDim === dim ? null : dim)}
            />
          </li>
        ))}
      </ul>

      {openDim && (
        <div className="mt-6 border-t border-[var(--color-border)] pt-6">
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            {DIM_LABELS[openDim]} — weakest paragraphs the judge flagged
          </h3>
          <WeakList chapter={chapter} dim={openDim} />
        </div>
      )}

      {chapter.version_id && (
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
          scored on version {chapter.version_id}
        </p>
      )}
    </section>
  );
};
