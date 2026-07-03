import { Link, useParams } from 'react-router-dom';
import { JsonLd } from '../components/JsonLd';
import { Seo } from '../components/Seo';
import { AnchorCard } from '../components/evidence/AnchorCard';
import { getEventLedger, ledgerStats } from '../lib/eventLedgers';
import { eventLedgerJsonLd } from '../lib/structuredData';
import { LedgersIndexPage } from './LedgersIndexPage';

const supportBadge = (level: string) => {
  switch (level) {
    case 'strong':
      return 'border-green-800/30 text-green-900';
    case 'moderate':
      return 'border-amber-800/30 text-amber-900';
    default:
      return 'border-[var(--color-border)] text-[var(--color-ink-muted)]';
  }
};

export const EventLedgerPage = () => {
  const { slug = '' } = useParams();
  const ledger = getEventLedger(slug);

  if (!ledger) {
    return <LedgersIndexPage />;
  }

  const stats = ledgerStats(ledger);

  return (
    <>
      <Seo
        title={`${ledger.title} — Fact-checked ledger`}
        description={`${stats.claims} source-anchored claims from ${ledger.subtitle}. Interactive yt:// anchors.`}
        path={`/ledgers/${ledger.slug}`}
      />
      <JsonLd data={eventLedgerJsonLd(ledger)} />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/ledgers" className="hover:text-[var(--color-ink)]">
            ← All ledgers
          </Link>
          <span>Event ledger</span>
          <Link to="/read/graph" className="hover:text-[var(--color-ink)]">
            Book graph
          </Link>
        </header>

        <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {ledger.sample && (
            <p className="mb-6 border border-amber-800/25 bg-amber-50/80 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-amber-900">
              Sample ledger — honestly labeled; sourced from the book corpus, not live-extracted at publish time.
            </p>
          )}

          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            {ledger.subtitle}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-4">{ledger.title}</h1>

          <p className="font-serif text-base text-[var(--color-ink-muted)] leading-relaxed mb-6">
            {stats.claims} claims · {stats.anchors} timestamp anchors · {stats.speakers} speaker
            {stats.speakers === 1 ? '' : 's'}. Watch the full talk:{' '}
            <a
              href={ledger.videoUrl}
              className="underline underline-offset-2 hover:text-[var(--color-ink)]"
              rel="noopener noreferrer"
              target="_blank"
            >
              YouTube
            </a>
            .
          </p>

          <div className="mb-10 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
            <a
              href={ledger.sourceRepo}
              className="border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              claims-ledger source →
            </a>
            <Link
              to="/read/graph"
              className="border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              Book evidence graph →
            </Link>
            <Link
              to="/evidence"
              className="border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              Full book ledger →
            </Link>
          </div>

          <section className="border-t-2 border-[var(--color-ink)] pt-8">
            <h2 className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              Claims &amp; source anchors
            </h2>
            <div className="space-y-12">
              {ledger.claims.map((claim) => (
                <article key={claim.claim_id}>
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-serif text-base leading-[1.45]">{claim.text}</p>
                      {claim.caveats && (
                        <p className="mt-2 font-serif text-sm italic text-[var(--color-ink-muted)]">
                          {claim.caveats}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 self-start border px-2 py-1 font-mono text-[9px] uppercase tracking-widest ${supportBadge(claim.support_level)}`}
                    >
                      {claim.support_level}
                    </span>
                  </div>
                  <ul className="grid list-none gap-4 p-0 sm:grid-cols-1">
                    {claim.anchors.map((anchor, index) => (
                      <AnchorCard key={`${claim.claim_id}-${index}`} anchor={anchor} />
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <footer className="mt-12 pt-8 border-t border-[var(--color-border)] font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
            <p className="max-w-xl leading-relaxed normal-case tracking-normal font-sans text-sm">
              Powered by{' '}
              <a
                href="https://github.com/isatimur/claims-ledger"
                className="underline underline-offset-2 hover:text-[var(--color-ink)]"
                rel="noopener noreferrer"
                target="_blank"
              >
                claims-ledger
              </a>{' '}
              — machine-verifiable pointers with CI-gated verification. No anchor, no strong claim.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
