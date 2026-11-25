import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-08.md; quote is claims#29's second anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter08',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 8,
  chapterTitle: 'Shipping, and the Gap Between Merged and Live',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch08.jpg', 'draft/book3-ch08.jpg', 'draft/book3-close.jpg'],
  hook: 'Thirty commits, zero deployments.',
  title: { lead: 'What, specifically, tells you', accent: 'a change is live?' },
  intro: { kicker: 'Three questions a team can answer this week', line: 'Not merged, not green — live.' },
  terms: [
    {
      term: 'Implicit trigger',
      definition: 'A pipeline stage which depends on an implicit trigger has a failure mode with no signal.',
    },
    {
      term: 'Explicit dispatch',
      definition: 'The regeneration job now asks for the deployment rather than assuming a push implies one.',
    },
    { term: 'The silent gap', definition: 'Nothing in the normal signals distinguishes merged from live.' },
  ],
  punch: {
    lead: 'Nothing anywhere reported an absence',
    accent: 'because an absence is not an event.',
    line: 'Every run reported success. The numbers on the public site did not change.',
  },
  quote: {
    text: 'The things we learned, the systems that made this work, not just to ship faster, but actually to ship more effectively.',
    speaker: 'Harald Kirschner, VS Code',
    claimId: 'claims#29',
    at: '00:00:35.680',
  },
  stats: {
    kicker: 'Every indicator said the pipeline was healthy',
    items: [
      ['30', 'automated commits that deployed nothing'],
      ['4x', 'shorter release cycle, monthly to weekly'],
    ],
    line: 'Merging got cheaper, so the constraint moved to everything downstream of merge.',
  },
};
