import { Link } from 'react-router-dom';
import { claimsForChapter } from '../../lib/evidenceGraph';
import { ExperienceLink } from './ExperienceLink';

type Props = {
  chapterNumber: string;
  onOpenSources?: () => void;
};

export const EvidenceSectionHeader = ({ chapterNumber, onOpenSources }: Props) => {
  const claims = claimsForChapter(chapterNumber);
  const anchors = claims.reduce((n, c) => n + c.anchors.length, 0);
  if (claims.length === 0) return null;

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        {claims.length} claims · {anchors} source anchors
      </p>
      <div className="flex flex-wrap gap-2">
        {onOpenSources && (
          <button
            type="button"
            onClick={onOpenSources}
            className="border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Explore graph
          </button>
        )}
        <Link
          to={`/read/graph?chapter=${chapterNumber}`}
          className="border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          Full graph
        </Link>
        <ExperienceLink chapterNumber={chapterNumber} />
      </div>
    </div>
  );
};
