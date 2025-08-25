import { AudioContextProvider } from './AudioContextProvider';

export class GuitarSound {
  private audioContextProvider: AudioContextProvider;

  constructor() {
    this.audioContextProvider = AudioContextProvider.getInstance();
  }

  /**
   * Convert MIDI note number to frequency in Hz
   */
  private midiToFrequency(midiNote: number): number {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }

  /**
   * Play a guitar note with a plucked string sound
   */
  public async playNote(midiNote: number, duration: number = 2): Promise<void> {
    // Get audio context asynchronously
    const audioContext = await this.audioContextProvider.getAudioContext();
    const now = audioContext.currentTime;
    const frequency = this.midiToFrequency(midiNote);

    // Create oscillators for fundamental and harmonics
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // Fundamental frequency and harmonics for guitar-like timbre
    const harmonics = [
      { freq: 1, amp: 1.0 }, // Fundamental
      { freq: 2, amp: 0.5 }, // 2nd harmonic (octave)
      { freq: 3, amp: 0.3 }, // 3rd harmonic
      { freq: 4, amp: 0.2 }, // 4th harmonic
      { freq: 5, amp: 0.15 }, // 5th harmonic
      { freq: 6, amp: 0.1 }, // 6th harmonic
      { freq: 7, amp: 0.08 }, // 7th harmonic
      { freq: 8, amp: 0.05 }, // 8th harmonic
    ];

    // Master gain for overall volume
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.3, now);

    // Create ADSR envelope for plucked string effect
    // Attack: Very fast (0.005s)
    // Decay: Fast (0.1s)
    // Sustain: Low level (0.2)
    // Release: Natural decay over duration
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.005); // Attack
    masterGain.gain.exponentialRampToValueAtTime(0.06, now + 0.1); // Decay to sustain
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release

    // Add a slight pitch bend at the start for realism
    const pitchBend = audioContext.createGain();
    pitchBend.gain.setValueAtTime(1.02, now);
    pitchBend.gain.exponentialRampToValueAtTime(1, now + 0.05);

    // Create low-pass filter to simulate string damping
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + duration);
    filter.Q.setValueAtTime(1, now);

    // Create oscillators for each harmonic
    harmonics.forEach((harmonic) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      // Use sine waves for a warmer, more guitar-like tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * harmonic.freq, now);

      // Apply pitch bend
      const bentFreq = frequency * harmonic.freq * pitchBend.gain.value;
      osc.frequency.setValueAtTime(bentFreq, now);
      osc.frequency.exponentialRampToValueAtTime(
        frequency * harmonic.freq,
        now + 0.05
      );

      // Set harmonic amplitude
      gain.gain.setValueAtTime(harmonic.amp, now);

      // Harmonics decay faster than fundamental
      const decayFactor = 1 / (harmonic.freq * 0.5);
      gain.gain.exponentialRampToValueAtTime(
        harmonic.amp * 0.01 * decayFactor,
        now + duration * decayFactor
      );

      // Connect oscillator -> gain -> filter
      osc.connect(gain);
      gain.connect(filter);

      oscillators.push(osc);
      gains.push(gain);
    });

    // Add some noise for pick attack
    const noise = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * 0.05,
      audioContext.sampleRate
    );
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.1;
    }
    noise.buffer = noiseBuffer;

    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(3000, now);

    noise.connect(noiseGain);
    noiseGain.connect(noiseFilter);
    noiseFilter.connect(filter);

    // Connect filter -> master gain -> destination
    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    // Start all oscillators and noise
    oscillators.forEach((osc) => {
      osc.start(now);
      osc.stop(now + duration);
    });

    noise.start(now);
    noise.stop(now + 0.05);

    // Clean up after the note finishes
    setTimeout(
      () => {
        oscillators.forEach((osc) => osc.disconnect());
        gains.forEach((gain) => gain.disconnect());
        filter.disconnect();
        masterGain.disconnect();
        noise.disconnect();
        noiseGain.disconnect();
        noiseFilter.disconnect();
      },
      (duration + 0.1) * 1000
    );
  }
}
