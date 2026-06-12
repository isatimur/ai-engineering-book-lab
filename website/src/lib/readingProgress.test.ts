import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadLastChapter, saveLastChapter } from './readingProgress';

describe('readingProgress last chapter', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('saves and loads zero-padded chapter numbers', () => {
    saveLastChapter('3');
    expect(loadLastChapter()).toBe('03');
    saveLastChapter('09');
    expect(loadLastChapter()).toBe('09');
  });

  it('returns null when unset', () => {
    expect(loadLastChapter()).toBeNull();
  });
});
