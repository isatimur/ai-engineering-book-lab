import { Link } from 'react-router-dom';
import { graphUrl } from './lib/chapterLinks';
import book1EvidenceData from './evidence.json';
import { AnchorCard } from './components/evidence/AnchorCard';

export type EvidenceClaim = {
  claim_id: string;
  text: string;
  support_level: string;
  anchors: Parameters<typeof AnchorCard>[0]['anchor'][];
};

export type EvidenceIndex = Record<string, EvidenceClaim[]>;

type EvidenceRailProps = {
  chapterNumber: string;
  /**
   * Evidence index to read from — defaults to book 1's evidence.json so
   * every existing caller (book 1's ChapterDetail/FullBookReader) is
   * unaffected. Book 2 passes evidence-2.json explicitly.
   */
  evidenceData?: EvidenceIndex;
  /**
   * "Open in graph" links into /read/graph, which only knows book 1's
   * chapters. Book 2 has no evidence-graph page yet, so callers that pass
   * a custom evidenceData should also pass showGraphLink={false}.
   */
  showGraphLink?: boolean;
};

export const EvidenceRail = ({
  chapterNumber,
  evidenceData = book1EvidenceData as EvidenceIndex,
  showGraphLink = true,
}: EvidenceRailProps) => {
  const claims = evidenceData[String(parseInt(chapterNumber, 10))] ?? [];
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
            <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <p className="font-serif text-base leading-[1.45] flex-1">{claim.text}</p>
              {showGraphLink && (
                <Link
                  to={`${graphUrl(chapterNumber)}&claim=${encodeURIComponent(claim.claim_id)}`}
                  className="shrink-0 font-mono text-[9px] uppercase tracking-widest border border-[var(--color-border)] px-2 py-1 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors self-start"
                >
                  Open in graph
                </Link>
              )}
            </div>
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
              {claim.anchors.map((anchor, index) => (
                <AnchorCard key={`${claim.claim_id}-${index}`} anchor={anchor} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
