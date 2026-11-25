import { BOOK } from './book';
import { chapterParam, chapters } from './bookChapters';
import { BOOK_TWO_COVER, BOOK_TWO_TITLE, chapterTwoPath, chaptersTwo } from './bookChaptersTwo';
import { BOOK_THREE_COVER, BOOK_THREE_TITLE, chapterThreePath, chaptersThree } from './bookChaptersThree';
import { figuresTwo } from './figuresTwo';
import { figuresThree } from './figuresThree';
import type { FigureBook } from './bookFigures';
import { inlineFigsForChapter, opener } from '../lib/manifest';

/**
 * One excerpt page per book: a scroll-driven "taste of the book" built from
 * the book's opener chapter (pages/BookExcerpt.tsx). Each section pairs a
 * passage quoted verbatim from the chapter markdown with one of that
 * chapter's existing figures. bookExcerpts.test.ts checks every passage
 * against the chapter text, so a quote cannot drift from the book.
 */

/** Where the figure zooms to in mid-scroll: a point (0–100 %) and a scale. */
export type ExcerptFocus = { x: number; y: number; zoom: number };

export type ExcerptSection = {
  /** Copied verbatim from the chapter markdown. No markdown marks inside. */
  quote: string;
  figure: { src: string; alt: string };
  focus?: ExcerptFocus;
};

export type BookExcerpt = {
  id: 'one' | 'two' | 'three';
  path: string;
  bookTitle: string;
  chapterLabel: string;
  chapterTitle: string;
  /** Where "Read the book" goes: the opener chapter, where the excerpt came from. */
  readPath: string;
  /** Books 2 and 3 are noindex on every page, so their excerpts are too. */
  noindex: boolean;
  cover: string;
  description: string;
  accent: string;
  /** The raw chapter markdown the quotes come from. */
  chapterText: string;
  sections: ExcerptSection[];
};

const must = <T,>(value: T | undefined, what: string): T => {
  if (value === undefined) throw new Error(`bookExcerpts: missing ${what}`);
  return value;
};

const bookOneFig = (index: number) => {
  const fig = must(
    inlineFigsForChapter('01').find((f) => f.index === index),
    `book 1 chapter 1 figure ${index}`,
  );
  return { src: fig.src, alt: fig.title };
};
const bookOneOpener = must(opener('01'), 'book 1 chapter 1 opener');

const draftFig = (book: FigureBook, id: string) => {
  const fig = must(
    book.figures.find((f) => f.id === id),
    `figure ${id}`,
  );
  return { src: book.src(fig), alt: fig.title };
};

const one = must(chapters.find((c) => c.number === '01'), 'book 1 chapter 1');
const two = must(chaptersTwo.find((c) => c.number === '01'), 'book 2 chapter 1');
const three = must(chaptersThree.find((c) => c.number === '01'), 'book 3 chapter 1');

