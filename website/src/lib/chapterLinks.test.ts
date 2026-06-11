import { describe, expect, it } from 'vitest';
import {
  experienceUrl,
  graphUrl,
  parseExperienceHash,
  readChapterUrl,
} from './chapterLinks';

describe('chapterLinks', () => {
  it('builds read chapter URLs from zero-padded numbers', () => {
    expect(readChapterUrl('01')).toBe('/read/01-the-shift');
    expect(readChapterUrl('09')).toBe('/read/09-ai-native-org');
  });

  it('builds graph URLs with optional chapter filter', () => {
    expect(graphUrl()).toBe('/read/graph');
    expect(graphUrl('3')).toBe('/read/graph?chapter=03');
  });

  it('builds experience URLs with chapter hash', () => {
    expect(experienceUrl()).toBe('/experience/');
    expect(experienceUrl('03')).toBe('/experience/#ch-3');
  });

  it('parses experience hash fragments', () => {
    expect(parseExperienceHash('#ch-3')).toBe(3);
    expect(parseExperienceHash('#ch-10')).toBe(10);
    expect(parseExperienceHash('#ch-0')).toBeNull();
    expect(parseExperienceHash('')).toBeNull();
  });
});
