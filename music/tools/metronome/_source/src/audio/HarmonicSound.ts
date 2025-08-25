import { AudioContextProvider } from './AudioContextProvider';

export class HarmonicSound {
  private audioContextProvider: AudioContextProvider;

  constructor() {
    this.audioContextProvider = AudioContextProvider.getInstance();
  }

  /**
   * Play the fundamental frequency with a rich, full tone
   */
  public async playFundamental(
    frequency: number,
    duration: number = 3
  ): Promise<void> {
    const audioContext = await this.audioContextProvider.getAudioContext();
    const now = audioContext.currentTime;

    // Create multiple oscillators for a richer fundamental
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // Master gain
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
    masterGain.gain.exponentialRampToValueAtTime(0.15, now + 0.5); // Decay
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release

    // Add slight detuning for richness
    const detuneAmounts = [0, -2, 2, -5, 5];

    detuneAmounts.forEach((detune, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);
      osc.detune.setValueAtTime(detune, now);

      // Slightly different amplitude for each oscillator
      gain.gain.setValueAtTime(index === 0 ? 0.5 : 0.125, now);

      osc.connect(gain);
      gain.connect(masterGain);

      oscillators.push(osc);
      gains.push(gain);
    });

    // Add low-pass filter for warmth
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(1, now);

    masterGain.connect(filter);
    filter.connect(audioContext.destination);

    // Start all oscillators
    oscillators.forEach((osc) => {
      osc.start(now);
      osc.stop(now + duration);
    });

    // Cleanup
    setTimeout(
      () => {
        oscillators.forEach((osc) => osc.disconnect());
        gains.forEach((gain) => gain.disconnect());
        masterGain.disconnect();
        filter.disconnect();
      },
      (duration + 0.1) * 1000
    );
  }

  /**
   * Play a pure harmonic tone
   */
  public async playHarmonic(
    frequency: number,
    harmonicNumber: number,
    duration: number = 2
  ): Promise<void> {
    const audioContext = await this.audioContextProvider.getAudioContext();
    const now = audioContext.currentTime;

    // Create oscillator for the harmonic
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Pure sine wave for clear harmonic
    oscillator.frequency.setValueAtTime(frequency, now);

    // Create gain envelope
    const gainNode = audioContext.createGain();

    // Adjust attack and amplitude based on harmonic number
    // Higher harmonics have faster attack and lower amplitude
    const attackTime = Math.max(0.001, 0.01 / Math.sqrt(harmonicNumber));
    const maxAmplitude = 0.3 / Math.sqrt(harmonicNumber);
    const sustainLevel = maxAmplitude * 0.7;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(maxAmplitude, now + attackTime); // Attack
    gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + 0.1); // Decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release

    // Add a subtle tremolo for higher harmonics to make them more audible
    if (harmonicNumber > 6) {
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();

      // More subtle depth that increases gradually
      const lfoDepth = 0.05 + (harmonicNumber - 6) * 0.02; // 5-15% depth

      lfo.frequency.setValueAtTime(4 + harmonicNumber * 0.5, now); // Faster tremolo for higher harmonics
      lfoGain.gain.setValueAtTime(Math.min(0.15, lfoDepth), now);

      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      lfo.start(now);
      lfo.stop(now + duration);

      // Cleanup LFO
      setTimeout(
        () => {
          lfo.disconnect();
          lfoGain.disconnect();
        },
        (duration + 0.1) * 1000
      );
    }

    // Add resonant filter to emphasize the harmonic
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(frequency, now);
    filter.Q.setValueAtTime(harmonicNumber * 2, now); // Higher Q for higher harmonics

    // Add a second filter for coloration
    const colorFilter = audioContext.createBiquadFilter();
    colorFilter.type = 'peaking';
    colorFilter.frequency.setValueAtTime(frequency, now);
    colorFilter.Q.setValueAtTime(2, now);
    colorFilter.gain.setValueAtTime(3, now);

    // Connect the audio graph
    oscillator.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(colorFilter);
    colorFilter.connect(audioContext.destination);

    // Also add a quiet fundamental to help perception
    if (harmonicNumber > 1) {
      const fundamentalOsc = audioContext.createOscillator();
      const fundamentalGain = audioContext.createGain();

      fundamentalOsc.type = 'sine';
      fundamentalOsc.frequency.setValueAtTime(frequency / harmonicNumber, now);

      // Very quiet fundamental, just for reference
      fundamentalGain.gain.setValueAtTime(0, now);
      fundamentalGain.gain.linearRampToValueAtTime(0.02, now + attackTime);
      fundamentalGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      fundamentalOsc.connect(fundamentalGain);
      fundamentalGain.connect(audioContext.destination);

      fundamentalOsc.start(now);
      fundamentalOsc.stop(now + duration);

      // Cleanup fundamental
      setTimeout(
        () => {
          fundamentalOsc.disconnect();
          fundamentalGain.disconnect();
        },
        (duration + 0.1) * 1000
      );
    }

    // Start and stop the main oscillator
    oscillator.start(now);
    oscillator.stop(now + duration);

    // Cleanup
    setTimeout(
      () => {
        oscillator.disconnect();
        gainNode.disconnect();
        filter.disconnect();
        colorFilter.disconnect();
      },
      (duration + 0.1) * 1000
    );
  }
}
