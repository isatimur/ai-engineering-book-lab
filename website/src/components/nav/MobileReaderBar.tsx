import { Link } from 'react-router-dom';
import { experienceUrl, graphUrl } from '../../lib/chapterLinks';

type Props = {
  textOnly: boolean;
  onToggleTextOnly: () => void;
  chapterNumber?: string;
};

/** Mobile bottom pill bar — text focus, 3D journey, evidence graph. */
export const MobileReaderBar = ({ textOnly, onToggleTextOnly, chapterNumber }: Props) => {
  const experienceHref = experienceUrl(chapterNumber);
  const graphHref = graphUrl(chapterNumber);

  return (
    <nav
      className="md:hidden fixed bottom-10 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none no-print"
      aria-label="Reading mode"
    >
      <div className="pointer-events-auto inline-flex items-stretch border border-[var(--color-border)] bg-[var(--color-paper)]/95 backdrop-blur shadow-lg font-mono text-[10px] uppercase tracking-[0.12em]">
        <button
          type="button"
          onClick={onToggleTextOnly}
          aria-pressed={textOnly}
          className={`px-3.5 py-2 transition-colors ${
            textOnly
              ? 'bg-[color-mix(in_srgb,var(--color-pink)_28%,var(--color-paper))] text-[var(--color-ink)] font-semibold'
              : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)]/5'
          }`}
        >
          {textOnly ? 'Text only' : 'Focus text'}
        </button>
        <a
          href={experienceHref}
          className="px-3.5 py-2 border-l border-[var(--color-border)] text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors whitespace-nowrap"
        >
          {chapterNumber ? 'View in 3D' : 'Immersive'}
        </a>
        <Link
          to={graphHref}
          className="px-3.5 py-2 border-l border-[var(--color-border)] text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          Evidence
        </Link>
      </div>
    </nav>
  );
};
