import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { BOOK1_CH01 } from './ch01';
import { editorialFigureFor } from '../index';
import type { EditorialFigureData, FigureNumber } from '../types';
import { inlineFigsForChapter } from '../../../lib/manifest';
import { EditorialFigure } from '../../../components/figures/EditorialFigure';
import { describeFigure } from '../../../components/figures/describeFigure';

// An editorial figure is a claim in miniature: nothing on it may be invented.
// Quotes appear verbatim in the chapter or the Claims Ledger. Every number
// rests on a verbatim line from either, and every number printed anywhere on
// the figure is declared, so a stray digit cannot slip in unsourced.
const website = resolve(__dirname, '../../../..');
const repo = resolve(website, '..');

/** Same words, ignoring case, curly-vs-straight quotes and spacing. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const chapter = norm(readFileSync(resolve(website, 'src/content/chapter-01.md'), 'utf8'));
const ledger = norm(readFileSync(resolve(repo, 'claims/Claims Ledger.md'), 'utf8'));
const inSources = (s: string) => chapter.includes(norm(s)) || ledger.includes(norm(s));

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const digitsOf = (value: string) => value.match(/\d+/g) ?? [];

/** Every string a reader sees: all data strings except ids, layout keys and evidence. */
const visibleStrings = (node: unknown, skip = new Set(['id', 'layout', 'basis', 'count'])): string[] => {
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap((n) => visibleStrings(n, skip));
  if (node && typeof node === 'object')
    return Object.entries(node).flatMap(([k, v]) => (skip.has(k) ? [] : visibleStrings(v, skip)));
  return [];
};

const declared = (fig: EditorialFigureData): FigureNumber[] => [...(fig.stats ?? []), ...(fig.numbers ?? [])];

describe('book 1 chapter 1 editorial figures', () => {
  it('redraws every inline PNG of the chapter, in order', () => {
    const pngs = inlineFigsForChapter('01');
    expect(BOOK1_CH01).toHaveLength(pngs.length);
    expect(BOOK1_CH01.map((f) => f.id)).toEqual(pngs.map((p) => `book1-ch01-fig${p.index}`));
    expect(editorialFigureFor('book1', '1', 3)?.id).toBe('book1-ch01-fig3');
    expect(editorialFigureFor('book1', '02', 1)).toBeUndefined();
  });

  for (const fig of BOOK1_CH01) {
    describe(fig.id, () => {
      it('quotes the chapter or the Claims Ledger verbatim', () => {
        if (!fig.quote) return;
        expect(inSources(fig.quote.text), `quote not found verbatim: ${fig.quote.text}`).toBe(true);
      });

      it('rests every number on a verbatim source line', () => {
        for (const n of declared(fig)) {
          expect(inSources(n.basis), `basis for ${n.value} not found: ${n.basis}`).toBe(true);
          for (const d of digitsOf(n.value)) {
            if (n.count) {
              expect(n.count, `${n.value}: count does not tally`).toHaveLength(Number(d));
              for (const item of n.count) expect(inSources(item), `counted item not found: ${item}`).toBe(true);
            } else {
              const b = norm(n.basis);
              const said = b.includes(d) || new RegExp(`\\b${WORDS[Number(d)]}\\b`).test(b);
              expect(said, `${n.value} is not stated in its basis: ${n.basis}`).toBe(true);
            }
          }
        }
      });

      it('declares every number it prints', () => {
        const ok = new Set(declared(fig).flatMap((n) => digitsOf(n.value)));
        // The kicker numbers the figure; the sources line and the quote's
        // attribution ("Chapter 1") name where things come from.
        const printed = visibleStrings(
          { ...fig, kicker: '', sources: '', quote: fig.quote && { ...fig.quote, by: '' } },
        ).flatMap(digitsOf);
        if (fig.layout === 'bars') printed.push(...fig.rows.map((r) => String(r.share)));
        for (const d of printed) expect(ok.has(d), `${fig.id} prints an undeclared number: ${d}`).toBe(true);
      });

      it('renders a figure with a text alternative built from its data', () => {
        const html = renderToString(<EditorialFigure fig={fig} />);
        expect(html).toContain('<figure');
        expect(html).toContain('role="img"');
        expect(html).toContain(fig.title.accent.replace(/&/g, '&amp;'));
        const alt = describeFigure(fig);
        expect(alt.length).toBeGreaterThan(40);
        for (const s of fig.stats ?? []) expect(alt).toContain(s.value);
      });
    });
  }
});

// Six layouts, each filled with a marker string. Strip the marker strings from
// the rendered text: what remains is what the layout code adds, and it must
// hold no words, only punctuation and glyphs. That is the i18n rule.
const M = 'Ω';
const FIXTURES: EditorialFigureData[] = [
  {
    id: 'x-bars',
    layout: 'bars',
    kicker: M,
    title: { lead: M, accent: M },
    scale: M,
    rows: [
      { label: M, share: 15, text: M, hot: true },
      { label: M, share: 85, text: M },
    ],
    sources: M,
  },
  {
    id: 'x-compare',
    layout: 'compare',
    kicker: M,
    title: { lead: M, accent: M },
    shift: M,
    sides: [
      { label: M, heading: M, items: [M], verdict: M },
      { label: `${M}2`, heading: M, items: [M], verdict: M, hot: true },
    ],
    quote: { text: M, by: M, translation: M },
    sources: M,
  },
  {
    id: 'x-stats',
    layout: 'stats',
    kicker: M,
    title: { lead: M, accent: M },
    stats: [{ value: M, text: M, basis: M, items: [M] }],
    note: M,
    sources: M,
  },
  {
    id: 'x-flow',
    layout: 'flow',
    kicker: M,
    title: { lead: M, accent: M },
    lanes: [{ label: M, stages: [{ label: M, text: M, detail: M }, { label: `${M}2`, hot: true }], span: { from: 0, to: 1, text: M } }],
    sources: M,
  },
  {
    id: 'x-quote',
    layout: 'quote',
    kicker: M,
    title: { lead: M, accent: M },
    quote: { text: M, by: M },
    points: [{ label: M, text: M }],
    sources: M,
  },
  {
    id: 'x-matrix',
    layout: 'matrix',
    kicker: M,
    title: { lead: M, accent: M },
    columns: 3,
    lead: { label: M, text: M },
    divider: M,
    cells: [{ label: M, text: M }],
    result: { label: M, text: M },
    sources: M,
  },
];

describe('EditorialFigure layouts', () => {
  for (const fig of FIXTURES) {
    it(`${fig.layout}: every visible word comes from data`, () => {
      const html = renderToString(<EditorialFigure fig={fig} />);
      expect(html).toContain(`ef--${fig.layout}`);
      const text = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .replaceAll(M, ' ')
        .replace(/\d+%?/g, ' ');
      expect(text, `layout code printed words: ${text}`).not.toMatch(/\p{L}/u);
    });
  }

  it('describes a bar row with its share', () => {
    expect(describeFigure(FIXTURES[0])).toContain('15%');
  });
});
