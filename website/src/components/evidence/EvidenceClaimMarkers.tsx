import { Link } from 'react-router-dom';
import { claimsForChapter } from '../../lib/evidenceGraph';
import { graphUrl } from '../../lib/chapterLinks';

type Props = {
  chapterNumber: string;
};

/** Inline sidenote markers — one per sourced claim, linking into the evidence graph. */
export const EvidenceClaimMarkers = ({ chapterNumber }: Props) => {
  const claims = claimsForChapter(chapterNumber);
  if (claims.length === 0) return null;

  return (
    <aside
      className="mb-10 border-l-2 border-[var(--color-pink)] pl-4"
      aria-label="Sourced claims for this chapter"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-3">
        Source-anchored claims
      </p>
      <ol className="list-none p-0 m-0 space-y-2">
        {claims.map((claim, i) => (
          <li key={claim.claim_id} className="flex gap-2 items-start text-sm leading-snug">
            <Link
              to={`${graphUrl(chapterNumber)}&claim=${encodeURIComponent(claim.claim_id)}`}
              className="shrink-0 font-mono text-[10px] text-[var(--color-ink)] border border-[var(--color-border)] w-6 h-6 flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
              title={`View claim in evidence graph`}
              aria-label={`Claim ${i + 1}: open in evidence graph`}
            >
              {i + 1}
            </Link>
            <span className="font-serif text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)]">
              {claim.text}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
};
