import type { ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { bookTwo, bookThree } from '../../data/draftBooks';
import { LIBRARY } from '../../data/library';
import { SectionLabel } from './SectionLabel';
import { indexActions, WATCH_ANCHOR } from './DraftBookIndexLinks';
import { BookNeighbours, neighbourTarget } from './BookNeighbours';
import { BookColophon } from './BookColophon';
import { WatchRow, formatDuration } from './WatchRow';
import { shouldEscToCatalogue } from '../../hooks/useEscToCatalogue';
import { SecondBookReader } from '../../pages/SecondBookReader';
import { ThirdBookReader } from '../../pages/ThirdBookReader';
import { DraftBookChapterPage } from '../../pages/DraftBookChapterPage';

// <Seo> needs vite-react-ssg's provider; the body is what these tests check.
vi.mock('../Seo', () => ({ Seo: () => null }));

const html = (el: ReactElement, url = '/', path = '*') =>
  renderToString(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path={path} element={el} />
      </Routes>
    </MemoryRouter>,
  );

describe('SectionLabel', () => {
  it('renders a bracketed mono label over a rule', () => {
    const out = html(<SectionLabel id="x">Colophon</SectionLabel>);
    expect(out).toContain('id="x"');
    expect(out).toMatch(/\[ <\/span>Colophon<span aria-hidden="true"> \]/);
    expect(out).toContain('border-t');
    expect(out).toContain('font-mono');
  });
});

describe('indexActions', () => {
  it('starts reading at chapter one with no bookmark', () => {
    const rows = indexActions(bookTwo, null);
    expect(rows.map((r) => r.key)).toEqual(['read', 'watch', 'figures', 'graph']);
    expect(rows[0].label).toBe('Start reading');
    expect(rows[0].to).toBe(bookTwo.chapterPath(bookTwo.chapters[0]));
    expect(rows[1]).toMatchObject({ to: `#${WATCH_ANCHOR}`, anchor: true });
    expect(rows.some((r) => /subscribe/i.test(r.label))).toBe(false);
  });

  it('continues from the bookmark', () => {
    const ch = bookThree.chapters[3];
    const rows = indexActions(bookThree, ch.slug);
    expect(rows[0]).toMatchObject({ label: 'Continue reading', to: bookThree.chapterPath(ch) });
  });

  it('ignores a stale bookmark', () => {
    expect(indexActions(bookTwo, 'not-a-chapter')[0].label).toBe('Start reading');
  });
});

describe('shouldEscToCatalogue', () => {
  const base = { key: 'Escape', defaultPrevented: false, target: { tagName: 'BODY' } as unknown as EventTarget };
  it('fires on a bare Esc', () => expect(shouldEscToCatalogue(base, false)).toBe(true));
  it('ignores other keys', () => expect(shouldEscToCatalogue({ ...base, key: 'Enter' }, false)).toBe(false));
  it.each(['INPUT', 'TEXTAREA', 'SELECT'])('ignores Esc typed in %s', (tagName) => {
    expect(shouldEscToCatalogue({ ...base, target: { tagName } as unknown as EventTarget }, false)).toBe(false);
  });
  it('ignores Esc in contenteditable', () => {
    const target = { tagName: 'DIV', isContentEditable: true } as unknown as EventTarget;
    expect(shouldEscToCatalogue({ ...base, target }, false)).toBe(false);
  });
  it('leaves Esc to an open dialog', () => expect(shouldEscToCatalogue(base, true)).toBe(false));
  it('ignores a handled Esc', () =>
    expect(shouldEscToCatalogue({ ...base, defaultPrevented: true }, false)).toBe(false));
});

describe('BookNeighbours', () => {
  it('links book 2 to book 1 (its own domain) and book 3 (in-app)', () => {
    const out = html(<BookNeighbours book={bookTwo} />);
    expect(out).toContain(`href="${LIBRARY[0].href}"`);
    expect(out).toContain('href="/third-book"');
    expect(out).toContain('All books');
    expect(neighbourTarget(LIBRARY[2])).toEqual({ to: '/third-book', internal: true });
  });

  it('gives book 3 no next book', () => {
    const out = html(<BookNeighbours book={bookThree} escHint />);
    expect(out).toContain('Previous book');
    expect(out).not.toContain('Next book');
    expect(out).toMatch(/\[Esc\] <\/span>All books/);
  });
});

describe('BookColophon and WatchRow', () => {
  it('renders the colophon rows', () => {
    const out = html(<BookColophon book={bookThree} />);
    for (const label of ['Words', 'Talks cited', 'Claims', 'Anchors', 'Typefaces', 'Last updated', 'Status']) {
      expect(out).toContain(label);
    }
  });

  it('renders one poster tile per film, each linking to its chapter', () => {
    const out = html(<WatchRow book={bookTwo} />);
    expect(out).toContain(`id="${WATCH_ANCHOR}"`);
    for (const v of bookTwo.videos) {
      const ch = bookTwo.chapters.find((c) => c.slug === v.chapterSlug)!;
      expect(out).toContain(`src="${v.poster}"`);
      expect(out).toContain(`href="${bookTwo.chapterPath(ch)}"`);
    }
  });

  it('formats durations', () => {
    expect(formatDuration(34)).toBe('0:34');
    expect(formatDuration(125)).toBe('2:05');
  });
});

describe('landing pages', () => {
  it.each([
    [bookTwo, <SecondBookReader key="2" />],
    [bookThree, <ThirdBookReader key="3" />],
  ] as const)('%s.key renders the themed hero and its sections', (book, el) => {
    const out = html(el, book.indexPath);
    expect(out).toContain(`--color-accent:${book.theme.accent}`);
    expect(out).toContain(book.description.slice(0, 40));
    expect(out).toContain('Timur Isachenko');
    expect(out).not.toContain('Working draft.');
    for (const label of ['Contents', 'Watch', 'Author', 'Colophon', 'More from the press']) {
      expect(out).toContain(`</span>${label}<span`);
    }
    expect(out).toContain('Start reading');
  });
});

describe('chapter pages', () => {
  const render = (book: typeof bookTwo, slug: string) =>
    html(<DraftBookChapterPage book={book} />, `${book.indexPath}/${slug}`, `${book.indexPath}/:slug`);

  it('set the book theme on the page root', () => {
    expect(render(bookThree, bookThree.chapters[0].slug)).toContain(`--color-accent:${bookThree.theme.accent}`);
  });

  it('show the other books only after the last chapter', () => {
    expect(render(bookTwo, bookTwo.chapters[0].slug)).not.toContain('More from the press');
    expect(render(bookTwo, bookTwo.chapters.at(-1)!.slug)).toContain('More from the press');
  });
});
