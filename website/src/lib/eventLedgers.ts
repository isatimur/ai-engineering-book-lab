import harnessLedger from '../data/ledgers/openai-harness-engineering-2025.json';
import type { Anchor, EvidenceClaim } from './evidenceTypes';

export type EventLedgerClaim = EvidenceClaim & { caveats?: string };

export type EventLedger = {
  slug: string;
  title: string;
  subtitle: string;
  videoId: string;
  videoUrl: string;
  sample: boolean;
  sourceRepo: string;
  claims: EventLedgerClaim[];
};

const REGISTRY: Record<string, EventLedger> = {
  [harnessLedger.slug]: harnessLedger as EventLedger,
};

export const eventLedgerSlugs = () => Object.keys(REGISTRY);

export const getEventLedger = (slug: string): EventLedger | undefined => REGISTRY[slug];

export const listEventLedgers = (): EventLedger[] =>
  Object.values(REGISTRY).sort((a, b) => a.title.localeCompare(b.title));

export const ledgerStats = (ledger: EventLedger) => {
  const anchors = ledger.claims.reduce((sum, c) => sum + c.anchors.length, 0);
  const strong = ledger.claims.filter((c) => c.support_level === 'strong').length;
  const speakers = new Set<string>();
  for (const claim of ledger.claims) {
    for (const anchor of claim.anchors) {
      speakers.add(anchor.label);
    }
  }
  return {
    claims: ledger.claims.length,
    anchors,
    strong,
    speakers: speakers.size,
    videos: new Set(ledger.claims.flatMap((c) => c.anchors.map((a) => a.video_id))).size,
  };
};

/** Flatten ledger claims for table views (mirrors evidenceLedger rows). */
export type EventLedgerRow = {
  claimId: string;
  text: string;
  supportLevel: string;
  anchorCount: number;
  caveats?: string;
};

export const buildEventLedgerRows = (ledger: EventLedger): EventLedgerRow[] =>
  ledger.claims.map((claim) => ({
    claimId: claim.claim_id,
    text: claim.text,
    supportLevel: claim.support_level,
    anchorCount: claim.anchors.length,
    caveats: claim.caveats,
  }));

export type { Anchor };
