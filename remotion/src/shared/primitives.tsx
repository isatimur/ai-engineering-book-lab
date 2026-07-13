import type { ComponentType, ReactNode } from 'react';
import { AbsoluteFill, interpolate, Series, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

/** Full-bleed dark background matching the site's Catalogue page. */
export const SceneBackground = ({ children }: { children: ReactNode }) => (
  <AbsoluteFill
    style={{
      backgroundColor: theme.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </AbsoluteFill>
);

/**
 * Fades content in over `inFrames`, holds, then fades out over `outFrames`
 * before the sequence ends — relative to the local (sequence-scoped) frame.
 */
export const FadeInOut = ({
  children,
  durationInFrames,
  inFrames = 15,
  outFrames = 15,
  translateY = 24,
}: {
  children: ReactNode;
  durationInFrames: number;
  inFrames?: number;
  outFrames?: number;
  translateY?: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, inFrames, durationInFrames - outFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const y = interpolate(frame, [0, inFrames], [translateY, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, textAlign: 'center' }}>
      {children}
    </div>
  );
};

/** Small mono/uppercase label — matches the site's "font-mono uppercase tracking" kicker style. */
export const Kicker = ({ children }: { children: ReactNode }) => (
  <p
    style={{
      fontFamily: theme.mono,
      fontSize: 22,
      letterSpacing: 6,
      textTransform: 'uppercase',
      color: theme.inkFaint,
      marginBottom: 28,
    }}
  >
    {children}
  </p>
);

/** Large italic serif line — the default headline weight for hook/title/argument beats. */
export const Big = ({ children }: { children: ReactNode }) => (
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

/**
 * A step in an N-step sequence (e.g. Assistant/Copilot/Delegate, or a
 * 3-line argument) — a dot rail showing position, a big label, and a
 * one-line definition below it. `emphasized` is for the step that's the
 * chapter's actual subject (larger, accent-colored).
 */
export const TermCard = ({
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
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
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

/** Reads out the fps-relative progress of the whole video, 0..1 — used for a persistent progress rail. */
export const useProgress = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return frame / durationInFrames;
};

/** Thin progress rail pinned to the bottom edge — a quiet "how much is left" cue, shared by every chapter. */
export const ProgressRail = () => {
  const progress = useProgress();
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', pointerEvents: 'none' }}>
      <div style={{ height: 3, backgroundColor: 'rgba(249,247,241,0.08)' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: theme.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export type SceneSpec = { durationInFrames: number; Component: ComponentType };

/**
 * Assembles a chapter's scenes into a `<Series>` with the shared progress
 * rail overlaid — the one piece of wiring every `ChapterNN.tsx` needs, kept
 * here so it can't drift between chapters.
 */
export const SeriesWithProgress = ({ scenes }: { scenes: SceneSpec[] }) => (
  <>
    <Series>
      {scenes.map(({ durationInFrames, Component }, i) => (
        <Series.Sequence key={i} durationInFrames={durationInFrames}>
          <Component />
        </Series.Sequence>
      ))}
    </Series>
    <ProgressRail />
  </>
);
