import { describe, it, expect } from 'vitest';
import { manifest, opener, inlineFigsForChapter, conceptById } from './manifest';

describe('manifest', () => {
  it('has the expected counts', () => {
    expect(manifest.overview).toHaveLength(4);
    expect(manifest.openers).toHaveLength(10);
    expect(manifest.concepts).toHaveLength(18);
    expect(manifest.inline.length).toBeGreaterThanOrEqual(20);
    expect(manifest.maps.length).toBeGreaterThanOrEqual(2);
  });

  it('opener() returns the chapter opener', () => {
    const op = opener('03');
    expect(op).toBeDefined();
    expect(op?.src).toBe('/diagrams/openers/ch03.png');
  });

  it('inlineFigsForChapter() returns figs sorted by index', () => {
    const figs = inlineFigsForChapter('01');
    expect(figs.length).toBeGreaterThan(0);
    expect(figs[0].index).toBe(1);
  });

  it('conceptById() finds a known concept', () => {
    const c = conceptById('harness-engineering');
    expect(c).toBeDefined();
    expect(c?.chapter).toBe('03');
  });
});
