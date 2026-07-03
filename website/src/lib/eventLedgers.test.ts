import { describe, expect, it } from 'vitest';
import {
  buildEventLedgerRows,
  eventLedgerSlugs,
  getEventLedger,
  ledgerStats,
  listEventLedgers,
} from './eventLedgers';

describe('eventLedgers', () => {
  it('registers the harness engineering sample ledger', () => {
    expect(eventLedgerSlugs()).toContain('openai-harness-engineering-2025');
    const ledger = getEventLedger('openai-harness-engineering-2025');
    expect(ledger).toBeDefined();
    expect(ledger?.sample).toBe(true);
    expect(ledger?.claims).toHaveLength(5);
  });

  it('registers the Sean Grove new code sample ledger', () => {
    expect(eventLedgerSlugs()).toContain('sean-grove-new-code-2025');
    const ledger = getEventLedger('sean-grove-new-code-2025');
    expect(ledger).toBeDefined();
    expect(ledger?.sample).toBe(true);
    expect(ledger?.claims).toHaveLength(5);
  });

  it('computes stats and rows without loss', () => {
    const ledger = getEventLedger('openai-harness-engineering-2025');
    expect(ledger).toBeDefined();
    if (!ledger) return;

    const stats = ledgerStats(ledger);
    expect(stats.claims).toBe(5);
    expect(stats.anchors).toBe(5);
    expect(stats.videos).toBe(1);

    const rows = buildEventLedgerRows(ledger);
    expect(rows).toHaveLength(5);
    expect(rows.every((r) => r.anchorCount > 0)).toBe(true);
  });

  it('lists all registered ledgers', () => {
    expect(listEventLedgers().length).toBe(eventLedgerSlugs().length);
  });
});
