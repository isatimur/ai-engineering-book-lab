import { Img, staticFile } from 'remotion';
import { theme, AUTHORS } from '../../theme';
import { SceneBackground, FadeInOut, Kicker, Big, TermCard } from '../../shared/primitives';
import { SCENE_DURATIONS } from './durations';

// Every line below is lifted from website/src/content-2/chapter-01.md. The
// quote is claims#2's anchor (#674, Alessandro Cappelli, 00:00:48). The three
// backdrops in public/book2-ch01/ are Higgsfield stills with no text in them.
const BOOK = 'The Model Layer & The Long Tail';
const URL = 'aiepress.com/second-book';
const LOOP = 'book2-ch01/loop.jpg';
const LADDER = 'book2-ch01/ladder.jpg';
const VERIFY = 'book2-ch01/verify.jpg';

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

export const HookScene = () => (
  <SceneBackground backdrop={LOOP}>
    <FadeInOut durationInFrames={SCENE_DURATIONS.hook}>
      <Kicker>{BOOK} · Chapter 1</Kicker>
      <Big>The model is no longer given.</Big>
    </FadeInOut>
  </SceneBackground>
);

export const TitleScene = () => (
  <SceneBackground backdrop={LOOP}>
    <FadeInOut durationInFrames={SCENE_DURATIONS.titleCard}>
      <Big>
        Behavior is trained in,{' '}
        <span style={{ color: theme.accent, whiteSpace: 'nowrap' }}>not prompted in.</span>
      </Big>
      <Sub size={24}>Training and the Turn to RL</Sub>
    </FadeInOut>
  </SceneBackground>
);

export const MenuIntroScene = () => (
  <SceneBackground backdrop={LADDER}>
    <FadeInOut durationInFrames={SCENE_DURATIONS.menuIntro}>
      <Kicker>Post-training is not one technique</Kicker>
      <Sub size={30}>It is a menu, and the rungs climb in cost and power.</Sub>
    </FadeInOut>
  </SceneBackground>
);

export const SftScene = () => (
  <TermCard
    index={0}
    total={3}
    term="Supervised fine-tuning"
    definition="Teaches a model to imitate examples of the output you want."
    durationInFrames={SCENE_DURATIONS.sft}
    backdrop={LADDER}
  />
);

export const PreferenceScene = () => (
  <TermCard
    index={1}
    total={3}
    term="Preference optimization"
    definition="Teaches it to prefer one response over another."
    durationInFrames={SCENE_DURATIONS.preference}
    backdrop={LADDER}
  />
);

export const RftScene = () => (
  <TermCard
    index={2}
    total={3}
    term="Reinforcement fine-tuning"
    definition="Optimizes against a reward, so the model can discover behavior no example set spelled out."
    emphasized
    durationInFrames={SCENE_DURATIONS.rft}
    backdrop={LADDER}
  />
);

export const VerifierScene = () => (
  <SceneBackground backdrop={VERIFY}>
    <FadeInOut durationInFrames={SCENE_DURATIONS.verifier}>
      <Big>
        A neural reward model can be gamed.&nbsp;
        <span style={{ color: theme.accent }}>A compiler cannot.</span>
      </Big>
      <Sub>Code is the domain where RL scales first.</Sub>
    </FadeInOut>
  </SceneBackground>
);

export const QuoteScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.quote}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <p style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 42, lineHeight: 1.45, color: theme.paper }}>
          <span style={{ color: theme.accent, fontSize: 60 }}>&ldquo;</span>
          RL is not just any other algorithm for post-training, but is an algorithm that at its core will bring models to
          production.
          <span style={{ color: theme.accent, fontSize: 60 }}>&rdquo;</span>
        </p>
        <p style={{ fontFamily: theme.sans, fontWeight: 500, fontSize: 22, color: theme.inkMuted, marginTop: 24 }}>
          Alessandro Cappelli, Adaptive ML
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
            Source-anchored · 0:48
          </span>
        </div>
      </div>
    </FadeInOut>
  </SceneBackground>
);

export const OperationsScene = () => (
  <SceneBackground backdrop={VERIFY}>
    <FadeInOut durationInFrames={SCENE_DURATIONS.operations}>
      <Kicker>The hard part is operations, not the algorithm</Kicker>
      <div style={{ display: 'flex', gap: 96, justifyContent: 'center', alignItems: 'baseline' }}>
        {(
          [
            ['4', 'models in memory for PPO-style RLHF'],
            ['3', 'even with GRPO, which drops the value model'],
          ] as const
        ).map(([n, label]) => (
          <div key={n} style={{ maxWidth: 360 }}>
            <div style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 120, color: theme.accent, lineHeight: 1 }}>
              {n}
            </div>
            <div style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 24, color: theme.inkMuted, marginTop: 12 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <Sub size={22}>Holding several large models in memory at once, in sync, is an operations problem before it is a research one.</Sub>
    </FadeInOut>
  </SceneBackground>
);

export const OutroScene = () => (
  <SceneBackground>
    <FadeInOut durationInFrames={SCENE_DURATIONS.outro} outFrames={20}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 56, justifyContent: 'center' }}>
        <Img
          src={staticFile('book2-ch01/cover.jpg')}
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
            Read Chapter 1 free
          </p>
          <h2 style={{ fontFamily: theme.serif, fontStyle: 'italic', fontSize: 44, color: theme.paper, margin: 0, lineHeight: 1.2 }}>
            {BOOK}
          </h2>
          <p style={{ fontFamily: theme.sans, fontWeight: 300, fontSize: 20, color: theme.inkMuted, marginTop: 20 }}>{URL}</p>
          <p style={{ fontFamily: theme.sans, fontWeight: 300, fontSize: 16, color: theme.inkFaint, marginTop: 12 }}>{AUTHORS}</p>
        </div>
      </div>
    </FadeInOut>
  </SceneBackground>
);
