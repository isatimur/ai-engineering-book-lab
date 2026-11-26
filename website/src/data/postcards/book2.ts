import { publicUrl } from '../book';
import type { Postcard } from '../figurePostcards';

/** Book 2 postcards after chapter 1. See figurePostcards.ts for the rules. */

/** "https://aiepress.com/second-book" -> "aiepress.com/second-book". */
const at = (path: string) => publicUrl(path).replace(/^https?:\/\//, '').replace(/\/$/, '');

const TO = 'the reader who turned the card';
const BOOK_TITLE = 'The Model Layer & The Long Tail';
const STAMP: Postcard['stamp'] = {
  title: ['The Model Layer', '& The Long Tail'],
  cover: '/covers/the-model-layer-and-the-long-tail-600w.webp',
  position: '50% 64%',
  size: '135% auto',
};
const art = (chapter: string, alt: string): Postcard['art'] => ({
  wide: `/postcards/book2-ch${chapter}-wide.jpg`,
  tall: `/postcards/book2-ch${chapter}-tall.jpg`,
  alt,
});
const address = (chapter: number): Postcard['address'] => ({
  to: TO,
  from: `${BOOK_TITLE}, ch. ${chapter}`,
  at: at('/second-book'),
});

export const BOOK2_MORE: Postcard[] = [
  {
    book: 'book2',
    bookNo: 2,
    chapter: '02',
    bookTitle: BOOK_TITLE,
    riddle: 'Two kitchens cook the very same recipe. Why does one feed ten times more?',
    art: art(
      '02',
      'One pot of soup and one open recipe book feed two kitchens: a lone cook at a cramped stove ladles bowls to a long queue, while the kitchen next door, with a row of burners, a conveyor and a trolley, feeds a full table.',
    ),
    back: {
      kicker: 'Same weights, served two ways',
      headline: ['Speed and cost live in the system, ', 'not in the checkpoint.'],
      bars: [
        { label: 'naive', text: 'wrap it in a simple server — leave the savings on the table' },
        { label: 'system', text: 'engine, kernels, device — speed and cost are set here', hot: true },
      ],
      barNote: {
        value: '10×',
        text: 'faster open models — a serving problem, not a new model (Dzhulgakov, Fireworks)',
        basis: ['making open models roughly ten times faster is a serving problem'],
      },
      stats: [
        {
          value: '40',
          text: 'tokens per second: Gemma 4 on an iPhone, through MLX',
          basis: ['Adrien Grondin runs Gemma 4 on an iPhone at 40 tokens per second'],
        },
        {
          value: '$1/h',
          text: 'to serve realtime voice — the tightest budget there is',
          hot: true,
          basis: ['serve voice at roughly a dollar an hour'],
        },
      ],
      sources:
        'Sources: #141 — Kyle Kranen, NVIDIA · #548 — Dmytro Dzhulgakov, Fireworks · #007 — Adrien Grondin, Locally AI · chapter 2 — Neil Dwyer, Gabber',
    },
    quote: { text: 'Inference might be the largest market ever in software.', by: 'Alex Atallah, OpenRouter' },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER TWO · INFERENCE ECONOMICS ·',
    address: address(2),
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '03',
    bookTitle: BOOK_TITLE,
    riddle: 'For years only two labs held the summit. Why is the path crowded now?',
    art: art(
      '03',
      'A mountain summit once marked by two flags; now a long switchback path up its side is crowded with small roped teams of climbers, tents and an open gate at the foot.',
    ),
    back: {
      kicker: 'Who gets to build at the frontier',
      headline: ['Not a club of two. ', 'A discipline anyone can climb.'],
      bars: [
        { label: 'closed', text: 'rent the frontier through another company’s API' },
        { label: 'open', text: 'download it, run it, fine-tune it yourself', hot: true },
      ],
      barNote: {
        value: '30',
        text: 'significant model releases in six months (Willison)',
        basis: ['I counted 30 significant model releases in the past six months.'],
      },
      stats: [
        {
          value: '50,000',
          text: 'models uploaded to Hugging Face a month — more than one a minute',
          basis: [
            'more than 50,000 AI models have been uploaded to Hugging Face per month',
            'that is more than one AI model a minute',
          ],
        },
        {
          value: '2022',
          text: 'when most models in use today were trained — the leap waits on a budget (Patel)',
          hot: true,
          basis: ["The models that we're using today are largely the same as the models that were trained in 2022."],
        },
      ],
      sources:
        'Sources: chapter 3 — Simon Willison · #439 — Eugene Cheah, Featherless.ai · #476 — Dylan Patel, SemiAnalysis',
    },
    quote: {
      text: 'You do not need a billion dollars to compete with the big labs.',
      by: 'Eugene Cheah, Featherless.ai, on DeepSeek-R1',
    },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER THREE · BUILDING FRONTIER MODELS ·',
    address: address(3),
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '04',
    bookTitle: BOOK_TITLE,
    riddle: 'A voice, a playlist, a robot’s step. Why are they all built alike now?',
    art: art(
      '04',
      'Threads from a gramophone horn, a film reel, a stack of picture cards and a small walking clockwork robot run into one large loom, which weaves them into a single cloth; old single-purpose tools sit idle nearby.',
    ),
    back: {
      kicker: 'Speech, ranking, media, motion',
      headline: ['Cut it into tokens, ', 'then let one model do the job.'],
      bars: [
        { label: 'zoo', text: 'a narrow model for every task' },
        { label: 'one', text: 'a single foundation model behind every row', hot: true },
      ],
      barNote: {
        value: '2',
        text: 'mechanisms: tokenization and consolidation',
        basis: ['they are all converging on the same shape, and by two distinct mechanisms'],
      },
      stats: [
        {
          value: '3',
          text: 'of the largest personalization surfaces, one play: YouTube, Netflix, LinkedIn',
          basis: ['It is the same play at three of the largest personalization surfaces in the world'],
        },
        {
          value: '5',
          text: 'modalities — speech, ranking, media, driving, robots — one discipline',
          hot: true,
          basis: ['This chapter follows both mechanisms across five modalities'],
        },
      ],
      sources:
        'Sources: #663 — Samuel Humeau, Mistral · #245 — Devansh Tandon, YouTube · #247 — Yesu Feng, Netflix · #248 — Hamed & Maziar, LinkedIn',
    },
    quote: {
      text: 'The application of LLMs to recommendations is going to be a bigger consumer application than search.',
      by: 'Devansh Tandon, YouTube',
    },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER FOUR · BEYOND TEXT ·',
    address: address(4),
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '05',
    bookTitle: BOOK_TITLE,
    riddle: 'The robot drops the cup again. Is its brain really to blame?',
    art: art(
      '05',
      'A robot arm at a kitchen table lets a teacup fall; behind it a mechanic with a lantern ignores the robot’s head and traces a tangle of cables to a loose, sparking plug.',
    ),
    back: {
      kicker: 'Between the controller and the wire',
      headline: ['It looks like the policy. ', 'It is the system around it.'],
      bars: [
        { label: 'policy', text: 'the trained model — blamed first' },
        { label: 'system', text: 'a timing skew, a dropped message, a protocol quirk', hot: true },
      ],
      barNote: {
        value: '21%',
        text: 'agent accuracy on data projects without a data harness (Petrov, citing Anthropic)',
        basis: ['accuracy for data projects on their agents is only 21% until you add specific data harnesses to them'],
      },
      stats: [
        {
          value: '$8,999',
          text: 'an open-source humanoid, built for developers (K-Scale Labs)',
          basis: ['an open-source humanoid, built hardware-to-software for developers, at $8,999'],
        },
        {
          value: '$300',
          text: 'Reachy Mini, an open robot designed to be hacked (Hugging Face)',
          hot: true,
          basis: ['Reachy Mini, a $300 open-source robot that is designed to be hacked'],
        },
      ],
      sources:
        'Sources: #110 — Rishabh Garg, Tesla Optimus · #890 — Dmitry Petrov, DataChain · #276 — JX Mo, K-Scale Labs · #725 — Andres Marafioti, Hugging Face',
    },
    quote: {
      text: 'The issue will look like it’s the policy but it’s actually the software system.',
      by: 'Rishabh Garg, Tesla Optimus',
    },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER FIVE · THE PHYSICAL WORLD ·',
    address: address(5),
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '06',
    bookTitle: BOOK_TITLE,
    riddle: 'When one wrong answer costs a lawsuit, what are customers really paying for?',
    art: art(
      '06',
      'At a market, barrels of gold nuggets stand unattended while a long queue waits at an assayer’s booth, where each piece is weighed on a balance and checked under a magnifier.',
    ),
    back: {
      kicker: 'Where the error tolerance is zero',
      headline: ['The eval is not a gate before launch. ', 'It is the product.'],
      bars: [
        { label: 'model', text: 'about one answer in five confidently wrong' },
        { label: 'verify', text: 'a separate check, a deterministic engine, a named human', hot: true },
      ],
      barNote: {
        value: '81%',
        text: 'the best model’s grounding-plus-answer score on finance (Alshikh, Writer)',
        basis: ["Even the best model's combined grounding-plus-answer score tops out around 81%"],
      },
      stats: [
        {
          value: '44M',
          text: 'tax returns — and the model never calculates the number (Intuit)',
          basis: ['TurboTax successfully processed 44 million tax returns for tax year 23'],
        },
        {
          value: '50M',
          text: 'lives covered — every case scored before ground truth exists (Anterior)',
          hot: true,
          basis: ['covering 50 million American lives'],
        },
      ],
      sources: 'Sources: #406 — Waseem Alshikh, Writer · #197 — Jaspreet Singh, Intuit · #446 — Anterior',
    },
    quote: {
      text: 'Mission-critical decisions like in healthcare where there’s no room for error',
      by: 'Anterior, on prior authorization',
    },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER SIX · HIGH STAKES ·',
    address: address(6),
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '07',
    bookTitle: BOOK_TITLE,
    riddle: 'A chess coach that is never allowed to play chess. Why is that the right design?',
    art: art(
      '07',
      'A child and a narrator with a speaking trumpet sit at a chessboard; behind them a large brass gear-driven engine studies the position and feeds the narrator a punched ribbon to explain.',
    ),
    back: {
      kicker: 'Where there is no answer key',
      headline: ['The engine computes. ', 'The model only explains.'],
      bars: [
        { label: 'engine', text: 'Stockfish owns the truth: every move, every evaluation' },
        { label: 'model', text: 'turns the analysis into English — never plays', hot: true },
      ],
      barNote: {
        value: '100%',
        text: 'AI-generated game content — easy; keeping it consistent was not (Schomay)',
        basis: ['I made a game with 100% AI generated content'],
      },
      stats: [
        {
          value: '5',
          text: 'more years, a newspaper guessed, until AI explains chess like a human trainer',
          basis: ['it could easily take another 5 years until AI explains chess as well as a human trainer'],
        },
        {
          value: '70%',
          text: 'of generative-AI users are Gen Z — education needs a wakeup call (Druga)',
          hot: true,
          basis: ['70% of generative AI users are Generation Z'],
        },
      ],
      sources:
        'Sources: #677 — Dole & Steinskog, Play Magnus · #588 — Jeff Schomay · #822 — Stephan Steinfurt, TNG · #540 — Stefania Druga',
    },
    quote: {
      text: 'Our puzzles are made by people. They’re not made by AI.',
      by: 'Shafik Quoraishee & Joanne Song, The New York Times',
    },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER SEVEN · ONE LANE, MANY DOMAINS ·',
    address: address(7),
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '08',
    bookTitle: BOOK_TITLE,
    riddle: 'The model keeps getting better. Why does the line never move?',
    art: art(
      '08',
      'Ever larger and faster carts, from a hand cart to a steam wagon, bring loads to a stone wall with one gate, where the same old gatekeeper with a lantern inspects each load before lifting the bar.',
    ),
    back: {
      kicker: 'Capability consolidates; accountability does not',
      headline: ['A better model moves work faster. ', 'It does not move the line.'],
      bars: [
        { label: 'capability', text: 'one model absorbs every surface' },
        { label: 'answerable', text: 'a named human answers for each output', hot: true },
      ],
      barNote: {
        value: '81%',
        text: 'the strongest model on a finance benchmark — one answer in five wrong (Alshikh)',
        basis: [
          'Even the strongest model scores around 81% on the combined measure',
          'Roughly one answer in five is wrong under imperfect context.',
        ],
      },
      stats: [
        {
          value: '1',
          text: 'model for all of LinkedIn’s personalization tasks',
          basis: ['solve all the personalization tasks that that LinkedIn has with just one model'],
        },
        {
          value: '911',
          text: 'where medical judgment goes — not to the model (Mason)',
          hot: true,
          basis: ['call 911, go to your doctor'],
        },
      ],
      sources: 'Sources: #406 — Waseem Alshikh, Writer · #248 — Hamed & Maziar, LinkedIn · #339 — Dan Mason',
    },
    quote: {
      text: 'Our system isn’t deciding what correct is in a clinical edge case like this one. A licensed professional is.',
      by: 'Reed & Revere, SonderMind',
    },
    stamp: STAMP,
    postmarkRing: 'AIEPRESS.COM · CHAPTER EIGHT · WHAT THE EDGES TEACH ·',
    address: address(8),
  },
];
