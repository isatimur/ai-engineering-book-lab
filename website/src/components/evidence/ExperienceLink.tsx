import { Link } from 'react-router-dom';
import { graphUrl, experienceUrl } from '../../lib/chapterLinks';

type Props = {
  chapterNumber: string;
  className?: string;
};

/** Link from read pages to the static 3D experience (chapter zones align by index). */
export const ExperienceLink = ({ chapterNumber, className = '' }: Props) => {
  const href = experienceUrl(chapterNumber);

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors ${className}`}
    >
      <span aria-hidden>◇</span>
      3D Journey
    </a>
  );
};

/** Link to the evidence graph, optionally filtered to a chapter. */
export const GraphLink = ({ chapterNumber, className = '' }: Props) => (
  <Link
    to={graphUrl(chapterNumber)}
    className={`inline-flex items-center gap-2 border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors ${className}`}
  >
    <span aria-hidden>◎</span>
    Evidence graph
  </Link>
);
