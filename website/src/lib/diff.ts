import { diffArrays, diffWords } from 'diff';

export type BlockOp = 'equal' | 'added' | 'removed' | 'changed';

export type DiffBlock = {
  op: BlockOp;
  // For equal/added/removed: `text` holds the block. For changed: both old/new.
  text?: string;
  oldText?: string;
  newText?: string;
};

export type WordPart = { value: string; added?: boolean; removed?: boolean };

/** Split chapter markdown into blocks the same way ChapterArticle renders them. */
export const toBlocks = (md: string): string[] =>
  md
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

/**
 * Paragraph-level diff over two markdown documents. Adjacent remove+add pairs are
 * coalesced into a single `changed` block so the UI can show an in-place edit (and
 * optionally a word-level diff) rather than a delete followed by an insert.
 */
export const diffMarkdown = (oldMd: string, newMd: string): DiffBlock[] => {
  const parts = diffArrays(toBlocks(oldMd), toBlocks(newMd));
  const out: DiffBlock[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const next = parts[i + 1];

    if (!part.added && !part.removed) {
      for (const text of part.value) out.push({ op: 'equal', text });
      continue;
    }

    // removed immediately followed by added => pair them up as `changed`
    if (part.removed && next?.added) {
      const removed = part.value;
      const added = next.value;
      const n = Math.max(removed.length, added.length);
      for (let k = 0; k < n; k++) {
        if (k < removed.length && k < added.length) {
          out.push({ op: 'changed', oldText: removed[k], newText: added[k] });
        } else if (k < removed.length) {
          out.push({ op: 'removed', text: removed[k] });
        } else {
          out.push({ op: 'added', text: added[k] });
        }
      }
      i++; // consumed `next`
      continue;
    }

    const op: BlockOp = part.added ? 'added' : 'removed';
    for (const text of part.value) out.push({ op, text });
  }

  return out;
};

/** Word-level diff within a single changed block, for inline highlighting. */
export const wordDiff = (oldText: string, newText: string): WordPart[] =>
  diffWords(oldText, newText).map((p) => ({
    value: p.value,
    added: p.added,
    removed: p.removed,
  }));

export type DiffStats = { added: number; removed: number; changed: number; equal: number };

export const diffStats = (blocks: DiffBlock[]): DiffStats => {
  const s: DiffStats = { added: 0, removed: 0, changed: 0, equal: 0 };
  for (const b of blocks) s[b.op] += 1;
  return s;
};
