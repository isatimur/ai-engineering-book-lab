import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-02.md; quote is claims#8's anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter02',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 2,
  chapterTitle: 'Intent Before Specification',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch02.jpg', 'draft/book3-ch02.jpg', 'draft/book3-close.jpg'],
  hook: 'Working out what you actually want.',
  title: { lead: 'A specification is', accent: 'an answer.' },
  intro: {
    kicker: 'Before a specification exists',
    line: 'Two instruments do most of the work, and neither produces a document.',
  },
  terms: [
    {
      term: 'Interrogation',
      definition: 'Push on the stated requirement until it either explains itself or collapses.',
    },
    {
      term: 'Options',
      definition: 'Laying out two or three real alternatives turns an unexamined default into a choice.',
    },
    { term: 'Intent', definition: 'Intent is how you decide what to ship next and what to stop doing.' },
  ],
  punch: {
    lead: 'A specification is a good answer to a question you have already asked properly',
    accent: 'and an expensive way to avoid asking it.',
    line: 'Shipping is how you learn what people want.',
  },
  quote: {
    text: "Connect the customers, the understanding what the customer needs, to the technical choices that are being made so that you don't paint yourself into a corner and you don't overbuild.",
    speaker: 'Kent C. Dodds, EpicProduct.engineer',
    claimId: 'claims#8',
    at: '00:21:34.720',
  },
  stats: {
    kicker: 'What comes before the document',
    items: [
      ['2', 'instruments before a specification exists'],
      ['3', 'dimensions of the job: functional, social, emotional'],
    ],
    line: 'Both are cheap, and both are routinely skipped for the same reason.',
  },
};
