/**
 * Editorial figures: book diagrams drawn as live HTML from data
 * (components/figures/EditorialFigure.tsx). Every visible string lives here,
 * never in the layout code, so a translation is a data file, not a code change.
 * How to pick a layout and source the facts: .claude/skills/editorial-figure.
 */

/** The headline: plain words, then the accent words (serif italic, accent colour). */
export type FigureTitle = { lead: string; accent: string };

/**
 * A verbatim quote. `text` stays in the speaker's language (English) in every
 * edition; a translated edition fills `translation` and shows both.
 */
export type FigureQuote = { text: string; by: string; translation?: string };

/**
 * A number the figure prints, and the verbatim source line it rests on.
 * The test finds `basis` in the chapter or the Claims Ledger, and finds the
 * number (as digits or a word) inside `basis`. When the number is a count
 * the chapter never states ("ten practices"), `count` lists the counted
 * things verbatim instead, and the test checks the tally.
 */
export type FigureNumber = {
  value: string;
  basis: string;
  count?: string[];
};

/** A big italic number with its line of text. */
export type FigureStat = FigureNumber & {
  text: string;
  hot?: boolean;
  /** Short tags shown under the number, e.g. the things counted. */
  items?: string[];
};

export type BarsBody = {
  layout: 'bars';
  /** Mono caption above the bars. */
  scale: string;
  /** `share` is 0–100 and must be a sourced number (see `numbers`). */
  rows: { label: string; share: number; text: string; hot?: boolean }[];
};

export type CompareSide = {
  label: string;
  heading: string;
  items: string[];
  verdict?: string;
  hot?: boolean;
};

export type CompareBody = {
  layout: 'compare';
  /** Words on the arrow between the sides. Omit for two peers. */
  shift?: string;
  sides: [CompareSide, CompareSide];
};

export type StatsBody = { layout: 'stats' };

export type FlowStage = { label: string; text?: string; detail?: string; hot?: boolean };

export type FlowLane = {
  label?: string;
  stages: FlowStage[];
  /** An accent rule under stages `from`..`to` (0-based, inclusive). */
  span?: { from: number; to: number; text: string };
};

export type FlowBody = { layout: 'flow'; lanes: FlowLane[] };

export type QuoteBody = {
  layout: 'quote';
  points?: { label: string; text: string; hot?: boolean }[];
};

export type MatrixBody = {
  layout: 'matrix';
  columns: 2 | 3 | 4;
  /** The one thing above the line (what people see). */
  lead?: { label: string; text: string };
  /** Mono words on the dashed line under `lead`. */
  divider?: string;
  cells: { label: string; text?: string; hot?: boolean }[];
  /** Where the cells converge. */
  result?: { label: string; text: string };
};

export type FigureBody = BarsBody | CompareBody | StatsBody | FlowBody | QuoteBody | MatrixBody;

export type FigureLayout = FigureBody['layout'];

export type EditorialFigureData = FigureBody & {
  /** e.g. "book1-ch01-fig3". */
  id: string;
  /** Mono line above the title; the component adds the brackets. */
  kicker: string;
  title: FigureTitle;
  /** One plain sentence under the body. */
  note?: string;
  /** Big numbers. The `stats` layout shows only these. */
  stats?: FigureStat[];
  /** Numbers printed elsewhere in the figure (labels, notes) and their basis. */
  numbers?: FigureNumber[];
  quote?: FigureQuote;
  /** Mono line at the foot: corpus ids, speakers, chapter. */
  sources: string;
};
