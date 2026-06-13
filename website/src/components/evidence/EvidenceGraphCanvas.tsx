import { useCallback, useEffect, useRef, useState } from 'react';
import type { EvidenceGraphData, GraphNode } from '../../lib/evidenceTypes';

type SimNode = GraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Props = {
  graph: EvidenceGraphData;
  focusChapter?: string;
  searchQuery?: string;
  highlightNodeId?: string | null;
  onSelect?: (node: GraphNode | null) => void;
  className?: string;
};

const CHAPTER_TINTS = [
  '#EAC6C0',
  '#A4B8C4',
  '#C9B8A8',
  '#B8C4A4',
  '#C4A4B8',
  '#A8C4C9',
  '#D4C4A8',
  '#A4C4C9',
  '#C4B8A4',
  '#B8A4C4',
];

const nodeMatchesQuery = (node: GraphNode, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    node.label.toLowerCase().includes(q) ||
    node.shortLabel.toLowerCase().includes(q) ||
    (node.speakerName?.toLowerCase().includes(q) ?? false) ||
    (node.chapterNumber?.includes(q) ?? false)
  );
};

const NODE_COLORS: Record<GraphNode['type'], string> = {
  chapter: '#18181A',
  claim: '#EAC6C0',
  speaker: '#A4B8C4',
  video: '#6b6664',
};

const EDGE_COLORS: Record<string, string> = {
  cited_in: 'rgba(24,24,26,0.18)',
  supports: 'rgba(234,198,192,0.55)',
  appears_in: 'rgba(164,184,196,0.45)',
  same_theme: 'rgba(24,24,26,0.08)',
};

const typePriority: Record<GraphNode['type'], number> = {
  chapter: 4,
  claim: 3,
  speaker: 2,
  video: 1,
};

