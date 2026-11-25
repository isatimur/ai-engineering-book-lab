import { publicUrl } from './book';

/**
 * Postcard riddle figures (components/chapter/FigureFlip.tsx). The front is a
 * text-free picture with one question; the back answers it like a postcard's
 * reverse: the message on the left, stamp, postmark, quote and address on the
 * right.
 *
 * Pilot: chapter 1 of each book. Every number, quote and source on a back
 * comes from that chapter's markdown, figures or Claims Ledger.
 * figurePostcards.test.ts checks each quote and each `basis` line verbatim
 * against the chapter (or the claims ledger, for quotes).
 */

export type PostcardBook = 'book1' | 'book2' | 'book3';

/** One row of the back's bar diagram: a filled label, then a dashed field. */
export type PostcardBar = { label: string; text: string; hot?: boolean };

/** A number on the back, with the verbatim chapter text it rests on. */
export type PostcardFigure = {
  value: string;
  text: string;
  hot?: boolean;
  /** Verbatim lines from the chapter markdown that carry this number. */
  basis: string[];
};

export type Postcard = {
  book: PostcardBook;
  bookNo: 1 | 2 | 3;
  /** Two-digit chapter number, as in BookChapter.number. */
  chapter: string;
  bookTitle: string;
  /** The question on the front. The back answers it. */
  riddle: string;
  art: {
    /** 16:9, about 2000 px wide. */
    wide: string;
    /** 4:5, about 1000 px wide, for screens up to 700 px. */
    tall: string;
    alt: string;
  };
  back: {
    kicker: string;
    /** The headline: plain words, then the accent words. */
    headline: [string, string];
    bars: PostcardBar[];
    barNote: PostcardFigure;
    stats: PostcardFigure[];
    sources: string;
  };
  /** Verbatim. Checked against the chapter markdown or the claims ledger. */
  quote: { text: string; by: string };
  stamp: {
    /** Lines of the book title, as printed on the stamp. */
    title: string[];
    /** The book's cover; the stamp shows a crop of its artwork. */
    cover: string;
    /** CSS background-position and background-size for the crop. */
    position: string;
    size: string;
  };
  /** The text around the postmark's ring. */
  postmarkRing: string;
  address: { to: string; from: string; at: string };
  /**
   * Colours. Books 2 and 3 take theirs from the page's CSS variables
   * (lib/bookTheme.ts); book 1 has no accent variable, so it sets one here.
   */
  theme?: { accent?: string; ink?: string; paper?: string; rule?: string };
};

