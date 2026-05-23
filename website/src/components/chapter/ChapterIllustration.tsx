import { type BookChapter } from '../../data/bookChapters';

// NOTE: this file will be REWRITTEN in Task 16 to use manifest opener.
// For Phase 1 we move verbatim so behavior does not change.
const illustrationSheet = '/assets/illustrations/ai-engineer-practical-explainers-sheet.png';

const chapterIllustrations = [
  { position: '0% 0%', subject: 'task pipeline', theme: 'Assistant to delegate' },
  { position: '33.333% 0%', subject: 'review lens', theme: 'Taste and judgment' },
  { position: '66.666% 0%', subject: 'agent-ready repo', theme: 'Repo as interface' },
  { position: '100% 0%', subject: 'harness workflow', theme: 'Harness workflow' },
  { position: '0% 50%', subject: 'eval loop', theme: 'Evals as control systems' },
  { position: '33.333% 50%', subject: 'context pipeline', theme: 'Context infrastructure' },
  { position: '66.666% 50%', subject: 'durable runtime', theme: 'Runtimes and state' },
  { position: '100% 50%', subject: 'human control plane', theme: 'Human control plane' },
  { position: '0% 100%', subject: 'security boundary', theme: 'Security and identity' },
  { position: '33.333% 100%', subject: 'realtime voice', theme: 'Realtime voice' },
  { position: '66.666% 100%', subject: 'AI-native organization', theme: 'AI-native organization' },
  { position: '100% 100%', subject: 'enduring principles', theme: 'What endures' },
];

type ConceptFigure = { title: string; body: string; illustrationIndex: number };

