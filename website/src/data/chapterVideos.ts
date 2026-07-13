/**
 * Per-chapter explainer videos (produced in `remotion/`, published cut also
 * committed to `launch-assets/`). Sparse on purpose — only chapters with a
 * rendered video get an entry; `chapterVideoFor` returns undefined for the
 * rest, and callers should skip the video block entirely rather than fake one.
 */
export type ChapterVideo = {
  chapterSlug: string;
  /** Site-relative path under website/public/. */
  src: string;
  poster: string;
  durationSeconds: number;
  width: number;
  height: number;
  /** ISO date the cut was rendered/published (from the ROADMAP entry, not invented). */
  uploadDate: string;
  description: string;
};

export const chapterVideos: ChapterVideo[] = [
  {
    chapterSlug: 'the-shift',
    src: '/video/chapter-01-the-shift.mp4',
    poster: '/video/chapter-01-poster.png',
    durationSeconds: 34,
    width: 1920,
    height: 1080,
    uploadDate: '2026-07-13',
    description:
      "A 34-second explainer of the assistant / copilot / delegate framework that opens the book, " +
      'including the Anthropic quote it draws on — source-anchored to the same video-timestamp ' +
      'anchor as the claims ledger entry.',
  },
];

export const chapterVideoFor = (chapterSlug: string): ChapterVideo | undefined =>
  chapterVideos.find((v) => v.chapterSlug === chapterSlug);
