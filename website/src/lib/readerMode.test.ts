import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  isTextOnlyFromSearch,
  loadTextOnlyPreference,
  saveTextOnlyPreference,
  TEXT_ONLY_KEY,
} from './readerMode';

describe('readerMode', () => {
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
      clear: () => {
        store.clear();
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads text-only from URL param', () => {
    expect(isTextOnlyFromSearch('?mode=text')).toBe(true);
    expect(isTextOnlyFromSearch('?mode=visual')).toBe(false);
  });

  it('falls back to localStorage preference', () => {
    saveTextOnlyPreference(true);
    expect(isTextOnlyFromSearch('')).toBe(true);
    expect(loadTextOnlyPreference()).toBe(true);
  });

  it('URL param overrides stored preference', () => {
    saveTextOnlyPreference(true);
    expect(isTextOnlyFromSearch('?mode=visual')).toBe(false);
  });

  it('persists preference to localStorage', () => {
    saveTextOnlyPreference(true);
    expect(localStorage.getItem(TEXT_ONLY_KEY)).toBe('1');
    saveTextOnlyPreference(false);
    expect(localStorage.getItem(TEXT_ONLY_KEY)).toBe('0');
  });
});
