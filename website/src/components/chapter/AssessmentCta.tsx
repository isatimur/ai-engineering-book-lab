import { Link } from 'react-router-dom';

// Conversion prompt shown at the end of the AI-native-org chapter, bridging the
// reader into the readiness assessment. Rendered as a component (not in the
// chapter markdown) so the source-anchored prose, llms.txt, and read exports
// stay free of marketing copy.
export const AssessmentCta = () => (
  <aside className="max-w-3xl mx-auto px-6 pt-16">
    <div className="border border-[var(--color-ink)] p-8 bg-[color-mix(in_srgb,var(--color-pink)_18%,transparent)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-3">
        Apply this chapter
      </p>
      <h2 className="font-serif text-2xl md:text-3xl italic leading-tight mb-3">
        Where is your organization on the path to AI-native?
      </h2>
      <p className="font-sans text-sm leading-relaxed text-[var(--color-ink-muted)] mb-6 max-w-xl">
        The five-level maturity model from this chapter, turned into a 10-minute
        assessment. Score your org across delegation, evals, context, governance, and
        org design — and get back the one structural move worth making next.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/assess"
          className="border border-[var(--color-ink)] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
        >
          Take the readiness assessment →
        </Link>
        <Link
          to="/enterprise"
          className="px-2 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] self-center"
        >
          For organizations →
        </Link>
      </div>
    </div>
  </aside>
);
