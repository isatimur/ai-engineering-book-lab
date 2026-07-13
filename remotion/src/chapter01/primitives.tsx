import type { ReactNode } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
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

/** Reads out the fps-relative progress of the whole video, 0..1 — used for a persistent progress rail. */
export const useProgress = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return frame / durationInFrames;
};
