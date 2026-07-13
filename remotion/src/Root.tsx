import { Composition } from 'remotion';
import { Chapter01 } from './chapter01/Chapter01';
import { TOTAL_DURATION_IN_FRAMES as CH01_DURATION } from './chapter01/durations';
import { Chapter02 } from './chapter02/Chapter02';
import { TOTAL_DURATION_IN_FRAMES as CH02_DURATION } from './chapter02/durations';
import { FPS } from './theme';

export const RemotionRoot = () => (
  <>
    <Composition
      id="Chapter01"
      component={Chapter01}
      durationInFrames={CH01_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="Chapter02"
      component={Chapter02}
      durationInFrames={CH02_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
