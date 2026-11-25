import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-07.md; quote is claims#38's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter07',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 7,
  chapterTitle: 'Creative, Education, and Games',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch07.jpg', 'draft/book2-ch07.jpg', 'book2-ch01/verify.jpg'],
  hook: 'The model explains; the engine computes.',
  title: { lead: 'The system owns the truth,', accent: 'the model owns the words.' },
  intro: {
    kicker: 'Three subjective domains, one discipline',
    line: 'Keep the model in a narrow lane and let a structured system hold the ground truth.',
  },
  terms: [
    {
      term: 'The engine',
      definition: 'Stockfish produces the ground-truth best move and evaluation for every position.',
    },
    {
      term: 'Hand-built detectors',
      definition: 'Extract the tactical structure into a large structured package.',
    },
    {
      term: 'The LLM',
      definition: 'Only then does an LLM enter, and only to turn that package into English.',
    },
  ],
  punch: {
    lead: 'Generation is cheap;',
    accent: 'judgment is not.',
    line: 'The difficulty in game-making with AI has moved, but it has not disappeared.',
  },
  quote: {
    text: 'Our puzzles are made by people. They’re not made by AI. And it’ll always be true. There’s no AI in the games themselves.',
    speaker: 'Quoraishee & Song, NYT',
    claimId: 'claims#38',
    at: '00:00:38.840',
  },
  stats: {
    kicker: 'The pipeline can run itself, and the bar is a human trainer',
    items: [
      ['100%', 'AI-generated content in one exploration game'],
      ['5', 'years, one paper wrote, until AI explains chess like a trainer'],
    ],
    line: 'The measure the field reaches for is not benchmark accuracy but a person.',
  },
};
