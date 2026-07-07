// Web audiobook tracks — 64 kbps mono MP3s in /public/audiobook, one per chapter.
// Ordered 1:1 with `chapters` in bookChapters.ts (shared index; `number` matches).
// approxSeconds (from ffprobe) is only for pre-load total/time display; the exact
// duration is read at runtime from the <audio> element's `loadedmetadata` event.

export type AudiobookTrack = {
  number: string; // '01'..'10' — matches BookChapter.number and #book-chapter-<n> ids
  src: string;
  approxSeconds: number;
};

export const AUDIOBOOK: AudiobookTrack[] = [
  { number: '01', src: '/audiobook/ch-01.mp3', approxSeconds: 714 },
  { number: '02', src: '/audiobook/ch-02.mp3', approxSeconds: 944 },
  { number: '03', src: '/audiobook/ch-03.mp3', approxSeconds: 1693 },
  { number: '04', src: '/audiobook/ch-04.mp3', approxSeconds: 989 },
  { number: '05', src: '/audiobook/ch-05.mp3', approxSeconds: 1696 },
  { number: '06', src: '/audiobook/ch-06.mp3', approxSeconds: 930 },
  { number: '07', src: '/audiobook/ch-07.mp3', approxSeconds: 1313 },
  { number: '08', src: '/audiobook/ch-08.mp3', approxSeconds: 1941 },
  { number: '09', src: '/audiobook/ch-09.mp3', approxSeconds: 1753 },
  { number: '10', src: '/audiobook/ch-10.mp3', approxSeconds: 729 },
];

export const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;

export const NARRATION_CREDIT = 'AI narration · OpenAI (onyx)';

export const TOTAL_SECONDS = AUDIOBOOK.reduce((s, t) => s + t.approxSeconds, 0);

export const formatClock = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};
