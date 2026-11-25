import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { bookExcerpts } from './bookExcerpts';
import { routes } from '../routes';

const collapse = (text: string) => text.replace(/\s+/g, ' ');

/** Sentence ends: ". ", "? " or "! " followed by a capital letter. */
const sentences = (passage: string) => passage.split(/(?<=[.?!])\s+(?=[A-Z])/);

const publicDir = resolve(__dirname, '../../public');

describe('book excerpts', () => {
  it('has one excerpt per book', () => {
    expect(bookExcerpts.map((e) => e.path)).toEqual(['/excerpt', '/second-book/excerpt', '/third-book/excerpt']);
  });

  for (const excerpt of bookExcerpts) {
    describe(excerpt.path, () => {
      const chapter = collapse(excerpt.chapterText);

      it('has 4 to 6 sections', () => {
        expect(excerpt.sections.length).toBeGreaterThanOrEqual(4);
        expect(excerpt.sections.length).toBeLessThanOrEqual(6);
      });

      it('quotes every sentence verbatim from the chapter', () => {
        for (const section of excerpt.sections) {
          for (const sentence of sentences(section.quote)) {
            expect(chapter, `not in chapter: "${sentence}"`).toContain(sentence);
          }
          // The passage is also one contiguous run, not stitched sentences.
          expect(chapter).toContain(section.quote);
        }
      });

      it('shows figures that exist in public/', () => {
        for (const section of excerpt.sections) {
          expect(existsSync(resolve(publicDir, `.${section.figure.src}`)), section.figure.src).toBe(true);
        }
      });

      it('is routed', () => {
        const paths = (routes[0].children ?? []).map((r) => `/${r.path ?? ''}`);
        expect(paths).toContain(excerpt.path);
      });
    });
  }

  it('noindexes books 2 and 3 only, as their other pages do', () => {
    expect(bookExcerpts.map((e) => e.noindex)).toEqual([false, true, true]);
  });
});
