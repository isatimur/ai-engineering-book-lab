import type { CSSProperties, ReactNode } from 'react';
import { BOOK_ORIGIN } from '../../data/book';
import { chapters } from '../../data/bookChapters';
import explainer from '../../data/press-explainer.json';
import stats from '../../data/stats.json';
import { useReveal } from './useReveal';

/**
 * "How a book is made, layer by layer": one real claim from Book 1, followed
 * from the corpus to the reader. Every value comes from press-explainer.json
 * (generated from the evidence and judge files) or stats.json.
 */

const fmt = (n: number) => n.toLocaleString('en-US');
const { sample, panel } = explainer;
const lead = sample.anchors[0];
const leadTalk = Number(/^#(\d+)/.exec(lead.label)?.[1] ?? 1);
const speakerOf = (label: string) => label.replace(/^#\d+\s+—\s+/, '');
const leadSpeaker = speakerOf(lead.label);
const speakers = new Set(sample.anchors.map((a) => speakerOf(a.label).split(',')[0])).size;
const companies = new Set(sample.anchors.map((a) => speakerOf(a.label).split(', ')[1] ?? '')).size;
const clock = (ts: string) => ts.replace(/^00:/, '').replace(/\.\d+$/, '');
const chapterUrl = (n: number) => {
  const ch = chapters.find((c) => Number(c.number) === n);
  return ch ? `${BOOK_ORIGIN}/read/${ch.number}-${ch.slug}` : `${BOOK_ORIGIN}/read`;
};
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const Layer = ({ n, title, children, visual }: { n: string; title: string; children: ReactNode; visual: ReactNode }) => {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="hiw-layer relative grid grid-cols-1 gap-8 pb-20 pl-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:pl-16">
      <span aria-hidden className="hiw-rail absolute bottom-0 left-[15px] top-10 w-px bg-white/10 md:left-[19px]" />
      <span
        aria-hidden
        className="hiw-node absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#D9A55B]/50 bg-[#1F1D1B] font-mono text-[10px] text-[#D9A55B] md:h-10 md:w-10"
      >
        {n}
      </span>
      <div className="rv" style={delay(0)}>
        <h3 className="mb-4 font-serif text-2xl leading-snug text-white/90 md:text-3xl">{title}</h3>
        <div className="space-y-3 font-sans text-sm font-light leading-relaxed text-white/60">{children}</div>
      </div>
      <div aria-hidden className="rv min-w-0" style={delay(150)}>
        {visual}
      </div>
    </li>
  );
};

const Card = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`rounded-md border border-white/10 bg-white/[0.03] p-5 ${className}`} style={style}>
    {children}
  </div>
);

