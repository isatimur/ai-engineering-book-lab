import manifestRaw from '../data/audio-manifest.json';

export type AudioSegmentKind = 'opening' | 'chapter' | 'closing';

export type AudioSegment = {
  index: number;
  kind: AudioSegmentKind;
  slug: string;
  chapterNumber: string | null;
  title: string;
  src: string;
  durationSeconds: number;
};

export type AudioManifest = {
  generatedAt: string;
  available: boolean;
  totalDurationSeconds: number;
  segments: AudioSegment[];
};

const AUDIO_BASE = (import.meta.env.VITE_AUDIO_BASE_URL ?? '').replace(/\/$/, '');

export const audioManifest = manifestRaw as AudioManifest;

/** Resolve a segment path, optionally prefixing a CDN base URL. */
export function segmentUrl(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  return AUDIO_BASE ? `${AUDIO_BASE}${src}` : src;
}

/** Format seconds as `HH:MM:SS` (hours omitted when zero). */
export function formatAudioTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  if (h > 0) return `${String(h).padStart(2, '0')}:${mm}:${ss}`;
  return `00:${mm}:${ss}`;
}

/** Map a 0–1 book scroll ratio to a global audiobook timestamp. */
export function scrollToGlobalTime(scrollRatio: number, totalDurationSeconds: number): number {
  const clamped = Math.min(1, Math.max(0, scrollRatio));
  return clamped * totalDurationSeconds;
}

/** Map a global audiobook timestamp to a 0–1 book scroll ratio. */
export function globalTimeToScroll(globalSeconds: number, totalDurationSeconds: number): number {
  if (totalDurationSeconds <= 0) return 0;
  return Math.min(1, Math.max(0, globalSeconds / totalDurationSeconds));
}

/** Locate the segment and in-segment offset for a global timestamp. */
export function locateGlobalTime(
  segments: AudioSegment[],
  globalSeconds: number,
): { segmentIndex: number; offsetSeconds: number } {
  if (segments.length === 0) return { segmentIndex: 0, offsetSeconds: 0 };

  let remaining = Math.max(0, globalSeconds);
  for (let i = 0; i < segments.length; i++) {
    const dur = segments[i].durationSeconds;
    if (remaining < dur || i === segments.length - 1) {
      return { segmentIndex: i, offsetSeconds: Math.min(remaining, dur) };
    }
    remaining -= dur;
  }
  return { segmentIndex: segments.length - 1, offsetSeconds: 0 };
}

/** Sum segment durations before `segmentIndex`. */
export function globalTimeAtSegment(segments: AudioSegment[], segmentIndex: number, offsetSeconds = 0): number {
  let t = offsetSeconds;
  for (let i = 0; i < segmentIndex; i++) t += segments[i]?.durationSeconds ?? 0;
  return t;
}

export function parsePlaybackRate(speedLabel: string): number {
  if (speedLabel === 'COLLISON') return 2.5;
  const n = parseFloat(speedLabel);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function segmentByChapterNumber(chapterNumber: string): AudioSegment | undefined {
  const padded = chapterNumber.padStart(2, '0');
  return audioManifest.segments.find((s) => s.chapterNumber === padded);
}
