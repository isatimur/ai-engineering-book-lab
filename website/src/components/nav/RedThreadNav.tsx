import { Link } from 'react-router-dom';
import { graphUrl, experienceUrl, readChapterUrl, type ExperienceSurface } from '../../lib/chapterLinks';
import { chapterByNumber } from '../../lib/chapterLinks';

type Props = {
  active: ExperienceSurface;
  chapterNumber?: string;
  className?: string;
  compact?: boolean;
};

const SURFACES: { id: ExperienceSurface; label: string; short: string }[] = [
  { id: 'read', label: 'Read', short: 'Read' },
  { id: 'graph', label: 'Evidence', short: 'Evidence' },
  { id: 'experience', label: '3D Journey', short: '3D' },
];

/** Persistent tri-experience nav — the editorial "red thread" between read, graph, and 3D. */
export const RedThreadNav = ({ active, chapterNumber, className = '', compact = false }: Props) => {
  const ch = chapterNumber ? chapterByNumber(chapterNumber) : undefined;
  const hrefFor = (surface: ExperienceSurface): string => {
    switch (surface) {
      case 'read':
        return chapterNumber ? readChapterUrl(chapterNumber) : '/read';
      case 'graph':
        return graphUrl(chapterNumber);
      case 'experience':
        return experienceUrl(chapterNumber);
    }
  };

  return (
    <nav
      className={`red-thread-nav font-mono text-[10px] uppercase tracking-[0.15em] ${className}`}
      aria-label="Book experiences"
    >
      <div className="red-thread-tabs inline-flex flex-wrap items-center gap-0 border border-[var(--color-border)] bg-[var(--color-paper)]">
        {SURFACES.map((surface, i) => {
          const isActive = active === surface.id;
          const label = compact ? surface.short : surface.label;
          const inner = (
            <>
              {isActive && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-pink)]"
                  aria-hidden
                />
              )}
              <span className={isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)]'}>
                {label}
              </span>
            </>
          );
          const cls = `relative px-3 py-1.5 transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] ${
            isActive ? 'bg-[color-mix(in_srgb,var(--color-pink)_22%,var(--color-paper))] font-semibold' : ''
          } ${i > 0 ? 'border-l border-[var(--color-border)]' : ''}`;

          if (surface.id === 'read' || surface.id === 'graph') {
            return (
              <Link key={surface.id} to={hrefFor(surface.id)} className={cls} aria-current={isActive ? 'page' : undefined}>
                {inner}
              </Link>
            );
          }
          return (
            <a key={surface.id} href={hrefFor(surface.id)} className={cls} aria-current={isActive ? 'page' : undefined}>
              {inner}
            </a>
          );
        })}
      </div>
      {ch && !compact && (
        <p className="mt-2 text-[var(--color-ink-muted)] normal-case tracking-normal font-serif text-sm">
          Chapter {ch.number} · {ch.title}
        </p>
      )}
    </nav>
  );
};
