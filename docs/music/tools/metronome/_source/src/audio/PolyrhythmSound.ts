import type { LayerSound } from '../types/polyrhythm';

interface ScheduledSound {
  source: AudioBufferSourceNode;
  gainNode: GainNode;
  startTime: number;
}

export class PolyrhythmSound {
  private audioContext: AudioContext;
  private sounds: Map<LayerSound, AudioBuffer> = new Map();
  private scheduledSounds: ScheduledSound[] = [];

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.createSounds();
  }

  private createSounds(): void {
    // Click - standard metronome click
    this.createSound('click', 1000, 0.05, 'sine');

    // Accent - higher pitched click
    this.createSound('accent', 1500, 0.05, 'sine');

    // Woodblock - shorter, higher frequency
    this.createSound('woodblock', 2000, 0.03, 'sine', 15);

    // Cowbell - metallic sound with overtones
    this.createSound('cowbell', 800, 0.1, 'triangle', 8);

    // Hi-hat - noise-based sound
    this.createNoiseSound('hihat', 0.05);

    // Rimshot - combination of tone and noise
    this.createRimshotSound();
  }

  private createSound(
    name: LayerSound,
    frequency: number,
    duration: number,
    waveform: OscillatorType,
    decayRate: number = 10
  ): void {
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(2, numSamples, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-decayRate * t);

        let sample = 0;
        switch (waveform) {
          case 'sine':
            sample = Math.sin(2 * Math.PI * frequency * t);
            break;
          case 'triangle':
            sample =
              (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t));
            break;
          case 'square':
            sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
            break;
          case 'sawtooth':
            sample = 2 * ((t * frequency) % 1) - 1;
            break;
        }

        channelData[i] = sample * envelope * 0.8;
      }
    }

    this.sounds.set(name, buffer);
  }

  private createNoiseSound(name: LayerSound, duration: number): void {
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(2, numSamples, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-35 * t); // Fast decay for hi-hat
        const noise = Math.random() * 2 - 1;
        channelData[i] = noise * envelope * 0.5;
      }
    }

    this.sounds.set(name, buffer);
  }

  private createRimshotSound(): void {
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.06;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(2, numSamples, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-20 * t);

        // Mix of tone and noise
        const tone = Math.sin(2 * Math.PI * 200 * t) * 0.7;
        const noise = (Math.random() * 2 - 1) * 0.3;

        channelData[i] = (tone + noise) * envelope * 0.8;
      }
    }

    this.sounds.set('rimshot', buffer);
  }

  play(
    sound: LayerSound,
    time: number,
    velocity: number = 1.0,
    pitch: number = 1.0
  ): void {
    const buffer = this.sounds.get(sound);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    // Adjust gain based on velocity (0-1 range)
    gainNode.gain.value = velocity * 0.8;

    // Apply pitch adjustment
    source.playbackRate.value = pitch;

    // Connect nodes
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Store scheduled sound
    const scheduledSound = { source, gainNode, startTime: time };
    this.scheduledSounds.push(scheduledSound);

    // Remove from tracking when it ends and cleanup
    source.onended = () => {
      const index = this.scheduledSounds.indexOf(scheduledSound);
      if (index > -1) {
        this.scheduledSounds.splice(index, 1);
      }
      // Disconnect nodes for garbage collection
      try {
        source.disconnect();
        gainNode.disconnect();
      } catch {
        // Ignore errors
      }
    };

    // Schedule playback
    source.start(time);
  }

  // Stop all scheduled sounds
  stopAll(): void {
    // Mute and cleanup all scheduled sounds
    this.scheduledSounds.forEach(({ source, gainNode }) => {
      try {
        // Immediately mute the sound
        gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        
        // Try to stop the source (works if not yet started)
        source.stop(0);
      } catch {
        // Ignore errors - source may have already ended or started
      }
      
      // Disconnect nodes for cleanup
      try {
        source.disconnect();
        gainNode.disconnect();
      } catch {
        // Ignore errors
      }
    });
    this.scheduledSounds = [];
  }
}
