import { Seo } from '../components/Seo';
import { DIMENSIONS } from '../data/assessment';

// Per-dimension discussion prompts for the facilitated session. Keyed by dimension id
// so they stay in lockstep with the assessment's five dimensions.
const PROMPTS: Record<string, string[]> = {
  delegation: [
    'Name one workflow where we still assume work moves at human speed. What would it take to close it?',
    'Where do we use AI as inline autocomplete when we could be delegating a whole unit of work?',
    'Who outside engineering could start real work with agents if we let them?',
  ],
  evals: [
    'What do our dashboards actually count — activity (PRs, lines) or outcomes (rework, unreverted ships)?',
    'If an agent silently got worse this month, how would we find out, and how long would it take?',
    'Which one high-stakes output deserves an automated eval on the path to production first?',
  ],
  context: [
    'What institutional knowledge still lives only in senior people’s heads?',
    'Are we improving retrieval quality, or just giving agents more raw data?',
    'Could we trace what context produced a given agent output if we had to?',
  ],
  governance: [
    'Do our agents run with scoped, time-limited credentials — or standing human-inherited access?',
    'For our riskiest agent action, where exactly does a human re-enter, and is that calibrated to the stakes?',
    'What is the lightest governance that would earn us the trust to move this pilot to production?',
  ],
  org: [
    'Is review capacity resourced as the throughput limit of the org, or treated as a QA afterthought?',
    'Where do two people’s agent work first meet — in a shared plan, or at the merge?',
    'Who owns the judgment layer: deciding which of the many cheap artifacts is worth shipping?',
  ],
};

const Header = () => (
  <header className="no-print flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <a href="/" className="hover:opacity-60">← Catalogue</a>
    <span>From Copilot to Colleague · Workshop</span>
    <a href="/assess" className="hover:opacity-60">Assess →</a>
  </header>
);

export const Workshop = () => {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="The AI-Native Team Workshop — From Copilot to Colleague"
        description="A printable, facilitator-ready workshop for engineering leaders to assess and discuss their organization's AI-native readiness across five dimensions."
        path="/workshop"
        type="article"
      />
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          Workshop in a box · ~90 minutes · 4–12 people
        </p>
        <h1 className="mb-6 font-serif text-4xl italic leading-tight md:text-5xl">
          The AI-Native Team Workshop
        </h1>
        <p className="mb-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-ink-muted)]">
          A facilitated session for an engineering leadership team to locate itself honestly
          on the path to an AI-native operating model — and leave with the one structural
          decision worth making next. Print this page (it formats cleanly) and run it as-is.
        </p>

        <div className="no-print mb-12 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="border border-[var(--color-ink)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            Print / save as PDF
          </button>
          <a
            href="/assess"
            className="border border-[var(--color-border)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-[var(--color-ink)]"
          >
            Take the assessment first →
          </a>
        </div>

        {/* Warm-up */}
        <div className="border-t border-[var(--color-border)] py-8">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            00 · Warm-up (10 min)
          </h2>
          <p className="font-serif text-lg leading-snug">
            Go around the room. Each person finishes the sentence: &ldquo;We use AI, but we are
            not yet AI-native, because&hellip;&rdquo; Capture the answers where everyone can see
            them. The patterns in this list are your real agenda.
          </p>
        </div>

        {/* Framework intro */}
        <div className="border-t border-[var(--color-border)] py-8">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            01 · The five dimensions (10 min)
          </h2>
          <p className="mb-4 font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
            AI-native is a destination, not a toggle. Progress shows up across five dimensions.
            The facilitator reads each aloud; the team is only orienting here, not scoring yet.
          </p>
          <ol className="list-none space-y-2">
            {DIMENSIONS.map((d, i) => (
              <li key={d.id} className="flex gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                  0{i + 1}
                </span>
                <span>
                  <strong className="font-serif">{d.label}.</strong>{' '}
                  <span className="font-sans text-sm text-[var(--color-ink-muted)]">{d.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Per-dimension discussion */}
        <div className="border-t border-[var(--color-border)] py-8">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            02 · Dimension by dimension (~10 min each)
          </h2>
          <p className="mb-6 font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
            For each dimension: a quick gut-check (early / developing / advanced), then the three
            prompts. The goal is not consensus on a number — it is surfacing the one honest gap.
          </p>
          <div className="space-y-8">
            {DIMENSIONS.map((d, i) => (
              <div key={d.id} className="break-inside-avoid border border-[var(--color-border)] p-6">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-2xl italic">{d.label}</h3>
                </div>
                <ul className="list-none space-y-3">
                  {(PROMPTS[d.id] ?? []).map((prompt, k) => (
                    <li key={k} className="flex gap-3 font-serif leading-snug">
                      <span className="text-[var(--color-ink-muted)]">{k + 1}.</span>
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={d.chapterPath}
                  className="no-print mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.12em] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-ink)]"
                >
                  Source: {d.chapterRef} →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Close */}
        <div className="border-t border-[var(--color-border)] py-8">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            03 · The one decision (15 min)
          </h2>
          <p className="font-serif text-lg leading-snug">
            Phase transitions are governance events, not capability events — an org moves up a
            level because someone made a structural decision, not because the models got better.
            Pick the single weakest dimension and name one structural change you will own this
            quarter: a path hardened, a convention written down, a review system built, a
            credential scope designed. Assign it. That is the workshop&rsquo;s only deliverable.
          </p>
        </div>

        <p className="no-print mt-8 font-sans text-sm text-[var(--color-ink-muted)]">
          Want a per-person profile to anchor the discussion? Have everyone{' '}
          <a href="/assess" className="underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-ink)]">
            take the 10-minute assessment
          </a>{' '}
          before the session.
        </p>
      </section>
    </div>
  );
};
