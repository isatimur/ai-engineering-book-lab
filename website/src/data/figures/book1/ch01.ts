import type { EditorialFigureData } from '../types';

/**
 * Book 1, chapter 1 ("The Shift: From Assistant to Delegate"): the eight
 * inline figures, redrawn from the Excalidraw PNGs in
 * public/diagrams/inline/ch01-fig{1..8}.png. Same facts; every quote and
 * number is checked against src/content/chapter-01.md or
 * claims/Claims Ledger.md by ch01.test.tsx.
 */
export const BOOK1_CH01: EditorialFigureData[] = [
  {
    id: 'book1-ch01-fig1',
    layout: 'flow',
    kicker: 'Chapter 1 · Figure 1 · Three rungs',
    title: { lead: 'Assistant, copilot, delegate: ', accent: 'each rung hands over more of the work.' },
    lanes: [
      {
        label: 'Where the human sits',
        stages: [
          { label: 'Assistant', text: 'suggests — “tell me”', detail: 'in the critical path for every step' },
          { label: 'Copilot', text: 'collaborates inside a tight human loop', detail: 'alongside the work in real time' },
          {
            label: 'Delegate',
            text: 'comes back with work done — “go do”',
            detail: 'out of the loop until review',
            hot: true,
          },
        ],
      },
    ],
    stats: [
      {
        value: '24 h',
        text: 'the test: no human reads the output. If something has already changed, it is a delegate.',
        hot: true,
        basis: 'ask what happens if no human looks at the output for the next 24 hours',
      },
    ],
    note: 'Rising delegation needs rising trust. The book’s hard problems sit on the third rung.',
    quote: { text: 'from helpfulness to productive', by: 'Joel Hron, Thomson Reuters' },
    sources: 'Sources: #206 — Joel Hron, Thomson Reuters · chapter 1 (the 24-hour test)',
  },
  {
    id: 'book1-ch01-fig2',
    layout: 'compare',
    kicker: 'Chapter 1 · Figure 2 · Tell me vs go do',
    title: { lead: '“Tell me” becomes “go do”, ', accent: 'and the standard changes with it.' },
    shift: 'the shift',
    sides: [
      {
        label: 'Answer production',
        heading: '“Tell me”',
        items: ['Summarize a meeting.', 'Draft an email.', 'Explain a code snippet.'],
        verdict: 'Was it helpful? A wrong answer can still be useful.',
      },
      {
        label: 'Delegated execution',
        heading: '“Go do”',
        items: [
          'Review this contract and mark the risky clauses.',
          'Refactor this service, run the checks, and prepare the patch for review.',
          'Investigate the failure, trace the likely cause, and show me what to approve next.',
        ],
        verdict: 'Can I ship it? A wrong result shapes real work.',
        hot: true,
      },
    ],
    quote: { text: 'There’s no error, no warning, just the wrong answer.', by: 'Rafael Levi, Bright Data' },
    sources: 'Sources: #766 — Rafael Levi, Bright Data · chapter 1',
  },
  {
    id: 'book1-ch01-fig3',
    layout: 'matrix',
    kicker: 'Chapter 1 · Figure 3 · Chat is the tip',
    title: { lead: 'Chat is the visible surface. ', accent: 'The real system lives underneath.' },
    columns: 4,
    lead: { label: 'Chat', text: 'what the user sees' },
    divider: 'the part nobody demos',
    cells: [
      { label: 'Right context', text: 'not just a large context window' },
      { label: 'Usable tools', text: 'without drowning in irrelevant options' },
      { label: 'Explicit constraints', text: 'tacit expectations made explicit' },
      { label: 'Evaluation loops', text: 'catch drift before users do' },
      { label: 'Durable state', text: 'survives interruption, retries, and handoffs' },
      { label: 'Approval boundaries', text: 'humans steer without micromanaging' },
      { label: 'Observability', text: 'what happened, and what needs review next' },
    ],
    stats: [
      {
        value: '7',
        text: 'things a trustworthy delegate needs that chat alone does not provide',
        hot: true,
        basis: 'A trustworthy delegate needs seven things chat alone does not provide',
        count: [
          'right context',
          'usable tools',
          'explicit constraints',
          'evaluation loops',
          'durable state',
          'approval boundaries',
          'observability',
        ],
      },
    ],
    quote: { text: 'need more than just the chat.', by: 'Jacob Lauritzen, Legora' },
    sources: 'Sources: #3 — Jacob Lauritzen, Legora · chapter 1 (the seven needs)',
  },
  {
    id: 'book1-ch01-fig4',
    layout: 'flow',
    kicker: 'Chapter 1 · Figure 4 · The failure surface',
    title: { lead: 'The failure surface stretches: ', accent: 'the error surfaces after it has been built on.' },
    lanes: [
      {
        label: 'Assistant — “tell me” · the human reads every word',
        stages: [{ label: 'Ask' }, { label: 'Suggest', hot: true }, { label: 'Human reads ✓' }],
        span: { from: 1, to: 1, text: 'failure surface: one response, caught in context' },
      },
      {
        label: 'Delegate — “go do” · the human waits for the result',
        stages: [
          { label: 'Delegate' },
          { label: 'Step' },
          { label: 'Step ✗', hot: true },
          { label: 'Step, built on' },
          { label: 'Step, built on' },
          { label: 'Review' },
        ],
        span: { from: 2, to: 5, text: 'failure surface: the whole workflow, found downstream' },
      },
    ],
    note: 'A wrong suggestion is a wrong sentence. A wrong delegated action is a wrong artifact that other work now depends on.',
    quote: { text: 'A bad summary can waste a few minutes. A bad patch can stall a release.', by: 'Chapter 1' },
    sources: 'Source: chapter 1 — the failure surface',
  },
  {
    id: 'book1-ch01-fig5',
    layout: 'quote',
    kicker: 'Chapter 1 · Figure 5 · Capability vs expertise',
    title: { lead: 'Capability is not expertise. ', accent: 'Supply the second; do not wait for the first.' },
    quote: {
      text: 'Agents have intelligence and capabilities, but not always expertise that we need for real work.',
      by: 'Barry Zhang & Mahesh Murag, Anthropic',
    },
    points: [
      {
        label: 'Raw capability',
        text: 'a 300-IQ mathematician, asked to derive the 2025 tax code from first principles',
      },
      {
        label: 'Supplied expertise',
        text: 'an experienced tax professional’s consistent execution',
        hot: true,
      },
    ],
    numbers: [
      { value: '300', basis: 'you would not ask a 300-IQ mathematician' },
      { value: '2025', basis: 'to derive the 2025 tax code from first principles' },
    ],
    note: 'The move: package the missing context, conventions, and procedures as reusable skills the agent can load.',
    sources: 'Sources: #83 — Barry Zhang & Mahesh Murag, Anthropic · chapter 1',
  },
  {
    id: 'book1-ch01-fig6',
    layout: 'compare',
    kicker: 'Chapter 1 · Figure 6 · Two recurring cases',
    title: { lead: 'Two cases, one pattern: ', accent: 'the same shift in very different work.' },
    sides: [
      {
        label: 'The Software Factory',
        heading: '“Meridian”, a mid-size fintech',
        items: [
          'A payments repository and a strong coding model.',
          'Magical on small tasks → scope grows → quality gets erratic.',
          'Must add: harnesses, specs, validation, context discipline, eval loops, review surfaces.',
        ],
        verdict: 'Output: software',
      },
      {
        label: 'The High-Stakes Colleague',
        heading: '“Hargrove”, a mid-tier tax and advisory firm',
        items: [
          'An assistant that summarizes and explains.',
          'Helpful chat → asked for real work → fluency is not enough.',
          'Must add: provenance, access boundaries, retrieval discipline, staged authority, durable trajectories, review points.',
        ],
        verdict: 'Output: high-stakes professional judgment',
      },
    ],
    quote: {
      text: 'The more valuable the delegated work becomes, the more the surrounding system starts to matter.',
      by: 'Chapter 1',
    },
    sources: 'Source: chapter 1 — two composite cases, drawn from real patterns',
  },
  {
    id: 'book1-ch01-fig7',
    layout: 'matrix',
    kicker: 'Chapter 1 · Figure 7 · Make the standard explicit',
    title: { lead: 'Make the standard explicit, ', accent: 'or it will be violated silently.' },
    columns: 2,
    lead: { label: 'Tacit judgment', text: 'carried in senior heads, never written down' },
    divider: 'what it looks like',
    cells: [
      {
        label: 'Software',
        text: 'local conventions · architecture taste · dependency discipline · rollback instinct · performance habits',
      },
      {
        label: 'Professional services',
        text: 'source hierarchy · provenance awareness · exception handling · domain caution · when a result is not ready to trust',
      },
    ],
    result: {
      label: 'Made explicit → delegable',
      text: 'Left tacit → violated silently. The system cannot inherit what the organization never externalized.',
    },
    note: 'The new scarce skill: setting standards, framing tasks, spotting slop, and knowing what good looks like before the system does.',
    quote: { text: 'Cheap generation increases the value of judgment.', by: 'Chapter 1' },
    sources: 'Source: chapter 1 — delegation makes hidden judgment visible',
  },
  {
    id: 'book1-ch01-fig8',
    layout: 'stats',
    kicker: 'Chapter 1 · Figure 8 · One discipline',
    title: { lead: 'Not rival subcultures. ', accent: 'One discipline.' },
    stats: [
      {
        value: '10',
        text: 'practices often discussed as if they were separate subcultures',
        basis: 'are often discussed as if they were separate subcultures',
        count: [
          'Prompting',
          'retrieval',
          'evals',
          'workflow engines',
          'guardrails',
          'tool protocols',
          'observability',
          'sandboxing',
          'policy files',
          'approval systems',
        ],
        items: [
          'prompting',
          'retrieval',
          'evals',
          'workflow engines',
          'guardrails',
          'tool protocols',
          'observability',
          'sandboxing',
          'policy files',
          'approval systems',
        ],
      },
      {
        value: '6',
        text: 'questions it keeps returning to',
        basis: 'That discipline keeps returning to a small set of questions.',
        count: [
          'Can the system understand the environment it is supposed to operate in?',
          'Are the goals and constraints externalized well enough to survive handoff?',
          'Can the team tell whether the system is actually doing useful work?',
          'Is the model seeing the right information, in the right shape, at the right time?',
          'Can the work persist, recover, and expose itself to human supervision over time?',
          'Where should the system be free to act, and where must human judgment remain decisive?',
        ],
        items: [
          'Is the environment legible?',
          'Do goals survive handoff?',
          'Is it doing useful work?',
          'Right information, shape, time?',
          'Can work persist and recover?',
          'Where must humans decide?',
        ],
      },
      {
        value: '1',
        text: 'discipline: making delegated machine work trustworthy enough to use',
        hot: true,
        basis: 'They are pieces of one broader discipline: making delegated machine work trustworthy enough to use.',
      },
    ],
    sources: 'Source: chapter 1 — AI engineering is the discipline of making delegation trustworthy',
  },
];
