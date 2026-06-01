import { describe, it, expect } from 'vitest';
import {
  judgeScores,
  scoreForChapter,
  hasJudgeData,
  labelColor,
  DIMS,
} from './judgeScores';

describe('judgeScores', () => {
  it('has a well-formed run + book rollup', () => {
    expect(judgeScores.schema_version).toBe(1);
    expect(judgeScores.run).toBeDefined();
    expect(judgeScores.run.dims).toEqual([...DIMS]);
    for (const dim of DIMS) {
      expect(judgeScores.book).toHaveProperty(dim);
    }
  });

  it('every covered chapter has all six dims + labels + version_id', () => {
    for (const [num, chapter] of Object.entries(judgeScores.chapters)) {
      expect(num).toMatch(/^\d{2}$/); // zero-padded
      for (const dim of DIMS) {
        expect(chapter.rollup).toHaveProperty(dim);
        expect(chapter.labels).toHaveProperty(dim);
      }
      expect(chapter).toHaveProperty('version_id');
      expect(Array.isArray(chapter.ship_blockers)).toBe(true);
      expect(Array.isArray(chapter.weakest)).toBe(true);
    }
  });

  it('scoreForChapter() resolves padded and bare numbers, null when missing', () => {
    if (hasJudgeData()) {
      const first = Object.keys(judgeScores.chapters)[0];
      const bare = String(parseInt(first, 10));
      expect(scoreForChapter(first)).not.toBeNull();
      expect(scoreForChapter(bare)).not.toBeNull();
    }
    expect(scoreForChapter('99')).toBeNull();
  });

  it('labelColor() returns a value for every label', () => {
    for (const label of ['strong', 'moderate', 'weak', 'fail', 'error'] as const) {
      expect(labelColor(label)).toBeTruthy();
    }
  });
});
