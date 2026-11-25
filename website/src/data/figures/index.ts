import type { EditorialFigureData } from './types';
import { BOOK1_CH01 } from './book1/ch01';

export type { EditorialFigureData } from './types';

/**
 * Editorial figures by book and chapter, in figure order. A chapter listed
 * here renders these instead of its Excalidraw PNGs; every other chapter
 * keeps the PNGs from public/diagrams/manifest.json.
 */
const FIGURES: Record<'book1', Record<string, EditorialFigureData[]>> = {
  book1: { '01': BOOK1_CH01 },
};

/** The editorial figure for book 1's inline figure `index` (1-based), if one exists. */
export const editorialFigureFor = (
  book: 'book1',
  chapter: string,
  index: number,
): EditorialFigureData | undefined => FIGURES[book][chapter.padStart(2, '0')]?.[index - 1];

export const editorialFiguresFor = (book: 'book1', chapter: string): EditorialFigureData[] =>
  FIGURES[book][chapter.padStart(2, '0')] ?? [];
