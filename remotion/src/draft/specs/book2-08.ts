import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-08.md; quote is claims#31's second anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter08',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 8,
  chapterTitle: 'What the Edges Teach',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch08.jpg', 'draft/book2-ch08.jpg', 'book2-ch01/verify.jpg'],
  hook: 'Capability consolidates; accountability does not.',
  title: { lead: 'The frontier consolidates.', accent: 'The lanes stay drawn.' },
  intro: {
    kicker: 'Both halves move the line of what is given',
    line: 'Part I breaks it from underneath. Part II breaks it from the side.',
  },
  terms: [
    {
      term: 'Reward',
      definition: 'Reinforcement learning only works against a reward you can compute.',
    },
    {
      term: 'Eval',
      definition: 'Deploy into a regulated domain and the measure is an eval.',
    },
    {
      term: 'The measure',
      definition: 'They are the same object seen from two ends of the pipeline.',
    },
  ],
  punch: {
    lead: 'A better model moves work across the line faster.',
    accent: 'It does not move the line.',
    line: 'You end up owning more of the stack and less of the excuse.',
  },
  quote: {
    text: 'Our system isn’t deciding what correct is in a clinical edge case like this one. A licensed professional is.',
    speaker: 'Reed & Revere, SonderMind',
    claimId: 'claims#31',
    at: '00:11:45.360',
  },
  stats: {
    kicker: 'The constraint was never compensation for a weak model',
    items: [
      ['81%', 'best finance-benchmark score, grounding plus answer'],
      ['1 in 5', 'answers wrong under imperfect context'],
    ],
    line: 'A better model makes the escalation rarer. It does not remove the need for somewhere to escalate to.',
  },
};
