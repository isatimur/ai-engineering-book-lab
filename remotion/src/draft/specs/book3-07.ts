import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-07.md; quote is claims#25's second anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter07',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 7,
  chapterTitle: 'Gates That Can Actually Fail',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch07.jpg', 'draft/book3-ch07.jpg', 'draft/book3-close.jpg'],
  hook: 'A gate dies in one of two ways.',
  title: { lead: 'A check never seen to fail', accent: 'is a hypothesis.' },
  intro: {
    kicker: 'Gates have two failure modes',
    line: 'One fires so often that people route around it, and one never fires at all.',
  },
  terms: [
    { term: 'Observed failing', definition: 'Break the thing it guards, on purpose, and watch it go red.' },
    {
      term: 'Broken or failed',
      definition: 'A check that crashes and a check that found a real problem are different events.',
    },
    { term: 'Unverifiable', definition: 'The check ran, could not reach the evidence, and is telling you so.' },
  ],
  punch: {
    lead: 'The first death is loud and gets fixed,',
    accent: 'the second is silent and gets praised.',
    line: 'Nobody files a ticket about a check that keeps passing.',
  },
  quote: {
    text: "One day, it silently fails, but you haven't noticed for a week. So, you build alerts. You just reinvented CI monitoring.",
    speaker: 'Sumaiya Shrabony',
    claimId: 'claims#25',
    at: '00:02:22.480',
  },
  stats: {
    kicker: 'Three properties, all cheap',
    items: [
      ['3', 'properties of a gate that is real'],
      ['90', 'days before GitHub expires workflow logs'],
    ],
    line: 'Most gates offer two answers to a three-answer question, and the missing answer always defaults to the reassuring one.',
  },
};
