// Adapted from isatimur/bookshelf@c2a5909 (audio.ts).
// ScrollAudioFeedback provides a low-cost mechanical/paper tick on demand.
export class ScrollAudioFeedback {
  private audioCtx: AudioContext | null = null;
  private lastTickTime = 0;
  private lastOut = 0;

  public initialize() {
    if (typeof window === 'undefined') return;
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) this.audioCtx = new Ctx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playTick(intensity: number = 0.015) {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const now = this.audioCtx.currentTime;
    if (now - this.lastTickTime < 0.05) return;
    this.lastTickTime = now;

    const bufferSize = this.audioCtx.sampleRate * 0.04;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (this.lastOut = this.lastOut * 0.8 + white * 0.2);
    }

    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(0.5, now);

    const gainNode = this.audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(intensity, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + 0.04);
  }
}

export const scrollAudio = new ScrollAudioFeedback();
