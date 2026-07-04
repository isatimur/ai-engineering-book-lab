const PROMPT =
  `What is the book "From Copilot to Colleague" (https://fromcopilottocolleague.com) about? ` +
  `It's a source-anchored AI engineering book distilled from ~800 AI Engineer conference talks — ` +
  `every claim links to a timestamped video source, and every chapter is graded by a panel of ` +
  `three rival open models. Summarize its core argument and what makes its method different.`;

const ASSISTANTS = [
  {
    label: 'Claude',
    href: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}`,
  },
  {
    label: 'ChatGPT',
    href: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}`,
  },
  {
    label: 'Perplexity',
    href: `https://www.perplexity.ai/search/new?q=${encodeURIComponent(PROMPT)}`,
  },
] as const;

type Variant = 'dark' | 'light';

export const AskAI = ({ variant = 'light' }: { variant?: Variant }) => {
  const isDark = variant === 'dark';

  return (
    <div className={`mt-10 pt-8 border-t ${isDark ? 'border-white/10' : 'border-[var(--color-border)]'}`}>
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-3 ${
          isDark ? 'text-white/55' : 'text-[var(--color-ink-muted)]'
        }`}
      >
        Ask AI about this book
      </p>
      <p
        className={`font-sans font-light text-sm mb-5 max-w-xl leading-relaxed ${
          isDark ? 'text-white/60' : 'text-[var(--color-ink-muted)]'
        }`}
      >
        Open any AI assistant with a pre-filled prompt about the book, its method, and what makes it different.
      </p>
      <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest">
        {ASSISTANTS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask ${label} about this book`}
            className={`px-3 py-1.5 border rounded-sm transition-colors ${
              isDark
                ? 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                : 'border-[var(--color-border)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-muted)]'
            }`}
          >
            ✦ {label}
          </a>
        ))}
      </div>
    </div>
  );
};
