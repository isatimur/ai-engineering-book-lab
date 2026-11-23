import spec from './figures-2.json';

/**
 * Book 2 figures, read from figures-2.json (synced from diagrams-2/figures.json
 * by scripts/sync-second-book.mjs). Kept apart from book 1's lib/manifest.ts:
 * both books number chapters "01".."NN", so a shared lookup keyed by chapter
 * number would show book 1's figures on book 2 pages.
 *
 * Inline figures are placed by section heading, not by position, so a figure
 * stays with its section when sections are added or reordered. Headings are
 * compared after normaliseHeading(), the same normalisation the article
 * renderer applies to the text it shows.
 */
export type FigureTwo = {
  id: string;
  chapter: string;
  kind: 'opener' | 'inline';
  title: string;
  file: string;
  sectionHeading?: string;
  claimIds: string[];
  sources: string[];
  reviewed: boolean;
};

export const figuresTwo = spec.figures as FigureTwo[];

/** Public URL of a figure's PNG. */
export const figureTwoSrc = (fig: FigureTwo): string => `/diagrams-2/${fig.file}`;

/** Drops `[[id|Label]]` wikilinks to their label, as SecondBookArticle renders them. */
export const stripWikilinks = (text: string): string =>
  text.replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]|]+)\]\]/g, '$1');

/** Heading text as a reader sees it: wikilinks stripped, `#` marks and spacing trimmed. */
export const normaliseHeading = (text: string): string =>
  stripWikilinks(text).replace(/^#+\s*/, '').replace(/\s+/g, ' ').trim();

export const openerTwo = (chapter: string): FigureTwo | undefined =>
  figuresTwo.find((f) => f.chapter === chapter && f.kind === 'opener');

export const inlineFiguresTwo = (chapter: string): FigureTwo[] =>
  figuresTwo.filter((f) => f.chapter === chapter && f.kind === 'inline');
