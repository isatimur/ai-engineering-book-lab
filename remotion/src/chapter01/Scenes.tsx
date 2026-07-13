import { Img, staticFile } from 'remotion';
import { theme, BOOK_TITLE, BOOK_URL, AUTHORS } from '../theme';
import { SceneBackground, FadeInOut, Kicker } from './primitives';
import { SCENE_DURATIONS } from './durations';

const Big = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: theme.serif,
      fontStyle: 'italic',
      fontWeight: 500,
      fontSize: 64,
      lineHeight: 1.25,
      color: theme.paper,
      maxWidth: 1100,
      margin: '0 auto',
    }}
  >
    {children}
  </h1>
);

export const HookScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.hook}>
      <Kicker>From Copilot to Colleague · Chapter 1</Kicker>
      <Big>
        The most important change in AI is not that chat got better.
      </Big>
    </FadeInOut>
  </SceneBackground>
);

export const TitleScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.titleCard}>
      <Big>
        It's that people stopped wanting an answer&nbsp;
        <span style={{ color: theme.accent }}>— and started wanting the work done.</span>
      </Big>
      <p
        style={{
          fontFamily: theme.sans,
          fontWeight: 300,
          fontSize: 24,
          color: theme.inkMuted,
          marginTop: 40,
        }}
      >
        The Shift: From Assistant to Delegate
      </p>
    </FadeInOut>
  </SceneBackground>
);

export const FrameworkIntroScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.frameworkIntro}>
      <Kicker>Three words. Three different relationships.</Kicker>
      <p
        style={{
          fontFamily: theme.sans,
          fontWeight: 300,
          fontSize: 30,
          color: theme.paper,
          maxWidth: 900,
        }}
      >
        Where does the human sit relative to the loop?
      </p>
    </FadeInOut>
  </SceneBackground>
);

const TermCard = ({
  index,
  total,
  term,
  definition,
  emphasized,
  durationInFrames,
}: {
  index: number;
  total: number;
  term: string;
  definition: string;
  emphasized?: boolean;
  durationInFrames: number;
}) => (
  <SceneBackground>
    <FadeInOut durationInFrames={durationInFrames}>
      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 32,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 46,
              height: 4,
              borderRadius: 2,
              backgroundColor: i === index ? theme.accent : 'rgba(249,247,241,0.2)',
            }}
          />
        ))}
      </div>
      <h2
        style={{
          fontFamily: theme.sans,
          fontWeight: 600,
          fontSize: emphasized ? 96 : 76,
          textTransform: 'uppercase',
          letterSpacing: 4,
          color: emphasized ? theme.accent : theme.paper,
          margin: 0,
        }}
      >
        {term}
      </h2>
      <p
        style={{
          fontFamily: theme.serif,
          fontStyle: 'italic',
          fontSize: 32,
          color: theme.inkMuted,
          maxWidth: 820,
          margin: '28px auto 0',
          lineHeight: 1.4,
        }}
      >
        {definition}
      </p>
    </FadeInOut>
  </SceneBackground>
);

export const AssistantScene = () => (
  <TermCard
    index={0}
    total={3}
    term="Assistant"
    definition="Suggests. Produces a draft, an answer, an option — you decide what to do with it."
    durationInFrames={SCENE_DURATIONS.assistant}
  />
);

export const CopilotScene = () => (
  <TermCard
    index={1}
    total={3}
    term="Copilot"
    definition="Collaborates inside a human loop, alongside you in real time — the human is still flying the plane."
    durationInFrames={SCENE_DURATIONS.copilot}
  />
);

export const DelegateScene = () => (
  <TermCard
    index={2}
    total={3}
    term="Delegate"
    definition="Assigned work, expected to return with it done. Not a suggestion to evaluate — an artifact someone will rely on."
    emphasized
    durationInFrames={SCENE_DURATIONS.delegate}
  />
);

export const LoopShiftScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.loopShift}>
      <Big>
        The human steps <span style={{ color: theme.accent }}>out</span> of the loop —
        and re-enters at review.
      </Big>
      <p
        style={{
          fontFamily: theme.sans,
          fontWeight: 300,
          fontSize: 26,
          color: theme.inkMuted,
          marginTop: 32,
          maxWidth: 820,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        That single move is the whole shift — and it changes what the system has to be.
      </p>
    </FadeInOut>
  </SceneBackground>
);

export const QuoteScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.quote}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: theme.serif,
            fontStyle: 'italic',
            fontSize: 44,
            lineHeight: 1.45,
            color: theme.paper,
          }}
        >
          <span style={{ color: theme.accent, fontSize: 60 }}>&ldquo;</span>
          Agents have intelligence and capabilities, but not always expertise that we
          need for real work.
          <span style={{ color: theme.accent, fontSize: 60 }}>&rdquo;</span>
        </p>
        <p
          style={{
            fontFamily: theme.sans,
            fontWeight: 500,
            fontSize: 22,
            color: theme.inkMuted,
            marginTop: 24,
          }}
        >
          Barry Zhang &amp; Mahesh Murag, Anthropic
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
            padding: '8px 16px',
            border: `1px solid ${theme.accent}`,
            borderRadius: 4,
          }}
        >
          <span
            style={{
              fontFamily: theme.mono,
              fontSize: 15,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: theme.accent,
            }}
          >
            Source-anchored · 0:35
          </span>
        </div>
      </div>
    </FadeInOut>
  </SceneBackground>
);

export const StatsScene = () => {
  const stats: Array<[string, string]> = [
    ['794', 'AI Engineer talks'],
    ['54', 'source-anchored claims'],
    ['199', 'video-timestamp anchors'],
  ];
  return (
    <SceneBackground>
      <FadeInOut durationInFrames={SCENE_DURATIONS.stats}>
        <Kicker>This book, by the numbers</Kicker>
        <div style={{ display: 'flex', gap: 64, justifyContent: 'center' }}>
          {stats.map(([n, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: theme.serif,
                  fontStyle: 'italic',
                  fontSize: 72,
                  color: theme.paper,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: theme.sans,
                  fontWeight: 300,
                  fontSize: 18,
                  color: theme.inkMuted,
                  marginTop: 8,
                  maxWidth: 180,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: theme.sans,
            fontWeight: 300,
            fontSize: 22,
            color: theme.inkMuted,
            marginTop: 48,
          }}
        >
          Every claim links to the exact second it came from.
        </p>
      </FadeInOut>
    </SceneBackground>
  );
};

export const OutroScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.outro} outFrames={20}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 56, justifyContent: 'center' }}>
        <Img
          src={staticFile('cover.png')}
          style={{
            height: 340,
            borderRadius: 6,
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6)',
          }}
        />
        <div style={{ textAlign: 'left', maxWidth: 440 }}>
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
            Read Chapter 1 free
          </p>
          <h2
            style={{
              fontFamily: theme.serif,
              fontStyle: 'italic',
              fontSize: 44,
              color: theme.paper,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {BOOK_TITLE}
          </h2>
          <p
            style={{
              fontFamily: theme.sans,
              fontWeight: 300,
              fontSize: 20,
              color: theme.inkMuted,
              marginTop: 20,
            }}
          >
            {BOOK_URL}
          </p>
          <p
            style={{
              fontFamily: theme.sans,
              fontWeight: 300,
              fontSize: 16,
              color: theme.inkFaint,
              marginTop: 12,
            }}
          >
            {AUTHORS}
          </p>
        </div>
      </div>
    </FadeInOut>
  </SceneBackground>
);
