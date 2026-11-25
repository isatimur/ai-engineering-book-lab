import { Composition } from 'remotion';
import { Chapter01 } from './chapter01/Chapter01';
import { TOTAL_DURATION_IN_FRAMES as CH01_DURATION } from './chapter01/durations';
import { Chapter02 } from './chapter02/Chapter02';
import { TOTAL_DURATION_IN_FRAMES as CH02_DURATION } from './chapter02/durations';
import { DraftExplainer, TOTAL_DURATION_IN_FRAMES as DRAFT_DURATION } from './draft/Explainer';
import { draftSpecs } from './draft/specs';
import { FPS } from './theme';
import { OgCard, ogCardDefaultProps } from './ogcard/OgCard';

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
    {/* Books 2 and 3: one composition per spec, all from the same template. */}
    {draftSpecs.map((spec) => (
      <Composition
        key={spec.id}
        id={spec.id}
        component={DraftExplainer}
        durationInFrames={DRAFT_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ spec }}
      />
    ))}
    <Composition
      id="OgCard"
      component={OgCard}
      durationInFrames={1}
      fps={FPS}
      width={1200}
      height={630}
      defaultProps={ogCardDefaultProps}
    />
  </>
);
