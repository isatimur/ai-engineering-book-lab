import { Fragment, useMemo, type ReactNode } from 'react';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { diffMarkdown, wordDiff, diffStats, type DiffBlock } from '../../lib/diff';

type Mode = 'unified' | 'split';

const opStyle: Record<string, { border: string; bg: string; tag: string }> = {
  added: { border: '#15803d', bg: 'rgba(21,128,61,0.06)', tag: 'added' },
  removed: { border: '#b91c1c', bg: 'rgba(185,28,28,0.06)', tag: 'removed' },
  changed: { border: '#b45309', bg: 'rgba(180,83,9,0.06)', tag: 'changed' },
  equal: { border: 'transparent', bg: 'transparent', tag: '' },
};

const Tag = ({ op }: { op: string }) => {
  if (op === 'equal') return null;
  const s = opStyle[op];
  return (
    <span
      className="mb-1 inline-block font-mono text-[9px] uppercase tracking-[0.15em]"
      style={{ color: s.border }}
    >
      {s.tag}
    </span>
  );
};

const WordLevel = ({ oldText, newText }: { oldText: string; newText: string }) => {
  const parts = useMemo(() => wordDiff(oldText, newText), [oldText, newText]);
  return (
    <p className="font-serif leading-[1.6]">
      {parts.map((p, i) => {
        if (p.removed)
          return (
            <span key={i} style={{ color: '#b91c1c', textDecoration: 'line-through' }}>
              {p.value}
            </span>
          );
        if (p.added)
          return (
            <span key={i} style={{ color: '#15803d' }}>
              {p.value}
            </span>
          );
        return <span key={i}>{p.value}</span>;
      })}
    </p>
  );
};

const Block = ({ b, mode }: { b: DiffBlock; mode: Mode }) => {
  const s = opStyle[b.op];
  const wrap = (children: ReactNode) => (
    <div
      className="book-reader-prose border-l-2 py-1 pl-4"
      style={{ borderColor: s.border, background: s.bg }}
    >
      <Tag op={b.op} />
      {children}
    </div>
  );

  if (b.op === 'equal') {
    return (
      <div className="book-reader-prose pl-4 text-[var(--color-ink-muted)]">
        <MarkdownBlock block={b.text ?? ''} />
      </div>
    );
  }
  if (b.op === 'changed') {
    if (mode === 'split') {
      return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="book-reader-prose border-l-2 py-1 pl-4" style={{ borderColor: opStyle.removed.border, background: opStyle.removed.bg }}>
            <Tag op="removed" />
            <MarkdownBlock block={b.oldText ?? ''} />
          </div>
          <div className="book-reader-prose border-l-2 py-1 pl-4" style={{ borderColor: opStyle.added.border, background: opStyle.added.bg }}>
            <Tag op="added" />
            <MarkdownBlock block={b.newText ?? ''} />
          </div>
        </div>
      );
    }
    // unified: word-level inline edit
    return wrap(<WordLevel oldText={b.oldText ?? ''} newText={b.newText ?? ''} />);
  }
  return wrap(<MarkdownBlock block={b.text ?? ''} />);
};

export const DiffView = ({
  oldMd,
  newMd,
  mode,
}: {
  oldMd: string;
  newMd: string;
  mode: Mode;
}) => {
  const blocks = useMemo(() => diffMarkdown(oldMd, newMd), [oldMd, newMd]);
  const stats = useMemo(() => diffStats(blocks), [blocks]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span style={{ color: opStyle.added.border }}>+{stats.added} added</span>
        <span style={{ color: opStyle.removed.border }}>−{stats.removed} removed</span>
        <span style={{ color: opStyle.changed.border }}>~{stats.changed} changed</span>
        <span>{stats.equal} unchanged</span>
      </div>
      <div className="space-y-3">
        {blocks.map((b, i) => (
          <Fragment key={i}>
            <Block b={b} mode={mode} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
