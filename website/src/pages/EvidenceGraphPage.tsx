import { lazy, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { chapters } from '../data/bookChapters';
import { getEvidenceGraph } from '../lib/evidenceGraph';
import stats from '../data/stats.json';

const EvidenceGraphView = lazy(() =>
  import('../components/evidence/EvidenceGraphView').then((m) => ({ default: m.EvidenceGraphView })),
);

const EvidenceGraphContent = () => {
  const [params] = useSearchParams();
  const chapter = params.get('chapter') ?? undefined;
  return <EvidenceGraphView chapterNumber={chapter} />;
};

export const EvidenceGraphPage = () => {
  const graphStats = getEvidenceGraph().stats;

  return (
    <>
      <Seo
        title="Evidence Graph — From Copilot to Colleague"
        description="Interactive map of book claims, practitioner sources, and video anchors across all chapters."
        path="/read/graph"
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/read" className="hover:text-[var(--color-ink)]">
            ← Reader
          </Link>
          <span>Evidence enrichment graph</span>
          <div className="flex gap-4">
            <a href="/experience/" className="hover:text-[var(--color-ink)]">
              3D Journey
            </a>
            <Link to="/visual-guide" className="hover:text-[var(--color-ink)]">
              Visual Guide
            </Link>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            Source-anchored synthesis
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4 max-w-3xl">
            How claims connect to practitioners and videos
          </h1>
          <p className="font-serif text-lg text-[var(--color-ink-muted)] max-w-2xl mb-8 leading-relaxed">
            Auto-generated from {stats.corpus.videos.toLocaleString()} mapped corpus videos and{' '}
            {graphStats.claims} book claims with {graphStats.anchors} timestamp anchors. Explore
            co-citations between practitioners quoted on the same claim.
          </p>

          <div className="mb-8 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
            <Link
              to="/read/graph"
              className="border border-[var(--color-border)] px-3 py-1.5 bg-[var(--color-ink)] text-[var(--color-paper)]"
            >
              Full book
            </Link>
            {chapters.map((ch) => (
              <Link
                key={ch.number}
                to={`/read/graph?chapter=${ch.number}`}
                className="border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
              >
                Ch {ch.number}
              </Link>
            ))}
          </div>

          <Suspense
            fallback={
              <div className="h-[560px] border border-[var(--color-border)] bg-[#F8F6F0] flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                Loading graph…
              </div>
            }
          >
            <EvidenceGraphContent />
          </Suspense>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] max-w-3xl leading-relaxed">
            Graph data is derived from src/evidence.json (built via 99_Meta/scripts/anchor/build_evidence.py).
            Regenerate evidence after ledger updates; the graph rebuilds automatically at runtime.
          </p>
        </div>
      </div>
    </>
  );
};
