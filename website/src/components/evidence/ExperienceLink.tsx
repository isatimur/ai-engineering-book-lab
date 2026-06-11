type Props = {
  chapterNumber: string;
  className?: string;
};

/** Link from read pages to the static 3D experience (chapter zones align by index). */
export const ExperienceLink = ({ chapterNumber, className = '' }: Props) => {
  const index = parseInt(chapterNumber, 10);
  const href = Number.isFinite(index) && index >= 1 ? `/experience/#ch-${index}` : '/experience/';

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors ${className}`}
    >
      <span aria-hidden>◇</span>
      Experience in 3D
    </a>
  );
};
