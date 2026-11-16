import { describe, expect, it } from 'vitest';
import { artifactAnchorLabel } from './artifactAnchors';

describe('artifactAnchorLabel', () => {
  it('names the kind and the ref', () => {
    expect(artifactAnchorLabel({ kind: 'commit', ref: '2de004f', date: '2026-11-16', excerpt: 'x' })).toBe(
      'Commit 2de004f',
    );
    expect(artifactAnchorLabel({ kind: 'run', ref: '43779369138', date: '2026-11-16', excerpt: 'x' })).toBe(
      'Actions run 43779369138',
    );
  });
});
