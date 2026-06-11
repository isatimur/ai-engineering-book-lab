import evidenceData from '../evidence.json';
import { chapters } from '../data/bookChapters';
import type {
  Anchor,
  EvidenceClaim,
  EvidenceGraphData,
  GraphEdge,
  GraphNode,
} from './evidenceTypes';

const evidence = evidenceData as Record<string, EvidenceClaim[]>;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const truncate = (value: string, max: number) =>
  value.length <= max ? value : `${value.slice(0, max - 1)}…`;

/** Parse "#206 — Joel Hron, Thomson Reuters" into speaker metadata. */
export const parseSpeakerLabel = (label: string) => {
  const match = label.match(/^#(\d+)\s*—\s*(.+)$/);
  if (!match) {
    const name = label.trim() || 'Unknown speaker';
    return { sourceNum: undefined, speakerName: name, speakerId: slugify(name) };
  }
  const speakerName = match[2].trim();
  return {
    sourceNum: match[1],
    speakerName,
    speakerId: slugify(speakerName),
  };
};

const chapterTitle = (num: string) =>
  chapters.find((c) => c.number === num)?.title ?? `Chapter ${num}`;

/**
 * Build an evidence enrichment graph from committed evidence.json.
 * Auto-generated at import time; scale by re-running build_evidence.py upstream.
 */
export const buildEvidenceGraph = (): EvidenceGraphData => {
  const nodes = new Map<string, GraphNode>();
  const edges = new Map<string, GraphEdge>();
  let anchorCount = 0;

  const addNode = (node: GraphNode) => {
    const existing = nodes.get(node.id);
    if (!existing || node.size > existing.size) nodes.set(node.id, node);
  };

  const addEdge = (edge: Omit<GraphEdge, 'id'>) => {
    const id = `${edge.type}:${edge.source}->${edge.target}`;
    if (!edges.has(id)) edges.set(id, { ...edge, id });
  };

  for (const chapter of chapters) {
    addNode({
      id: `chapter:${chapter.number}`,
      type: 'chapter',
      label: chapter.title,
      shortLabel: `Ch ${chapter.number}`,
      chapterNumber: chapter.number,
      size: 14,
    });
  }

  for (const [chapterKey, claims] of Object.entries(evidence)) {
    const chapterNum = chapterKey.padStart(2, '0');

    for (const claim of claims) {
      addNode({
        id: claim.claim_id,
        type: 'claim',
        label: claim.text,
        shortLabel: truncate(claim.text, 42),
        chapterNumber: chapterNum,
        supportLevel: claim.support_level,
        size: claim.support_level === 'strong' ? 8 : 6,
      });

      addEdge({
        source: `chapter:${chapterNum}`,
        target: claim.claim_id,
        type: 'cited_in',
      });

      const speakersInClaim = new Set<string>();

      for (const anchor of claim.anchors) {
        anchorCount += 1;
        const { speakerId, speakerName } = parseSpeakerLabel(anchor.label);
        const videoNodeId = `video:${anchor.video_id}`;

        addNode({
          id: speakerId,
          type: 'speaker',
          label: speakerName,
          shortLabel: truncate(speakerName, 28),
          speakerName,
          size: 7,
        });

        addNode({
          id: videoNodeId,
          type: 'video',
          label: anchor.label,
          shortLabel: truncate(speakerName, 22),
          videoId: anchor.video_id,
          speakerName,
          size: 5,
        });

        addEdge({ source: claim.claim_id, target: videoNodeId, type: 'supports' });
        addEdge({ source: claim.claim_id, target: speakerId, type: 'supports' });
        addEdge({ source: speakerId, target: videoNodeId, type: 'appears_in' });
        addEdge({ source: `chapter:${chapterNum}`, target: speakerId, type: 'cited_in' });

        speakersInClaim.add(speakerId);
      }

      // Connect practitioners quoted in the same claim (co-citation).
      const speakerList = [...speakersInClaim];
      for (let i = 0; i < speakerList.length; i += 1) {
        for (let j = i + 1; j < speakerList.length; j += 1) {
          addEdge({
            source: speakerList[i],
            target: speakerList[j],
            type: 'same_theme',
          });
        }
      }
    }
  }

  const nodeList = [...nodes.values()];
  return {
    nodes: nodeList,
    edges: [...edges.values()],
    stats: {
      chapters: nodeList.filter((n) => n.type === 'chapter').length,
      claims: nodeList.filter((n) => n.type === 'claim').length,
      speakers: nodeList.filter((n) => n.type === 'speaker').length,
      videos: nodeList.filter((n) => n.type === 'video').length,
      anchors: anchorCount,
    },
  };
};

/** Cached singleton — graph is derived from static JSON. */
let cached: EvidenceGraphData | null = null;
export const getEvidenceGraph = (): EvidenceGraphData => {
  if (!cached) cached = buildEvidenceGraph();
  return cached;
};

/** Filter graph to a chapter neighborhood (chapter + connected claims, speakers, videos). */
export const filterGraphByChapter = (
  graph: EvidenceGraphData,
  chapterNumber: string,
): EvidenceGraphData => {
  const num = chapterNumber.padStart(2, '0');
  const chapterId = `chapter:${num}`;
  const nodeIds = new Set<string>([chapterId]);

  for (const edge of graph.edges) {
    if (edge.source === chapterId || edge.target === chapterId) {
      nodeIds.add(edge.source);
      nodeIds.add(edge.target);
    }
  }

  // Second hop: claims → videos/speakers
  for (const edge of graph.edges) {
    if (nodeIds.has(edge.source) && graph.nodes.find((n) => n.id === edge.source)?.type === 'claim') {
      nodeIds.add(edge.target);
    }
    if (nodeIds.has(edge.target) && graph.nodes.find((n) => n.id === edge.target)?.type === 'claim') {
      nodeIds.add(edge.source);
    }
  }

  const nodes = graph.nodes.filter((n) => nodeIds.has(n.id));
  const ids = new Set(nodes.map((n) => n.id));
  const edges = graph.edges.filter((e) => ids.has(e.source) && ids.has(e.target));

  return {
    nodes,
    edges,
    stats: {
      chapters: nodes.filter((n) => n.type === 'chapter').length,
      claims: nodes.filter((n) => n.type === 'claim').length,
      speakers: nodes.filter((n) => n.type === 'speaker').length,
      videos: nodes.filter((n) => n.type === 'video').length,
      anchors: edges.filter((e) => e.type === 'supports' && e.target.startsWith('video:')).length,
    },
  };
};

export const claimsForChapter = (chapterNumber: string): EvidenceClaim[] =>
  evidence[String(parseInt(chapterNumber, 10))] ?? [];

export const anchorForNode = (node: GraphNode): Anchor | undefined => {
  if (node.type !== 'video' || !node.videoId) return undefined;
  for (const claims of Object.values(evidence)) {
    for (const claim of claims) {
      const anchor = claim.anchors.find((a) => a.video_id === node.videoId);
      if (anchor) return anchor;
    }
  }
  return undefined;
};

export const chapterLabel = chapterTitle;
