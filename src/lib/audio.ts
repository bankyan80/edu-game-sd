class AudioManager {
  private _muted = false;
  private _volume = 0.7;

  get muted() { return this._muted; }
  get volume() { return this._volume; }

  setMuted(v: boolean) { this._muted = v; }
  setVolume(v: number) { this._volume = v; }
  toggleMute() { this._muted = !this._muted; return this._muted; }

  private beep(freq: number, dur: number, type: string = "sine", vol: number = 0.3) {
    if (this._muted || typeof window === "undefined") return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = this._volume * vol;
      osc.frequency.value = freq;
      osc.type = type as OscillatorType;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.stop(ctx.currentTime + dur);
    } catch {}
  }

  playCorrect() { this.beep(523, 0.15); }
  playWrong() { this.beep(200, 0.3, "sawtooth"); }
  playLevelUp() { this.beep(659, 0.3); }
  playGameOver() { this.beep(200, 0.5, "sawtooth", 0.2); }
  playVictory() { this.beep(784, 0.4); setTimeout(() => this.beep(1047, 0.3), 150); }
  playClick() { this.beep(800, 0.05); }
  playCombo() { this.beep(880, 0.2); }
  playPerfect() { this.beep(1047, 0.4); setTimeout(() => this.beep(1319, 0.3), 200); }
}

export const audioManager = new AudioManager();
