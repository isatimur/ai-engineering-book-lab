import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-11.md; quote is claims#39's first anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter11',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 11,
  chapterTitle: 'The Factory and Its Discontents',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch11.jpg', 'draft/book3-ch11.jpg', 'draft/book3-close.jpg'],
  hook: 'They are not describing the same thing.',
  title: { lead: 'Harness engineering', accent: 'is not enough.' },
  intro: {
    kicker: 'Some mean a person running many agents',
    line: 'Some mean a pipeline that runs without anybody present.',
  },
  terms: [
    { term: 'Amplification', definition: 'An engineer with leverage, present, directing.' },
    { term: 'Absence', definition: 'A system that runs when nobody is watching.' },
    {
      term: 'Software factory',
      definition: 'The commitment to incrementally moving the human out of the loop within the SDLC.',
    },
  ],
  punch: {
    lead: 'Throughput metrics',
    accent: 'are nearly worthless as evidence.',
    line: 'The number to instrument is the one that embarrasses you.',
  },
  quote: {
    text: 'The prevailing narrative is we should just spend more tokens. You are the bottleneck. The models are good enough. Code is free. Just ship more stuff.',
    speaker: 'Dex Horthy, HumanLayer',
    claimId: 'claims#39',
    at: '00:01:10.880',
  },
  stats: {
    kicker: 'Any factory measured on the first number is a triumph',
    items: [
      ['2,450%', 'increase in lines of code'],
      ['30%', 'increase in releases'],
    ],
    line: 'The same factory measured on the second is an expensive way to grow a queue.',
  },
};
