import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { TitleMarquee, focusOffset, marqueeCopies, resumeDelay } from './TitleMarquee';

describe('focusOffset', () => {
  // A 4000px track in a 1000px frame: offsets from 0 to -3000 keep the frame covered.
  it('centres the copy that needs the shortest move', () => {
    // Centres at 800 and 2800 → offsets -300 and -2300; from -2000 the second is nearer.
    expect(focusOffset(-2000, [800, 2800], 1000, 4000)).toBe(-2300);
    expect(focusOffset(-100, [800, 2800], 1000, 4000)).toBe(-300);
  });

  it('skips copies that would leave the frame uncovered', () => {
    // Centre 200 needs +300 (gap on the left); centre 3900 needs -3400 (gap on the right).
    expect(focusOffset(-1000, [200, 1700, 3900], 1000, 4000)).toBe(-1200);
  });

  it('stays put when no copy fits', () => {
    expect(focusOffset(-50, [100], 1000, 4000)).toBe(-50);
  });
});

describe('resumeDelay', () => {
  it('restarts the loop at the parked offset', () => {
    expect(resumeDelay(0, 2000, 70)).toBeCloseTo(0);
    expect(resumeDelay(-1000, 2000, 70)).toBeCloseTo(-35);
    // Past the half point the loop has wrapped: -2500 looks like -500.
    expect(resumeDelay(-2500, 2000, 70)).toBeCloseTo(-17.5);
    expect(resumeDelay(-100, 0, 70)).toBe(0);
  });
});

const TITLES = [
  { id: 'a', title: 'Alpha' },
  { id: 'b', title: 'Beta' },
  { id: 'c', title: 'Gamma' },
];

const count = (html: string, needle: string) => html.split(needle).length - 1;

describe('TitleMarquee', () => {
  it('loops four copies and hides all but the first from screen readers', () => {
    const html = renderToStaticMarkup(<TitleMarquee titles={TITLES} activeId={null} reduced={false} />);
    expect(marqueeCopies(false)).toBe(4);
    expect(count(html, '>Alpha<')).toBe(4);
    // Copies 2–4 carry aria-hidden; the separators carry their own.
    expect(count(html, 'aria-hidden="true" class="flex shrink-0')).toBe(3);
    expect(html).toContain('press-marquee-track');
    expect(html).not.toContain('data-paused');
  });

  it('renders one static copy under reduced motion', () => {
    const html = renderToStaticMarkup(<TitleMarquee titles={TITLES} activeId={null} reduced />);
    expect(count(html, '>Alpha')).toBe(1);
    expect(html).not.toContain('press-marquee-track');
    expect(html).not.toContain('aria-hidden');
    expect(html).toContain('data-static');
  });

  it('pauses and brings the active title into focus', () => {
    const html = renderToStaticMarkup(<TitleMarquee titles={TITLES} activeId="b" reduced={false} />);
    expect(html).toContain('data-paused');
    expect(count(html, 'data-book="b" data-active="true"')).toBe(4);
    expect(html).not.toContain('data-book="a" data-active');
  });

  it('gives each shelf position its own type treatment', () => {
    const html = renderToStaticMarkup(<TitleMarquee titles={TITLES} activeId={null} reduced />);
    expect(html).toMatch(/data-book="a"[^>]*class="[^"]*italic/);
    expect(html).toMatch(/data-book="b"[^>]*class="[^"]*uppercase/);
    expect(html).toMatch(/data-book="c"[^>]*class="[^"]*font-mono/);
  });
});
