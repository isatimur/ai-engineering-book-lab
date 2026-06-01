import { useEffect, useState } from 'react';
import { chapters } from '../data/bookChapters';
import {
  versionsForChapter,
  loadVersionContent,
  type ChapterVersion,
} from '../lib/versions';
import { DiffView } from '../components/diff/DiffView';

type Mode = 'unified' | 'split';

const titleFor = (num: string): string =>
  chapters.find((c) => c.number === num)?.title ?? `Chapter ${num}`;

export const Versions = () => {
  const allNums = chapters.map((c) => c.number).filter((n) => versionsForChapter(n).length > 0);
  const [chapterNum, setChapterNum] = useState(allNums[0] ?? '01');

  const versions = versionsForChapter(chapterNum);
  const newest = versions[0];
  const oldest = versions[versions.length - 1];

  const [oldId, setOldId] = useState(oldest?.version_id ?? '');
  const [newId, setNewId] = useState(newest?.version_id ?? '');
  const [mode, setMode] = useState<Mode>('unified');
  const [oldMd, setOldMd] = useState<string | null>(null);
  const [newMd, setNewMd] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Reset version selection when chapter changes.
  useEffect(() => {
    const vs = versionsForChapter(chapterNum);
    setOldId(vs[vs.length - 1]?.version_id ?? '');
    setNewId(vs[0]?.version_id ?? '');
  }, [chapterNum]);

  // Load both sides whenever the selection changes.
  useEffect(() => {
    let cancelled = false;
    const find = (id: string): ChapterVersion | undefined =>
      versions.find((v) => v.version_id === id);
    const a = find(oldId);
    const b = find(newId);
    if (!a || !b) return;
    setErr(null);
    setOldMd(null);
    setNewMd(null);
    Promise.all([loadVersionContent(a.content_ref), loadVersionContent(b.content_ref)])
      .then(([oa, ob]) => {
        if (!cancelled) {
          setOldMd(oa);
          setNewMd(ob);
        }
      })
      .catch((e) => !cancelled && setErr(String(e)));
    return () => {
      cancelled = true;
    };
  }, [oldId, newId, chapterNum]); // eslint-disable-line react-hooks/exhaustive-deps

  const vLabel = (v: ChapterVersion) =>
    `${v.date} · ${v.status} · ${v.wordCount}w · ${v.version_id}`;

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
        <a href="/" className="hover:opacity-60">← Catalogue</a>
        <span>From Copilot to Colleague · Versions &amp; Diffs</span>
        <a href="/read" className="hover:opacity-60">Reader →</a>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-12">
        <h1 className="mb-3 font-serif text-4xl italic leading-none md:text-5xl">
          What changed, and how it improved
        </h1>
        <p className="mb-12 max-w-2xl font-sans text-sm text-[var(--color-ink-muted)]">
          Every chapter&rsquo;s prose is versioned in git. Pick two versions to see
          exactly what the editorial passes added, removed, and rewrote.
        </p>

        <div className="mb-10 flex flex-wrap items-end gap-4 font-mono text-[10px] uppercase tracking-[0.15em]">
          <label className="flex flex-col gap-1">
            <span className="text-[var(--color-ink-muted)]">Chapter</span>
            <select
              value={chapterNum}
              onChange={(e) => setChapterNum(e.target.value)}
              className="border border-[var(--color-border)] bg-white px-3 py-2"
            >
              {allNums.map((n) => (
                <option key={n} value={n}>
                  {n} · {titleFor(n)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[var(--color-ink-muted)]">From</span>
            <select
              value={oldId}
              onChange={(e) => setOldId(e.target.value)}
              className="border border-[var(--color-border)] bg-white px-3 py-2"
            >
              {versions.map((v) => (
                <option key={v.version_id} value={v.version_id}>{vLabel(v)}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[var(--color-ink-muted)]">To</span>
            <select
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              className="border border-[var(--color-border)] bg-white px-3 py-2"
            >
              {versions.map((v) => (
                <option key={v.version_id} value={v.version_id}>{vLabel(v)}</option>
              ))}
            </select>
          </label>

          <div className="flex border border-[var(--color-border)]">
            {(['unified', 'split'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className="px-3 py-2"
                style={{
                  background: mode === m ? 'var(--color-ink)' : 'transparent',
                  color: mode === m ? 'var(--color-paper)' : 'var(--color-ink)',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {err && <p className="font-mono text-[11px] text-red-700">{err}</p>}
        {!err && (oldMd === null || newMd === null) && (
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            Loading diff…
          </p>
        )}
        {!err && oldMd !== null && newMd !== null && (
          <DiffView oldMd={oldMd} newMd={newMd} mode={mode} />
        )}
      </section>
    </div>
  );
};
