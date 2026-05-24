import React, { useState } from 'react';
import evidenceData from './evidence.json';

type Anchor = {
  video_id: string;
  start: string;
  end: string;
  start_seconds: number;
  quote: string;
  confidence: string;
  label: string;
};

type EvidenceClaim = {
  claim_id: string;
  text: string;
  support_level: string;
  anchors: Anchor[];
};

const evidence = evidenceData as Record<string, EvidenceClaim[]>;

const AnchorCard = ({ anchor }: { anchor: Anchor }) => {
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

export const EvidenceRail = ({ chapterNumber }: { chapterNumber: string }) => {
  const claims = evidence[String(parseInt(chapterNumber, 10))] ?? [];
  if (claims.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t-2 border-[var(--color-ink)] pt-8">
      <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        Evidence &mdash; Source Anchors
      </h2>
      <div className="space-y-10">
        {claims.map((claim) => (
          <div key={claim.claim_id}>
            <p className="mb-4 font-serif text-base leading-[1.45]">{claim.text}</p>
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
              {claim.anchors.map((anchor, index) => (
                <React.Fragment key={`${claim.claim_id}-${index}`}>
                  <AnchorCard anchor={anchor} />
                </React.Fragment>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
