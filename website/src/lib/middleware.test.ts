import { describe, it, expect } from 'vitest';
import middleware from '../../middleware';
import rootMiddleware from '../../../middleware';
import { PRESS_PATH_PREFIXES } from '../data/book';

/**
 * The middleware decides which of the two sites a request belongs to. Preview
 * deployments run on vercel.app hosts, where it passes everything through, so
 * these tests are the only place the real-domain routing runs before it ships.
 */

const hit = (url: string) => middleware(new Request(url, { headers: { host: new URL(url).host } }));

const rewriteOf = (r: Response) => r.headers.get('x-middleware-rewrite');
const passes = (r: Response) => r.headers.get('x-middleware-next') === '1';

describe('aiepress.com', () => {
  it('serves the press homepage at /', () => {
    expect(rewriteOf(hit('https://aiepress.com/'))).toBe('https://aiepress.com/press');
  });

  it('sends /press to /, so the homepage has one URL', () => {
    const r = hit('https://aiepress.com/press');
    expect(r.status).toBe(308);
    expect(r.headers.get('location')).toBe('https://aiepress.com/');
  });

  it('serves its own robots.txt, sitemap and llms.txt', () => {
    expect(rewriteOf(hit('https://aiepress.com/robots.txt'))).toBe('https://aiepress.com/robots-press.txt');
    expect(rewriteOf(hit('https://aiepress.com/sitemap.xml'))).toBe('https://aiepress.com/sitemap-press.xml');
    expect(rewriteOf(hit('https://aiepress.com/llms.txt'))).toBe('https://aiepress.com/llms-press.txt');
  });

  it('is the middleware Vercel deploys: the repo-root file re-exports this one', () => {
    // Vercel builds from the repo root and only runs a root middleware.ts.
    // Production served book 1 on aiepress.com while this file sat unused.
    expect(rootMiddleware).toBe(middleware);
  });

  it('serves the press pages and static files', () => {
    expect(passes(hit('https://aiepress.com/books'))).toBe(true);
    expect(passes(hit('https://aiepress.com/second-book/a-chapter'))).toBe(true);
    expect(passes(hit('https://aiepress.com/third-book'))).toBe(true);
    expect(passes(hit('https://aiepress.com/covers/the-shape-of-the-work-600w.webp'))).toBe(true);
  });

  it('sends book 1 pages to book 1’s domain, keeping the query', () => {
    const r = hit('https://aiepress.com/read/01-the-shift?ref=x');
    expect(r.status).toBe(308);
    expect(r.headers.get('location')).toBe('https://fromcopilottocolleague.com/read/01-the-shift?ref=x');
  });
});

describe('fromcopilottocolleague.com', () => {
  it('serves book 1 pages', () => {
    expect(passes(hit('https://fromcopilottocolleague.com/'))).toBe(true);
    expect(passes(hit('https://fromcopilottocolleague.com/read/01-the-shift'))).toBe(true);
    expect(passes(hit('https://fromcopilottocolleague.com/robots.txt'))).toBe(true);
  });

  it('sends press pages to aiepress.com', () => {
    const r = hit('https://fromcopilottocolleague.com/second-book');
    expect(r.status).toBe(308);
    expect(r.headers.get('location')).toBe('https://aiepress.com/second-book');
    expect(hit('https://fromcopilottocolleague.com/press').headers.get('location')).toBe('https://aiepress.com/');
  });
});

describe('other hosts', () => {
  it('passes preview and local requests through untouched', () => {
    expect(passes(hit('https://from-copilot-to-colleague-abc123.vercel.app/second-book'))).toBe(true);
    expect(passes(hit('http://localhost:4173/'))).toBe(true);
  });
});

// middleware.ts keeps its own copy of the press paths (it runs at the edge,
// outside the app bundle). This catches the two lists drifting apart.
describe('press path list', () => {
  it('matches src/data/book.ts', () => {
    for (const p of PRESS_PATH_PREFIXES) {
      const target = p === '/press' ? 'https://aiepress.com/' : `https://aiepress.com${p}`;
      expect(hit(`https://fromcopilottocolleague.com${p}`).headers.get('location')).toBe(target);
    }
  });
});
