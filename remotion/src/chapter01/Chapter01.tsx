import { SeriesWithProgress } from '../shared/primitives';
import { SCENE_DURATIONS } from './durations';
import {
  HookScene,
  TitleScene,
  FrameworkIntroScene,
  AssistantScene,
  CopilotScene,
  DelegateScene,
  LoopShiftScene,
  QuoteScene,
  StatsScene,
  OutroScene,
} from './Scenes';

/**
 * Chapter 1 explainer — the pilot episode of the series. Each scene's frame
 * budget lives in `durations.ts`; add a chapter by copying this folder,
 * swapping `Scenes.tsx`'s content for the new chapter's argument, and
 * registering a new `<Composition>` in `Root.tsx`.
 */
export const Chapter01 = () => (
  <SeriesWithProgress
    scenes={[
      { durationInFrames: SCENE_DURATIONS.hook, Component: HookScene },
      { durationInFrames: SCENE_DURATIONS.titleCard, Component: TitleScene },
      { durationInFrames: SCENE_DURATIONS.frameworkIntro, Component: FrameworkIntroScene },
      { durationInFrames: SCENE_DURATIONS.assistant, Component: AssistantScene },
      { durationInFrames: SCENE_DURATIONS.copilot, Component: CopilotScene },
      { durationInFrames: SCENE_DURATIONS.delegate, Component: DelegateScene },
      { durationInFrames: SCENE_DURATIONS.loopShift, Component: LoopShiftScene },
      { durationInFrames: SCENE_DURATIONS.quote, Component: QuoteScene },
      { durationInFrames: SCENE_DURATIONS.stats, Component: StatsScene },
      { durationInFrames: SCENE_DURATIONS.outro, Component: OutroScene },
    ]}
  />
);
