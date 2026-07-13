import type { ChapterVideo } from '../../data/chapterVideos';

/** Native HTML5 video — no player library, so it renders (and is crawlable) in the static HTML. */
export const ChapterExplainerVideo = ({ video }: { video: ChapterVideo }) => (
  <div className="w-full py-12 lg:py-16 px-6 flex flex-col items-center border-b border-[var(--color-border)] bg-[#1F1D1B]">
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-6 text-center">
      {video.durationSeconds}-second explainer
    </div>
    <video
      controls
      preload="metadata"
      poster={video.poster}
      width={video.width}
      height={video.height}
      className="w-full max-w-[900px] rounded-md shadow-2xl"
    >
      <source src={video.src} type="video/mp4" />
    </video>
  </div>
);
