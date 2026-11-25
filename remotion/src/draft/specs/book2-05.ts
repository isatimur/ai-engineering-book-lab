import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-05.md; quote is claims#29's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter05',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 5,
  chapterTitle: 'Robotics and the Physical World',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['draft/book2-ch05.jpg', 'draft/book2-ch05.jpg', 'book2-ch01/verify.jpg'],
  hook: 'The domain is not a text box.',
  title: { lead: 'The bug is the system,', accent: 'not the policy.' },
  intro: { kicker: 'The physical world adds constraints the text harness never has to handle', line: 'Each one forces the playbook to give something up.' },
  terms: [
    { term: 'One general model', definition: 'A model that can control any robot to do any task.' },
    { term: 'Tiny models', definition: 'Reach is bounded by the smallest model a cheap body can run.' },
    { term: 'Physical data', definition: 'Video, sensor readings, and robot telemetry, which agents handle badly out of the box.' },
  ],
  punch: {
    lead: 'A chatbot that answers wrongly can be corrected.',
    accent: 'A robot that moves wrongly has already knocked something over.',
    line: 'Most of the intelligence you can actually ship lives in the system around the policy.',
  },
  quote: {
    text: 'If we want for intelligence to get into lots and lots and lots of devices and not just really expensive robots, we are going to need tiny models.',
    speaker: 'Cormac Brick, Google',
    claimId: 'claims#29',
    at: '00:00:17.359',
  },
  stats: {
    kicker: 'Text was legible to the agent by default; physical data is not',
    items: [
      ['21%', 'accuracy for data agents until a data harness is added'],
      ['$300', 'open-source robot, designed to be hacked'],
    ],
    line: 'Cheap bodies and small models are two halves of the same push to move robotics out of the lab.',
  },
};
