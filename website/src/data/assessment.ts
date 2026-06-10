// AI-Native Engineering Readiness Assessment.
// 5 dimensions × 6 statements, each rated on a 1–5 agreement scale.
// Dimensions map to the book's maturity model and to specific chapters, so every
// result links back to source-backed prose.

export type DimensionId = 'delegation' | 'evals' | 'context' | 'governance' | 'org';

export type Dimension = {
  id: DimensionId;
  label: string;
  /** One-line description shown on the intro and dimension screens. */
  description: string;
  /** Canonical chapter URL this dimension reads back to. */
  chapterPath: string;
  /** Short chapter reference label, e.g. "Ch 4 — Evals Are the Control System". */
  chapterRef: string;
};

export type Question = {
  id: string;
  dimensionId: DimensionId;
  /** A behavioral statement the respondent rates from "strongly disagree" to "strongly agree". */
  text: string;
};

export const LIKERT: { value: number; label: string }[] = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
];

export const DIMENSIONS: Dimension[] = [
  {
    id: 'delegation',
    label: 'Delegation Depth',
    description: 'How far the organization has moved from inline suggestion to genuinely delegated execution.',
    chapterPath: '/read/01-the-shift',
    chapterRef: 'Ch 1 — The Shift: From Assistant to Delegate',
  },
  {
    id: 'evals',
    label: 'Eval Maturity',
    description: 'Whether output quality is governed by measurement loops rather than spot-checks and vibes.',
    chapterPath: '/read/04-evals',
    chapterRef: 'Ch 4 — Evals Are the Control System',
  },
  {
    id: 'context',
    label: 'Context Infrastructure',
    description: 'Whether retrieval, memory, and institutional knowledge are treated as first-class infrastructure.',
    chapterPath: '/read/05-context',
    chapterRef: 'Ch 5 — Context Is Infrastructure',
  },
  {
    id: 'governance',
    label: 'Runtime Governance',
    description: 'Durable runtimes, scoped authority, audit trails, and a human control plane tuned to task stakes.',
    chapterPath: '/read/07-security',
    chapterRef: 'Ch 6–7 — Runtimes & High-Stakes Trust',
  },
  {
    id: 'org',
    label: 'Org Design',
    description: 'Whether the operating model itself — review, alignment, ownership — has been redesigned around cheap execution.',
    chapterPath: '/read/09-ai-native-org',
    chapterRef: 'Ch 9 — The AI-Native Organization',
  },
];

export const QUESTIONS: Question[] = [
  // Delegation Depth
  { id: 'delegation-1', dimensionId: 'delegation', text: 'Engineers routinely hand multi-step tasks to agents and review the result, rather than using AI only for inline autocomplete.' },
  { id: 'delegation-2', dimensionId: 'delegation', text: 'Agents complete whole units of work end-to-end in our workflow — opening pull requests, not just generating snippets a human assembles.' },
  { id: 'delegation-3', dimensionId: 'delegation', text: 'A meaningful share of what we merged this quarter was substantially executed by an agent under human direction.' },
  { id: 'delegation-4', dimensionId: 'delegation', text: 'We have identified and closed "human-only" workflow paths that assumed work moves at human speed.' },
  { id: 'delegation-5', dimensionId: 'delegation', text: 'People outside engineering (support, product, ops) can start real work with agents, not just consume AI summaries.' },
  { id: 'delegation-6', dimensionId: 'delegation', text: 'Delegation is the norm across the whole engineering org, not a practice confined to a few enthusiasts.' },

  // Eval Maturity
  { id: 'evals-1', dimensionId: 'evals', text: 'We measure AI output quality with automated evals, not just manual spot-checks.' },
  { id: 'evals-2', dimensionId: 'evals', text: 'Evals sit on the path to production — work cannot ship if it fails them.' },
  { id: 'evals-3', dimensionId: 'evals', text: 'We track outcome metrics (rework rate, unreverted-ship rate) rather than activity metrics (PRs opened, lines generated).' },
  { id: 'evals-4', dimensionId: 'evals', text: "When an agent's quality regresses, our evals catch it before users do." },
  { id: 'evals-5', dimensionId: 'evals', text: 'Our eval suite is owned infrastructure with a maintainer, not a one-off script someone wrote once.' },
  { id: 'evals-6', dimensionId: 'evals', text: 'We can answer "is this agent getting better or worse over time?" with data, not opinion.' },

  // Context Infrastructure
  { id: 'context-1', dimensionId: 'context', text: 'Agents have governed access to the right internal documents and data for their tasks.' },
  { id: 'context-2', dimensionId: 'context', text: 'We invest in retrieval quality — assembling the right working set — rather than just giving agents more raw data.' },
  { id: 'context-3', dimensionId: 'context', text: "Institutional knowledge that used to live in people's heads is written down and reachable by agents." },
  { id: 'context-4', dimensionId: 'context', text: 'Our context and retrieval layer is maintained as shared infrastructure, not rebuilt per team.' },
  { id: 'context-5', dimensionId: 'context', text: 'We can trace what context an agent used to reach a given output.' },
  { id: 'context-6', dimensionId: 'context', text: 'We actively monitor for context-assembly failures — the right documents retrieved in the wrong combination.' },

  // Runtime Governance
  { id: 'governance-1', dimensionId: 'governance', text: 'Agents run on durable runtimes that survive restarts and handle retries, not stateless demos.' },
  { id: 'governance-2', dimensionId: 'governance', text: 'Humans re-enter at defined, consequential decision points — autonomy is a dial tuned to task stakes, not a switch.' },
  { id: 'governance-3', dimensionId: 'governance', text: 'Agents act with scoped, time-limited credentials, not standing access inherited from a human.' },
  { id: 'governance-4', dimensionId: 'governance', text: 'Every consequential agent action is logged with an audit trail we could reconstruct.' },
  { id: 'governance-5', dimensionId: 'governance', text: 'We designed governance — credential scope, approval, escalation — before granting production access, not after.' },
  { id: 'governance-6', dimensionId: 'governance', text: "We could revoke or bound an agent's authority quickly if something went wrong." },

  // Org Design
  { id: 'org-1', dimensionId: 'org', text: 'We treat review and eval capacity as the throughput limit of the org, and resource it accordingly.' },
  { id: 'org-2', dimensionId: 'org', text: 'Alignment happens upstream — shared plans before the agent fan-out — rather than colliding at merge.' },
  { id: 'org-3', dimensionId: 'org', text: 'Someone explicitly owns the judgment layer: which AI-generated artifacts are worth shipping.' },
  { id: 'org-4', dimensionId: 'org', text: 'Broader creation and stronger governance have risen together — democratized starts, one hardened path to ship.' },
  { id: 'org-5', dimensionId: 'org', text: 'Our leadership rituals ration judgment and review, not just report production volume.' },
  { id: 'org-6', dimensionId: 'org', text: 'We have a shared, written operating model for how humans and agents work together — not folklore.' },
];

