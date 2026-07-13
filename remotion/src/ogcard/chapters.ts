import type { OgCardProps } from './OgCard';

/**
 * Mirrors website/src/data/bookChapters.ts's number/title/promise fields —
 * duplicated here (rather than imported) because this is a separate npm
 * project with no dependency on the website build. Keep in sync by hand;
 * it's 10 short lines, not worth a cross-project import for.
 */
export const OG_CARD_CHAPTERS: OgCardProps[] = [
  {
    chapterNumber: '01',
    title: 'The Shift: From Assistant to Delegate',
    promise: 'Why the important transition is not better chat UX, but reliable delegated work.',
  },
  {
    chapterNumber: '02',
    title: 'Taste Still Matters When Code Gets Cheap',
    promise: 'Why fundamentals, judgment, craft, and constraint become more valuable.',
  },
  {
    chapterNumber: '03',
    title: 'Harnesses, Specs, and Codebases Agents Can Actually Use',
    promise: 'How prepared environments make coding agents useful without accepting slop.',
  },
  {
    chapterNumber: '04',
    title: 'Evals Are the Control System',
    promise: 'Why production trust comes from measurement loops, not vibes.',
  },
  {
    chapterNumber: '05',
    title: 'Context Is Infrastructure',
    promise: 'Retrieval, memory, and knowledge layers as first-class system design.',
  },
  {
    chapterNumber: '06',
    title: 'Runtimes, State, and the Human Control Plane',
    promise: 'Durable agents, replay vs snapshot, and why autonomy needs architecture.',
  },
  {
    chapterNumber: '07',
    title: 'Security, Identity, and High-Stakes Trust',
    promise: 'Why delegated authority needs boundaries, audit trails, and real controls.',
  },
  {
    chapterNumber: '08',
    title: 'Realtime, Voice, and the Cost of Being Interruptible',
    promise: 'What voice, latency, and turn-taking reveal about production AI.',
  },
  {
    chapterNumber: '09',
    title: 'The AI-Native Organization',
    promise: 'How teams and incentives change when AI becomes part of the workforce.',
  },
  {
    chapterNumber: '10',
    title: 'What Endures',
    promise: 'The principles that survive tool churn: context, evals, control, and taste.',
  },
];
