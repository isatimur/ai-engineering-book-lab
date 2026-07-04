import { describe, expect, it } from 'vitest';

import {
  activeDisplayWordIndex,
  activeSpokenWordIndex,
  isDisplayWordActive,
  type ChapterAlignment,
} from './listenAlignment';

const sample: ChapterAlignment = {
  chapter: '01',
  spokenText: 'the shift',
  source: 'test',
  durationSeconds: 10,
  words: [
    { text: 'the', start: 0.75, end: 1.0 },
    { text: 'shift', start: 1.0, end: 1.5 },
  ],
  displayMap: [0, 1],
  displayWordCount: 2,
};

describe('listenAlignment', () => {
  it('finds active spoken word by time', () => {
    expect(activeSpokenWordIndex(sample.words, 0.8)).toBe(0);
    expect(activeSpokenWordIndex(sample.words, 1.2)).toBe(1);
  });

  it('maps spoken index to display index', () => {
    expect(activeDisplayWordIndex(sample, 1)).toBe(1);
  });

  it('highlights display word when spoken index matches map', () => {
    expect(isDisplayWordActive(sample, 1, 1)).toBe(true);
    expect(isDisplayWordActive(sample, 0, 1)).toBe(false);
  });
});
