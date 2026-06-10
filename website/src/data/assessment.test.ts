import { describe, it, expect } from 'vitest';
import {
  DIMENSIONS,
  QUESTIONS,
  QUESTIONS_PER_DIMENSION,
  BAND_INFO,
  LIKERT,
  normalizeDimension,
  bandForScore,
  computeResult,
  questionsForDimension,
  type Answers,
  type DimensionId,
} from './assessment';

const allAnswers = (value: number): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.id, value]));

describe('assessment data shape', () => {
  it('has five dimensions, each with six questions', () => {
    expect(DIMENSIONS).toHaveLength(5);
    for (const dim of DIMENSIONS) {
      expect(questionsForDimension(dim.id)).toHaveLength(QUESTIONS_PER_DIMENSION);
    }
  });

  it('has 30 questions total, every id unique', () => {
    expect(QUESTIONS).toHaveLength(30);
    const ids = new Set(QUESTIONS.map((q) => q.id));
    expect(ids.size).toBe(30);
  });

  it('every question belongs to a real dimension', () => {
    const dimIds = new Set(DIMENSIONS.map((d) => d.id));
    for (const q of QUESTIONS) expect(dimIds.has(q.dimensionId)).toBe(true);
  });

  it('every dimension links to a chapter and has band recommendations', () => {
    const dimIds = DIMENSIONS.map((d) => d.id);
    for (const dim of DIMENSIONS) {
      expect(dim.chapterPath).toMatch(/^\/read\/\d{2}-/);
      expect(dim.chapterRef.length).toBeGreaterThan(0);
    }
    for (const band of ['early', 'developing', 'advanced'] as const) {
      for (const id of dimIds) {
        expect(BAND_INFO[band].recommendation[id as DimensionId]).toBeTruthy();
      }
    }
  });

  it('uses a 1–5 Likert scale', () => {
    expect(LIKERT.map((l) => l.value)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('normalizeDimension', () => {
  it('maps all-1s (raw 6) to 0 and all-5s (raw 30) to 100', () => {
    expect(normalizeDimension(6)).toBe(0);
    expect(normalizeDimension(30)).toBe(100);
  });

  it('maps the midpoint (raw 18, all-3s) to 50', () => {
    expect(normalizeDimension(18)).toBe(50);
  });
});

describe('bandForScore', () => {
  it('classifies into early / developing / advanced at 40 and 70', () => {
    expect(bandForScore(0)).toBe('early');
    expect(bandForScore(39)).toBe('early');
    expect(bandForScore(40)).toBe('developing');
    expect(bandForScore(69)).toBe('developing');
    expect(bandForScore(70)).toBe('advanced');
    expect(bandForScore(100)).toBe('advanced');
  });
});

describe('computeResult', () => {
  it('scores a perfect sheet at 100 / advanced across the board', () => {
    const r = computeResult(allAnswers(5));
    expect(r.overall).toBe(100);
    expect(r.overallBand).toBe('advanced');
    expect(r.dimensions).toHaveLength(5);
    for (const d of r.dimensions) {
      expect(d.score).toBe(100);
      expect(d.band).toBe('advanced');
    }
  });

  it('scores a floor sheet at 0 / early', () => {
    const r = computeResult(allAnswers(1));
    expect(r.overall).toBe(0);
    expect(r.overallBand).toBe('early');
  });

  it('treats missing answers as the floor (1) rather than throwing', () => {
    const r = computeResult({});
    expect(r.overall).toBe(0);
  });

  it('produces an uneven profile when dimensions differ', () => {
    const answers: Answers = {};
    for (const q of QUESTIONS) answers[q.id] = q.dimensionId === 'delegation' ? 5 : 1;
    const r = computeResult(answers);
    const delegation = r.dimensions.find((d) => d.dimension.id === 'delegation')!;
    const others = r.dimensions.filter((d) => d.dimension.id !== 'delegation');
    expect(delegation.score).toBe(100);
    for (const o of others) expect(o.score).toBe(0);
    // overall = (100 + 0*4) / 5 = 20
    expect(r.overall).toBe(20);
  });
});
