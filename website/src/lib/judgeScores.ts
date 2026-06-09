import judgeRaw from '../data/judge-scores.json';

export type JudgeLabel = 'strong' | 'moderate' | 'weak' | 'fail' | 'error';

export const DIMS = [
  'humanness',
  'voice',
  'usefulness',
  'evidence_density',
  'claim_defensibility',
  'redundancy',
] as const;

export type DimName = (typeof DIMS)[number];

// Reader-facing labels for the six MASH dimensions.
export const DIM_LABELS: Record<DimName, string> = {
  humanness: 'Humanness',
  voice: 'Voice',
  usefulness: 'Usefulness',
  evidence_density: 'Evidence',
  claim_defensibility: 'Defensibility',
  redundancy: 'Non-redundancy',
};

/**
 * Substantive-usefulness fields that sit alongside the six dimension scores in
 * both the book and per-chapter rollups. `usefulness` stays the honest
 * all-paragraph floor; `usefulness_substantive` re-averages over the
 * operational core (headings + short connective bridges removed), and
 * `usefulness_connective`/`usefulness_total` give the excluded share.
 */
export type UsefulnessExtras = {
  usefulness_substantive?: number | null;
  usefulness_connective?: number;
  usefulness_total?: number;
};

export type WeakParagraph = {
  dim_name: DimName;
  paragraph_index: number;
  score: number | null;
  label: JudgeLabel;
  reasoning: string;
  evidence_refs?: string[];
  para_excerpt: string;
};

export type ChapterScore = {
  slug: string;
  version_id: string | null;
  corpus_snapshot_hash: string | null;
  rollup: Record<DimName, number | null> & { n_paragraphs: number | null } & UsefulnessExtras;
  labels: Record<DimName, JudgeLabel>;
  coverage?: Record<DimName, Coverage>;
  ship_blockers: WeakParagraph[];
  weakest: WeakParagraph[];
};

export type Coverage = { scored: number; total: number };

export type JudgeRun = {
  run_id: string | null;
  corpus_snapshot_hash: string | null;
  book_mash_version: string | null;
  dim_registry_version: string | null;
  finished_at: string | null;
  total_cost_usd: number | null;
  status: string | null;
  dims: string[];
  coverage?: Record<string, Coverage>;
  partial?: boolean;
};

export type RunSnapshot = {
  run_id: string | null;
  version_id: string | null;
  finished_at: string | null;
  partial: boolean;
  book: Record<DimName, number | null>;
  chapters: Record<string, Record<string, number | null>>;
};

export type JudgeScores = {
  schema_version: number;
  run: JudgeRun;
  book: Record<DimName, number | null> & UsefulnessExtras;
  chapters: Record<string, ChapterScore>;
  history?: RunSnapshot[];
};

export const judgeScores = judgeRaw as JudgeScores;

/** Per-chapter score lookup by zero-padded or bare number; null when no run covered it. */
export const scoreForChapter = (chapterNumber: string): ChapterScore | null => {
  const padded = String(parseInt(chapterNumber, 10)).padStart(2, '0');
  return judgeScores.chapters[padded] ?? judgeScores.chapters[chapterNumber] ?? null;
};

/** Whether any chapter has scores (used to hide the whole surface pre-run). */
export const hasJudgeData = (): boolean =>
  Object.keys(judgeScores.chapters).length > 0;

export const labelColor = (label: JudgeLabel): string => {
  switch (label) {
    case 'strong':
      return 'var(--color-judge-strong, #15803d)';
    case 'moderate':
      return 'var(--color-judge-moderate, #6b7280)';
    case 'weak':
      return 'var(--color-judge-weak, #b45309)';
    case 'fail':
      return 'var(--color-judge-fail, #b91c1c)';
    default:
      return 'var(--color-ink-muted, #9ca3af)';
  }
};

export const weakestForDim = (chapter: ChapterScore, dim: DimName): WeakParagraph[] =>
  chapter.weakest.filter((w) => w.dim_name === dim);
