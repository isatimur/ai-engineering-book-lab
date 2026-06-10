import { Seo } from '../components/Seo';
import stats from '../data/stats.json';

const PERSONAS = [
  {
    label: 'Engineering leaders',
    who: 'CTOs, Staff+, VPs Eng at tech-native firms',
    pain: 'Your team ships AI products, but the operating model still assumes human-speed work. The bottleneck moved and the org chart did not.',
    path: 'Start with the maturity model and the review-as-throughput argument.',
    href: '/read/09-ai-native-org',
    cta: 'Read Chapter 9',
  },
  {
    label: 'Enterprise transformers',
    who: 'CTOs at large, often regulated organizations',
    pain: 'Pilots work in the demo and die in the sandbox. The thing they are waiting for is rarely a better model.',
    path: 'Start with governance-as-infrastructure: design the credential scope and audit trail that make production access defensible.',
    href: '/read/07-security',
    cta: 'Read Ch 6–7',
  },
  {
    label: 'AI platform teams',
    who: 'The 5–50 person team building the internal AI foundation',
    pain: 'Every team built its own AI setup. A dozen locally-optimized, globally-incompatible stacks, no shared context.',
    path: 'Start with context-as-infrastructure and the scale-stage silo failure mode.',
    href: '/read/05-context',
    cta: 'Read Chapter 5',
  },
];

const Header = () => (
  <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <a href="/" className="hover:opacity-60">← Catalogue</a>
    <span>From Copilot to Colleague · For Organizations</span>
    <a href="/assess" className="hover:opacity-60">Assess →</a>
  </header>
);

export const Enterprise = () => {
  const claims = stats?.claims?.total ?? 42;
  const anchors = stats?.anchors?.total ?? 166;
  const videos = stats?.corpus?.videos ?? 757;

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="For AI-Native Organizations — From Copilot to Colleague"
        description="A source-backed operating manual for moving from AI pilots to an AI-native engineering organization — maturity model, governance, and a 10-minute readiness assessment."
        path="/enterprise"
        type="website"
      />
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-12">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          For organizations going AI-native
        </p>
        <h1 className="mb-6 font-serif text-4xl italic leading-tight md:text-5xl">
          The winners of the next decade won&rsquo;t buy the most seats. They&rsquo;ll redesign the operating model.
        </h1>
        <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-ink-muted)]">
          Adopting AI and becoming AI-native are different sentences with different price
          tags. The first is a budget line. The second is a redesign of how work is created,
          reviewed, and trusted. This book is the operating manual for that redesign —
          drawn from {videos.toLocaleString()} talks by the people doing it, every claim
          tied to a timestamped source.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/assess"
            className="border border-[var(--color-ink)] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            Take the readiness assessment →
          </a>
          <a
            href="/read/09-ai-native-org"
            className="border border-[var(--color-border)] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-[var(--color-ink)]"
          >
            Read the AI-Native chapter
          </a>
        </div>
      </section>

      {/* Personas */}
      <section className="border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_3%,transparent)]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12">
          <h2 className="mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            Three entry points, one book
          </h2>
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {PERSONAS.map((p) => (
              <div key={p.label} className="flex flex-col border border-[var(--color-border)] p-6">
                <h3 className="font-serif text-2xl italic leading-tight">{p.label}</h3>
                <p className="mb-4 mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                  {p.who}
                </p>
                <p className="mb-4 font-sans text-sm leading-relaxed">{p.pain}</p>
                <p className="mb-6 font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {p.path}
                </p>
                <a
                  href={p.href}
                  className="mt-auto font-mono text-[10px] uppercase tracking-[0.12em] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-ink)]"
                >
                  {p.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
          <blockquote className="mb-12 border-l-2 border-[var(--color-ink)] pl-6 font-serif text-2xl italic leading-snug">
            &ldquo;A competitor can buy the same models and the same seats tomorrow. What it
            cannot buy overnight is an operating model in which institutional judgment has been
            packaged into reusable constraints. That is built, not purchased, and the building
            is the moat.&rdquo;
            <footer className="mt-4 font-mono text-[10px] uppercase not-italic tracking-[0.15em] text-[var(--color-ink-muted)]">
              — Chapter 9, The AI-Native Organization
            </footer>
          </blockquote>

          <div className="grid grid-cols-3 gap-6 border-y border-[var(--color-border)] py-8 text-center">
            <div>
              <div className="font-serif text-3xl leading-none">{claims}</div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                source-backed claims
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl leading-none">{anchors}</div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                timestamped anchors
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl leading-none">{videos.toLocaleString()}</div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                talks in the corpus
              </div>
            </div>
          </div>

          {/* Workshop + assessment CTAs */}
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/assess"
              className="border border-[var(--color-ink)] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            >
              Assess your organization →
            </a>
            <a
              href="/workshop"
              className="border border-[var(--color-border)] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-[var(--color-ink)]"
            >
              Run the team workshop
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
