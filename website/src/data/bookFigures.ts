/**
 * Figures for books 2 and 3. Each book has one figure spec
 * (<repo>/diagrams-N/figures.json, synced to src/data/figures-N.json by
 * scripts/sync-figures-lib.mjs) and its own public folder. Kept apart from
 * book 1's lib/manifest.ts: every book numbers chapters "01".."NN", so a shared
 * lookup keyed by chapter number would show one book's figures in another.
 *
 * Inline figures are placed by section heading, not by position, so a figure
 * stays with its section when sections are added or reordered. Headings are
 * compared after normaliseHeading(), the same normalisation the article
 * renderer applies to the text it shows.
 */
export type BookFigure = {
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

/** An inline figure resolved for rendering: where it goes and what it shows. */
export type PlacedFigure = { sectionHeading: string; title: string; src: string };

export type FigureBook = {
  figures: BookFigure[];
  src: (fig: BookFigure) => string;
  opener: (chapter: string) => BookFigure | undefined;
  inline: (chapter: string) => PlacedFigure[];
};

/** Drops `[[id|Label]]` wikilinks to their label, as the article renders them. */
export const stripWikilinks = (text: string): string =>
  text.replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]|]+)\]\]/g, '$1');

/** Heading text as a reader sees it: wikilinks stripped, `#` marks and spacing trimmed. */
export const normaliseHeading = (text: string): string =>
  stripWikilinks(text).replace(/^#+\s*/, '').replace(/\s+/g, ' ').trim();

export const createFigureBook = (figures: BookFigure[], publicFolder: string): FigureBook => {
  const src = (fig: BookFigure) => `/${publicFolder}/${fig.file}`;
  return {
    figures,
    src,
    opener: (chapter) => figures.find((f) => f.chapter === chapter && f.kind === 'opener'),
    inline: (chapter) =>
      figures
        .filter((f) => f.chapter === chapter && f.kind === 'inline' && f.sectionHeading)
        .map((f) => ({ sectionHeading: f.sectionHeading as string, title: f.title, src: src(f) })),
  };
};
