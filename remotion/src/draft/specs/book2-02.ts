import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-02.md; quote is claims#8's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter02',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 2,
  chapterTitle: 'Inference Economics',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch02.jpg', 'draft/book2-ch02.jpg', 'book2-ch01/verify.jpg'],
  hook: 'It is the served token.',
  title: { lead: 'Inference is a recurring cost', accent: 'you pay on every request.' },
  intro: { kicker: 'This chapter runs in two movements', line: 'The first is serving performance. The second is the compute substrate.' },
  terms: [
    { term: 'Serving performance', definition: 'How you make a given model fast and cheap.' },
    { term: 'Compute substrate', definition: 'The GPUs, networks, data centers, and economics underneath.' },
    { term: 'Inference', definition: 'A recurring cost you pay on every request, for as long as the product lives.' },
  ],
  punch: {
    lead: 'Movement A is the frontier you can push.',
    accent: 'Movement B is the ceiling that pushes back.',
    line: 'If the model is the product, inference is the cost of goods sold.',
  },
  quote: {
    text: 'A good model and a good system that takes into account the actual constraints for what you need from your deployment is actually key to the success of both your deployment and the application.',
    speaker: 'Kyle Kranen, NVIDIA',
    claimId: 'claims#8',
    at: '00:00:24.880',
  },
  stats: {
    kicker: 'Speed and cost are a system property, not a model property',
    items: [
      ['10x', 'faster open models, a serving problem'],
      ['40', 'tokens per second, Gemma 4 on an iPhone'],
    ],
    line: "A model's latency and cost are not printed on the checkpoint.",
  },
};