export const bookExcerpts: BookExcerpt[] = [
  {
    id: 'one',
    path: '/excerpt',
    bookTitle: BOOK.title,
    chapterLabel: 'Chapter 1',
    chapterTitle: one.title,
    readPath: `/read/${chapterParam(one)}`,
    noindex: false,
    cover: BOOK.coverImage,
    description: 'A short, scroll-driven excerpt from chapter 1: why AI is moving from assistant to delegate.',
    accent: '#C2410C',
    chapterText: one.content,
    sections: [
      {
        quote: 'For a while, the most impressive thing AI could do was answer.',
        figure: { src: bookOneOpener.src, alt: bookOneOpener.title },
        focus: { x: 50, y: 30, zoom: 1.35 },
      },
      {
        quote:
          'The deeper transition begins when the system is no longer asked only to suggest. It is asked to return with work done.',
        figure: bookOneFig(2),
      },
      {
        quote:
          'That last property is the real trap: the primary failure surface is not the work that looks broken but the work that looks finished.',
        figure: bookOneFig(4),
      },
      {
        quote:
          'The important lesson is not that chat becomes irrelevant, but that it becomes one layer in a deeper stack.',
        figure: bookOneFig(3),
      },
      {
        quote: 'Models got dramatically more capable. Expertise gaps did not disappear.',
        figure: bookOneFig(5),
      },
      {
        quote:
          'AI engineering begins where prompt engineering stops being enough. It is the discipline of turning raw model capability into delegated work that can be structured, measured, supervised, and trusted.',
        figure: bookOneFig(8),
      },
    ],
  },
  {
    id: 'two',
    path: '/second-book/excerpt',
    bookTitle: BOOK_TWO_TITLE,
    chapterLabel: 'Book 2 · Chapter 1',
    chapterTitle: two.title,
    readPath: chapterTwoPath(two),
    noindex: true,
    cover: BOOK_TWO_COVER,
    description: 'A short, scroll-driven excerpt from book 2, chapter 1: behavior is trained in, not prompted in.',
    accent: '#0F766E',
    chapterText: two.content,
    sections: [
      {
        quote:
          'The first book made one assumption on every page: the model is given. You do not build it. You wrap it, steer it, feed it context, and hold it accountable.',
        figure: draftFig(figuresTwo, 'ch01-opener'),
        focus: { x: 12, y: 40, zoom: 1.6 },
      },
      {
        quote:
          'The center of gravity in model-building has moved. For years the story was pre-training: scale the parameters, scale the data, and watch the loss curve fall.',
        figure: draftFig(figuresTwo, 'ch01-opener'),
        focus: { x: 88, y: 40, zoom: 1.6 },
      },
      {
        quote:
          'The field talks about reasoning models and agents as if they were two research tracks. They are one.',
        figure: draftFig(figuresTwo, 'ch01-reasoning-agency-one-loop'),
      },
      {
        quote:
          'Of the post-training methods, reinforcement learning has a property the others lack: it can keep learning from production.',
        figure: draftFig(figuresTwo, 'ch01-rl-production-loop'),
      },
      {
        quote: 'But the hinge is here: the model is no longer given. Increasingly, you are training it.',
        figure: draftFig(figuresTwo, 'ch01-opener'),
      },
    ],
  },
  {
    id: 'three',
    path: '/third-book/excerpt',
    bookTitle: BOOK_THREE_TITLE,
    chapterLabel: 'Book 3 · Chapter 1',
    chapterTitle: three.title,
    readPath: chapterThreePath(three),
    noindex: true,
    cover: BOOK_THREE_COVER,
    description: 'A short, scroll-driven excerpt from book 3, chapter 1: writing code got cheap, and the bottleneck moved.',
    accent: '#C2410C',
    chapterText: three.content,
    sections: [
      {
        quote:
          'Writing code got cheap. Not free, and not always good, but cheap enough that the act of producing a function is no longer the thing that decides how fast software reaches a user.',
        figure: draftFig(figuresThree, 'ch01-opener'),
        focus: { x: 50, y: 34, zoom: 1.5 },
      },
      {
        quote:
          'Grant the technology everything it claims, and the ceiling is still low, because most of the distance between an idea and a shipped change was never typing.',
        figure: draftFig(figuresThree, 'ch01-value-stream'),
      },
      {
        quote: 'A constraint that is removed from one place reappears in another. This is the part the enthusiasm skips.',
        figure: draftFig(figuresThree, 'ch01-opener'),
        focus: { x: 75, y: 40, zoom: 1.7 },
      },
      {
        quote: 'Each engineer is measurably quicker. The organization is not.',
        figure: draftFig(figuresThree, 'ch01-shared-stages'),
      },
      {
        quote:
          'The argument here is narrower, and it is the one everything else rests on: the constraint is no longer where your tools are pointed, and until you know where it actually is, speed is a sensation rather than a result.',
        figure: draftFig(figuresThree, 'ch01-opener'),
      },
    ],
  },
];

export const excerptById = (id: BookExcerpt['id']): BookExcerpt =>
  must(
    bookExcerpts.find((e) => e.id === id),
    `excerpt ${id}`,
  );
