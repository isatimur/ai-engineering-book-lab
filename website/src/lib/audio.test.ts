import { describe, it, expect } from 'vitest';
import { ScrollAudioFeedback, scrollAudio } from './audio';

describe('ScrollAudioFeedback', () => {
  it('exports a singleton instance', () => {
    expect(scrollAudio).toBeInstanceOf(ScrollAudioFeedback);
  });

  it('initialize() does not throw in a non-browser environment', () => {
    const fb = new ScrollAudioFeedback();
    expect(() => fb.initialize()).not.toThrow();
  });

  it('playTick() is a no-op when not initialised', () => {
    const fb = new ScrollAudioFeedback();
    expect(() => fb.playTick()).not.toThrow();
  });
});
