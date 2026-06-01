import { describe, it, expect } from 'vitest';
import { toBlocks, diffMarkdown, wordDiff, diffStats } from './diff';

describe('diff', () => {
  it('toBlocks splits on blank lines and trims', () => {
    expect(toBlocks('a\n\nb\n\n\n c ')).toEqual(['a', 'b', 'c']);
  });

  it('detects equal, added, removed, changed blocks', () => {
    const oldMd = 'Intro stays.\n\nThis line is removed.\n\nEdited slightly here.';
    const newMd = 'Intro stays.\n\nEdited substantially here now.\n\nA brand new tail.';
    const blocks = diffMarkdown(oldMd, newMd);
    const ops = blocks.map((b) => b.op);
    expect(ops).toContain('equal');
    expect(ops).toContain('changed'); // the removed+added pair coalesces
    // first block is the unchanged intro
    expect(blocks[0]).toMatchObject({ op: 'equal', text: 'Intro stays.' });
  });

  it('pure addition and pure removal are not mis-paired', () => {
    expect(diffMarkdown('a', 'a\n\nb').some((b) => b.op === 'added')).toBe(true);
    expect(diffMarkdown('a\n\nb', 'a').some((b) => b.op === 'removed')).toBe(true);
  });

  it('wordDiff flags added and removed words', () => {
    const parts = wordDiff('the quick fox', 'the slow fox');
    expect(parts.some((p) => p.removed && p.value.includes('quick'))).toBe(true);
    expect(parts.some((p) => p.added && p.value.includes('slow'))).toBe(true);
  });

  it('diffStats counts ops', () => {
    const blocks = diffMarkdown('a\n\nb\n\nc', 'a\n\nB edited\n\nc\n\nd');
    const s = diffStats(blocks);
    expect(s.equal).toBeGreaterThanOrEqual(2);
    expect(s.added + s.changed).toBeGreaterThanOrEqual(1);
  });
});