export const EvidenceGraphCanvas = ({
  graph,
  focusChapter,
  searchQuery = '',
  highlightNodeId = null,
  onSelect,
  className = '',
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<SimNode[]>([]);
  const frameRef = useRef<number>(0);
  const dragRef = useRef<{ id: string | null }>({ id: null });
  const panRef = useRef({ x: 0, y: 0, scale: 1, dragging: false, lastX: 0, lastY: 0 });
  const pausedRef = useRef(false);
  const dimensionsRef = useRef({ width: 800, height: 520 });
  const graphRef = useRef(graph);
  const focusChapterIdRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const searchQueryRef = useRef(searchQuery);
  const highlightNodeIdRef = useRef<string | null | undefined>(highlightNodeId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 520 });
  const hasSearch = searchQuery.trim().length > 0;

  const focusChapterId = focusChapter ? `chapter:${focusChapter.padStart(2, '0')}` : null;

  dimensionsRef.current = dimensions;
  graphRef.current = graph;
  focusChapterIdRef.current = focusChapterId;
  selectedIdRef.current = selectedId;
  hoverIdRef.current = hoverId;
  searchQueryRef.current = searchQuery;
  highlightNodeIdRef.current = highlightNodeId;

  const fitToFocus = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    const focusId = focusChapterIdRef.current;
    if (!focusId) {
      panRef.current = { ...panRef.current, x: 0, y: 0, scale: 1 };
      return;
    }
    const node = simRef.current.find((n) => n.id === focusId);
    if (!node) return;
    const scale = 1.35;
    panRef.current.x = width / 2 - node.x * scale;
    panRef.current.y = height / 2 - node.y * scale;
    panRef.current.scale = scale;
  }, []);

  const pickNode = useCallback((clientX: number, clientY: number): SimNode | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const pan = panRef.current;
    const x = (clientX - rect.left - pan.x) / pan.scale;
    const y = (clientY - rect.top - pan.y) / pan.scale;
    const nodes = [...simRef.current].sort((a, b) => typePriority[a.type] - typePriority[b.type]);
    for (let i = nodes.length - 1; i >= 0; i -= 1) {
      const n = nodes[i];
      const dx = x - n.x;
      const dy = y - n.y;
      if (Math.hypot(dx, dy) <= n.size + 4) return n;
    }
    return null;
  }, []);

  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width < 1 || height < 1) return;
      const nextWidth = Math.round(Math.max(320, width));
      const nextHeight = Math.round(Math.max(320, height));
      setDimensions((prev) =>
        prev.width === nextWidth && prev.height === nextHeight
          ? prev
          : { width: nextWidth, height: nextHeight },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    panRef.current = { x: 0, y: 0, scale: 1, dragging: false, lastX: 0, lastY: 0 };
    setSelectedId(null);
  }, [graph]);

  useEffect(() => {
    if (highlightNodeId) setSelectedId(highlightNodeId);
  }, [highlightNodeId]);

  useEffect(() => {
    const { width, height } = dimensionsRef.current;
    const angleStep = (Math.PI * 2) / Math.max(graph.nodes.length, 1);
    simRef.current = graph.nodes.map((node, i) => ({
      ...node,
      x: width / 2 + Math.cos(i * angleStep) * (Math.min(width, height) * 0.28),
      y: height / 2 + Math.sin(i * angleStep) * (Math.min(width, height) * 0.22),
      vx: 0,
      vy: 0,
    }));
    const t = window.setTimeout(fitToFocus, 480);
    return () => window.clearTimeout(t);
  }, [graph, focusChapterId, fitToFocus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodeMap = () => new Map(simRef.current.map((n) => [n.id, n]));
    let renderedWidth = 0;
    let renderedHeight = 0;

    const syncCanvasSize = () => {
      const { width, height } = dimensionsRef.current;
      if (width === renderedWidth && height === renderedHeight) return;
      renderedWidth = width;
      renderedHeight = height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    syncCanvasSize();

    const tick = () => {
      syncCanvasSize();
      const { width, height } = dimensionsRef.current;
      const graphData = graphRef.current;
      const focusId = focusChapterIdRef.current;
      const focusChapterNum = focusChapterIdRef.current?.slice('chapter:'.length);
      const selected = selectedIdRef.current;
      const hover = hoverIdRef.current;
      const query = searchQueryRef.current;
      const queryActive = query.trim().length > 0;
      const claimHighlight = highlightNodeIdRef.current;

      if (!pausedRef.current) {
        const nodes = simRef.current;
        const map = nodeMap();
        const cx = width / 2;
        const cy = height / 2;

        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            const a = nodes[i];
            const b = nodes[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.01;
            const minDist = a.size + b.size + 18;
            if (dist < minDist) {
              const force = ((minDist - dist) / dist) * 0.35;
              dx *= force;
              dy *= force;
              a.vx -= dx;
              a.vy -= dy;
              b.vx += dx;
              b.vy += dy;
            }
          }
        }

        for (const edge of graphData.edges) {
          const a = map.get(edge.source);
          const b = map.get(edge.target);
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const rest =
            edge.type === 'cited_in' ? 90 : edge.type === 'same_theme' ? 120 : edge.type === 'supports' ? 70 : 55;
          const strength = edge.type === 'same_theme' ? 0.015 : 0.04;
          const force = (dist - rest) * strength;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }

        for (const node of nodes) {
          node.vx += (cx - node.x) * 0.0025;
          node.vy += (cy - node.y) * 0.0025;
          if (node.type === 'chapter') {
            node.vx += (cx - node.x) * 0.004;
            node.vy += (cy - node.y) * 0.004;
          }
          node.vx *= 0.86;
          node.vy *= 0.86;
          if (dragRef.current.id !== node.id) {
            node.x += node.vx;
            node.y += node.vy;
          }
          node.x = Math.max(node.size + 8, Math.min(width - node.size - 8, node.x));
          node.y = Math.max(node.size + 8, Math.min(height - node.size - 8, node.y));
        }
      }

      const nodes = simRef.current;
      const map = nodeMap();

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(panRef.current.x, panRef.current.y);
      ctx.scale(panRef.current.scale, panRef.current.scale);

      for (const edge of graphData.edges) {
        const a = map.get(edge.source);
        const b = map.get(edge.target);
        if (!a || !b) continue;
        const dimmed =
          !!focusId &&
          a.id !== focusId &&
          b.id !== focusId &&
          a.chapterNumber !== focusChapterNum &&
          b.chapterNumber !== focusChapterNum;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = dimmed ? 'rgba(0,0,0,0.04)' : EDGE_COLORS[edge.type] ?? EDGE_COLORS.supports;
        ctx.lineWidth = edge.type === 'same_theme' ? 0.6 : 1;
        ctx.stroke();
      }

      for (const node of nodes) {
        const isSelected = selected === node.id;
        const isHover = hover === node.id;
        const isFocusHub = node.id === focusId;
        const isSearchHit = queryActive && nodeMatchesQuery(node, query);
        const isSearchMiss = queryActive && !isSearchHit;
        const isClaimHighlight = claimHighlight === node.id;
        const inFocus =
          !focusId ||
          isFocusHub ||
          node.chapterNumber === focusChapterNum ||
          graphData.edges.some(
            (e) =>
              (e.source === focusId && e.target === node.id) ||
              (e.target === focusId && e.source === node.id),
          );
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (isSelected || isClaimHighlight ? 2 : 0), 0, Math.PI * 2);
        let fill = NODE_COLORS[node.type];
        if (node.type === 'claim' && node.chapterNumber) {
          const chIdx = parseInt(node.chapterNumber, 10) - 1;
          if (chIdx >= 0 && chIdx < CHAPTER_TINTS.length) fill = CHAPTER_TINTS[chIdx];
        }
        ctx.fillStyle = fill;
        ctx.globalAlpha = isSearchMiss ? 0.12 : inFocus ? 1 : 0.25;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (isFocusHub || isSearchHit || isClaimHighlight) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size + 5, 0, Math.PI * 2);
          ctx.strokeStyle = isSearchHit ? '#18181A' : '#EAC6C0';
          ctx.lineWidth = isSearchHit || isClaimHighlight ? 2.5 : 2;
          ctx.stroke();
        }
        ctx.strokeStyle = isSelected || isHover || isClaimHighlight ? '#18181A' : 'rgba(255,255,255,0.35)';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();

        if (node.type === 'chapter' || isSelected || isHover) {
          ctx.font = '10px "Space Mono", monospace';
          ctx.fillStyle = '#18181A';
          ctx.textAlign = 'center';
          ctx.fillText(node.shortLabel, node.x, node.y + node.size + 12);
        }
      }

      ctx.restore();
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [graph]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const node = pickNode(e.clientX, e.clientY);
    if (node) {
      dragRef.current = { id: node.id };
      const next = selectedId === node.id ? null : node;
      setSelectedId(next?.id ?? null);
      onSelect?.(next ?? null);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      return;
    }
    setSelectedId(null);
    onSelect?.(null);
    panRef.current.dragging = true;
    panRef.current.lastX = e.clientX;
    panRef.current.lastY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragRef.current.id) {
      const sim = simRef.current.find((n) => n.id === dragRef.current.id);
      const canvas = canvasRef.current;
      if (sim && canvas) {
        const rect = canvas.getBoundingClientRect();
        const pan = panRef.current;
        sim.x = (e.clientX - rect.left - pan.x) / pan.scale;
        sim.y = (e.clientY - rect.top - pan.y) / pan.scale;
        sim.vx = 0;
        sim.vy = 0;
      }
      return;
    }
    if (panRef.current.dragging) {
      panRef.current.x += e.clientX - panRef.current.lastX;
      panRef.current.y += e.clientY - panRef.current.lastY;
      panRef.current.lastX = e.clientX;
      panRef.current.lastY = e.clientY;
      return;
    }
    const hovered = pickNode(e.clientX, e.clientY);
    setHoverId(hovered?.id ?? null);
    if (hovered && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const pan = panRef.current;
      setHoverPos({
        x: hovered.x * pan.scale + pan.x,
        y: hovered.y * pan.scale + pan.y,
      });
    } else {
      setHoverPos(null);
    }
  };

  const handlePointerUp = () => {
    dragRef.current.id = null;
    panRef.current.dragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    panRef.current.scale = Math.max(0.5, Math.min(2.5, panRef.current.scale * delta));
  };

  const zoomBy = (factor: number) => {
    panRef.current.scale = Math.max(0.5, Math.min(2.5, panRef.current.scale * factor));
  };

  const hoverNode = hoverId ? simRef.current.find((n) => n.id === hoverId) : null;
  const hoverIsChapter = hoverNode?.type === 'chapter';

  const matchCount = hasSearch
    ? graph.nodes.filter((n) => nodeMatchesQuery(n, searchQuery)).length
    : 0;

  return (
    <div ref={containerRef} className={`relative w-full h-full min-h-[320px] ${className}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full touch-none bg-[#F8F6F0] border border-[var(--color-border)] ${
          hoverIsChapter ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        aria-label="Evidence enrichment graph"
        role="img"
      />
      {hoverNode && hoverPos && !dragRef.current.id && (
        <div
          className="pointer-events-none absolute z-10 max-w-[220px] border border-[var(--color-border)] bg-[var(--color-paper)] px-2.5 py-1.5 shadow-md font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)]"
          style={{
            left: Math.min(hoverPos.x + 12, dimensions.width - 230),
            top: Math.max(hoverPos.y - 36, 8),
          }}
        >
          <span className="text-[var(--color-ink)]">{hoverNode.type}</span>
          <p className="mt-0.5 normal-case tracking-normal font-serif text-[11px] text-[var(--color-ink)] leading-snug line-clamp-3">
            {hoverNode.label}
          </p>
        </div>
      )}

      {hasSearch && (
        <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)] bg-[var(--color-paper)]/90 border border-[var(--color-border)] px-2 py-1">
          {matchCount} match{matchCount === 1 ? '' : 'es'}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto absolute top-2 right-2 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-widest">
        <button
          type="button"
          onClick={() => zoomBy(1.15)}
          className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-paper)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomBy(0.87)}
          className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-paper)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          onClick={fitToFocus}
          className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-paper)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors text-[9px]"
          aria-label="Fit view"
          title="Fit view"
        >
          ↺
        </button>
        </div>
      </div>
    </div>
  );
};
