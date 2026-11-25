import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-06.md; quote is claims#24's anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter06',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 6,
  chapterTitle: 'The Independence Problem',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch06.jpg', 'draft/book3-ch06.jpg', 'draft/book3-close.jpg'],
  hook: 'Verification has to be independent.',
  title: { lead: 'Make the check', accent: 'fail on purpose.' },
  intro: {
    kicker: 'Independence has to be engineered',
    line: 'The practical content of this chapter is three habits, and none of them is a tool.',
  },
  terms: [
    {
      term: 'Fail on purpose',
      definition: 'A check never observed failing has not been shown to work.',
    },
    {
      term: 'Different mechanism',
      definition: "If a script's output verifies the script, you have one mechanism agreeing with itself.",
    },
    { term: 'Independence', definition: 'A verifier that fails differently from you.' },
  ],
  punch: {
    lead: 'A gate that has never once objected',
    accent: 'is more likely to be blind than to be guarding a perfect codebase.',
    line: 'Correlated errors do not cancel. They confirm.',
  },
  quote: {
    text: "Every model has biases. So let's make sure we use different models and different techniques to make sure your code is safe, to make sure it's reliable, to make sure it's secure.",
    speaker: 'Tariq Shaukat, Sonar',
    claimId: 'claims#24',
    at: '00:11:34.800',
  },
  stats: {
    kicker: 'Same model, same benchmark',
    items: [
      ['74%', 'scored by the official judge'],
      ['38%', 'scored by a verifier built to agree with human labels'],
    ],
    line: 'The judge did not shade the result. It nearly doubled it.',
  },
};
