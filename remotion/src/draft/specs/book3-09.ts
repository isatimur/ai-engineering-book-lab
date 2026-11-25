import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-09.md; quote is claims#32's first anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter09',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 9,
  chapterTitle: 'Brownfield and Spec Rot',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch09.jpg', 'draft/book3-ch09.jpg', 'draft/book3-close.jpg'],
  hook: 'The thing already exists.',
  title: { lead: 'A generated map is wrong', accent: 'only until the next run.' },
  intro: { kicker: 'Three decays hide under the phrase', line: 'They need different responses.' },
  terms: [
    { term: 'Document drift', definition: 'The document drifts from the code.' },
    { term: 'Code drift', definition: 'Each locally correct, collectively incoherent.' },
    { term: 'Lost intent', definition: 'Nobody alive knows which parts are load-bearing.' },
  ],
  punch: {
    lead: 'The term spec rot flatters the problem',
    accent: 'by making it sound like a filing issue.',
    line: 'Only the first is really about documents.',
  },
  quote: {
    text: "Because it's a legacy code base, or actually more than 10 repos, nobody actually wants to touch the code. It's not a fun experience.",
    speaker: 'Denys Linkov, Wisedocs',
    claimId: 'claims#32',
    at: '00:00:37.880',
  },
  stats: {
    kicker: 'Nobody wants to touch it',
    items: [
      ['10+', 'repos in the legacy code base'],
      ['6', 'months committed to the refactor'],
    ],
    line: 'Cheap generation makes rewriting look more attractive than it has ever looked.',
  },
};
