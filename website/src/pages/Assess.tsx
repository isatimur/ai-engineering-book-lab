import { useState } from 'react';
import { Seo } from '../components/Seo';
import { QuestionCard } from '../components/assessment/QuestionCard';
import { RadarChart } from '../components/assessment/RadarChart';
import {
  DIMENSIONS,
  BAND_INFO,
  computeResult,
  questionsForDimension,
  type Answers,
  type Band,
} from '../data/assessment';

type Phase = 'intro' | number | 'results';

const bandColor = (band: Band): string =>
  band === 'advanced'
    ? 'var(--color-ink)'
    : band === 'developing'
      ? 'color-mix(in srgb, var(--color-ink) 65%, var(--color-paper))'
      : 'var(--color-ink-muted)';

const scrollTop = () => {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
};

const Header = () => (
  <header className="no-print flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <a href="/" className="hover:opacity-60">← Catalogue</a>
    <span>From Copilot to Colleague · Readiness</span>
    <a href="/read/09-ai-native-org" className="hover:opacity-60">Chapter 9 →</a>
  </header>
);

const Intro = ({ onBegin }: { onBegin: () => void }) => (
  <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
      AI-Native Engineering Readiness
    </p>
    <h1 className="mb-6 font-serif text-4xl italic leading-tight md:text-5xl">
      How AI-native is your engineering organization?
    </h1>
    <p className="mb-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-ink-muted)]">
      Adopting AI and becoming AI-native are different things with different price
      tags. This assessment scores your organization across the five dimensions the
      book argues separate companies that turn cheap generation into trusted
      throughput from those that just generate more. It takes about ten minutes, and
      every result links back to the relevant chapter.
    </p>
    <ol className="mb-10 list-none space-y-3 border-y border-[var(--color-border)] py-8">
      {DIMENSIONS.map((d, i) => (
        <li key={d.id} className="flex gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            0{i + 1}
          </span>
          <div>
            <div className="font-serif text-lg">{d.label}</div>
            <div className="font-sans text-sm text-[var(--color-ink-muted)]">{d.description}</div>
          </div>
        </li>
      ))}
    </ol>
    <button
      type="button"
      onClick={onBegin}
      className="border border-[var(--color-ink)] px-8 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
    >
      Begin assessment →
    </button>
    <p className="mt-4 font-sans text-xs text-[var(--color-ink-muted)]">
      30 statements · 5 dimensions · ~10 minutes · nothing is stored or sent anywhere.
    </p>
  </section>
);

const DimensionStep = ({
  index,
  answers,
  setAnswer,
  onNext,
  onBack,
}: {
  index: number;
  answers: Answers;
  setAnswer: (id: string, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const dim = DIMENSIONS[index];
  const questions = questionsForDimension(dim.id);
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const isLast = index === DIMENSIONS.length - 1;

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 lg:px-12">
      {/* Progress */}
      <div className="no-print mb-8 flex items-center gap-2">
        {DIMENSIONS.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1"
            style={{ background: i <= index ? 'var(--color-ink)' : 'var(--color-border)' }}
          />
        ))}
      </div>

      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        Dimension {index + 1} of {DIMENSIONS.length}
      </p>
      <h2 className="mb-2 font-serif text-3xl italic leading-tight">{dim.label}</h2>
      <p className="mb-2 max-w-2xl font-sans text-sm text-[var(--color-ink-muted)]">{dim.description}</p>
      <p className="mb-4 font-sans text-xs text-[var(--color-ink-muted)]">
        Rate each statement by how true it is of your organization today.
      </p>

      <div className="mb-8">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            value={answers[q.id]}
            onChange={(v) => setAnswer(q.id, v)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!allAnswered}
          className="border px-7 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors"
          style={{
            borderColor: allAnswered ? 'var(--color-ink)' : 'var(--color-border)',
            color: allAnswered ? 'var(--color-ink)' : 'var(--color-ink-muted)',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
          }}
        >
          {isLast ? 'See results →' : 'Next dimension →'}
        </button>
      </div>
      {!allAnswered && (
        <p className="mt-3 text-right font-sans text-xs text-[var(--color-ink-muted)]">
          Answer all six to continue.
        </p>
      )}
    </section>
  );
};

const Results = ({ answers, onRetake }: { answers: Answers; onRetake: () => void }) => {
  const result = computeResult(answers);
  const overallBand = BAND_INFO[result.overallBand];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        Your readiness profile
      </p>
      <div className="mb-10 flex flex-wrap items-end gap-x-8 gap-y-2">
        <div className="font-serif text-6xl leading-none">{result.overall}</div>
        <div className="pb-1">
          <div className="font-serif text-2xl italic" style={{ color: bandColor(result.overallBand) }}>
            {overallBand.label}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            overall · 0–100 across five dimensions
          </div>
        </div>
      </div>

      <div className="mb-12">
        <RadarChart points={result.dimensions.map((d) => ({ label: d.dimension.label, score: d.score }))} />
      </div>

      <div className="space-y-px border-t border-[var(--color-border)]">
        {result.dimensions.map((d) => {
          const info = BAND_INFO[d.band];
          return (
            <div key={d.dimension.id} className="border-b border-[var(--color-border)] py-6">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-xl">{d.dimension.label}</h3>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl" style={{ color: bandColor(d.band) }}>
                    {d.score}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                    {info.label}
                  </span>
                </div>
              </div>
              <p className="mb-3 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
                {info.recommendation[d.dimension.id]}
              </p>
              <a
                href={d.dimension.chapterPath}
                className="font-mono text-[10px] uppercase tracking-[0.12em] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-ink)]"
              >
                Read {d.dimension.chapterRef} →
              </a>
            </div>
          );
        })}
      </div>

      <div className="no-print mt-12 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => typeof window !== 'undefined' && window.print()}
          className="border border-[var(--color-ink)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
        >
          Save / print as PDF
        </button>
        <a
          href="/read"
          className="border border-[var(--color-border)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-[var(--color-ink)]"
        >
          Read the book →
        </a>
        <button
          type="button"
          onClick={onRetake}
          className="px-2 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          Retake
        </button>
      </div>
    </section>
  );
};

export const Assess = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = (id: string, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));
  const go = (next: Phase) => {
    setPhase(next);
    scrollTop();
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="AI-Native Readiness Assessment — From Copilot to Colleague"
        description="A 10-minute assessment scoring your engineering organization across the five dimensions that separate AI adoption from AI-native operating models."
        path="/assess"
        type="website"
      />
      <Header />

      {phase === 'intro' && <Intro onBegin={() => go(0)} />}

      {typeof phase === 'number' && (
        <DimensionStep
          index={phase}
          answers={answers}
          setAnswer={setAnswer}
          onBack={() => go(phase === 0 ? 'intro' : phase - 1)}
          onNext={() => go(phase === DIMENSIONS.length - 1 ? 'results' : phase + 1)}
        />
      )}

      {phase === 'results' && <Results answers={answers} onRetake={() => go('intro')} />}
    </div>
  );
};
