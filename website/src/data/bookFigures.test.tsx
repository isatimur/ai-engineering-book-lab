import type { ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { normaliseHeading } from './bookFigures';
import { bookTwo, bookThree, type DraftBook } from './draftBooks';
import { DraftBookChapterPage } from '../pages/DraftBookChapterPage';
import { DraftBookGraphPage } from '../pages/DraftBookGraphPage';
import { DraftBookFiguresPage } from '../pages/DraftBookFiguresPage';
import { getEvidenceGraph } from '../lib/evidenceGraph';
import { chapters as bookOneChapters } from './bookChapters';

// <Seo> writes <head> tags through vite-react-ssg's Helmet, which needs the
// SSG provider. The page body is what this file checks, so stub it.
vi.mock('../components/Seo', () => ({ Seo: () => null }));

// Every figure must point at a real PNG, sit under a real section, and show
// only what its claims support. These checks run against the committed files,
// because scripts/sync-figures-lib.mjs skips in CI.
const website = resolve(__dirname, '../..');

const BOOKS: { book: DraftBook; folder: string; content: string }[] = [
  { book: bookTwo, folder: 'diagrams-2', content: 'content-2' },
  { book: bookThree, folder: 'diagrams-3', content: 'content-3' },
];

const headingsOf = (contentDir: string, chapter: string): string[] =>
  readFileSync(resolve(website, `src/${contentDir}/chapter-${chapter}.md`), 'utf8')
    .split('\n')
    .filter((l) => /^#{2,3} /.test(l))
    .map(normaliseHeading);

const render = (book: DraftBook, url: string, path: string, element: ReactElement) =>
  renderToString(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </MemoryRouter>,
  );

/** Images served from this site (the evidence rail also shows YouTube thumbnails). */
const localImages = (html: string) => [...html.matchAll(/<img[^>]*\ssrc="(\/[^"]*)"/g)].map((m) => m[1]);
const hrefs = (html: string) => [...html.matchAll(/\shref="([^"]+)"/g)].map((m) => m[1]);

describe.each(BOOKS)('$folder figure spec', ({ book, folder, content }) => {
  const figures = book.figures.figures;

  it('has unique ids', () => {
    const ids = figures.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it(`matches ${folder}/figures.json when that source is in this checkout`, () => {
    const source = resolve(website, `../${folder}/figures.json`);
    if (!existsSync(source)) return;
    const dataName = `figures-${folder.split('-')[1]}.json`;
    const synced = readFileSync(resolve(website, 'src/data', dataName), 'utf8');
    expect(synced, 'run npm run prebuild').toBe(readFileSync(source, 'utf8'));
  });

  it('points every figure at a committed PNG', () => {
    for (const f of figures) expect(existsSync(resolve(website, 'public', folder, f.file)), f.file).toBe(true);
  });

  it('gives each chapter at most one opener, and openers no section', () => {
    for (const ch of new Set(figures.map((f) => f.chapter))) {
      const openers = figures.filter((f) => f.chapter === ch && f.kind === 'opener');
      expect(openers.length, `chapter ${ch}`).toBeLessThanOrEqual(1);
      for (const o of openers) expect(o.sectionHeading, o.id).toBeUndefined();
    }
  });

  it('places every inline figure under a heading that exists in its chapter', () => {
    for (const f of figures.filter((x) => x.kind === 'inline')) {
      expect(headingsOf(content, f.chapter), f.id).toContain(f.sectionHeading);
    }
  });

  it('files every claim id under the figure chapter', () => {
    for (const f of figures) {
      expect(f.claimIds.length, f.id).toBeGreaterThan(0);
      // Evidence keys chapters "1".."N"; figures use "01".."NN".
      const ids = (book.evidence[String(parseInt(f.chapter, 10))] ?? []).map((c) => c.claim_id);
      for (const id of f.claimIds) expect(ids, `${f.id} cites ${id}`).toContain(id);
    }
  });

  it('cites only sources that anchor the figure claims', () => {
    for (const f of figures) {
      expect(f.sources.length, f.id).toBeGreaterThan(0);
      const claims = (book.evidence[String(parseInt(f.chapter, 10))] ?? []).filter((c) =>
        f.claimIds.includes(c.claim_id),
      );
      const labels = new Set(
        claims.flatMap((c) => [
          ...c.anchors.map((a) => a.label),
          ...((c as { artifact_anchors?: { label?: string }[] }).artifact_anchors ?? []).map((a) => a.label ?? ''),
        ]),
      );
      for (const s of f.sources) expect([...labels], `${f.id} source ${s}`).toContain(s);
    }
  });
});

describe.each(BOOKS)('$folder pages', ({ book, folder }) => {
  const bookOneTitles = bookOneChapters.map((c) => c.title);

  it('shows every figure of each chapter, only from this book, and no book 1 links', () => {
    for (const ch of book.chapters) {
      const html = render(book, book.chapterPath(ch), `${book.indexPath}/:slug`, <DraftBookChapterPage book={book} />);
      const imgs = localImages(html);
      for (const src of imgs) expect(src, `${ch.slug}: ${src}`).toMatch(new RegExp(`^/${folder}/`));
      expect(imgs.length, ch.slug).toBe(book.figures.figures.filter((f) => f.chapter === ch.number).length);
      for (const href of hrefs(html)) {
        expect(href, `${ch.slug} links ${href}`).not.toMatch(/^\/(read|experience|visual-guide)(\/|$|\?|#)/);
      }
      for (const t of bookOneTitles) expect(html.includes(`>${t}<`), `${ch.slug} shows book 1 "${t}"`).toBe(false);
    }
  });

  it('renders the graph page from this book alone', () => {
    const html = render(book, `${book.indexPath}/graph`, `${book.indexPath}/graph`, <DraftBookGraphPage book={book} />);
    const stats = book.graph.api.getGraph().stats;
    // React separates adjacent text nodes with <!-- --> in server HTML.
    expect(html.replace(/<!-- -->/g, '')).toContain(`${stats.claims} claims`);
    const ids = new Set(Object.values(book.evidence).flat().map((c) => c.claim_id));
    expect(stats.claims).toBe(ids.size);
  });

  it('lists every figure on the figures page', () => {
    const html = render(book, `${book.indexPath}/figures`, `${book.indexPath}/figures`, <DraftBookFiguresPage book={book} />);
    expect(localImages(html).length).toBe(book.figures.figures.length);
  });
});

describe('evidence graphs per book', () => {
  it('keeps one graph per book, and book 1 unchanged', () => {
    const one = getEvidenceGraph();
    const two = bookTwo.graph.api.getGraph();
    const three = bookThree.graph.api.getGraph();
    expect(two).not.toBe(one);
    expect(three).not.toBe(two);
    expect(one.nodes.filter((n) => n.type === 'chapter').map((n) => n.label)).toEqual(
      bookOneChapters.map((c) => c.title),
    );
    expect(two.nodes.filter((n) => n.type === 'chapter').map((n) => n.label)).toEqual(
      bookTwo.chapters.map((c) => c.title),
    );
  });
});
