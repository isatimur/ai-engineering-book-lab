import { describe, it, expect } from 'vitest';
import { GLOSSARY } from './glossary';

describe('GLOSSARY', () => {
  it('has at least 30 terms', () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(30);
  });

  it('every term has a unique id', () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every term has at least one display form', () => {
    for (const t of GLOSSARY) {
      expect(t.display.length).toBeGreaterThan(0);
    }
  });

  it('diagram paths point under /diagrams/concepts/', () => {
    for (const t of GLOSSARY) {
      if (t.diagram) expect(t.diagram).toMatch(/^\/diagrams\/concepts\//);
    }
  });
});