const Mono = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 ${className}`}>{children}</p>
);

/** 1,482 talks as one SVG pattern, not 1,482 elements. The sample talk glows. */
const CorpusField = () => {
  const cols = 57;
  const total = stats.corpus.videos;
  const fullRows = Math.floor(total / cols);
  const rest = total % cols;
  const rows = fullRows + (rest ? 1 : 0);
  const cell = 10;
  const i = leadTalk - 1;
  const cx = (i % cols) * cell + cell / 2;
  const cy = Math.floor(i / cols) * cell + cell / 2;
  return (
    <Card>
      <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} className="h-auto w-full">
        <defs>
          <pattern id="hiw-dot" width={cell} height={cell} patternUnits="userSpaceOnUse">
            <circle cx={cell / 2} cy={cell / 2} r={1.7} fill="rgba(249,247,241,0.32)" />
          </pattern>
        </defs>
        <g className="hiw-sweep">
          <rect width={cols * cell} height={fullRows * cell} fill="url(#hiw-dot)" />
          {rest > 0 && <rect y={fullRows * cell} width={rest * cell} height={cell} fill="url(#hiw-dot)" />}
        </g>
        <circle className="hiw-pulse" cx={cx} cy={cy} r={9} fill="none" stroke="#D9A55B" strokeWidth={1} />
        <circle cx={cx} cy={cy} r={3} fill="#D9A55B" />
      </svg>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <Mono>{fmt(total)} talks</Mono>
        <Mono className="text-[#D9A55B]/80">Talk #{leadTalk} · {leadSpeaker}</Mono>
      </div>
    </Card>
  );
};

/** A transcript window: the anchored line in full, its neighbours as bars. */
const TranscriptStrip = () => (
  <Card className="relative overflow-hidden">
    <Mono className="mb-4">
      Transcript · <span className="normal-case tracking-normal">{lead.videoId}</span>
    </Mono>
    <div className="space-y-3">
      {[88, 72, 94].map((w, k) => (
        <div key={`a${k}`} className="h-2 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
      ))}
      <div className="hiw-quote relative -mx-2 rounded px-2 py-2">
        <p className="relative font-serif text-lg italic leading-snug text-white/90">“{lead.quote}”</p>
      </div>
      {[80, 66].map((w, k) => (
        <div key={`b${k}`} className="h-2 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
      ))}
    </div>
    <div className="rv mt-5 flex flex-wrap gap-2 font-mono text-[10px] text-[#D9A55B]" style={delay(700)}>
      <span className="rounded-sm border border-[#D9A55B]/40 px-2 py-1">
        {lead.start} → {lead.end}
      </span>
      <span className="rounded-sm border border-white/15 px-2 py-1 text-white/55">confidence: {lead.confidence}</span>
    </div>
    <span className="hiw-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[#D9A55B]/10 to-transparent" />
  </Card>
);

/** Four anchors from four talks draw into one ledger entry. */
const ClaimMerge = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_48px_minmax(0,1.1fr)] sm:items-stretch sm:gap-0">
    <ul className="flex flex-col gap-2 sm:justify-between">
      {sample.anchors.map((a, k) => (
        <li
          key={a.videoId}
          className={`rv truncate rounded-sm border px-2 py-2 font-mono text-[10px] ${k === 0 ? 'border-[#D9A55B]/50 text-[#D9A55B]' : 'border-white/15 text-white/55'}`}
          style={delay(200 + k * 120)}
        >
          {speakerOf(a.label).split(',')[0]} · {clock(a.start)}
        </li>
      ))}
    </ul>
    {/* Close to the column's real 48 × ~170 px shape, so the dash animation stays whole. */}
    <svg viewBox="0 0 48 170" preserveAspectRatio="none" className="hidden h-full w-full sm:block">
      {sample.anchors.map((a, k) => {
        const y = ((k + 0.5) / sample.anchors.length) * 170;
        return (
          <path
            key={a.videoId}
            className="hiw-draw"
            style={delay(500 + k * 120)}
            d={`M0 ${y} C 24 ${y}, 24 85, 48 85`}
            fill="none"
            stroke={k === 0 ? '#D9A55B' : 'rgba(249,247,241,0.3)'}
            strokeWidth={1}
            pathLength={1}
          />
        );
      })}
    </svg>
    <Card className="rv flex flex-col justify-center" style={delay(900)}>
      <Mono className="mb-3">
        Claims ledger · claim {sample.number} · <span className="text-[#D9A55B]">{sample.support}</span>
      </Mono>
      <p className="font-serif text-lg leading-snug text-white/90">{sample.text}</p>
      <Mono className="mt-3">{sample.anchors.length} anchors</Mono>
    </Card>
  </div>
);

/** The claim lights the chapters that cite it. */
const ChapterSpines = () => {
  const n = chapters.length;
  return (
    <Card>
      <div className="mx-auto w-fit max-w-full truncate rounded-full border border-[#D9A55B]/50 px-4 py-1.5 font-mono text-[10px] text-[#D9A55B]">
        claim {sample.number}
      </div>
      {/* A uniform viewBox, so the dash animation measures the path as drawn. */}
      <svg viewBox="0 0 460 56" className="h-auto w-full">
        {sample.chapters.map((c, k) => {
          const cx = ((c - 0.5) / n) * 460;
          return (
            <path
              key={c}
              className="hiw-draw"
              style={delay(300 + k * 140)}
              d={`M230 0 C 230 34, ${cx} 22, ${cx} 56`}
              fill="none"
              stroke="#D9A55B"
              strokeWidth={1.2}
              pathLength={1}
            />
          );
        })}
      </svg>
      <ol className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {chapters.map((c) => {
          const n2 = Number(c.number);
          const on = sample.chapters.includes(n2);
          return (
            <li
              key={c.number}
              className={`hiw-spine flex h-24 items-end justify-center rounded-sm border pb-2 font-mono text-[10px] ${on ? 'hiw-spine-on border-[#D9A55B]/60 bg-[#D9A55B]/15 text-[#D9A55B]' : 'border-white/10 bg-white/[0.03] text-white/35'}`}
              style={delay(on ? 700 + sample.chapters.indexOf(n2) * 140 : 0)}
            >
              {n2}
            </li>
          );
        })}
      </ol>
      <Mono className="mt-4">Book 1 · chapters {sample.chapters.join(', ')} cite claim {sample.number}</Mono>
    </Card>
  );
};

const CHECKS = [
  'Every anchor resolves to its line in the transcript',
  'The site text matches the manuscript',
  'Each audiobook chapter is newer than its text',
  'Panel scores are newer than the last edit',
];

const CheckList = () => (
  <Card>
    <Mono className="mb-4">Before a release · run locally</Mono>
    <ul className="space-y-3">
      {CHECKS.map((c, k) => (
        <li key={c} className="rv flex items-start gap-3 font-sans text-sm text-white/75" style={delay(200 + k * 180)}>
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D9A55B]/60 text-[9px] text-[#D9A55B]">
            ✓
          </span>
          {c}
        </li>
      ))}
    </ul>
  </Card>
);

/** Three judges feed one median; the book-level scores grow in. */
const PanelBars = () => (
  <Card>
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {panel.models.map((m, k) => (
        <span key={m} className="rv rounded-sm border border-white/15 px-2 py-1 font-mono text-[10px] text-white/65" style={delay(150 + k * 120)}>
          {m}
        </span>
      ))}
      <span className="rv font-mono text-[10px] text-white/40" style={delay(550)}>
        →
      </span>
      <span className="rv rounded-sm border border-[#D9A55B]/50 px-2 py-1 font-mono text-[10px] text-[#D9A55B]" style={delay(650)}>
        median
      </span>
    </div>
    <ul className="space-y-4">
      {panel.dims.map((d, k) => (
        <li key={d.id}>
          <div className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] text-white/55">
            <span>{d.label}</span>
            <span className="text-white/85">{d.score.toFixed(1)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div className="hiw-bar h-full rounded-full bg-[#D9A55B]/80" style={{ width: `${d.score}%`, ...delay(800 + k * 150) }} />
          </div>
        </li>
      ))}
    </ul>
    <Mono className="mt-5">Book 1 · run {panel.runId}</Mono>
  </Card>
);

/** In the book, the claim opens its source at the second. */
const ReaderJump = () => (
  <Card>
    <p className="font-serif text-lg leading-snug text-white/85">
      <span className="hiw-underline">{sample.text}</span>
      <sup className="ml-0.5 font-mono text-[10px] text-[#D9A55B]">{sample.number}</sup>
    </p>
    <div className="rv mt-5 flex items-center gap-4 rounded-md border border-[#D9A55B]/40 bg-[#D9A55B]/[0.06] p-3" style={delay(500)}>
      <span className="hiw-play flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9A55B] text-sm text-[#1F1D1B]">▶</span>
      <div className="min-w-0">
        <p className="truncate font-sans text-sm text-white/85">{leadSpeaker}</p>
        <p className="font-mono text-[10px] text-white/50">talk #{leadTalk} · {clock(lead.start)}</p>
      </div>
    </div>
  </Card>
);

export const HowItWorks = () => (
  <div>
    <ol className="mx-auto max-w-5xl">
      <Layer n="01" title="One corpus" visual={<CorpusField />}>
        <p>
          Every book starts from one library: {fmt(stats.corpus.videos)} talks from AI Engineer conferences. Each talk is
          transcribed and read talk by talk.
        </p>
        <p>We follow one of them, talk #{leadTalk}, down through every layer.</p>
      </Layer>
      <Layer n="02" title="An anchor: the exact words, the exact second" visual={<TranscriptStrip />}>
        <p>
          When a speaker says something worth citing, we keep their words as they said them, with the time they start and
          end.
        </p>
        <p>That pair, quote and timestamp, is an anchor. It is the smallest unit of evidence in the press.</p>
      </Layer>
      <Layer n="03" title="A claim in the ledger" visual={<ClaimMerge />}>
        <p>
          Anchors from different talks back one claim. The claims ledger records each claim, its support level, and every
          anchor behind it.
        </p>
        <p>
          Claim {sample.number} has {sample.anchors.length} anchors from {speakers} speakers at {companies} companies.
          Every claim in the ledger carries at least one anchor.
        </p>
      </Layer>
      <Layer n="04" title="Chapters cite the ledger" visual={<ChapterSpines />}>
        <p>A chapter does not state facts on its own. It cites ledger entries.</p>
        <p>
          Claim {sample.number} appears in chapters {sample.chapters.slice(0, -1).join(', ')} and{' '}
          {sample.chapters[sample.chapters.length - 1]}. Each time it carries the same anchors, so one chapter cannot quote
          a talk differently from another.
        </p>
      </Layer>
      <Layer n="05" title="Checks against the sources" visual={<CheckList />}>
        <p>Before a release, scripts compare the book with its sources and stop on any drift.</p>
        <p>
          The checks run on the author's machine, because the transcripts stay out of the public repository.
        </p>
      </Layer>
      <Layer n="06" title="A rival panel" visual={<PanelBars />}>
        <p>
          Three open models from rival labs score each paragraph against the same rubric. The book shows their median, so
          no single model sets the score.
        </p>
        <p>The scorecards, and the weakest paragraphs they found, are public.</p>
      </Layer>
      <Layer n="07" title="The reader follows it back" visual={<ReaderJump />}>
        <p>In the book, a claim opens its evidence: who said it, their words, and the second they said it.</p>
        <p>
          <a
            href={`https://www.youtube.com/watch?v=${lead.videoId}&t=${lead.startSeconds}s`}
            className="text-[#D9A55B] underline decoration-[#D9A55B]/40 underline-offset-4 hover:decoration-[#D9A55B]"
          >
            Hear it at {clock(lead.start)}
          </a>{' '}
          ·{' '}
          <a
            href={chapterUrl(sample.chapters[0])}
            className="text-white/75 underline decoration-white/25 underline-offset-4 hover:decoration-white/70"
          >
            Read chapter {sample.chapters[0]}
          </a>
        </p>
      </Layer>
    </ol>
  </div>
);