const chapterVisualGuides: Record<string, ConceptFigure[]> = {
  '01': [
    {
      title: 'Assistant vs delegate',
      body: 'The reader should see the shift from chat as an interface to delegated work as an operating model.',
      illustrationIndex: 0,
    },
    {
      title: 'Software factory',
      body: 'A useful AI system needs work intake, constraints, review, and output paths, not only a model prompt.',
      illustrationIndex: 3,
    },
    {
      title: 'High-stakes colleague',
      body: 'The more serious the work becomes, the more authority, evidence, and supervision matter.',
      illustrationIndex: 7,
    },
  ],
  '02': [
    {
      title: 'Taste is the filter',
      body: 'When code gets cheap, judgment becomes the scarce ability that decides what is worth building.',
      illustrationIndex: 1,
    },
    {
      title: 'Vibe coding risk',
      body: 'Fast generation is useful, but review discipline is what prevents convincing low-quality work.',
      illustrationIndex: 1,
    },
    {
      title: 'Problem framing',
      body: 'The valuable move is defining the target, constraints, and tradeoffs before the agent starts.',
      illustrationIndex: 0,
    },
  ],
  '03': [
    {
      title: 'Repo as interface',
      body: 'The codebase itself teaches the agent what good work means through patterns, tests, and boundaries.',
      illustrationIndex: 0,
    },
    {
      title: 'Executable intent',
      body: 'Specs are not paperwork when they become concrete acceptance criteria and repeatable checks.',
      illustrationIndex: 1,
    },
    {
      title: 'Harness workflow',
      body: 'The harness connects tasks, tools, subagents, review, and verification into one usable system.',
      illustrationIndex: 3,
    },
  ],
  '04': [
    {
      title: 'Measurement loop',
      body: 'Evals turn subjective confidence into observable behavior that can be improved.',
      illustrationIndex: 4,
    },
    {
      title: 'Control system',
      body: 'Production trust comes from feedback, thresholds, and response paths, not from a good demo.',
      illustrationIndex: 4,
    },
    {
      title: 'Regression memory',
      body: 'Good evals remember failures so the system does not quietly relearn the same mistake.',
      illustrationIndex: 4,
    },
  ],
  '05': [
    {
      title: 'Working set',
      body: 'Context engineering is deciding what the model should know at the moment of action.',
      illustrationIndex: 5,
    },
    {
      title: 'Retrieval shape',
      body: 'The issue is not whether information exists; it is whether the right evidence arrives in usable form.',
      illustrationIndex: 5,
    },
    {
      title: 'Memory boundaries',
      body: 'Memory must be scoped, inspectable, and maintained like infrastructure.',
      illustrationIndex: 5,
    },
  ],
  '06': [
    {
      title: 'Durable runtime',
      body: 'Agents need state, resumability, and recovery paths if they are expected to do real work.',
      illustrationIndex: 6,
    },
    {
      title: 'Replay vs snapshot',
      body: 'The runtime has to decide what is reconstructed from history and what is preserved as state.',
      illustrationIndex: 6,
    },
    {
      title: 'Human control plane',
      body: 'Humans need surfaces for approval, intervention, audit, and escalation.',
      illustrationIndex: 7,
    },
  ],
  '07': [
    {
      title: 'Authority boundary',
      body: 'Delegated work requires clear permissions, identity, and policy gates.',
      illustrationIndex: 8,
    },
    {
      title: 'Audit trail',
      body: 'Trust improves when actions can be traced, explained, and reversed.',
      illustrationIndex: 7,
    },
    {
      title: 'High-stakes escalation',
      body: 'Sensitive domains need explicit handoff points before autonomy becomes risk.',
      illustrationIndex: 8,
    },
  ],
  '08': [
    {
      title: 'Latency changes meaning',
      body: 'Realtime systems are judged by interruption, turn-taking, and timing, not only answer quality.',
      illustrationIndex: 9,
    },
    {
      title: 'Embodied edge',
      body: 'Voice and devices expose how AI behaves inside messy physical workflows.',
      illustrationIndex: 9,
    },
    {
      title: 'Cost of interruption',
      body: 'A helpful system can still fail if it speaks at the wrong time or breaks the user flow.',
      illustrationIndex: 9,
    },
  ],
  '09': [
    {
      title: 'AI-native operating model',
      body: 'Teams change when agents become part of the production process rather than side tools.',
      illustrationIndex: 10,
    },
    {
      title: 'Incentives and review',
      body: 'Organizations need new habits for accountability, review, and ownership.',
      illustrationIndex: 1,
    },
    {
      title: 'Knowledge compounding',
      body: 'The best teams turn repeated work into reusable context, evals, and playbooks.',
      illustrationIndex: 5,
    },
  ],
  '10': [
    {
      title: 'What survives tool churn',
      body: 'Models change quickly, but context, evals, control, and taste remain durable principles.',
      illustrationIndex: 11,
    },
    {
      title: 'Dependable systems',
      body: 'The lasting craft is turning capability into systems people can trust and operate.',
      illustrationIndex: 7,
    },
    {
      title: 'Engineering judgment',
      body: 'The book closes on the human disciplines that remain valuable as tools accelerate.',
      illustrationIndex: 1,
    },
  ],
};

const getChapterGuide = (chapter: BookChapter) =>
  chapterVisualGuides[chapter.number] ?? chapterVisualGuides['10'];

export const ChapterIllustration = ({ chapter, index }: { chapter: BookChapter; index: number }) => {
  const guide = getChapterGuide(chapter);
  const illustrationIndex = guide[0]?.illustrationIndex ?? index;
  const illustration = chapterIllustrations[illustrationIndex % chapterIllustrations.length];

  return (
    <div className="relative z-20 w-full max-w-md">
      <div
        className="oreilly-panel"
        role="img"
        aria-label={`${illustration.subject} woodcut illustration for chapter ${chapter.number}: ${illustration.theme}`}
        style={{
          backgroundImage: `url(${illustrationSheet})`,
          backgroundPosition: illustration.position,
        }}
      />
      <div className="mt-6 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/60">
        <span>Fig. {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{illustration.theme}</span>
      </div>
    </div>
  );
};

export { chapterVisualGuides, getChapterGuide, chapterIllustrations, illustrationSheet };
export type { ConceptFigure };
