import { describe, it, expect } from 'vitest';
import { chapterVideos, chapterVideoFor } from './chapterVideos';
import { chapters } from './bookChapters';

describe('chapterVideos', () => {
  it('every registered video points at a real chapter slug', () => {
    const slugs = new Set(chapters.map((c) => c.slug));
    for (const video of chapterVideos) {
      expect(slugs.has(video.chapterSlug)).toBe(true);
    }
  });

  it('every registered video has a plausible, non-empty description and positive duration', () => {
    for (const video of chapterVideos) {
      expect(video.description.length).toBeGreaterThan(20);
      expect(video.durationSeconds).toBeGreaterThan(0);
      expect(video.src.startsWith('/video/')).toBe(true);
      expect(video.poster.startsWith('/video/')).toBe(true);
    }
  });

  it('chapterVideoFor resolves a registered slug and returns undefined otherwise', () => {
    expect(chapterVideoFor('the-shift')).toBeDefined();
    expect(chapterVideoFor('taste')).toBeDefined();
    expect(chapterVideoFor('runtimes')).toBeUndefined();
  });
});
