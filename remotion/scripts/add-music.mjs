#!/usr/bin/env node
// Lays a book's background track (public/music/book{1,2,3}.m4a) under explainer
// mp4s, in place. The compositions render silent; this is the only audio.
// The track is slowed to end just before the video does, faded in and out, and
// normalised to about -17 LUFS. The video stream is copied, not re-encoded.
// Run via `npm run music:explainers -- <book> <file.mp4> [...]`.
import { execFileSync } from 'node:child_process';
import { existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

const seconds = (file) =>
  parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }));

/** Mix book `book`'s track into `mp4`, replacing its audio stream. */
export const addMusic = (book, mp4) => {
  const track = join(ROOT, 'public', 'music', `book${book}.m4a`);
  if (!existsSync(track)) throw new Error(`no track for book ${book}: ${track}`);
  const video = seconds(mp4);
  // The generated tracks resolve about 30.5 s in; stretch that to the video's end.
  const tempo = Math.min(1, Math.max(0.5, 30.5 / video)).toFixed(4);
  const fadeOut = (video - 1.8).toFixed(2);
  const tmp = mp4.replace(/\.mp4$/, '.music.tmp.mp4');
  execFileSync('ffmpeg', [
    '-loglevel', 'error', '-y', '-i', mp4, '-i', track,
    '-filter_complex',
    `[1:a]atempo=${tempo},atrim=0:${video},afade=t=in:d=0.6,afade=t=out:st=${fadeOut}:d=1.8,loudnorm=I=-18:TP=-1.5:LRA=11,aresample=48000[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-ac', '2',
    '-movflags', '+faststart', '-shortest', tmp,
  ]);
  renameSync(tmp, mp4);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const [book, ...files] = process.argv.slice(2);
  if (!/^[123]$/.test(book ?? '') || files.length === 0) {
    console.error('usage: add-music.mjs <1|2|3> <file.mp4> [...]');
    process.exit(1);
  }
  for (const f of files) {
    addMusic(book, f);
    console.log(`music: ${f}`);
  }
}
