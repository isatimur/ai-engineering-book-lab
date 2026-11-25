import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-03.md; quote is claims#15's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter03',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 3,
  chapterTitle: 'Building Frontier Models',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch03.jpg', 'draft/book2-ch03.jpg', 'book2-ch01/verify.jpg'],
  hook: 'The frontier is a discipline, not a club.',
  title: { lead: '"Stagnation" is a training-budget story,', accent: 'not a ceiling.' },
  intro: { kicker: 'Building a frontier model is its own discipline', line: 'It is set by release cadence, open or closed weights, benchmarks, and hardware.' },
  terms: [
    { term: 'Open source', definition: 'A way to build an ecosystem and set the standard others build on.' },
    { term: 'Benchmarks', definition: 'What the community agrees to measure becomes what the labs optimize.' },
    { term: 'The frontier', definition: 'A discipline with many practitioners, not a club with two members.' },
  ],
  punch: {
    lead: 'A lead measured in months',
    accent: 'is not a moat.',
    line: 'A benchmark looks like a neutral scoreboard. It is closer to a steering wheel.',
  },
  quote: {
    text: "Our approach: we look for root nodes. We're not going to waste time on the leaves.",
    speaker: 'Raia Hadsell, DeepMind',
    claimId: 'claims#15',
    at: '00:03:57.200',
  },
  stats: {
    kicker: 'Roughly one serious model release a week',
    items: [
      ['30', 'significant model releases in six months'],
      ['50,000', 'AI models uploaded to Hugging Face per month'],
    ],
    line: 'The frontier is not a place a handful of labs guard.',
  },
};
