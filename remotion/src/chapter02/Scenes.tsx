import { Img, staticFile } from 'remotion';
import { theme, BOOK_TITLE, BOOK_URL, AUTHORS } from '../theme';
import { SceneBackground, FadeInOut, Kicker, Big, TermCard } from '../shared/primitives';
import { SCENE_DURATIONS } from './durations';

export const HookScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.hook}>
      <Kicker>From Copilot to Colleague · Chapter 2</Kicker>
      <Big>Cheap code is easy to misread.</Big>
    </FadeInOut>
  </SceneBackground>
);

export const TitleScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.titleCard}>
      <Big>
        Generation got cheaper.&nbsp;
        <span style={{ color: theme.accent }}>Bad decisions did not.</span>
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
        Taste Still Matters When Code Gets Cheap
      </p>
    </FadeInOut>
  </SceneBackground>
);

export const FrameworkIntroScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.frameworkIntro}>
      <Kicker>The scarcity that disappeared</Kicker>
      <p
        style={{
          fontFamily: theme.sans,
          fontWeight: 300,
          fontSize: 30,
          color: theme.paper,
          maxWidth: 900,
        }}
      >
        Building used to be its own filter. Remove the cost, and the filter goes with it.
      </p>
    </FadeInOut>
  </SceneBackground>
);

export const CriterionScene = () => (
  <TermCard
    index={0}
    total={3}
    term="Success criterion"
    definition="Written before the model runs — what counts as done, decided while you can still think clearly about it."
    durationInFrames={SCENE_DURATIONS.criterion}
  />
);

export const ReviewerScene = () => (
  <TermCard
    index={1}
    total={3}
    term="Reviewer veto"
    definition="Kept after the model returns — someone with standing to reject a fluent, working, wrong answer."
    durationInFrames={SCENE_DURATIONS.reviewer}
  />
);

export const TasteScene = () => (
  <TermCard
    index={2}
    total={3}
    term="Taste"
    definition="The skill that decides what to build, and rejects what shouldn't ship — the part that didn't get automated."
    emphasized
    durationInFrames={SCENE_DURATIONS.taste}
  />
);

export const TripwireScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.tripwire}>
      <Big>
        If you can't name the failing condition,&nbsp;
        <span style={{ color: theme.accent }}>you weren't filtering.</span>
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
        You were accepting whatever came back.
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
          The new scarce skill is writing specifications that fully capture the intent.
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
          Sean Grove, OpenAI
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
            Source-anchored · 9:02
          </span>
        </div>
      </div>
    </FadeInOut>
  </SceneBackground>
);

export const ScarceSkillsScene = () => {
  const skills: Array<[string, string]> = [
    ['Framing', 'the task, before the model runs'],
    ['Review', 'the output, after it returns'],
  ];
  return (
    <SceneBackground>
      <FadeInOut durationInFrames={SCENE_DURATIONS.scarceSkills}>
        <Kicker>The two scarce skills, once execution is cheap</Kicker>
        <div style={{ display: 'flex', gap: 80, justifyContent: 'center' }}>
          {skills.map(([term, label]) => (
            <div key={term}>
              <div
                style={{
                  fontFamily: theme.sans,
                  fontWeight: 600,
                  fontSize: 44,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  color: theme.accent,
                }}
              >
                {term}
              </div>
              <div
                style={{
                  fontFamily: theme.serif,
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: theme.inkMuted,
                  marginTop: 10,
                  maxWidth: 240,
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
          Framing is no longer the cheap part before the real work. It is the work.
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
            Read Chapter 2 free
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
