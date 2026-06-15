import evidenceData from '../evidence.json';
import { chapters } from '../data/bookChapters';
import type { EvidenceClaim } from './evidenceTypes';

const evidence = evidenceData as Record<string, EvidenceClaim[]>;

export type LedgerRow = {
  claimId: string;
  chapterNumber: string;
  chapterTitle: string;
  text: string;
  supportLevel: string;
  anchorCount: number;
  speakerCount: number;
};

const uniqueSpeakers = (claim: EvidenceClaim): number => {
  const names = new Set<string>();
  for (const anchor of claim.anchors) {
    const name = anchor.label.replace(/^#\d+\s*—\s*/, '').trim();
    if (name) names.add(name);
  }
  return names.size;
};

/** Flatten evidence.json into citation-ready ledger rows, sorted by chapter then claim id. */
export const buildEvidenceLedger = (): LedgerRow[] => {
  const rows: LedgerRow[] = [];

  for (const chapter of chapters) {
    const key = String(parseInt(chapter.number, 10));
    const claims = evidence[key] ?? [];
    for (const claim of claims) {
      rows.push({
        claimId: claim.claim_id,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        text: claim.text,
        supportLevel: claim.support_level,
        anchorCount: claim.anchors.length,
        speakerCount: uniqueSpeakers(claim),
      });
    }
  }

  return rows.sort((a, b) => {
    const ch = a.chapterNumber.localeCompare(b.chapterNumber);
    if (ch !== 0) return ch;
    return a.claimId.localeCompare(b.claimId, undefined, { numeric: true });
  });
};

export const ledgerByChapter = (rows: LedgerRow[]): Map<string, LedgerRow[]> => {
  const map = new Map<string, LedgerRow[]>();
  for (const row of rows) {
    const list = map.get(row.chapterNumber) ?? [];
    list.push(row);
    map.set(row.chapterNumber, list);
  }
  return map;
};
