import { describe, expect, it } from 'vitest';

import {
  audioManifest,
  formatAudioTime,
  globalTimeAtSegment,
  globalTimeToScroll,
  locateGlobalTime,
  parsePlaybackRate,
  scrollToGlobalTime,
  type AudioSegment,
} from './audiobook';

const sampleSegments: AudioSegment[] = [
  { index: 0, kind: 'opening', slug: 'opening-credits', chapterNumber: null, title: 'Opening', src: '/audio/00.mp3', durationSeconds: 10 },
  { index: 1, kind: 'chapter', slug: 'the-shift', chapterNumber: '01', title: 'The Shift', src: '/audio/01.mp3', durationSeconds: 100 },
  { index: 2, kind: 'chapter', slug: 'taste', chapterNumber: '02', title: 'Taste', src: '/audio/02.mp3', durationSeconds: 90 },
];

describe('audiobook helpers', () => {
  it('formatAudioTime renders mm:ss with leading 00 hours', () => {
    expect(formatAudioTime(65)).toBe('00:01:05');
    expect(formatAudioTime(3661)).toBe('01:01:01');
  });

  it('scrollToGlobalTime maps scroll ratio to seconds', () => {
    expect(scrollToGlobalTime(0.5, 200)).toBe(100);
    expect(scrollToGlobalTime(1.5, 200)).toBe(200);
    expect(scrollToGlobalTime(-1, 200)).toBe(0);
  });

  it('globalTimeToScroll inverts scroll mapping', () => {
    expect(globalTimeToScroll(50, 200)).toBe(0.25);
  });

  it('locateGlobalTime finds segment and offset', () => {
    expect(locateGlobalTime(sampleSegments, 5)).toEqual({ segmentIndex: 0, offsetSeconds: 5 });
    expect(locateGlobalTime(sampleSegments, 10)).toEqual({ segmentIndex: 1, offsetSeconds: 0 });
    expect(locateGlobalTime(sampleSegments, 60)).toEqual({ segmentIndex: 1, offsetSeconds: 50 });
    expect(locateGlobalTime(sampleSegments, 120)).toEqual({ segmentIndex: 2, offsetSeconds: 10 });
  });

  it('globalTimeAtSegment sums prior durations', () => {
    expect(globalTimeAtSegment(sampleSegments, 1, 25)).toBe(35);
  });

  it('parsePlaybackRate handles labels', () => {
    expect(parsePlaybackRate('1.5X')).toBe(1.5);
    expect(parsePlaybackRate('COLLISON')).toBe(2.5);
  });

  it('manifest is importable (empty until sync-audio runs)', () => {
    expect(audioManifest).toHaveProperty('segments');
    expect(Array.isArray(audioManifest.segments)).toBe(true);
  });
});
