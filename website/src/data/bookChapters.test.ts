import { describe, it, expect } from 'vitest';
import { chapters, chapterPath, chapterParam, chapterByParam, ogCardPath } from './bookChapters';

describe('ogCardPath', () => {
  it('points at a per-chapter PNG under /og/', () => {
    for (const c of chapters) {
      expect(ogCardPath(c)).toBe(`/og/chapter-${c.number}.png`);
    }
  });
});

describe('chapterPath / chapterParam / chapterByParam', () => {
  it('round-trips every chapter through its param', () => {
    for (const c of chapters) {
      expect(chapterByParam(chapterParam(c))).toBe(c);
      expect(chapterPath(c)).toBe(`/read/${chapterParam(c)}`);
    }
  });
});
