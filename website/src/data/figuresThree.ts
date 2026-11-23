import spec from './figures-3.json';
import { type BookFigure, createFigureBook } from './bookFigures';

/** Book 3 figures, from diagrams-3/figures.json. See data/bookFigures.ts. */
export const figuresThree = createFigureBook(spec.figures as BookFigure[], 'diagrams-3');
