/**
 * Background video sources for the Spade hero.
 * Generated via OpenArt MCP on 2026-07-14.
 */
export type SpadeVideoSlot = {
  id: string;
  label: string;
  src: string;
  local?: string;
  openArtHistoryId?: string;
  openArtPrompt: string;
  openArtModel?: string;
  role: 'hero-scrub' | 'ambient-loop' | 'mobile-autoplay';
};

export const SPADE_HERO_VIDEOS: SpadeVideoSlot[] = [
  {
    id: 'hero-desktop',
    label: 'Desktop scrub layer',
    src: 'https://cdn.openart.ai/openart-ai/production/2026-07/create-video/sSepvRdml8XkFAK1agSp/02178405471450200000000000000000000ffffc0a8b3ea97a7a7_1784054809403_f23d349a.mp4',
    local: '/videos/spade/hero-desktop.mp4',
    openArtHistoryId: 'XxIlrutzOQ1IoAyjmN0A',
    openArtModel: 'Seedance 2.0',
    openArtPrompt:
      'Cinematic abstract studio scene, soft sage green (#EAECE9) and charcoal (#1C2E1E) organic glass forms slowly morphing, shallow depth of field, gentle light fluctuations, minimal camera drift right-to-bottom, seamless loop-friendly motion, 16:9, photoreal, no text, no logos, calm premium agency aesthetic',
    role: 'hero-scrub',
  },
  {
    id: 'hero-ambient',
    label: 'Ambient underlay',
    src: 'https://cdn.openart.ai/openart-ai/production/2026-07/create-video/sSepvRdml8XkFAK1agSp/75578405-metadata_user_07c71b911c838c59_1784054889470_f1a272d5.mp4',
    local: '/videos/spade/hero-ambient.mp4',
    openArtHistoryId: 'I7fIVlAEi87J568c4r4Y',
    openArtModel: 'Wan 2.7',
    openArtPrompt:
      'Ultra-slow ethereal particle drift and soft volumetric light pulses on off-white background, subtle green-grey tones, barely perceptible motion, dreamy bokeh fluctuations, seamless loop, 16:9, no subjects, abstract atmosphere only',
    role: 'ambient-loop',
  },
  {
    id: 'hero-mobile',
    label: 'Mobile autoplay layer',
    src: 'https://cdn.openart.ai/openart-ai/production/2026-07/create-video/sSepvRdml8XkFAK1agSp/video_1784054747928_d140cab8_1784054748011_79be700c.mp4',
    local: '/videos/spade/hero-mobile.mp4',
    openArtHistoryId: 'Z2jzEaDBQmvHbwt94o9W',
    openArtModel: 'Gemini Omni Flash',
    openArtPrompt:
      'Vertical-friendly abstract motion: gentle waves of cream and sage mist, soft focus, smooth loop, calm contact-page mood, no typography, square-safe composition with subject weight on right',
    role: 'mobile-autoplay',
  },
];

export function resolveVideoSrc(slot: SpadeVideoSlot, preferLocal = true): string {
  if (preferLocal && slot.local) return slot.local;
  return slot.src;
}

export const heroScrubVideo = SPADE_HERO_VIDEOS.find((v) => v.role === 'hero-scrub')!;
export const heroAmbientVideo = SPADE_HERO_VIDEOS.find((v) => v.role === 'ambient-loop')!;
export const heroMobileVideo = SPADE_HERO_VIDEOS.find((v) => v.role === 'mobile-autoplay')!;
