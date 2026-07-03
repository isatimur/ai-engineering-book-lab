import { Link } from 'react-router-dom';
import { JsonLd } from '../components/JsonLd';
import { Seo } from '../components/Seo';
import { listEventLedgers, ledgerStats } from '../lib/eventLedgers';
import { ledgersIndexJsonLd } from '../lib/structuredData';

const talkThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

export const LedgersIndexPage = () => {
  const ledgers = listEventLedgers();
  const totalClaims = ledgers.reduce((sum, l) => sum + ledgerStats(l).claims, 0);

  return (
    <>
      <Seo
        title="Fact-checked ledgers — From Copilot to Colleague"
        description="Source-anchored event ledgers from the book corpus — every claim clicks to the exact second of the talk."
        path="/ledgers"
      />
      <JsonLd data={ledgersIndexJsonLd()} />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/" className="hover:text-[var(--color-ink)]">
            ← Home
          </Link>
          <span>Books of truth</span>
          <Link to="/read/graph" className="hover:text-[var(--color-ink)]">
            Book evidence graph
          </Link>
        </header>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            claims-ledger · event ledgers
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Fact-checked ledgers
          </h1>
          <p className="font-serif text-lg text-[var(--color-ink-muted)] leading-relaxed mb-4 max-w-2xl">
            Standalone claim ledgers with <code className="font-mono text-[13px]">yt://</code> anchors
            into the practitioner corpus. Same grammar as the book&apos;s{' '}
            <Link to="/read/graph" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
              evidence graph
            </Link>
            .
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-10">
            {ledgers.length} ledgers · {totalClaims} claims · powered by{' '}
            <a
              href="https://github.com/isatimur/claims-ledger"
              className="underline underline-offset-2 hover:text-[var(--color-ink)]"
              rel="noopener noreferrer"
              target="_blank"
            >
              claims-ledger
            </a>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {ledgers.map((ledger) => {
              const stats = ledgerStats(ledger);
              return (
                <Link
                  key={ledger.slug}
                  to={`/ledgers/${ledger.slug}`}
                  className="group flex flex-col border border-[var(--color-border)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors overflow-hidden"
                >
                  <div className="relative aspect-video bg-[var(--color-border)]/30 overflow-hidden">
                    <img
                      src={talkThumbnail(ledger.videoId)}
                      alt=""
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    {ledger.sample && (
                      <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest border border-current bg-[var(--color-paper)]/90 text-[var(--color-ink)] px-2 py-0.5">
                        Sample
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-serif text-lg leading-snug mb-2 group-hover:text-[var(--color-paper)]">
                      {ledger.title}
                    </h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-70 mb-3">
                      {ledger.subtitle}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-70 mt-auto">
                      {stats.claims} claims · {stats.strong} strong · {stats.anchors} anchors
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <p className="font-serif text-base text-[var(--color-ink-muted)] mb-4 max-w-xl">
              Ship the same grammar in your repo — CI fails when claim anchors go stale.
            </p>
            <a
              href="https://github.com/isatimur/claims-ledger"
              className="inline-block font-mono text-[11px] uppercase tracking-widest border border-[var(--color-border)] px-4 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              Open claims-ledger →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
