import { describe, it, expect } from 'vitest';
import { buildExplainer, SAMPLE } from '../../scripts/press-explainer-lib.mjs';
import evidence1 from '../evidence.json';
import evidence2 from '../evidence-2.json';
import scores from '../data/judge-scores.json';
import committed from '../data/press-explainer.json';

/**
 * The press explainer shows a real claim, real quotes and real scores. These
 * tests hold the committed press-explainer.json to its sources, so the page
 * cannot show a quote or a count the ledger no longer has.
 */

type Anchor = { video_id: string; start: string; quote: string };
type Claim = { claim_id: string; anchors: Anchor[] };
const book1 = evidence1 as unknown as Record<string, Claim[]>;

describe('press-explainer.json', () => {
  it('matches a fresh build from the evidence and judge files', () => {
    const fresh = buildExplainer({ book1: evidence1, book2: evidence2, scores });
    expect(committed).toEqual(fresh);
  });

  it('follows the chosen sample claim, lead anchor first, quoted word for word', () => {
    const { sample } = committed;
    expect(sample.claimId).toBe(SAMPLE.claimId);
    expect(sample.anchors[0].videoId).toBe(SAMPLE.lead.videoId);
    const source = Object.values(book1)
      .flat()
      .find((c) => c.claim_id === SAMPLE.claimId)!
      .anchors.find((a) => a.video_id === SAMPLE.lead.videoId)!;
    expect(sample.anchors[0].quote).toBe(source.quote);
  });

  it('lists exactly the chapters whose evidence cites the sample claim', () => {
    const citing = Object.entries(book1)
      .filter(([, claims]) => claims.some((c) => c.claim_id === SAMPLE.claimId))
      .map(([n]) => Number(n))
      .sort((a, b) => a - b);
    expect(committed.sample.chapters).toEqual(citing);
  });

  it('counts a claim as shared only when two or more chapters cite it', () => {
    const chaptersOf = new Map<string, Set<string>>();
    for (const [n, claims] of Object.entries(book1)) {
      for (const c of claims) chaptersOf.set(c.claim_id, (chaptersOf.get(c.claim_id) ?? new Set()).add(n));
    }
    const web = committed.webs.find((w) => w.book === 1)!;
    expect(web.claims).toBe(chaptersOf.size);
    expect(web.shared).toBe([...chaptersOf.values()].filter((s) => s.size > 1).length);
  });

  it('shows only panel dimensions the last run actually scored', () => {
    for (const d of committed.panel.dims) {
      expect(d.paragraphs).toBeGreaterThan(0);
    }
    expect(committed.panel.dims.map((d) => d.id)).not.toContain('voice');
  });
});
