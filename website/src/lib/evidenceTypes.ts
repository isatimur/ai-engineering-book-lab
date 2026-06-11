export type Anchor = {
  video_id: string;
  start: string;
  end: string;
  start_seconds: number;
  quote: string;
  confidence: string;
  label: string;
};

export type EvidenceClaim = {
  claim_id: string;
  text: string;
  support_level: string;
  anchors: Anchor[];
};

export type GraphNodeType = 'chapter' | 'claim' | 'speaker' | 'video';

export type GraphEdgeType = 'cited_in' | 'supports' | 'appears_in' | 'same_theme';

export type GraphNode = {
  id: string;
  type: GraphNodeType;
  label: string;
  /** Short label for canvas rendering */
  shortLabel: string;
  chapterNumber?: string;
  supportLevel?: string;
  videoId?: string;
  speakerName?: string;
  size: number;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  type: GraphEdgeType;
};

export type EvidenceGraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    chapters: number;
    claims: number;
    speakers: number;
    videos: number;
    anchors: number;
  };
};
