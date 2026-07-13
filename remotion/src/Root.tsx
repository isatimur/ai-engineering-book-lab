import { Composition } from 'remotion';
import { Chapter01 } from './chapter01/Chapter01';
import { FPS, TOTAL_DURATION_IN_FRAMES } from './chapter01/durations';

export const RemotionRoot = () => (
  <>
    <Composition
      id="Chapter01"
      component={Chapter01}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
