import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-12.md; quote is claims#4's second anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter12',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 12,
  chapterTitle: 'How Much Process, and How Far Out of the Loop',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch12.jpg', 'draft/book3-ch12.jpg', 'draft/book3-close.jpg'],
  hook: 'Most of the confident answers are untested.',
  title: { lead: 'From can I trust it', accent: 'to what am I giving up by not looking.' },
  intro: { kicker: 'No universal answer', line: 'What it has is a way of deciding.' },
  terms: [
    { term: 'Being wrong', definition: 'What does being wrong cost, and is it reversible?' },
    { term: 'Contested spec', definition: 'Is the specification contested, or merely unwritten?' },
    {
      term: 'Leaving the loop',
      definition: 'Leaving the loop costs you the next idea, and no model improvement refunds it.',
    },
  ],
  punch: {
    lead: 'A test that fails for the wrong reason',
    accent: 'looks exactly like a test that works.',
    line: 'The measures rewarded a correct result; they could not reward knowing why you believe it.',
  },
  quote: {
    text: "There is a deeper reason to understand what's going on, and that's understanding to participate.",
    speaker: 'Geoffrey Litt, Notion',
    claimId: 'claims#4',
    at: '00:04:08.760',
  },
  stats: {
    kicker: 'Two rounds, one repository, one model',
    items: [
      ['3', 'arms: no process, full pipeline, sharp skills'],
      ['0', 'planning artifacts before code, in all three arms'],
    ],
    line: 'A single habit outperformed an entire pipeline at a fraction of the price.',
  },
};