export type Band = 'early' | 'developing' | 'advanced';

export type BandInfo = {
  band: Band;
  label: string;
  /** Per-dimension guidance shown on the results screen. */
  recommendation: Record<DimensionId, string>;
};

export const BAND_INFO: Record<Band, BandInfo> = {
  early: {
    band: 'early',
    label: 'Early stage',
    recommendation: {
      delegation: 'Most AI use is still inline assistance. Start by letting one team delegate a whole unit of work end-to-end and review the result — then find the first human-only path to close.',
      evals: 'Quality is judged by vibes. Stand up a small automated eval on your highest-stakes agent output, and put it on the path to production so failing work cannot ship.',
      context: 'Agents are working from raw data or their own session memory. Begin writing down the institutional knowledge that currently lives in senior people’s heads.',
      governance: 'Agents likely run with broad, standing access. Before expanding scope, design scoped credentials and an audit trail — this is the work that unlocks production, not a later constraint.',
      org: 'The operating model still assumes human-speed work. Name a single owner for the judgment layer and make review capacity visible as a real constraint.',
    },
  },
  developing: {
    band: 'developing',
    label: 'Developing',
    recommendation: {
      delegation: 'Delegation works in pockets. The next move is consistency: make end-to-end delegation the norm across the org, not a practice confined to enthusiasts.',
      evals: 'You measure, but not everywhere. Connect evals to the ship gate everywhere, and switch your dashboards from activity metrics to outcome metrics like rework rate.',
      context: 'Retrieval exists but is rebuilt per team. Consolidate it into shared infrastructure and add traceability for what context produced a given output.',
      governance: 'Controls exist but are uneven. Make scoped credentials and audit trails the default for every agent, and define where humans re-enter by task stakes.',
      org: 'Some redesign has happened. Move alignment upstream of the agent fan-out so plans meet before pull requests collide, and resource review as the throughput limit.',
    },
  },
  advanced: {
    band: 'advanced',
    label: 'Advanced',
    recommendation: {
      delegation: 'Delegation is universal. The frontier is externalizing the judgment that makes it safe — so the operating model itself becomes a versioned, improvable asset.',
      evals: 'Your measurement is real. Push toward evals that adapt as the system changes, and treat the eval suite as a first-class product with its own roadmap.',
      context: 'Context is infrastructure. The next edge is monitoring context-assembly quality as rigorously as you monitor uptime.',
      governance: 'Governance is load-bearing and designed-in. Keep tightening the loop between authority granted and authority needed, and make revocation instant.',
      org: 'The operating model has been redesigned. The remaining work is L4: package institutional judgment into constraints legible to agents as well as humans.',
    },
  },
};

export const QUESTIONS_PER_DIMENSION = 6;
const MIN_RAW = QUESTIONS_PER_DIMENSION * 1; // all 1s
const MAX_RAW = QUESTIONS_PER_DIMENSION * 5; // all 5s

/** Normalize a dimension's summed raw answers (6–30) to a 0–100 score. */
export const normalizeDimension = (rawSum: number): number =>
  Math.round(((rawSum - MIN_RAW) / (MAX_RAW - MIN_RAW)) * 100);

export const bandForScore = (score: number): Band =>
  score >= 70 ? 'advanced' : score >= 40 ? 'developing' : 'early';

export type Answers = Record<string, number>;

export type DimensionResult = {
  dimension: Dimension;
  score: number;
  band: Band;
};

export type AssessmentResult = {
  dimensions: DimensionResult[];
  overall: number;
  overallBand: Band;
};

/** Compute per-dimension scores and the overall from a complete (or partial) answer set. */
export const computeResult = (answers: Answers): AssessmentResult => {
  const dimensions: DimensionResult[] = DIMENSIONS.map((dim) => {
    const qs = QUESTIONS.filter((q) => q.dimensionId === dim.id);
    const rawSum = qs.reduce((sum, q) => sum + (answers[q.id] ?? 1), 0);
    const score = normalizeDimension(rawSum);
    return { dimension: dim, score, band: bandForScore(score) };
  });
  const overall = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);
  return { dimensions, overall, overallBand: bandForScore(overall) };
};

export const questionsForDimension = (id: DimensionId): Question[] =>
  QUESTIONS.filter((q) => q.dimensionId === id);
