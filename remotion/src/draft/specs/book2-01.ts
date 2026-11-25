import type { ExplainerSpec } from '../spec';

// From website/src/content-2/chapter-01.md; quote is claims#2's anchor.
export const spec: ExplainerSpec = {
  id: 'Book2Chapter01',
  bookTitle: 'The Model Layer & The Long Tail',
  url: 'aiepress.com/second-book',
  chapter: 1,
  chapterTitle: 'Training and the Turn to RL',
  cover: 'book2-ch01/cover.jpg',
  backdrops: ['book2-ch01/loop.jpg', 'book2-ch01/ladder.jpg', 'book2-ch01/verify.jpg'],
  hook: 'The model is no longer given.',
  title: { lead: 'Behavior is trained in,', accent: 'not prompted in.' },
  intro: { kicker: 'Post-training is not one technique', line: 'It is a menu, and the rungs climb in cost and power.' },
  terms: [
    { term: 'Supervised fine-tuning', definition: 'Teaches a model to imitate examples of the output you want.' },
    { term: 'Preference optimization', definition: 'Teaches it to prefer one response over another.' },
    {
      term: 'Reinforcement fine-tuning',
      definition: 'Optimizes against a reward, so the model can discover behavior no example set spelled out.',
    },
  ],
  punch: {
    lead: 'A neural reward model can be gamed.',
    accent: 'A compiler cannot.',
    line: 'Code is the domain where RL scales first.',
  },
  quote: {
    text: 'RL is not just any other algorithm for post-training, but is an algorithm that at its core will bring models to production.',
    speaker: 'Alessandro Cappelli, Adaptive ML',
    claimId: 'claims#2',
    at: '00:00:48.800',
  },
  stats: {
    kicker: 'The hard part is operations, not the algorithm',
    items: [
      ['4', 'models in memory for PPO-style RLHF'],
      ['3', 'even with GRPO, which drops the value model'],
    ],
    line: 'Holding several large models in memory at once, in sync, is an operations problem before it is a research one.',
  },
};
