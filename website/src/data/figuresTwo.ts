import spec from './figures-2.json';
import { type BookFigure, createFigureBook } from './bookFigures';

/** Book 2 figures, from diagrams-2/figures.json. See data/bookFigures.ts. */
export const figuresTwo = createFigureBook(spec.figures as BookFigure[], 'diagrams-2');
