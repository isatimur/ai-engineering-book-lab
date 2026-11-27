import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { POSTCARDS, postcardFor, type PostcardBook } from './figurePostcards';
import { bookTwo, bookThree } from './draftBooks';
import { contrastRatio } from '../lib/bookTheme';
import { FigureFlip } from '../components/chapter/FigureFlip';

// A postcard's back is a claim in miniature, so nothing on it may be invented.
// Quotes must appear verbatim in the chapter or the book's Claims Ledger; each
// number's `basis` must appear verbatim in the chapter.
const website = resolve(__dirname, '../..');
const repo = resolve(website, '..');

const SOURCES: Record<PostcardBook, { content: string; claims: string }> = {
  book1: { content: 'src/content', claims: 'claims/Claims Ledger.md' },
  book2: { content: 'src/content-2', claims: 'claims-2/Claims Ledger.md' },
  book3: { content: 'src/content-3', claims: 'claims-3/Claims Ledger.md' },
};

/** Same words, ignoring case, curly-vs-straight quotes and spacing. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const chapterText = (book: PostcardBook, chapter: string) =>
  norm(readFileSync(resolve(website, SOURCES[book].content, `chapter-${chapter}.md`), 'utf8'));
const claimsText = (book: PostcardBook) => norm(readFileSync(resolve(repo, SOURCES[book].claims), 'utf8'));

describe('figure postcards', () => {
  it('has at most one card per chapter, each for a chapter that exists', () => {
    const keys = POSTCARDS.map((p) => `${p.book}/${p.chapter}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const key of ['book1/01', 'book2/01', 'book3/01']) expect(keys).toContain(key);
    expect(postcardFor('book3', '1')?.bookNo).toBe(3);
    for (const p of POSTCARDS) {
      expect(existsSync(resolve(website, SOURCES[p.book].content, `chapter-${p.chapter}.md`)), `${p.book}/${p.chapter}`).toBe(true);
    }
  });

  for (const card of POSTCARDS) {
    describe(`${card.book} chapter ${card.chapter}`, () => {
      it('quotes its chapter or claims ledger verbatim', () => {
        const q = norm(card.quote.text);
        const found = chapterText(card.book, card.chapter).includes(q) || claimsText(card.book).includes(q);
        expect(found, `quote not found verbatim: ${card.quote.text}`).toBe(true);
      });

      it('rests every number on verbatim chapter text', () => {
        const text = chapterText(card.book, card.chapter);
        for (const fig of [card.back.barNote, ...card.back.stats]) {
          expect(fig.basis.length, `${fig.value} has no basis`).toBeGreaterThan(0);
          for (const line of fig.basis) {
            expect(text.includes(norm(line)), `basis for ${fig.value} not in chapter: ${line}`).toBe(true);
          }
        }
      });

      it('points at art and a cover that exist', () => {
        for (const p of [card.art.wide, card.art.tall, card.stamp.cover]) {
          expect(existsSync(resolve(website, 'public', p.slice(1))), p).toBe(true);
        }
      });

      it('renders the riddle on the front and the answer on the back, as a toggle button', () => {
        const html = renderToString(<FigureFlip card={card} />);
        expect(html).toContain('aria-pressed="false"');
        expect(html).toContain(card.riddle);
        expect(html).toContain(card.back.headline[1]);
        expect(html).toContain('media="(max-width: 700px)"');
        expect(html).toContain(card.address.at);
      });
    });
  }

  it('prints the accent and ink at WCAG AA on the card', () => {
    const themes = [
      postcardFor('book1', '01')!.theme!,
      bookTwo.theme,
      bookThree.theme,
    ];
    for (const t of themes) {
      // The card is near-white; the paper is the darker bound.
      expect(contrastRatio(t.accent!, t.paper!)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(t.ink!, t.paper!)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('gives each book the right "At" line', () => {
    expect(postcardFor('book1', '01')!.address.at).toBe('fromcopilottocolleague.com');
    expect(postcardFor('book2', '01')!.address.at).toBe('aiepress.com/second-book');
    expect(postcardFor('book3', '01')!.address.at).toBe('aiepress.com/third-book');
  });
});
