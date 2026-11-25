import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-03.md; quote is claims#11's anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter03',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 3,
  chapterTitle: 'What a Specification Is For',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch03.jpg', 'draft/book3-ch03.jpg', 'draft/book3-close.jpg'],
  hook: 'Code itself is a lossy projection.',
  title: { lead: 'It is an alignment device', accent: 'before it is an input.' },
  intro: {
    kicker: 'What the document is for',
    line: 'They disagree about who it is addressed to.',
  },
  terms: [
    {
      term: 'Vibe coding',
      definition: 'The low-spec zero planning approach to AI accelerated development.',
    },
    {
      term: 'Generating',
      definition: 'The specification is executable: it is the source, and the code is output.',
    },
    { term: 'Alignment', definition: 'The specification aligns people and the code follows.' },
  ],
  punch: {
    lead: "If you don't have a specification,",
    accent: 'you just have a vague idea.',
    line: 'A specification is an excellent way to record a decision and a poor way to make one.',
  },
  quote: {
    text: 'Specification effectively aligns and it is the artifact that you use to communicate and to discuss and debate and refer to and synchronize on.',
    speaker: 'Sean Grove, OpenAI',
    claimId: 'claims#11',
    at: '00:06:33.120',
  },
  stats: {
    kicker: 'What the absence costs',
    items: [
      ['2nd', 'audience, and it reads everything'],
      ['Monday', "you realize you don't understand it"],
    ],
    line: 'The code is still there. The understanding is gone.',
  },
};
