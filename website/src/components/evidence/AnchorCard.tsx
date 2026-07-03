import { useState } from 'react';
import type { Anchor } from '../../lib/evidenceTypes';

export const AnchorCard = ({ anchor }: { anchor: Anchor }) => {
  const [playing, setPlaying] = useState(false);
  const loose = anchor.confidence === 'low';

  return (
    <li className="border border-[var(--color-border)] bg-white">
      <div className="aspect-video bg-black/5">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${anchor.video_id}?start=${anchor.start_seconds}&autoplay=1`}
            title={anchor.label}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block h-full w-full"
            aria-label={`Play ${anchor.label} from ${anchor.start}`}
          >
            <img
              src={`https://img.youtube.com/vi/${anchor.video_id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
              <span className="rounded-full bg-[var(--color-paper)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                &#9654; {anchor.start}
              </span>
            </span>
          </button>
        )}
      </div>
      <blockquote className="border-t border-[var(--color-border)] px-4 py-3 font-serif text-sm italic leading-[1.5]">
        &ldquo;{anchor.quote}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span className="truncate">{anchor.label}</span>
        <span className={loose ? 'shrink-0 text-amber-700' : 'shrink-0'}>
          {loose ? 'loosely sourced' : `confidence: ${anchor.confidence}`}
        </span>
      </div>
    </li>
  );
};
