export type GlossaryTerm = {
  id: string;
  display: string[];
  definition: string;
  diagram?: string;
  chapterRef?: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  // ── Lab vocabulary (CONTEXT.md) ─────────────────────────────────────
  {
    id: 'the-lab',
    display: ['The Lab'],
    definition: 'The public experiment itself — corpus, agent loops, and the workflow that turns source material into book artifacts. Not "the project" or "the repo".',
  },
  {
    id: 'the-method',
    display: ['The Method'],
    definition: 'The reproducible research-and-writing machine — bounded research passes, reusable agent instructions, claims/evidence layers, cumulative logs. This is the deliverable, not the manuscript.',
  },
  {
    id: 'the-manuscript',
    display: ['The Manuscript'],
    definition: 'The book-length draft (chapters in public/drafting/). Proof that The Method works — not the product itself.',
  },
  {
    id: 'claim',
    display: ['Claim', 'Claims', 'Claims Ledger'],
    definition: 'A reusable, source-backed assertion The Manuscript can draw on. Claims live in the single canonical Claims Ledger and may be candidates for one or more chapters.',
  },
  {
    id: 'support-level',
    display: ['Support level'],
    definition: 'How well-evidenced a Claim is — tentative, moderate, or strong. The canonical term; not "strength".',
  },
  {
    id: 'source-anchor',
    display: ['Source Anchor', 'Source Anchors'],
    definition: 'A precise pointer from a Claim into a source video — video id + timestamp — marking the moment that grounds the Claim. Replaces a bare whole-video reference.',
  },

  // ── Concept diagram terms (one per /diagrams/concepts/) ─────────────
  {
    id: 'agentic-product-design',
    display: ['Agentic product design'],
    definition: 'Designing the surface area an agent acts through — intake, action, review — not just the model prompt.',
    diagram: '/diagrams/concepts/agentic-product-design.png',
    chapterRef: '01',
  },
  {
    id: 'agent-observability',
    display: ['Agent observability', 'observability flywheel'],
    definition: 'Traces, metrics, and replay tooling that turn agent runs into something you can debug and improve.',
    diagram: '/diagrams/concepts/agent-observability.png',
    chapterRef: '04',
  },
  {
    id: 'agent-runtime-replay-vs-snapshot',
    display: ['Replay vs snapshot', 'replay or snapshot'],
    definition: 'Two strategies for durable agent state: reconstruct from event history vs preserve as checkpoints.',
    diagram: '/diagrams/concepts/agent-runtime-replay-vs-snapshot.png',
    chapterRef: '06',
  },
  {
    id: 'ai-native-organization',
    display: ['AI-native organization', 'AI-native organisation'],
    definition: 'An operating model where AI is integrated into how work is created and reviewed, not just bolted on.',
    diagram: '/diagrams/concepts/ai-native-organization.png',
    chapterRef: '09',
  },
  {
    id: 'coding-evals',
    display: ['coding evals', 'coding eval'],
    definition: 'Task-level scoring for code-writing agents — human-seeded cases, regression memory, production traces.',
    diagram: '/diagrams/concepts/coding-evals.png',
    chapterRef: '04',
  },
  {
    id: 'constrained-delegation',
    display: ['constrained delegation'],
    definition: 'Bounded autonomy — scoped identity, sandboxing, audit trail — that lets an agent act safely.',
    diagram: '/diagrams/concepts/constrained-delegation.png',
    chapterRef: '07',
  },
  {
    id: 'context-engineering',
    display: ['context engineering', 'context is infrastructure'],
    definition: 'Deciding what the model should know at the moment of action — retrieval, memory, tool selection.',
    diagram: '/diagrams/concepts/context-engineering.png',
    chapterRef: '05',
  },
  {
    id: 'durable-agents',
    display: ['durable agents', 'durable runtime'],
    definition: 'Agents with state, resumability, and recovery paths — architecture that survives a crash.',
    diagram: '/diagrams/concepts/durable-agents.png',
    chapterRef: '06',
  },
  {
    id: 'graphrag',
    display: ['GraphRAG'],
    definition: 'Retrieval over a graph rather than a flat vector index — useful when relationships matter as much as content.',
    diagram: '/diagrams/concepts/graphrag.png',
    chapterRef: '05',
  },
  {
    id: 'harness-engineering',
    display: ['harness', 'harnesses', 'harness engineering'],
    definition: 'A prepared environment around an agent — specs, tests, tools, a plan → produce → review → ship loop — that lets the agent do real work without slop.',
    diagram: '/diagrams/concepts/harness-engineering.png',
    chapterRef: '03',
  },
  {
    id: 'hierarchical-memory',
    display: ['hierarchical memory'],
    definition: 'Layered memory — session, project, long-term — scoped, inspectable, maintained like infrastructure.',
    diagram: '/diagrams/concepts/hierarchical-memory.png',
    chapterRef: '05',
  },
  {
    id: 'human-control-plane',
    display: ['human control plane'],
    definition: 'Surfaces humans need to approve, intervene, audit, and escalate agent work.',
    diagram: '/diagrams/concepts/human-control-plane.png',
    chapterRef: '06',
  },
  {
    id: 'model-context-protocol',
    display: ['MCP', 'Model Context Protocol'],
    definition: 'A protocol for connecting models to tools and data sources in a standard, inspectable way.',
    diagram: '/diagrams/concepts/model-context-protocol.png',
    chapterRef: '05',
  },
  {
    id: 'one-shot-ai-failure',
    display: ['one-shot AI failure', 'one-shot failure'],
    definition: 'The failure mode where an agent is asked to do everything in a single pass and silently produces slop.',
    diagram: '/diagrams/concepts/one-shot-ai-failure.png',
    chapterRef: '03',
  },
  {
    id: 'software-factory',
    display: ['software factory'],
    definition: 'Work intake, constraints, review, and output paths — the surrounding system, not just the model prompt.',
    diagram: '/diagrams/concepts/software-factory.png',
    chapterRef: '03',
  },
  {
    id: 'spec-driven-development',
    display: ['spec-driven development', 'specs persist'],
    definition: 'Specs as executable acceptance criteria and repeatable checks — not paperwork.',
    diagram: '/diagrams/concepts/spec-driven-development.png',
    chapterRef: '03',
  },
  {
    id: 'vibe-coding',
    display: ['vibe coding'],
    definition: 'Shipping whatever runs — fast generation without review discipline. Useful sometimes, dangerous often.',
    diagram: '/diagrams/concepts/vibe-coding.png',
    chapterRef: '02',
  },
  {
    id: 'voice-agents',
    display: ['voice agents', 'voice agent'],
    definition: 'Sub-800 ms latency budget, streaming, turn detection, barge-in — what realtime stress-tests demand.',
    diagram: '/diagrams/concepts/voice-agents.png',
    chapterRef: '08',
  },

  // ── Chapter-level concepts without a dedicated concept diagram ──────
  {
    id: 'assistant-vs-delegate',
    display: ['delegate', 'assistant vs delegate'],
    definition: 'An assistant suggests; a copilot collaborates inside a human loop; a delegate is assigned work and expected to return with an artifact. The book argues most of the engineering difficulty now clusters around the third.',
    chapterRef: '01',
  },
  {
    id: 'repo-as-interface',
    display: ['the repo is the interface', 'repo as interface'],
    definition: 'The codebase itself teaches the agent what good work means through patterns, tests, and boundaries.',
    chapterRef: '03',
  },
  {
    id: 'vibe-engineering',
    display: ['vibe engineering'],
    definition: 'Frame, constrain, review — the discipline counterpart to vibe coding. Cheap generation, expensive judgment.',
    chapterRef: '02',
  },
  {
    id: 'authority-boundary',
    display: ['authority boundary', 'authority boundary collapse'],
    definition: 'Delegated work requires clear permissions, identity, and policy gates. The moment a system can act, it becomes an attack surface.',
    chapterRef: '07',
  },
  {
    id: 'scoped-agent-identity',
    display: ['scoped agent identity', 'scoped identity'],
    definition: "Each agent runs with the minimum identity and credentials needed for its task — not the human operator's full access.",
    chapterRef: '07',
  },
  {
    id: 'alignment-debt',
    display: ['alignment debt'],
    definition: "The cumulative gap between what an organization's AI use produces and what its review and governance can actually catch.",
    chapterRef: '09',
  },
];