/** "https://aiepress.com/third-book" -> "aiepress.com/third-book". */
const at = (path: string) => publicUrl(path).replace(/^https?:\/\//, '').replace(/\/$/, '');

const TO = 'the reader who turned the card';

export const POSTCARDS: Postcard[] = [
  {
    book: 'book1',
    bookNo: 1,
    chapter: '01',
    bookTitle: 'From Copilot to Colleague',
    riddle: 'No one reads its work for a whole day. What has changed by morning?',
    art: {
      wide: '/postcards/book1-ch01-wide.jpg',
      tall: '/postcards/book1-ch01-tall.jpg',
      alt: 'A person sleeps at a desk under a tree while a small robot with a lantern hauls finished parcels past an opened gate and a new bridge; a row of suns crosses the sky.',
    },
    back: {
      kicker: 'Twenty-four hours, no one reading',
      headline: ['If anything changed, ', 'it was never just an assistant.'],
      bars: [
        { label: 'assistant', text: 'the suggestion goes stale — harmless, ignorable' },
        { label: 'delegate', text: 'a pull request opened, a record updated, a clock running', hot: true },
      ],
      barNote: {
        value: '24 h',
        text: 'the test: no human looks at the output. Does anything change in the world?',
        basis: ['ask what happens if no human looks at the output for the next 24 hours'],
      },
      stats: [
        {
          value: '7',
          text: 'things a trustworthy delegate needs that chat alone does not provide',
          basis: ['A trustworthy delegate needs seven things chat alone does not provide'],
        },
        {
          value: '3',
          text: 'ways to phrase one request, no one watching — drift means not ready',
          hot: true,
          basis: ['Run the same request three different ways with no one watching.'],
        },
      ],
      sources: 'Sources: chapter 1 (the 24-hour test, the seven needs) · #766 — Rafael Levi, Bright Data',
    },
    quote: { text: 'There’s no error, no warning, just the wrong answer.', by: 'Rafael Levi, Bright Data' },
    stamp: {
      title: ['From Copilot', 'to Colleague'],
      cover: '/covers/from-copilot-to-colleague-600w.webp',
      position: 'center 66%',
      size: '165% auto',
    },
    postmarkRing: 'FROM COPILOT TO COLLEAGUE · CHAPTER ONE · THE SHIFT ·',
    address: { to: TO, from: 'From Copilot to Colleague, ch. 1', at: at('/') },
    // The house palette (index.css): paper, ink, border. The house pink is too
    // pale for text, so the accent is that pink deepened to pass WCAG AA.
    theme: { accent: '#A3423A', ink: '#18181A', paper: '#F2EFE9', rule: '#D8D4CC' },
  },
  {
    book: 'book2',
    bookNo: 2,
    chapter: '01',
    bookTitle: 'The Model Layer & The Long Tail',
    riddle: 'Patch one leak in the prompt and another springs. Where does the fix belong?',
    art: {
      wide: '/postcards/book2-ch01-wide.jpg',
      tall: '/postcards/book2-ch01-tall.jpg',
      alt: 'A worker on a ladder patches a leaking water tank while new jets spray out; beside it a water wheel turns a mill, its water channelled back to the wheel in a closed loop.',
    },
    back: {
      kicker: 'One defect, two places to fix it',
      headline: ['Not in the prompt. ', 'Train it into the weights.'],
      bars: [
        { label: 'prompt', text: 'fix one defect, add another — no handle on the trade-off' },
        { label: 'weights', text: 'production data joins the training loop', hot: true },
      ],
      barNote: {
        value: '95%',
        text: 'of generative-AI pilots never reach production at all (Cappelli, Adaptive ML)',
        basis: ['ninety-five percent of generative-AI pilots never reach production at all'],
      },
      stats: [
        {
          value: '4',
          text: 'copies of the model held in memory for PPO-style RLHF',
          basis: ['PPO-style RLHF keeps four copies of the model in memory'],
        },
        {
          value: '3',
          text: 'still, with GRPO — the hard part is operations, not the algorithm',
          hot: true,
          basis: ["even DeepSeek's GRPO, which drops the value model, still needs three"],
        },
      ],
      sources: 'Sources: #674 — Alessandro Cappelli, Adaptive ML · #251 — Aakanksha Chowdhery, Reflection.ai',
    },
    quote: {
      text: 'An algorithm that at its core will bring models to production.',
      by: 'Alessandro Cappelli, Adaptive ML, on RL',
    },
    stamp: {
      title: ['The Model Layer', '& The Long Tail'],
      cover: '/covers/the-model-layer-and-the-long-tail-600w.webp',
      position: '50% 64%',
      size: '135% auto',
    },
    postmarkRing: 'AIEPRESS.COM · CHAPTER ONE · THE TURN TO RL ·',
    address: { to: TO, from: 'The Model Layer & The Long Tail, ch. 1', at: at('/second-book') },
  },
  {
    book: 'book3',
    bookNo: 3,
    chapter: '01',
    bookTitle: 'The Shape of the Work',
    riddle: 'The machine got faster. Why did nothing arrive sooner?',
    art: {
      wide: '/postcards/book3-ch01-wide.jpg',
      tall: '/postcards/book3-ch01-tall.jpg',
      alt: 'A fast machine on a long conveyor; paper piles up in front of one reviewer.',
    },
    back: {
      kicker: 'One change, idea to user',
      headline: ['Perfect code still leaves ', 'most of the stream untouched.'],
      bars: [{ label: 'code', text: 'the rest of the value stream — no faster', hot: true }],
      barNote: {
        value: '14–16%',
        text: 'the share flawless, instant code could ever touch (Reock, DX)',
        basis: ['still only be attacking anywhere from maybe 14 to 16% of the overall value stream'],
      },
      stats: [
        {
          value: '10–20%',
          text: 'faster, when only the coding sped up',
          basis: ['not just the sort of 10 15 20% like a little bit faster coding'],
        },
        {
          value: '2×',
          text: 'end to end, when the flow changed — 20–25% of companies (McKinsey)',
          hot: true,
          basis: ['real, you know, 2x like end-to-end improvements', "there's a 20 25% of of companies"],
        },
      ],
      sources: 'Sources: #1216, #62 — Justin Reock, DX · #1618 — Martin Harrysson & Prakhar Dixit, McKinsey',
    },
    quote: {
      text: 'An hour saved on something that isn’t the bottleneck is worthless.',
      by: 'Goldratt, as Reock quotes it',
    },
    stamp: {
      title: ['The Shape', 'of the Work'],
      cover: '/covers/the-shape-of-the-work-600w.webp',
      position: 'center 78%',
      size: '190% auto',
    },
    postmarkRing: 'AIEPRESS.COM · CHAPTER ONE · THE BOTTLENECK MOVED ·',
    address: { to: TO, from: 'The Shape of the Work, ch. 1', at: at('/third-book') },
  },
];

/** The postcard for a chapter, if it has one. */
export const postcardFor = (book: PostcardBook, chapter: string): Postcard | undefined =>
  POSTCARDS.find((p) => p.book === book && p.chapter === chapter.padStart(2, '0'));
