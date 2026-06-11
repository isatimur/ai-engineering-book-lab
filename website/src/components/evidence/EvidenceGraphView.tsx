import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { chapters } from '../../data/bookChapters';
import { anchorForNode, filterGraphByChapter, getEvidenceGraph } from '../../lib/evidenceGraph';
import type { GraphNode } from '../../lib/evidenceTypes';
import { EvidenceGraphCanvas } from './EvidenceGraphCanvas';

type Props = {
  chapterNumber?: string;
  compact?: boolean;
};

const LEGEND = [
  { type: 'chapter', label: 'Chapter', color: '#18181A' },
  { type: 'claim', label: 'Claim', color: '#EAC6C0' },
  { type: 'speaker', label: 'Practitioner', color: '#A4B8C4' },
  { type: 'video', label: 'Source video', color: '#6b6664' },
] as const;

export const EvidenceGraphView = ({ chapterNumber, compact = false }: Props) => {
  const fullGraph = useMemo(() => getEvidenceGraph(), []);
  const graph = useMemo(
    () => (chapterNumber ? filterGraphByChapter(fullGraph, chapterNumber) : fullGraph),
    [fullGraph, chapterNumber],
  );
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const selectedAnchor = selected ? anchorForNode(selected) : undefined;

  return (
    <div className={`flex flex-col gap-4 ${compact ? '' : 'lg:flex-row lg:items-stretch'}`}>
      <div className={compact ? 'h-[360px]' : 'flex-1 min-h-[420px] lg:min-h-[560px]'}>
        <EvidenceGraphCanvas
          graph={graph}
          focusChapter={chapterNumber}
          onSelect={setSelected}
          className="h-full"
        />
      </div>

      <aside
        className={`border border-[var(--color-border)] bg-[var(--color-paper)] p-5 font-mono text-[10px] uppercase tracking-[0.15em] ${
          compact ? 'max-h-48 overflow-y-auto' : 'lg:w-[320px] shrink-0'
        }`}
      >
        <div className="mb-4 flex flex-wrap gap-3 text-[var(--color-ink-muted)]">
          {LEGEND.map((item) => (
            <span key={item.type} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>

        <p className="mb-3 text-[var(--color-ink-muted)] normal-case tracking-normal font-serif text-sm leading-relaxed">
          Drag nodes · scroll to zoom · pan empty space · click to inspect
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-[var(--color-ink)]">
          <Stat label="Claims" value={graph.stats.claims} />
          <Stat label="Videos" value={graph.stats.videos} />
          <Stat label="Speakers" value={graph.stats.speakers} />
          <Stat label="Anchors" value={graph.stats.anchors} />
        </div>

        {selected ? (
          <div className="border-t border-[var(--color-border)] pt-4 normal-case tracking-normal">
            <p className="text-[var(--color-ink-muted)] mb-1">{selected.type}</p>
            <p className="font-serif text-sm leading-relaxed text-[var(--color-ink)] mb-3">{selected.label}</p>
            {selected.supportLevel && (
              <p className="mb-2 text-[var(--color-ink-muted)]">Support: {selected.supportLevel}</p>
            )}
            {selectedAnchor && (
              <blockquote className="mb-3 border-l-2 border-[var(--color-pink)] pl-3 font-serif text-sm italic normal-case">
                &ldquo;{selectedAnchor.quote}&rdquo;
              </blockquote>
            )}
            {selectedAnchor && (
              <a
                href={`https://www.youtube.com/watch?v=${selectedAnchor.video_id}&t=${selectedAnchor.start_seconds}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline hover:opacity-70"
              >
                Open source ↗
              </a>
            )}
            {selected.chapterNumber && (
              <div className="mt-3">
                <Link
                  to={`/read/${selected.chapterNumber}-${chapters.find((c) => c.number === selected.chapterNumber)?.slug ?? ''}`}
                  className="underline hover:opacity-70"
                >
                  Read chapter →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="border-t border-[var(--color-border)] pt-4 text-[var(--color-ink-muted)] normal-case tracking-normal font-serif text-sm">
            Select a node to see the claim, practitioner, or video anchor.
          </p>
        )}
      </aside>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="border border-[var(--color-border)] px-2 py-1.5">
    <div className="text-[var(--color-ink-muted)]">{label}</div>
    <div className="text-base tabular-nums">{value}</div>
  </div>
);
