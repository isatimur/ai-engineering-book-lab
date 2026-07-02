import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import stats from '../data/stats.json';
import { chapters } from '../data/bookChapters';
import { graphUrl } from '../lib/chapterLinks';
import { buildEvidenceLedger } from '../lib/evidenceLedger';
import { getEvidenceGraph } from '../lib/evidenceGraph';
import { DIM_LABELS, DIMS, hasJudgeData, judgeScores } from '../lib/judgeScores';

type StatsData = typeof stats;

const fmt = (n: number) => n.toLocaleString();

const supportColor = (level: string) => {
  switch (level) {
    case 'strong':
      return 'var(--color-judge-strong, #15803d)';
    case 'moderate':
      return 'var(--color-judge-moderate, #6b7280)';
    case 'tentative':
      return 'var(--color-judge-weak, #b45309)';
    default:
      return 'var(--color-ink-muted)';
  }
};

const MetricTable = ({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number | string }[];
}) => (
  <div className="border border-[var(--color-border)]">
    <h3 className="border-b border-[var(--color-border)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
      {title}
    </h3>
    <table className="w-full text-left">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-[var(--color-border)] last:border-b-0">
            <th className="px-4 py-2.5 font-sans text-sm font-normal text-[var(--color-ink-muted)]">
              {row.label}
            </th>
            <td className="px-4 py-2.5 text-right font-mono text-sm tabular-nums">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CorpusStats = ({ data }: { data: StatsData }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <MetricTable
      title="Source corpus"
      rows={[{ label: 'Videos ingested (AI Engineer YT)', value: fmt(data.corpus.videos) }]}
    />
    <MetricTable
      title="Synthesis layer"
      rows={[
        { label: 'Themes', value: data.synthesis.themes },
        { label: 'People profiled', value: data.synthesis.people },
        { label: 'Concepts (internal)', value: data.synthesis.concepts },
        { label: 'Concepts (public-safe)', value: data.synthesis.concepts_public },
        { label: 'Chapter drafts', value: data.synthesis.drafting_files },
      ]}
    />
    <MetricTable
      title="Evidence layer"
      rows={[
        { label: 'Claims in ledger', value: data.claims.total },
        { label: 'Strong support', value: data.claims.strong },
        { label: 'Moderate support', value: data.claims.moderate },
        { label: 'Tentative support', value: data.claims.tentative },
        { label: 'Source anchors', value: data.anchors.total },
        { label: 'High-confidence anchors', value: data.anchors.high },
      ]}
    />
    <MetricTable
      title="Manuscript"
      rows={[
        { label: 'Total chapters', value: data.chapters.total },
        { label: 'Drafting', value: data.chapters.drafting },
        { label: 'Starter', value: data.chapters.starter },
        { label: 'Outlined', value: data.chapters.outlined },
      ]}
    />
    <MetricTable
      title="Diagrams"
      rows={[
        { label: 'Overview', value: data.diagrams.overview },
        { label: 'Chapter openers', value: data.diagrams.chapter_openers },
        { label: 'Concepts', value: data.diagrams.concepts },
        { label: 'Inline figures', value: data.diagrams.inline },
        { label: 'Maps', value: data.diagrams.maps },
        { label: 'Total diagrams', value: data.diagrams.total },
      ]}
    />
    <MetricTable
      title="Method"
      rows={[
        { label: 'Research passes', value: data.method.research_passes },
        { label: 'Agent programs', value: data.method.programs },
        { label: 'Bounded tasks', value: data.method.tasks },
        { label: 'Trackable artefacts (total)', value: fmt(data.total_artefacts) },
      ]}
    />
  </div>
);

const JudgeSummary = () => {
  if (!hasJudgeData()) return null;
  const run = judgeScores.run;
  const date = run.finished_at ? run.finished_at.slice(0, 10) : '—';
  return (
    <div className="border border-[var(--color-border)] p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          Latest MASH judge run
        </h3>
        <Link to="/quality" className="font-mono text-[10px] uppercase tracking-widest hover:opacity-60">
          Full scorecards →
        </Link>
      </div>
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
        {run.run_id} · {date}
        {run.partial ? ' · partial run' : ''}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {DIMS.map((dim) => (
          <div key={dim} className="border border-[var(--color-border)] px-3 py-2 text-center">
            <div className="font-serif text-2xl tabular-nums">
              {judgeScores.book[dim] != null ? Math.round(judgeScores.book[dim]!) : '—'}
            </div>
            <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              {DIM_LABELS[dim]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EvidenceReference = () => {
  const ledger = useMemo(() => buildEvidenceLedger(), []);
  const graphStats = useMemo(() => getEvidenceGraph().stats, []);
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [supportFilter, setSupportFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return ledger.filter((row) => {
      if (chapterFilter !== 'all' && row.chapterNumber !== chapterFilter) return false;
      if (supportFilter !== 'all' && row.supportLevel !== supportFilter) return false;
      return true;
    });
  }, [ledger, chapterFilter, supportFilter]);

  const generatedAt = stats.generated_at
    ? new Date(stats.generated_at).toISOString().slice(0, 10)
    : '—';

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="Evidence & Metrics — From Copilot to Colleague"
        description="Citable claims ledger, corpus statistics, and judge metrics for the source-backed AI engineering book."
        path="/evidence"
      />
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
        <Link to="/" className="hover:opacity-60">
          ← Catalogue
        </Link>
        <span>From Copilot to Colleague · Evidence</span>
        <Link to="/read/graph" className="hover:opacity-60">
          Graph →
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)]">
          Reference · generated {generatedAt}
        </p>
        <h1 className="mb-3 font-serif text-4xl italic leading-none md:text-5xl">
          Evidence &amp; metrics
        </h1>
        <p className="mb-10 max-w-3xl font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
          Single source of truth for what this book is built on — corpus counts from{' '}
          <code className="font-mono text-[11px]">stats.json</code> (mirrors repo{' '}
          <code className="font-mono text-[11px]">STATS.md</code>), the claims ledger from{' '}
          <code className="font-mono text-[11px]">evidence.json</code>, and MASH judge rollups.
          Cite a claim as <span className="font-mono text-[11px]">claims#N</span> and open it in the{' '}
          <Link to="/read/graph" className="underline hover:opacity-70">
            evidence graph
          </Link>{' '}
          for timestamp anchors.
        </p>

        <div className="mb-12 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest">
          <Link
            to="/read/graph"
            className="border border-[var(--color-border)] px-4 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Open evidence graph
          </Link>
          <Link
            to="/quality"
            className="border border-[var(--color-border)] px-4 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Judge scorecards
          </Link>
          <a
            href="https://github.com/isatimur/ai-engineering-book-lab/blob/main/STATS.md"
            className="border border-[var(--color-border)] px-4 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            STATS.md (repo)
          </a>
        </div>

        <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          Corpus &amp; pipeline metrics
        </h2>
        <CorpusStats data={stats} />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-[10px] uppercase tracking-widest">
          <div className="border border-[var(--color-border)] px-4 py-3 text-center">
            <div className="font-serif text-2xl normal-case">{graphStats.speakers}</div>
            <div className="mt-1 text-[var(--color-ink-muted)]">Practitioners cited</div>
          </div>
          <div className="border border-[var(--color-border)] px-4 py-3 text-center">
            <div className="font-serif text-2xl normal-case">{graphStats.videos}</div>
            <div className="mt-1 text-[var(--color-ink-muted)]">Source videos in graph</div>
          </div>
          <div className="border border-[var(--color-border)] px-4 py-3 text-center">
            <div className="font-serif text-2xl normal-case">{stats.claims.total}</div>
            <div className="mt-1 text-[var(--color-ink-muted)]">Ledger claims</div>
          </div>
          <div className="border border-[var(--color-border)] px-4 py-3 text-center">
            <div className="font-serif text-2xl normal-case">{stats.anchors.total}</div>
            <div className="mt-1 text-[var(--color-ink-muted)]">Timestamp anchors</div>
          </div>
        </div>

        <div className="mt-12">
          <JudgeSummary />
        </div>

        <h2 className="mb-4 mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          Claims ledger
        </h2>
        <p className="mb-6 max-w-2xl font-sans text-sm text-[var(--color-ink-muted)]">
          Every book claim with support level and anchor count. Filter by chapter or support
          band; click a row to inspect sources in the graph.
        </p>

        <div className="mb-6 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest">
          <label className="flex items-center gap-2">
            Chapter
            <select
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              className="border border-[var(--color-border)] bg-[var(--color-paper)] px-2 py-1 normal-case tracking-normal"
            >
              <option value="all">All</option>
              {chapters.map((ch) => (
                <option key={ch.number} value={ch.number}>
                  {ch.number} — {ch.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Support
            <select
              value={supportFilter}
              onChange={(e) => setSupportFilter(e.target.value)}
              className="border border-[var(--color-border)] bg-[var(--color-paper)] px-2 py-1 normal-case tracking-normal"
            >
              <option value="all">All</option>
              <option value="strong">Strong</option>
              <option value="moderate">Moderate</option>
              <option value="tentative">Tentative</option>
            </select>
          </label>
          <span className="self-center text-[var(--color-ink-muted)]">
            {filtered.length} of {ledger.length} claims
          </span>
        </div>

        <div className="overflow-x-auto border border-[var(--color-border)]">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                <th className="px-4 py-3">Claim</th>
                <th className="px-4 py-3">Ch</th>
                <th className="px-4 py-3">Statement</th>
                <th className="px-4 py-3 text-center">Support</th>
                <th className="px-4 py-3 text-center">Anchors</th>
                <th className="px-4 py-3 text-center">Speakers</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.claimId}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-ink)]/[0.02]"
                >
                  <td className="px-4 py-3 font-mono text-[11px] whitespace-nowrap">
                    <Link
                      to={`${graphUrl(row.chapterNumber)}&claim=${encodeURIComponent(row.claimId)}`}
                      className="hover:underline"
                    >
                      {row.claimId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] whitespace-nowrap">{row.chapterNumber}</td>
                  <td className="px-4 py-3 font-serif text-sm leading-snug max-w-md">{row.text}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="inline-block border px-2 py-0.5 font-mono text-[9px] uppercase"
                      style={{
                        borderColor: supportColor(row.supportLevel),
                        color: supportColor(row.supportLevel),
                      }}
                    >
                      {row.supportLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm tabular-nums">{row.anchorCount}</td>
                  <td className="px-4 py-3 text-center font-mono text-sm tabular-nums">{row.speakerCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] max-w-3xl leading-relaxed">
          Stats regenerate via 99_Meta/scripts/build_stats.py; evidence.json via
          99_Meta/scripts/anchor/build_evidence.py from the Claims Ledger. Last stats build:{' '}
          {generatedAt}.
        </p>
      </section>
    </div>
  );
};
