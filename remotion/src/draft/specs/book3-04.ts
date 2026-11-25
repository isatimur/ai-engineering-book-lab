import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-04.md; quote is claims#17's anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter04',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 4,
  chapterTitle: 'Decomposition and the Plan',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch04.jpg', 'draft/book3-ch04.jpg', 'draft/book3-close.jpg'],
  hook: 'Planning is leverage.',
  title: { lead: 'Planning is', accent: 'compression of intent.' },
  intro: {
    kicker: 'A three-phase loop',
    line: 'Research, then plan, then implement.',
  },
  terms: [
    {
      term: 'Research',
      definition: 'A snapshot of the parts of the codebase that bear on this problem.',
    },
    {
      term: 'Decomposition',
      definition: 'A step should be small enough to finish inside the good part of a context window.',
    },
    { term: 'Plan', definition: 'The cheapest place in the whole pipeline to catch a mistake.' },
  ],
  punch: {
    lead: 'A bad line of code is a bad line of code,',
    accent: 'a bad part of a plan can be a hundred bad lines of code.',
    line: 'The errors multiply as you move upstream.',
  },
  quote: {
    text: 'AI cannot replace thinking. It can only amplify the thinking you have done or the lack of thinking you have done.',
    speaker: 'Dex Horthy, HumanLayer',
    claimId: 'claims#17',
    at: '00:10:13.120',
  },
  stats: {
    kicker: 'Both outcomes come from the same process',
    items: [
      ['40%', 'of the context window, where the dumb zone begins'],
      ['35,000', 'lines shipped in about seven hours'],
    ],
    line: 'The method raises the ceiling on what you can attempt.',
  },
};
