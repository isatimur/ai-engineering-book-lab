import { bookThree } from '../data/draftBooks';
import { DraftBookChapterPage } from './DraftBookChapterPage';
import { DraftBookGraphPage } from './DraftBookGraphPage';
import { DraftBookFiguresPage } from './DraftBookFiguresPage';

/** Book 3's chapter, graph and figure pages: the shared draft-book pages, bound to book 3. */
export const ThirdBookChapterDetail = () => <DraftBookChapterPage book={bookThree} />;
export const ThirdBookGraph = () => <DraftBookGraphPage book={bookThree} />;
export const ThirdBookFigures = () => <DraftBookFiguresPage book={bookThree} />;

/** Concrete chapter paths for static prerendering. */
export const thirdBookChapterStaticPaths = (): string[] =>
  bookThree.chapters.map((c) => `third-book/${c.slug}`);
