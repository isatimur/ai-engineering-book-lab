import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-06.md; quote is claims#31's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter06',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 6,
  chapterTitle: 'Regulated and High-Stakes Domains',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch06.jpg', 'draft/book2-ch06.jpg', 'book2-ch01/verify.jpg'],
  hook: 'A wrong answer costs a lawsuit.',
  title: { lead: 'Not the technique,', accent: 'but the standard.' },
  intro: {
    kicker: 'Two movements, one thesis',
    line: 'High stakes turn verification from a nicety into the thing customers actually buy.',
  },
  terms: [
    {
      term: 'Separate verification',
      definition: 'Verification is a separate model call that checks each finding against the source document.',
    },
    {
      term: 'Deterministic engine',
      definition: 'Every figure comes from a deterministic tax engine; the LLM only explains it.',
    },
    {
      term: 'Evaluation is the product',
      definition: 'Evaluation and verification stop being a checkpoint you run before launch and become the product itself.',
    },
  ],
  punch: {
    lead: 'The eval system is not the thing you build to ship the product.',
    accent: 'It is the product.',
    line: 'A zero tolerance promotes evaluation and verification from optional to load-bearing.',
  },
  quote: {
    text: 'The solution for these two problems is realtime reference-free evaluation system. Reference free, also known as label free, means that you evaluate before you know the true outcome.',
    speaker: 'Anterior',
    claimId: 'claims#31',
    at: '00:05:38.319',
  },
  stats: {
    kicker: 'At scale, evaluation is the product',
    items: [
      ['44M', 'tax returns TurboTax processed for tax year 23'],
      ['50M', 'American lives covered by Anterior’s insurers'],
    ],
    line: 'When you serve 44 million tax returns or cover 50 million lives, edge cases stop being rare and become certainties.',
  },
};
