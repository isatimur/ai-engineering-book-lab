import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-04.md; quote is claims#19's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter04',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 4,
  chapterTitle: 'Beyond Text',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch04.jpg', 'draft/book2-ch04.jpg', 'book2-ch01/verify.jpg'],
  hook: 'They are all converging on the same shape.',
  title: { lead: 'Model-building is one discipline,', accent: 'whatever the model outputs.' },
  intro: { kicker: 'They converge by two distinct mechanisms', line: 'The first is tokenization. The second is consolidation.' },
  terms: [
    { term: 'Tokenization', definition: 'Modalities that were never sequences of words are cut into discrete tokens.' },
    { term: 'Consolidation', definition: 'The zoo of narrow, task-specific models collapses into a single end-to-end model.' },
    { term: 'Embodiment', definition: 'A foundation model has to perceive, plan, and act.' },
  ],
  punch: {
    lead: 'Consolidation is a choice,',
    accent: 'not a law.',
    line: "Generative media runs the opposite way: compose, don't consolidate.",
  },
  quote: {
    text: "We're trying to transform the problem as a language modeling problem because humanity is extremely good at modeling sequences of token.",
    speaker: 'Samuel Humeau, Mistral',
    claimId: 'claims#19',
    at: '00:08:58.640',
  },
  stats: {
    kicker: 'Demand arrives faster than the infrastructure under them',
    items: [
      ['500', 'H100 GPUs allocated for the Dream Machine launch'],
      ['4', 'days to a million users'],
    ],
    line: 'A million users in four days is the shape of the demand the whole cluster is racing to serve.',
  },
};
