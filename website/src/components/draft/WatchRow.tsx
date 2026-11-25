import { Link } from 'react-router-dom';
import type { DraftBook } from '../../data/draftBooks';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { WATCH_ANCHOR } from './DraftBookIndexLinks';
import { SectionLabel } from './SectionLabel';

/** 34 → "0:34". */
export const formatDuration = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;

/**
 * The book's explainer films as a row of poster tiles. Each tile opens its
 * chapter, where the film plays above the text. Renders nothing when no film
 * exists yet.
 */
export const WatchRow = ({ book }: { book: DraftBook }) => {
  const reduced = usePrefersReducedMotion();
  const tiles = book.videos.flatMap((v) => {
    const chapter = book.chapters.find((c) => c.slug === v.chapterSlug);
    return chapter ? [{ video: v, chapter }] : [];
  });
  if (tiles.length === 0) return null;
  const zoom = reduced ? '' : 'transition-transform duration-500 group-hover:scale-[1.03]';

  return (
    <section aria-label="Watch the explainers">
      <SectionLabel id={WATCH_ANCHOR} as="h2">
        Watch
      </SectionLabel>
      <ul className="m-0 mt-4 flex list-none snap-x gap-4 overflow-x-auto p-0 pb-4">
        {tiles.map(({ video, chapter }) => (
          <li key={video.chapterSlug} className="w-64 shrink-0 snap-start">
            <Link to={book.chapterPath(chapter)} className="group block">
              <div className="relative aspect-video overflow-hidden bg-[var(--color-ink)]">
                <img
                  src={video.poster}
                  alt=""
                  width={video.width}
                  height={video.height}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover ${zoom}`}
                />
                <span className="absolute bottom-2 left-2 bg-[var(--color-ink)]/85 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-paper)]">
                  ▶ {formatDuration(video.durationSeconds)}
                </span>
              </div>
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                Chapter {chapter.number}
              </span>
              <span className="block font-serif text-base leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)] group-hover:underline">
                {chapter.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
