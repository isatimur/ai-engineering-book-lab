import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { listEventLedgers, ledgerStats } from '../lib/eventLedgers';

export const LedgersIndexPage = () => {
  const ledgers = listEventLedgers();

  return (
    <>
      <Seo
        title="Fact-checked ledgers — From Copilot to Colleague"
        description="Source-anchored event ledgers from the book corpus — every claim clicks to the exact second of the talk."
        path="/ledgers"
      />
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

        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            claims-ledger · event ledgers
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Fact-checked ledgers
          </h1>
          <p className="font-serif text-lg text-[var(--color-ink-muted)] leading-relaxed mb-10">
            Standalone claim ledgers with <code className="font-mono text-[13px]">yt://</code> anchors
            into the practitioner corpus. Same grammar as the book&apos;s{' '}
            <Link to="/read/graph" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
              evidence graph
            </Link>
            , published via{' '}
            <a
              href="https://github.com/isatimur/claims-ledger"
              className="underline underline-offset-2 hover:text-[var(--color-ink)]"
              rel="noopener noreferrer"
              target="_blank"
            >
              claims-ledger
            </a>
            .
          </p>

          <ul className="list-none p-0 space-y-4">
            {ledgers.map((ledger) => {
              const stats = ledgerStats(ledger);
              return (
                <li key={ledger.slug}>
                  <Link
                    to={`/ledgers/${ledger.slug}`}
                    className="block border border-[var(--color-border)] p-5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <h2 className="font-serif text-xl leading-snug group-hover:text-[var(--color-paper)]">
                        {ledger.title}
                      </h2>
                      {ledger.sample && (
                        <span className="font-mono text-[9px] uppercase tracking-widest border border-current px-2 py-0.5 shrink-0">
                          Sample
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-70 mb-1">
                      {ledger.subtitle}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                      {stats.claims} claims · {stats.anchors} anchors · {stats.videos} video
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
