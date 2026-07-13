import { SeriesWithProgress } from '../shared/primitives';
import { SCENE_DURATIONS } from './durations';
import {
  HookScene,
  TitleScene,
  FrameworkIntroScene,
  CriterionScene,
  ReviewerScene,
  TasteScene,
  TripwireScene,
  QuoteScene,
  ScarceSkillsScene,
  OutroScene,
} from './Scenes';

/** Chapter 2 explainer — second episode of the series (see `chapter01/Chapter01.tsx` for the pattern). */
export const Chapter02 = () => (
  <SeriesWithProgress
    scenes={[
      { durationInFrames: SCENE_DURATIONS.hook, Component: HookScene },
      { durationInFrames: SCENE_DURATIONS.titleCard, Component: TitleScene },
      { durationInFrames: SCENE_DURATIONS.frameworkIntro, Component: FrameworkIntroScene },
      { durationInFrames: SCENE_DURATIONS.criterion, Component: CriterionScene },
      { durationInFrames: SCENE_DURATIONS.reviewer, Component: ReviewerScene },
      { durationInFrames: SCENE_DURATIONS.taste, Component: TasteScene },
      { durationInFrames: SCENE_DURATIONS.tripwire, Component: TripwireScene },
      { durationInFrames: SCENE_DURATIONS.quote, Component: QuoteScene },
      { durationInFrames: SCENE_DURATIONS.scarceSkills, Component: ScarceSkillsScene },
      { durationInFrames: SCENE_DURATIONS.outro, Component: OutroScene },
    ]}
  />
);
