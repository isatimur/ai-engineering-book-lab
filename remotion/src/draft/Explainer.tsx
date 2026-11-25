import { useMemo } from 'react';
import { Img, staticFile } from 'remotion';
import { theme, AUTHORS } from '../theme';
import { SceneBackground, FadeInOut, Kicker, Big, TermCard, SeriesWithProgress } from '../shared/primitives';
import type { ExplainerSpec } from './spec';

/**
 * Frame budget at FPS=30: the same ten beats and length (1,005 frames, about
 * 33.5 s) as book 1's episodes and the book 2 chapter 1 pilot.
 */
export const SCENE_DURATIONS = {
  hook: 90,
  titleCard: 90,
  intro: 60,
  term1: 75,
  term2: 75,
  term3: 105, // held longer: the chapter's subject
  punch: 90,
  quote: 150,
  stats: 120,
  outro: 150,
} as const;

export const TOTAL_DURATION_IN_FRAMES = Object.values(SCENE_DURATIONS).reduce((sum, d) => sum + d, 0);

/** "00:01:05.200" -> "1:05", the way the pilot and book 1 label anchors. */
export const anchorLabel = (start: string) => {
  const [h, m, s] = start.split(':').map((p) => parseInt(p, 10));
  const total = h * 3600 + m * 60 + s;
  const mm = Math.floor(total / 60);
  const ss = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${mm}:${ss}`;
};

const Sub = ({ children, size = 26 }: { children: string; size?: number }) => (
  <p
    style={{
      fontFamily: theme.sans,
      fontWeight: 300,
      fontSize: size,
      color: theme.inkMuted,
      marginTop: 32,
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    {children}
  </p>
);

const Accented = ({ lead, accent }: { lead: string; accent: string }) => (
  <Big>
    {lead}{' '}
    {/* Keep a short turn on one line, so it never breaks as "not prompted / in." */}
    <span style={{ color: theme.accent, whiteSpace: accent.length <= 24 ? 'nowrap' : undefined }}>{accent}</span>
  </Big>
);

const scenes = (s: ExplainerSpec) => {
  const [open, middle, close] = s.backdrops;
  const D = SCENE_DURATIONS;

  const Hook = () => (
    <SceneBackground backdrop={open}>
      <FadeInOut durationInFrames={D.hook}>
        <Kicker>{`${s.bookTitle} · Chapter ${s.chapter}`}</Kicker>
        <Big>{s.hook}</Big>
      </FadeInOut>
    </SceneBackground>
  );

  const Title = () => (
    <SceneBackground backdrop={open}>
      <FadeInOut durationInFrames={D.titleCard}>
        <Accented {...s.title} />
        <Sub size={24}>{s.chapterTitle}</Sub>
      </FadeInOut>
    </SceneBackground>
  );

  const Intro = () => (
    <SceneBackground backdrop={middle}>
      <FadeInOut durationInFrames={D.intro}>
        <Kicker>{s.intro.kicker}</Kicker>
        <Sub size={30}>{s.intro.line}</Sub>
      </FadeInOut>
    </SceneBackground>
  );

  const term = (i: 0 | 1 | 2, durationInFrames: number) => () => (
    <TermCard
      index={i}
      total={3}
      term={s.terms[i].term}
      definition={s.terms[i].definition}
      emphasized={i === 2}
      durationInFrames={durationInFrames}
      backdrop={middle}
    />
  );

  const Punch = () => (
    <SceneBackground backdrop={close}>
      <FadeInOut durationInFrames={D.punch}>
        <Accented lead={s.punch.lead} accent={s.punch.accent} />
        <Sub>{s.punch.line}</Sub>
      </FadeInOut>
    </SceneBackground>
  );

  const Quote = () => (
    <SceneBackground>
      <FadeInOut durationInFrames={D.quote}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 42, lineHeight: 1.45, color: theme.paper }}>
            <span style={{ color: theme.accent, fontSize: 60 }}>&ldquo;</span>
            {s.quote.text}
            <span style={{ color: theme.accent, fontSize: 60 }}>&rdquo;</span>
          </p>
          <p style={{ fontFamily: theme.sans, fontWeight: 500, fontSize: 22, color: theme.inkMuted, marginTop: 24 }}>
            {s.quote.speaker}
          </p>
          <div
            style={{
              display: 'inline-flex',
              marginTop: 20,
              padding: '8px 16px',
              border: `1px solid ${theme.accent}`,
              borderRadius: 4,
            }}
          >
            <span
              style={{ fontFamily: theme.mono, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase', color: theme.accent }}
            >
              {`Source-anchored · ${anchorLabel(s.quote.at)}`}
            </span>
          </div>
        </div>
      </FadeInOut>
    </SceneBackground>
  );

  const Stats = () => (
    <SceneBackground backdrop={close}>
      <FadeInOut durationInFrames={D.stats}>
        <Kicker>{s.stats.kicker}</Kicker>
        <div style={{ display: 'flex', gap: 96, justifyContent: 'center', alignItems: 'baseline' }}>
          {s.stats.items.map(([n, label]) => (
            <div key={n + label} style={{ maxWidth: 360 }}>
              <div style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 120, color: theme.accent, lineHeight: 1, whiteSpace: 'nowrap' }}>
                {n}
              </div>
              <div style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 24, color: theme.inkMuted, marginTop: 12 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <Sub size={22}>{s.stats.line}</Sub>
      </FadeInOut>
    </SceneBackground>
  );

  const Outro = () => (
    <SceneBackground>
      <FadeInOut durationInFrames={D.outro} outFrames={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 56, justifyContent: 'center' }}>
          <Img
            src={staticFile(s.cover)}
            style={{ height: 340, borderRadius: 6, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6)' }}
          />
          <div style={{ textAlign: 'left', maxWidth: 480 }}>
            <p
              style={{
                fontFamily: theme.mono,
                fontSize: 16,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: theme.accent,
                marginBottom: 16,
              }}
            >
              {`Read Chapter ${s.chapter} free`}
            </p>
            <h2 style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 44, color: theme.paper, margin: 0, lineHeight: 1.2 }}>
              {s.bookTitle}
            </h2>
            <p style={{ fontFamily: theme.sans, fontWeight: 300, fontSize: 20, color: theme.inkMuted, marginTop: 20 }}>{s.url}</p>
            <p style={{ fontFamily: theme.sans, fontWeight: 300, fontSize: 16, color: theme.inkFaint, marginTop: 12 }}>{AUTHORS}</p>
          </div>
        </div>
      </FadeInOut>
    </SceneBackground>
  );

  return [
    { durationInFrames: D.hook, Component: Hook },
    { durationInFrames: D.titleCard, Component: Title },
    { durationInFrames: D.intro, Component: Intro },
    { durationInFrames: D.term1, Component: term(0, D.term1) },
    { durationInFrames: D.term2, Component: term(1, D.term2) },
    { durationInFrames: D.term3, Component: term(2, D.term3) },
    { durationInFrames: D.punch, Component: Punch },
    { durationInFrames: D.quote, Component: Quote },
    { durationInFrames: D.stats, Component: Stats },
    { durationInFrames: D.outro, Component: Outro },
  ];
};

/** A chapter explainer for book 2 or 3, built from its spec. */
export const DraftExplainer = ({ spec }: { spec: ExplainerSpec }) => {
  // Stable component identities, so the preview does not remount every scene each frame.
  const built = useMemo(() => scenes(spec), [spec]);
  return <SeriesWithProgress scenes={built} />;
};
