import { describe, it, expect } from 'vitest';
import { chapters, chapterPath, chapterParam, chapterByParam, ogCardPath } from './bookChapters';
import { chaptersThree } from './bookChaptersThree';

// This test passes vacuously today: the book-3 track is empty. That is
// intentional. Do not delete it as pointless. It fires later, when someone
// registers a chapter in bookChaptersThree.ts without syncing its content,
// which is how book 2's Chapter 8 nearly shipped with no evidence panel.
describe('book 3 registration', () => {
  it('every registered book-3 chapter has a mirrored content file', () => {
    for (const c of chaptersThree) {
      expect(c.content.length).toBeGreaterThan(0);
    }
  });
});

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
