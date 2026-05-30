import chapter01 from '../content/chapter-01.md?raw';
import chapter02 from '../content/chapter-02.md?raw';
import chapter03 from '../content/chapter-03.md?raw';
import chapter04 from '../content/chapter-04.md?raw';
import chapter05 from '../content/chapter-05.md?raw';
import chapter06 from '../content/chapter-06.md?raw';
import chapter07 from '../content/chapter-07.md?raw';
import chapter08 from '../content/chapter-08.md?raw';
import chapter09 from '../content/chapter-09.md?raw';
import chapter10 from '../content/chapter-10.md?raw';

export type ChapterStatus = 'Drafting' | 'Starter' | 'Outlined';

export type BookChapter = {
  number: string;
  title: string;
  promise: string;
  status: ChapterStatus;
  wordCount: number;
  content: string;
};

const countWords = (content: string) => content.trim().split(/\s+/).filter(Boolean).length;

export const chapters: BookChapter[] = [
  {
    number: '01',
    title: 'The Shift: From Assistant to Delegate',
    promise: 'Why the important transition is not better chat UX, but reliable delegated work.',
    status: 'Outlined',
    content: chapter01,
    wordCount: countWords(chapter01),
  },
  {
    number: '02',
    title: 'Taste Still Matters When Code Gets Cheap',
    promise: 'Why fundamentals, judgment, craft, and constraint become more valuable.',
    status: 'Outlined',
    content: chapter02,
    wordCount: countWords(chapter02),
  },
  {
    number: '03',
    title: 'Harnesses, Specs, and Codebases Agents Can Actually Use',
    promise: 'How prepared environments make coding agents useful without accepting slop.',
    status: 'Drafting',
    content: chapter03,
    wordCount: countWords(chapter03),
  },
  {
    number: '04',
    title: 'Evals Are the Control System',
    promise: 'Why production trust comes from measurement loops, not vibes.',
    status: 'Drafting',
    content: chapter04,
    wordCount: countWords(chapter04),
  },
  {
    number: '05',
    title: 'Context Is Infrastructure',
    promise: 'Retrieval, memory, and knowledge layers as first-class system design.',
    status: 'Drafting',
    content: chapter05,
    wordCount: countWords(chapter05),
  },
  {
    number: '06',
    title: 'Runtimes, State, and the Human Control Plane',
    promise: 'Durable agents, replay vs snapshot, and why autonomy needs architecture.',
    status: 'Drafting',
    content: chapter06,
    wordCount: countWords(chapter06),
  },
  {
    number: '07',
    title: 'Security, Identity, and High-Stakes Trust',
    promise: 'Why delegated authority needs boundaries, audit trails, and real controls.',
    status: 'Starter',
    content: chapter07,
    wordCount: countWords(chapter07),
  },
  {
    number: '08',
    title: 'Realtime, Voice, and the Cost of Being Interruptible',
    promise: 'What voice, latency, and turn-taking reveal about production AI.',
    status: 'Drafting',
    content: chapter08,
    wordCount: countWords(chapter08),
  },
  {
    number: '09',
    title: 'The AI-Native Organization',
    promise: 'How teams and incentives change when AI becomes part of the workforce.',
    status: 'Starter',
    content: chapter09,
    wordCount: countWords(chapter09),
  },
  {
    number: '10',
    title: 'What Endures',
    promise: 'The principles that survive tool churn: context, evals, control, and taste.',
    status: 'Outlined',
    content: chapter10,
    wordCount: countWords(chapter10),
  },
];
