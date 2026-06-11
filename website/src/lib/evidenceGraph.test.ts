import { describe, expect, it } from 'vitest';
import { buildEvidenceGraph, filterGraphByChapter, parseSpeakerLabel } from './evidenceGraph';

describe('evidenceGraph', () => {
  it('parses practitioner labels from anchor metadata', () => {
    const parsed = parseSpeakerLabel('#206 — Joel Hron, Thomson Reuters');
    expect(parsed.speakerName).toBe('Joel Hron, Thomson Reuters');
    expect(parsed.speakerId).toBe('joel-hron-thomson-reuters');
  });

  it('builds a non-empty graph from committed evidence', () => {
    const graph = buildEvidenceGraph();
    expect(graph.stats.chapters).toBe(10);
    expect(graph.stats.claims).toBeGreaterThan(40);
    expect(graph.stats.videos).toBeGreaterThan(50);
    expect(graph.edges.length).toBeGreaterThan(graph.nodes.length);
  });

  it('filters to a chapter neighborhood', () => {
    const full = buildEvidenceGraph();
    const ch1 = filterGraphByChapter(full, '01');
    expect(ch1.nodes.some((n) => n.id === 'chapter:01')).toBe(true);
    expect(ch1.stats.claims).toBeGreaterThan(0);
    expect(ch1.nodes.length).toBeLessThan(full.nodes.length);
  });
});
