import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { chapterByNumber, experienceUrl, graphUrl, readChapterUrl } from '../../lib/chapterLinks';
import { anchorForNode, filterGraphByChapter, getEvidenceGraph } from '../../lib/evidenceGraph';
import type { GraphNode } from '../../lib/evidenceTypes';
import { RedThreadLinks } from './EvidenceSectionHeader';
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

const EDGE_LEGEND = [
  { type: 'cited_in', label: 'Claim in chapter' },
  { type: 'supports', label: 'Video supports claim' },
  { type: 'appears_in', label: 'Speaker in video' },
  { type: 'same_theme', label: 'Co-cited practitioners' },
] as const;

export const EvidenceGraphView = ({ chapterNumber, compact = false }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const claimParam = searchParams.get('claim');
  const fullGraph = useMemo(() => getEvidenceGraph(), []);
  const graph = useMemo(
    () => (chapterNumber ? filterGraphByChapter(fullGraph, chapterNumber) : fullGraph),
    [fullGraph, chapterNumber],
  );
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!claimParam) return;
    const node = graph.nodes.find((n) => n.id === claimParam);
    if (node) setSelected(node);
  }, [claimParam, graph.nodes]);
  const selectedAnchor = selected ? anchorForNode(selected) : undefined;

  const chapterForLinks =
    selected?.type === 'chapter'
      ? selected.chapterNumber
      : selected?.chapterNumber ?? chapterNumber;
  const chapterMeta = chapterForLinks ? chapterByNumber(chapterForLinks) : undefined;
  const isEmpty = graph.nodes.length === 0;

  const handleSelect = (node: GraphNode | null) => {
    setSelected(node);
    if (node?.type === 'chapter' && node.chapterNumber) {
      navigate(graphUrl(node.chapterNumber));
    }
  };

  const resetView = () => {
    setResetKey((k) => k + 1);
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {!compact && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="sr-only" htmlFor="graph-search">
            Search graph
          </label>
          <input
            id="graph-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find practitioner, claim, or video…"
            className="flex-1 max-w-xl border border-[var(--color-border)] bg-[var(--color-paper)] px-3 py-2 font-mono text-[11px] tracking-wide text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ink)]"
          />
          {chapterNumber && (
            <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)] shrink-0">
              Ch {chapterNumber} filter active
            </p>
          )}
        </div>
      )}

      <div className={`flex flex-col gap-4 ${compact ? '' : 'lg:flex-row lg:items-stretch'}`}>
      <div className={compact ? 'h-[min(360px,50vh)]' : 'flex-1 min-h-[min(420px,55vh)] lg:min-h-[560px] order-1'}>
        {isEmpty ? (
          <div className="h-full min-h-[320px] border border-[var(--color-border)] bg-[#F8F6F0] flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-lg text-[var(--color-ink-muted)]">
              No evidence nodes for this chapter filter yet.
            </p>
            <Link
              to="/read/graph"
              className="font-mono text-[10px] uppercase tracking-widest border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              View full book graph
            </Link>
          </div>
        ) : (
          <EvidenceGraphCanvas
            key={`${chapterNumber ?? 'all'}-${resetKey}`}
            graph={graph}
            focusChapter={chapterNumber}
            searchQuery={searchQuery}
            highlightNodeId={claimParam}
            onSelect={handleSelect}
            className="h-full"
          />
        )}
      </div>

      <aside
        className={`border border-[var(--color-border)] bg-[var(--color-paper)] p-5 font-mono text-[10px] uppercase tracking-[0.15em] order-2 ${
          compact ? 'min-h-0' : 'lg:w-[340px] shrink-0 lg:max-h-[560px] lg:overflow-y-auto'
        }`}
      >
        {chapterForLinks && !compact && (
          <div className="mb-4 pb-4 border-b border-[var(--color-border)]">
            {chapterMeta && (
              <p className="font-serif text-sm normal-case tracking-normal text-[var(--color-ink)] mb-2">
                Ch {chapterForLinks} · {chapterMeta.title}
              </p>
            )}
            <RedThreadLinks chapterNumber={chapterForLinks} />
          </div>
        )}

        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-[var(--color-ink-muted)]">
          {LEGEND.map((item) => (
            <span key={item.type} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-[var(--color-ink-muted)] normal-case tracking-normal">
          {EDGE_LEGEND.map((item) => (
            <span key={item.type}>{item.label}</span>
          ))}
        </div>

        <p className="mb-3 text-[var(--color-ink-muted)] normal-case tracking-normal font-serif text-sm leading-relaxed">
          Drag nodes · scroll or pinch to zoom · pan empty space · tap a chapter to filter
        </p>

        {!compact && (
          <button
            type="button"
            onClick={resetView}
            className="mb-4 border border-[var(--color-border)] px-2 py-1 text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Reset layout
          </button>
        )}

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
                className="inline-block underline hover:opacity-70 mb-3"
              >
                Open source ↗
              </a>
            )}

            {chapterForLinks && selected.type !== 'chapter' && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-ink-muted)] text-[9px] uppercase tracking-widest mb-2">Red thread</p>
                <RedThreadLinks chapterNumber={chapterForLinks} />
              </div>
            )}

            {selected.type === 'chapter' && chapterMeta && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] space-y-2">
                <Link
                  to={readChapterUrl(chapterForLinks!)}
                  className="block underline hover:opacity-70 font-serif text-sm normal-case tracking-normal"
                >
                  Read ch {chapterForLinks} — {chapterMeta.title} →
                </Link>
                <a
                  href={experienceUrl(chapterForLinks!)}
                  className="block underline hover:opacity-70"
                >
                  Fly to ch {chapterForLinks} in 3D →
                </a>
              </div>
            )}
          </div>
        ) : (
          <p className="border-t border-[var(--color-border)] pt-4 text-[var(--color-ink-muted)] normal-case tracking-normal font-serif text-sm">
            {chapterNumber
              ? 'Tap any node to inspect claims and sources for this chapter.'
              : 'Select a node — or tap a chapter hub — to inspect and jump across read, graph, and 3D.'}
          </p>
        )}
      </aside>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="border border-[var(--color-border)] px-2 py-1.5">
    <div className="text-[var(--color-ink-muted)]">{label}</div>
    <div className="text-base tabular-nums">{value}</div>
  </div>
);
