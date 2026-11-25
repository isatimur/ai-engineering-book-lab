import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-10.md; quote is claims#35's first anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter10',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 10,
  chapterTitle: 'The Review Wall',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch10.jpg', 'draft/book3-ch10.jpg', 'draft/book3-close.jpg'],
  hook: 'All of it arrives at a person.',
  title: { lead: 'Slop is what happens when', accent: 'generation outruns judgment.' },
  intro: { kicker: "Review's several jobs", line: 'They have different answers.' },
  terms: [
    { term: 'Correctness', definition: 'Does it work, is it safe, does it break anything.' },
    { term: 'Coherence', definition: 'Does it fit the system, or does it duplicate something that exists?' },
    {
      term: 'Mental alignment',
      definition: 'Keeping the team on the same page about how the system is changing and why.',
    },
  ],
  punch: {
    lead: 'A check that cannot fail',
    accent: 'is not a check.',
    line: 'You do not scale review by reading faster.',
  },
  quote: {
    text: '2,450% increase in lines of code, 240% increase in commits, but the same study showed only a 30% increase in releases.',
    speaker: 'Tariq Shaukat, Sonar',
    claimId: 'claims#35',
    at: '00:05:47.614',
  },
  stats: {
    kicker: 'Lines of code up, releases barely moved',
    items: [
      ['240%', 'increase in commits'],
      ['30%', 'increase in releases'],
    ],
    line: "We haven't figured out how to scale from producing stuff to shipping stuff.",
  },
};
