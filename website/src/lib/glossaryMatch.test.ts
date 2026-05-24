import { describe, it, expect } from 'vitest';
import { splitWithGlossary } from './glossaryMatch';
import { GLOSSARY } from '../data/glossary';

describe('splitWithGlossary', () => {
  it('returns text-only when no terms match', () => {
    const parts = splitWithGlossary('plain ordinary text', GLOSSARY);
    expect(parts).toEqual([{ kind: 'text', value: 'plain ordinary text' }]);
  });

  it('detects a single-word term', () => {
    const parts = splitWithGlossary('A harness wraps the agent.', GLOSSARY);
    const matches = parts.filter((p) => p.kind === 'term');
    expect(matches).toHaveLength(1);
    expect((matches[0] as any).termId).toBe('harness-engineering');
  });

  it('prefers the longest match', () => {
    const parts = splitWithGlossary('Use harness engineering, not just harness alone.', GLOSSARY);
    const terms = parts.filter((p) => p.kind === 'term') as any[];
    expect(terms[0].displayMatched).toBe('harness engineering');
    expect(terms[1].displayMatched).toBe('harness');
  });

  it('is case-insensitive', () => {
    const parts = splitWithGlossary('GraphRAG and graphrag both work.', GLOSSARY);
    const terms = parts.filter((p) => p.kind === 'term');
    expect(terms).toHaveLength(2);
  });

  it('does not match inside a longer word', () => {
    // "delegate" should not match inside "delegated"
    const parts = splitWithGlossary('The delegated authority is bounded.', GLOSSARY);
    const terms = parts.filter((p) => p.kind === 'term');
    expect(terms).toHaveLength(0);
  });
});
