import type { EvidenceGraphApi } from './evidenceGraph';

/**
 * A book's evidence graph plus the URLs the graph view links to. Books 2 and 3
 * pass one to EvidenceGraphView and SourcesDrawer; book 1 passes none and keeps
 * its original links (red thread, 3D journey). Type-only here, so importing it
 * pulls no book's data into another book's bundle.
 */
export type GraphBook = {
  api: EvidenceGraphApi;
  /** The book's graph page, optionally filtered to a chapter. */
  graphUrl: (chapterNumber?: string) => string;
  /** A chapter's reading URL, from its number ("01" or "1"). */
  chapterUrl: (chapterNumber: string) => string;
};
