import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-01.md; quote is claims#3's anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter01',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 1,
  chapterTitle: 'The Bottleneck Moved',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch01.jpg', 'draft/book3-ch01.jpg', 'draft/book3-close.jpg'],
  hook: 'Writing code got cheap.',
  title: { lead: 'Code generation was never', accent: 'the bottleneck.' },
  intro: {
    kicker: 'It moved. It did not disappear',
    line: 'A constraint that is removed from one place reappears in another.',
  },
  terms: [
    { term: 'Generation', definition: 'Generation stopped being the limit.' },
    { term: 'Verification', definition: 'Confidence became the limit.' },
    {
      term: 'People',
      definition: 'It relocated into people, where it compounds quietly and where no upgrade reaches it.',
    },
  ],
  punch: {
    lead: "An hour saved on something that isn't the bottleneck",
    accent: 'is worthless.',
    line: 'The saving was real. It was banked somewhere that did not control the outcome.',
  },
  quote: {
    text: 'Someone somewhere at your organization is spending time verifying code and that is now your new bottleneck.',
    speaker: 'Gabriel Spencer-Harper, Meticulous',
    claimId: 'claims#3',
    at: '00:00:55.199',
  },
  stats: {
    kicker: 'Grant the technology everything it claims',
    items: [
      ['14-16%', 'of the value stream, even with flawless code'],
      ['2x', 'end-to-end gains at the leading firms'],
    ],
    line: 'Faster coding produces the small number. Changing something about the end-to-end flow produces the large one.',
  },
};
