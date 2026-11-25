/**
 * One explainer for a chapter of book 2 or 3. Every string comes from the
 * chapter text (website/src/content-N/chapter-NN.md), except `quote`, which
 * is an evidence anchor's own words (website/src/evidence-N.json), so the
 * video says nothing the book and its ledger do not.
 */
export type Term = { term: string; definition: string };

export type ExplainerSpec = {
  /** Remotion composition id, e.g. "Book2Chapter02". */
  id: string;
  bookTitle: string;
  /** Shown on the outro, e.g. "aiepress.com/second-book". */
  url: string;
  chapter: number;
  chapterTitle: string;
  /** Paths under remotion/public/. */
  cover: string;
  /** Text-free stills: [opening scenes, term cards, closing scenes]. */
  backdrops: [string, string, string];
  /** Scene 1: one short line that opens the chapter's argument. */
  hook: string;
  /** Scene 2: the thesis; `accent` is the turn, shown in the accent colour. */
  title: { lead: string; accent: string };
  /** Scene 3: names the three things the term cards show. */
  intro: { kicker: string; line: string };
  /** Scenes 4-6; the third is the chapter's subject and is emphasized. */
  terms: [Term, Term, Term];
  /** Scene 7: the chapter's sharpest line. */
  punch: { lead: string; accent: string; line: string };
  /** Scene 8: verbatim from the anchor (fillers and stutters removed only). */
  quote: { text: string; speaker: string; claimId: string; at: string };
  /** Scene 9: two figures the chapter states, with what they count. */
  stats: { kicker: string; items: [[string, string], [string, string]]; line: string };
};
