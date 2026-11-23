import { describe, it, expect, vi } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { figuresTwo, normaliseHeading } from './figuresTwo';
import evidenceTwo from '../evidence-2.json';
import { SecondBookChapterDetail } from '../pages/SecondBookChapterDetail';
import { chaptersTwo } from './bookChaptersTwo';

// Every book 2 figure must point at a real PNG, sit under a real section, and
// show only what its claims support. These checks run against the committed
// files, because scripts/sync-second-book.mjs skips in CI.
// <Seo> writes <head> tags through vite-react-ssg's Helmet, which needs the
// SSG provider. The page body is what this file checks, so stub it.
vi.mock('../components/Seo', () => ({ Seo: () => null }));

const website = resolve(__dirname, '../..');
type Claim = { claim_id: string; anchors: { label: string }[] };
const evidence = evidenceTwo as Record<string, Claim[]>;

const headingsOf = (chapter: string): string[] => {
  const md = readFileSync(resolve(website, `src/content-2/chapter-${chapter}.md`), 'utf8');
  return md
    .split('\n')
    .filter((l) => /^#{2,3} /.test(l))
    .map(normaliseHeading);
};

describe('book 2 figure spec', () => {
  it('has figures, with unique ids', () => {
    expect(figuresTwo.length).toBeGreaterThan(0);
    const ids = figuresTwo.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('matches diagrams-2/figures.json when that source is in this checkout', () => {
    const source = resolve(website, '../diagrams-2/figures.json');
    if (!existsSync(source)) return;
    const synced = readFileSync(resolve(website, 'src/data/figures-2.json'), 'utf8');
    expect(synced, 'run node scripts/sync-second-book.mjs').toBe(readFileSync(source, 'utf8'));
  });

  it('points every figure at a committed PNG', () => {
    for (const f of figuresTwo) {
      expect(existsSync(resolve(website, 'public/diagrams-2', f.file)), f.file).toBe(true);
    }
  });

  it('gives each chapter at most one opener, and openers no section', () => {
    for (const ch of new Set(figuresTwo.map((f) => f.chapter))) {
      const openers = figuresTwo.filter((f) => f.chapter === ch && f.kind === 'opener');
      expect(openers.length, `chapter ${ch}`).toBeLessThanOrEqual(1);
      for (const o of openers) expect(o.sectionHeading, o.id).toBeUndefined();
    }
  });

  it('places every inline figure under a heading that exists in its chapter', () => {
    for (const f of figuresTwo.filter((x) => x.kind === 'inline')) {
      expect(headingsOf(f.chapter), f.id).toContain(f.sectionHeading);
    }
  });

  it('files every claim id under the figure chapter in evidence-2.json', () => {
    for (const f of figuresTwo) {
      expect(f.claimIds.length, f.id).toBeGreaterThan(0);
      // evidence-2.json keys chapters "1".."8"; figures use "01".."08".
      const claims = evidence[String(parseInt(f.chapter, 10))] ?? [];
      for (const id of f.claimIds) {
        expect(claims.map((c) => c.claim_id), `${f.id} cites ${id}`).toContain(id);
      }
    }
  });

  it('cites only talks that anchor the figure claims', () => {
    for (const f of figuresTwo) {
      expect(f.sources.length, f.id).toBeGreaterThan(0);
      const claims = evidence[String(parseInt(f.chapter, 10))] ?? [];
      const labels = new Set(
        claims.filter((c) => f.claimIds.includes(c.claim_id)).flatMap((c) => c.anchors.map((a) => a.label)),
      );
      for (const s of f.sources) expect([...labels], `${f.id} source ${s}`).toContain(s);
    }
  });
});

describe('book 2 chapter page', () => {
  const render = (slug: string) =>
    renderToString(
      <MemoryRouter initialEntries={[`/second-book/${slug}`]}>
        <Routes>
          <Route path="/second-book/:slug" element={<SecondBookChapterDetail />} />
        </Routes>
      </MemoryRouter>,
    );

  it('shows every figure of its chapter, and only book 2 images', () => {
    for (const ch of chaptersTwo) {
      const html = render(ch.slug);
      // The evidence rail shows YouTube thumbnails; every image served from
      // this site must be a book 2 figure, never a book 1 /diagrams/ one.
      const local = [...html.matchAll(/<img[^>]*\ssrc="(\/[^"]*)"/g)].map((m) => m[1]);
      for (const src of local) expect(src, `${ch.slug}: ${src}`).toMatch(/^\/diagrams-2\//);
      const expected = figuresTwo.filter((f) => f.chapter === ch.number).length;
      expect(local.length, ch.slug).toBe(expected);
    }
  });
});
