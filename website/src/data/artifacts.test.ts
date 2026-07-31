import { describe, it, expect } from 'vitest';
import { ARTIFACTS } from './artifacts';

describe('ARTIFACTS', () => {
  it('has exactly 3 entries, in order: claims-ledger, book-mash, ai-native-org', () => {
    expect(ARTIFACTS.map((a) => a.label)).toEqual([
      'claims-ledger · open source',
      'book-mash · open source',
      'ai-native-org · open source',
    ]);
  });

  it('every entry has non-empty label, headline, description, and at least one link', () => {
    for (const a of ARTIFACTS) {
      expect(a.label.length).toBeGreaterThan(0);
      expect(a.headline.length).toBeGreaterThan(0);
      expect(a.description.length).toBeGreaterThan(0);
      expect(a.links.length).toBeGreaterThan(0);
    }
  });

  it('external links are absolute https URLs; internal links start with a slash', () => {
    for (const a of ARTIFACTS) {
      for (const l of a.links) {
        if (l.external) {
          expect(l.href.startsWith('https://')).toBe(true);
        } else {
          expect(l.href.startsWith('/')).toBe(true);
        }
      }
    }
  });

  it('only claims-ledger has a badge', () => {
    expect(ARTIFACTS[0].badge).toBeDefined();
    expect(ARTIFACTS[1].badge).toBeUndefined();
    expect(ARTIFACTS[2].badge).toBeUndefined();
  });
});
