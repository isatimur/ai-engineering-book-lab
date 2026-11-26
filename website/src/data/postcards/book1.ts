import { publicUrl } from '../book';
import type { Postcard } from '../figurePostcards';

/** Book 1 postcards after chapter 1. See figurePostcards.ts for the rules. */

/** "https://fromcopilottocolleague.com/" -> "fromcopilottocolleague.com". */
const at = (path: string) => publicUrl(path).replace(/^https?:\/\//, '').replace(/\/$/, '');

const TO = 'the reader who turned the card';
const BOOK_TITLE = 'From Copilot to Colleague';

// The same stamp and palette as the chapter 1 card (figurePostcards.ts).
const STAMP: Postcard['stamp'] = {
  title: ['From Copilot', 'to Colleague'],
  cover: '/covers/from-copilot-to-colleague-600w.webp',
  position: 'center 66%',
  size: '165% auto',
};
const THEME: Postcard['theme'] = { accent: '#A3423A', ink: '#18181A', paper: '#F2EFE9', rule: '#D8D4CC' };

const art = (chapter: string, alt: string): Postcard['art'] => ({
  wide: `/postcards/book1-ch${chapter}-wide.jpg`,
  tall: `/postcards/book1-ch${chapter}-tall.jpg`,
  alt,
});

const common = (chapter: string, n: number) => ({
  book: 'book1' as const,
  bookNo: 1 as const,
  chapter,
  bookTitle: BOOK_TITLE,
  stamp: STAMP,
  address: { to: TO, from: `${BOOK_TITLE}, ch. ${n}`, at: at('/') },
  theme: THEME,
});

export const BOOK1_MORE: Postcard[] = [
  {
    ...common('02', 2),
    riddle: 'Code now costs almost nothing to make. So what just got expensive?',
    art: art(
      '02',
      'In a pottery workshop a small robot turns out shelf after shelf of near-identical vases, while a person holds one vase up to the light; cracked ones wait in a basket, one fine vase stands alone.',
    ),
    back: {
      kicker: 'Ten drafts where there was one',
      headline: ['Cheap output. ', 'Expensive judgment.'],
      bars: [
        { label: 'generation', text: 'ten versions of a feature — instant, plausible' },
        { label: 'judgment', text: 'which one should exist, and what to throw away', hot: true },
      ],
      barNote: {
        value: '10',
        text: 'versions of a feature, where a team once made one',
        basis: ['A team can now generate ten versions of a feature instead of one.'],
      },
      stats: [
        {
          value: '6 mo',
          text: 'until the wrong dependency quietly punishes you',
          basis: ['Which dependency will quietly punish us six months from now?'],
        },
        {
          value: '4 nines',
          text: 'of uptime — where vibes do not cut it (Kelly, Augment Code)',
          hot: true,
          basis: ['four-nines uptime, thousands of users, and gigabytes of data'],
        },
      ],
      sources: 'Sources: chapter 2 (judgment under abundance) · #1 — Matt Pocock, AI Hero · #132 — Chris Kelly, Augment Code',
    },
    quote: { text: 'Software fundamentals matter now more than they actually ever have.', by: 'Matt Pocock, AI Hero' },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER TWO · TASTE ·',
  },
  {
    ...common('03', 3),
    riddle: 'Same strong model, same task, wrong guesses every time. What was missing from the room?',
    art: art(
      '03',
      'In a carpenter’s workshop a person hangs tools on a shadow board, each in its painted outline, while a small robot saws a plank along a line traced from a template.',
    ),
    back: {
      kicker: 'The model was not the suspect',
      headline: ['Not a smarter model. ', 'A workplace it can read.'],
      bars: [
        { label: 'tacit', text: 'house style in heads and Slack — the agent guesses' },
        { label: 'checked in', text: 'setup scripts, lint rules, accepted examples', hot: true },
      ],
      barNote: {
        value: '500',
        text: '“little decisions” in one patch, most never written down (Lopopolo)',
        basis: ['producing a single patch can require “500 little decisions”'],
      },
      stats: [
        {
          value: '~100%',
          text: 'single-agent success before you fan out to many (Reyes)',
          basis: ['until single-task execution succeeds nearly 100 percent of the time'],
        },
        {
          value: '5–7×',
          text: 'the gain from the environment — a choice the model won’t make for you',
          hot: true,
          basis: ['the real like 5x, 6x, 7x comes from'],
        },
      ],
      sources: 'Sources: chapter 3 (Meridian, agent-readiness) · #16 — Ryan Lopopolo, OpenAI · #57 — Eno Reyes, Factory AI',
    },
    quote: {
      text: 'The important thing is not the code but the prompt and the guardrails that got you there.',
      by: 'Ryan Lopopolo, OpenAI',
    },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER THREE · HARNESSES ·',
  },
  {
    ...common('04', 4),
    riddle: 'It worked first try, then twice more. Why is that still not enough to ship?',
    art: art(
      '04',
      'In a harbour at dusk a small robot in a rowing boat anchors a new lantern buoy beside a rock and a wrecked hull; a person sails calmly down a channel marked by earlier lantern buoys.',
    ),
    back: {
      kicker: 'Tested twice, shipped on a feeling',
      headline: ['A demo is not ', 'a control loop.'],
      bars: [
        { label: 'demo', text: '“looks fine” — a few handpicked runs, gut feel' },
        { label: 'evals', text: 'every real failure becomes a regression test', hot: true },
      ],
      barNote: {
        value: '2 days',
        text: 'after “looks fine”, admin backfills stalled in production',
        basis: ['Two days later support reports something odd.'],
      },
      stats: [
        {
          value: '95%',
          text: 'correct, painful to review — and it may still lose',
          basis: ['A coding patch that is 95 percent correct but painful to review may still lose economically.'],
        },
        {
          value: '3×',
          text: 'a mistake bites in a month — now it belongs in the test set',
          hot: true,
          basis: ['this class of mistake bit us three times last month'],
        },
      ],
      sources: 'Sources: chapter 4 (the admin-override regression) · #125 — Ido Pesok, Vercel v0 · #99 — Samuel Colvin, Pydantic',
    },
    quote: {
      text: 'It worked first try... I even tested it twice... So from there we’re good to ship, right?',
      by: 'Ido Pesok, Vercel v0',
    },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER FOUR · EVALS ·',
  },
  {
    ...common('05', 5),
    riddle: 'The firm kept every document it ever wrote. Why did the assistant cite the wrong one?',
    art: art(
      '05',
      'Beside towering archive shelves and a spilling mountain of papers, a person closes one slim binder while a small robot lights a single chosen page with its lantern.',
    ),
    back: {
      kicker: 'Millions of documents, one wrong citation',
      headline: ['Not more pages. ', 'The right binder.'],
      bars: [
        { label: 'pile', text: 'everything searchable — a public explainer outranks the matter note' },
        { label: 'binder', text: 'the governing few, typed by source, with provenance', hot: true },
      ],
      barNote: {
        value: '1M',
        text: 'the right million tokens — not a trillion at once (Jeff Dean, via Rogut)',
        basis: ['you do not need a trillion tokens at once, you need the right million'],
      },
      stats: [
        {
          value: '−94%',
          text: 'input tokens when only the relevant slices go in (Tesco, best case)',
          basis: ['cut input tokens by 94 percent'],
        },
        {
          value: '−49%',
          text: 'tool-load context when GitHub changed the default',
          hot: true,
          basis: ['cutting the initial tool-load context by 49 percent'],
        },
      ],
      sources:
        'Sources: chapter 5 (Hargrove’s matter note) · #756 — Kuba Rogut, Turbopuffer · #792 — Rajkumar Sakthivel, Tesco · #625 — Sam Morrow, GitHub',
    },
    quote: {
      text: '90% of your AI cost is input. Files, search results, context you send in.',
      by: 'Rajkumar Sakthivel, Tesco',
    },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER FIVE · CONTEXT ·',
  },
  {
    ...common('06', 6),
    riddle: 'A chatbot may forget everything. Why must an agent that works for days remember?',
    art: art(
      '06',
      'Under many suns and moons a small robot pulls a cart along a mountain road past lit waystations; at a toll gate before a bridge, a person reads a logbook and lifts the gate.',
    ),
    back: {
      kicker: 'Work that outlives one clever turn',
      headline: ['A transcript is not state. ', 'Work needs somewhere durable to stand.'],
      bars: [
        { label: 'transcript', text: 'what was said — retries repeat, approvals land late' },
        { label: 'durable state', text: 'what happened — checkpoints, resume, a review queue', hot: true },
      ],
      barNote: {
        value: '16 days',
        text: 'Factory’s longest mission — one active writer at a time',
        basis: ['reports a longest mission of sixteen days'],
      },
      stats: [
        {
          value: '50%',
          text: 'off with a flex tier, if the step can wait — a control-plane choice',
          basis: ['a 50% discount but your request can be ... delayed'],
        },
        {
          value: '3',
          text: 'stand-ins for one missing primitive: coordination',
          hot: true,
          basis: ['three substitutes for one primitive that does not yet exist'],
        },
      ],
      sources:
        'Sources: chapter 6 (Meridian’s subagents) · #99 — Samuel Colvin, Pydantic · #653 — Luke Alvoeiro, Factory · #692 — Guillaume Vernade, Google DeepMind',
    },
    quote: {
      text: 'Once we get into longer running workflows, that’s where it really becomes a problem.',
      by: 'Samuel Colvin, Pydantic',
    },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER SIX · RUNTIMES ·',
  },
  {
    ...common('07', 7),
    riddle: 'The agent will sometimes be wrong. What makes its mistakes survivable?',
    art: art(
      '07',
      'Inside a walled estate of closed doors, a small robot tends one fenced garden plot, holding a single key tied to a little hourglass; a person with a full key ring watches from the gatehouse.',
    ),
    back: {
      kicker: 'Assume the agent will be wrong',
      headline: ['Not a careful agent. ', 'Power with a shape.'],
      bars: [
        { label: 'borrowed key', text: 'a standing credential — whole authority, nothing to revoke' },
        { label: 'scoped token', text: 'short-lived, one task, one user — withdrawn at will', hot: true },
      ],
      barNote: {
        value: '4',
        text: 'controls on by default: sandbox, network, privilege, human review (Matin, OpenAI)',
        basis: ['names four controls as the default-on baseline'],
      },
      stats: [
        {
          value: '1 task',
          text: 'what the right credential is bound to, with a session and a user (Hanson)',
          basis: ['a short-lived, scoped token bound to a session, a user, and a task'],
        },
        {
          value: 'day 1',
          text: 'no new hire gets every door. Nor should an agent',
          hot: true,
          basis: ['Nobody grants a junior employee universal access to every internal system on day one.'],
        },
      ],
      sources: 'Sources: chapter 7 (Hargrove’s disputed filing) · #152 — Fouad Matin, OpenAI · #150 — Jared Hanson, Keycard · #32 — Tun Shwe, Lenses',
    },
    quote: { text: 'Your insecure MCP server won’t survive production.', by: 'Tun Shwe, Lenses' },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER SEVEN · SECURITY ·',
  },
  {
    ...common('08', 8),
    riddle: 'Text forgives a long pause. Why does the same pause on a call sound incompetent?',
    art: art(
      '08',
      'Two tin-can telephones on one taut string cross a stream: a person speaks, a small robot listens and lifts its lantern at once, and a snail carries a parcel slowly along the bank.',
    ),
    back: {
      kicker: 'Chat hides the loop',
      headline: ['Voice makes every defect ', 'audible.'],
      bars: [
        { label: 'silence', text: 'a long pause, then a polished answer — a dead line' },
        { label: 'first audio', text: 'a quick spoken acknowledgment, then the answer', hot: true },
      ],
      barNote: {
        value: '~200 ms',
        text: 'for the whole loop — understand, answer, speak (Zeghidour, Gradium AI)',
        basis: ['around 200 milliseconds'],
      },
      stats: [
        {
          value: '0.5–4 s',
          text: 'for one tool call — now the slowest part of the loop',
          hot: true,
          basis: ['between 500 milliseconds and 4 seconds'],
        },
        {
          value: '20%',
          text: 'of the time, Japanese speakers back-channel — half-duplex can’t hear it',
          basis: ['up to 20% of the time'],
        },
      ],
      sources: 'Sources: chapter 8 (the support call) · #662 — Neil Zeghidour, Gradium AI · #142 — Kwindla Hultman Kramer, Daily',
    },
    quote: { text: 'The main bottleneck is becoming the tool call', by: 'Neil Zeghidour, Gradium AI' },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER EIGHT · REALTIME ·',
  },
  {
    ...common('09', 9),
    riddle: 'Everyone shipped more over the weekend. Why did the company move slower on Monday?',
    art: art(
      '09',
      'Many small robots wheel carts of parcels from every lane toward one narrow gate, where a single person inspects one parcel at a time; the queue piles up, the road beyond stays nearly empty.',
    ),
    back: {
      kicker: 'Starved for coherence, not output',
      headline: ['Output is cheap. ', 'Review is the bottleneck.'],
      bars: [
        { label: 'output', text: 'more pull requests, more drafts — dashboards green' },
        { label: 'throughput', text: 'trusted work that ships — gated by human review', hot: true },
      ],
      barNote: {
        value: '12',
        text: 'pull requests waiting for one staff engineer on Monday morning',
        basis: ['A staff engineer woke up to twelve pull requests'],
      },
      stats: [
        {
          value: '10×',
          text: 'between 90% and 100% of engineers using AI (Shipper, Every)',
          basis: ['There is a 10x difference between an organization where 90% of engineers use AI versus one where 100% do.'],
        },
        {
          value: '20M',
          text: 'pull requests: volume rises, the real constraint goes unmeasured (Jellyfish)',
          hot: true,
          basis: ['built on some twenty million pull requests'],
        },
      ],
      sources: 'Sources: chapter 9 (Meridian’s Monday) · #65 — Dan Shipper, Every · #101 — Nick Arcolano, Jellyfish · #761 — Zack Proser, WorkOS',
    },
    quote: {
      text: 'agents are not the bottleneck now and I think that’s going to increasingly be the case, but we are.',
      by: 'Zack Proser, WorkOS',
    },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER NINE · THE ORG ·',
  },
  {
    ...common('10', 10),
    riddle: 'Models, tools and interfaces all get replaced. What part outlasts every one of them?',
    art: art(
      '10',
      'Travellers from many eras — a horse cart, a penny-farthing, a steam engine, a small robot with a lantern — cross an old stone bridge, while a person checks its foundation stones.',
    ),
    back: {
      kicker: 'The model turns over',
      headline: ['The surface changes. ', 'Constrained delegation stays.'],
      bars: [
        { label: 'surface', text: 'chat, panes, swarms, voices — renamed every month' },
        { label: 'pattern', text: 'legible, checked, bounded, supervised work', hot: true },
      ],
      barNote: {
        value: '6',
        text: 'layers to check before you blame the model — it is rarely the model',
        basis: ['name which of those six layers actually failed'],
      },
      stats: [
        {
          value: '2×',
          text: 'at least, the jargon gets rewritten before this sentence is old',
          basis: ['The jargon will get rewritten at least twice before this sentence is old.'],
        },
        {
          value: '7',
          text: '“make” lines — the work underneath stays the same',
          hot: true,
          basis: ['Reread the seven "make" lines above in six months.'],
        },
      ],
      sources: 'Sources: chapter 10 (the six-layer diagnostic, the seven “make” lines) · Omar Khattab, on DSPy',
    },
    quote: { text: 'fundamentally stayed the same over the years', by: 'Omar Khattab, on systems he built across model turnover' },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER TEN · WHAT ENDURES ·',
  },
];
