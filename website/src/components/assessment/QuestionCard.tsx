import { LIKERT, type Question } from '../../data/assessment';

export const QuestionCard = ({
  question,
  index,
  value,
  onChange,
}: {
  question: Question;
  index: number;
  value: number | undefined;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="border-b border-[var(--color-border)] py-7">
      <div className="mb-4 flex gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="font-serif text-lg leading-snug">{question.text}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={question.text}
        className="flex flex-col gap-2 sm:flex-row sm:gap-2"
      >
        {LIKERT.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className="flex-1 border px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.1em] transition-colors sm:text-center"
              style={{
                borderColor: selected ? 'var(--color-ink)' : 'var(--color-border)',
                background: selected
                  ? 'color-mix(in srgb, var(--color-pink) 45%, transparent)'
                  : 'transparent',
                color: selected ? 'var(--color-ink)' : 'var(--color-ink-muted)',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
