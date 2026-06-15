import { describe, expect, it } from 'vitest';
import { buildEvidenceLedger, ledgerByChapter } from './evidenceLedger';

describe('evidenceLedger', () => {
  it('builds rows aligned with stats.json claim count', () => {
    const rows = buildEvidenceLedger();
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.claimId.startsWith('claims#'))).toBe(true);
    expect(rows.every((r) => r.anchorCount > 0)).toBe(true);
  });

  it('groups rows by chapter without loss', () => {
    const rows = buildEvidenceLedger();
    const grouped = ledgerByChapter(rows);
    let total = 0;
    for (const list of grouped.values()) total += list.length;
    expect(total).toBe(rows.length);
  });
});
