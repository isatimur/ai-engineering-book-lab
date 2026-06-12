import { Link } from 'react-router-dom';
import { chapterByNumber } from '../../lib/chapterLinks';
import { graphUrl, readChapterUrl, experienceUrl } from '../../lib/chapterLinks';
import { loadLastChapter } from '../../lib/readingProgress';

type Props = {
  /** When set, banner is hidden — user already has chapter context. */
  activeChapter?: string;
  surface: 'graph' | 'experience';
};

/** Continuity nudge when landing on graph/3D without an explicit chapter filter. */
export const ChapterContextBanner = ({ activeChapter, surface }: Props) => {
  if (activeChapter) return null;

  const last = loadLastChapter();
  if (!last) return null;

  const meta = chapterByNumber(last);
  if (!meta) return null;

  const target =
    surface === 'graph' ? graphUrl(last) : experienceUrl(last);

  return (
    <div
      className="mb-6 border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-pink)_18%,var(--color-paper))] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em]"
      role="status"
    >
      <p className="text-[var(--color-ink-muted)] normal-case tracking-normal font-serif text-sm">
        You were reading{' '}
        <span className="text-[var(--color-ink)]">
          Ch {last} · {meta.title}
        </span>
      </p>
      <div className="flex flex-wrap gap-2 shrink-0">
        <Link
          to={readChapterUrl(last)}
          className="border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          Resume read
        </Link>
        <Link
          to={target}
          className="border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] px-3 py-1.5 hover:opacity-85 transition-opacity"
        >
          {surface === 'graph' ? 'Open ch graph' : 'Fly to ch in 3D'}
        </Link>
      </div>
    </div>
  );
};
