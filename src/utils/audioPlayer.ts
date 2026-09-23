// Interactive Web Audio API music-box for Agatha's Birthday
// Provides smooth, immediate mobile and desktop playback with rich kalimba/music-box chime harmonics.

class BirthdayAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerIds: number[] = [];
  private listeners = new Set<(playing: boolean) => void>();
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private hasMp3 = false;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Check if custom mp3 exists (relative for GitHub Pages support)
      const base = import.meta.env.BASE_URL || './';
      const songPath = base.endsWith('/') ? `${base}birthday-song.mp3` : `${base}/birthday-song.mp3`;
      this.audioEl = new Audio(songPath);
      this.audioEl.loop = true;
      this.audioEl.preload = 'metadata';

      this.audioEl.addEventListener('error', () => {
        this.hasMp3 = false;
      });

      this.audioEl.addEventListener('canplaythrough', () => {
        this.hasMp3 = true;
      });
    }
  }

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify(playing: boolean) {
    this.isPlaying = playing;
    this.listeners.forEach((cb) => {
      try {
        cb(playing);
      } catch (err) {
        console.error(err);
      }
    });
  }

  public initContext() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      
      // Warm lowpass filter to produce cozy music-box acoustic timbre
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(2800, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext init failed', e);
    }
  }

  // Play a music-box chime with harmonic pings
  private playChimeNote(freq: number, startTime: number, duration: number = 0.9) {
    if (!this.ctx || !this.filterNode) return;

    // Fundamental sine
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    gain1.gain.setValueAtTime(0, startTime);
    gain1.gain.linearRampToValueAtTime(0.28, startTime + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(gain1);
    gain1.connect(this.filterNode);

    osc1.start(startTime);
    osc1.stop(startTime + duration + 0.1);

    // Overtone harmonic for the classic music-box bell chime ping
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    gain2.gain.setValueAtTime(0, startTime);
    gain2.gain.linearRampToValueAtTime(0.09, startTime + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.45);

    osc2.connect(gain2);
    gain2.connect(this.filterNode);

    osc2.start(startTime);
    osc2.stop(startTime + duration * 0.5 + 0.1);

    // Subtle 3rd harmonic high sparkle
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(freq * 3, startTime);

    gain3.gain.setValueAtTime(0, startTime);
    gain3.gain.linearRampToValueAtTime(0.035, startTime + 0.008);
    gain3.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.25);

    osc3.connect(gain3);
    gain3.connect(this.filterNode);

    osc3.start(startTime);
    osc3.stop(startTime + duration * 0.3 + 0.1);
  }

  private playMusicBoxMelody() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    this.isPlaying = true;
    this.notify(true);

    // Sweet Music Box arrangement of "Happy Birthday to You"
    // G4 G4 A4 G4 C5 B4 | G4 G4 A4 G4 D5 C5 | G4 G4 G5 E5 C5 B4 A4 | F5 F5 E5 C5 D5 C5
    const melody = [
      // Line 1: Hap-py birth-day to you
      { f: 392.00, d: 0.32, pause: 0.12 },
      { f: 392.00, d: 0.32, pause: 0.12 },
      { f: 440.00, d: 0.65, pause: 0.14 },
      { f: 392.00, d: 0.65, pause: 0.14 },
      { f: 523.25, d: 0.70, pause: 0.14 },
      { f: 493.88, d: 1.30, pause: 0.35 },

      // Line 2: Hap-py birth-day to you
      { f: 392.00, d: 0.32, pause: 0.12 },
      { f: 392.00, d: 0.32, pause: 0.12 },
      { f: 440.00, d: 0.65, pause: 0.14 },
      { f: 392.00, d: 0.65, pause: 0.14 },
      { f: 587.33, d: 0.70, pause: 0.14 },
      { f: 523.25, d: 1.30, pause: 0.35 },

      // Line 3: Hap-py birth-day dear A-ga-tha
      { f: 392.00, d: 0.32, pause: 0.12 },
      { f: 392.00, d: 0.32, pause: 0.12 },
      { f: 783.99, d: 0.75, pause: 0.14 },
      { f: 659.25, d: 0.75, pause: 0.14 },
      { f: 523.25, d: 0.70, pause: 0.14 },
      { f: 493.88, d: 0.70, pause: 0.14 },
      { f: 440.00, d: 1.30, pause: 0.35 },

      // Line 4: Hap-py birth-day to you!
      { f: 698.46, d: 0.35, pause: 0.12 },
      { f: 698.46, d: 0.35, pause: 0.12 },
      { f: 659.25, d: 0.75, pause: 0.14 },
      { f: 523.25, d: 0.75, pause: 0.14 },
      { f: 587.33, d: 0.80, pause: 0.16 },
      { f: 523.25, d: 1.80, pause: 1.20 }
    ];

    let now = this.ctx.currentTime + 0.08;
    let totalDuration = 0;

    melody.forEach((note) => {
      this.playChimeNote(note.f, now, note.d + 0.3);
      const step = note.d + note.pause;
      now += step;
      totalDuration += step;
    });

    const loopTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playMusicBoxMelody();
      }
    }, totalDuration * 1000);

    this.timerIds.push(loopTimer);
  }

  public play() {
    this.initContext();

    if (this.hasMp3 && this.audioEl) {
      this.audioEl.play().then(() => {
        this.isPlaying = true;
        this.notify(true);
      }).catch(() => {
        // Fallback to music box synthesis
        this.playMusicBoxMelody();
      });
    } else {
      this.playMusicBoxMelody();
    }
  }

  public pause() {
    this.isPlaying = false;
    this.timerIds.forEach((id) => clearTimeout(id));
    this.timerIds = [];

    if (this.audioEl && !this.audioEl.paused) {
      this.audioEl.pause();
    }

    this.notify(false);
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const birthdayAudio = new BirthdayAudioManager();

// Backwards compatibility for existing imports
export const musicBoxSynth = {
  setListener: (cb: (playing: boolean) => void) => birthdayAudio.subscribe(cb),
  playHappyBirthdayLoop: () => birthdayAudio.play(),
  stop: () => birthdayAudio.pause(),
  getPlaying: () => birthdayAudio.getIsPlaying()
};
