import { bookTwo } from '../data/draftBooks';
import { DraftBookChapterPage } from './DraftBookChapterPage';
import { DraftBookGraphPage } from './DraftBookGraphPage';
import { DraftBookFiguresPage } from './DraftBookFiguresPage';

/** Book 2's chapter, graph and figure pages: the shared draft-book pages, bound to book 2. */
export const SecondBookChapterDetail = () => <DraftBookChapterPage book={bookTwo} />;
export const SecondBookGraph = () => <DraftBookGraphPage book={bookTwo} />;
export const SecondBookFigures = () => <DraftBookFiguresPage book={bookTwo} />;

/** Concrete chapter paths for static prerendering. */
export const secondBookChapterStaticPaths = (): string[] =>
  bookTwo.chapters.map((c) => `second-book/${c.slug}`);
