import type { ExplainerSpec } from '../spec';

// From website/src/content-3/chapter-05.md; quote is claims#21's anchor.
export const spec: ExplainerSpec = {
  id: 'Book3Chapter05',
  bookTitle: 'The Shape of the Work',
  url: 'aiepress.com/third-book',
  chapter: 5,
  chapterTitle: 'Execution Under a Spec',
  cover: 'draft/book3-cover.jpg',
  backdrops: ['draft/book3-ch05.jpg', 'draft/book3-ch05.jpg', 'draft/book3-close.jpg'],
  hook: 'A specification does not bind anything by existing.',
  title: { lead: 'Permissions are', accent: 'specification, enforced.' },
  intro: {
    kicker: 'Exactly two mechanisms',
    line: 'During execution, a specification binds through exactly two mechanisms, and everything else is advisory.',
  },
  terms: [
    {
      term: 'Reach',
      definition: 'Sandboxing stops being a nice-to-have the moment you stop watching.',
    },
    {
      term: 'Checks',
      definition: 'A step with a stated verification is a step whose completion is a fact.',
    },
    {
      term: 'Suggestion',
      definition: 'Everything in the written plan that is neither a constraint nor a check is a suggestion.',
    },
  ],
  punch: {
    lead: 'A constraint it cannot violate',
    accent: 'is worth more than an instruction it was asked to follow.',
    line: 'Nobody granted the agent more judgement. They moved it somewhere its mistakes are cheap.',
  },
  quote: {
    text: "An asynchronous coding agent meant to run in the background and do all those tasks that you don't want to do.",
    speaker: 'Rustin Banks, Google',
    claimId: 'claims#21',
    at: '00:01:16.479',
  },
  stats: {
    kicker: 'Markdown is basically the new code',
    items: [
      ['15,000', 'lines of code deleted, replaced by one skill'],
      ['2', 'mechanisms that bind a specification during execution'],
    ],
    line: 'The claim is not that instructions are strictly superior to an implementation.',
  },
};
