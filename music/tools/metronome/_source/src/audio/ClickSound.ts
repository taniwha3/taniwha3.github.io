interface ScheduledSound {
  source: AudioBufferSourceNode;
  gainNode: GainNode;
  filter: BiquadFilterNode;
  startTime: number;
}

export class ClickSound {
  private audioContext: AudioContext;
  private clickBuffer: AudioBuffer | null = null;
  private scheduledSounds: ScheduledSound[] = [];

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.createDefaultClick();
  }

  private createDefaultClick(): void {
    // Create a simple sine wave click sound
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.05; // 50ms click (longer for better audibility)
    const numSamples = Math.floor(sampleRate * duration);

    // Create buffer with 2 channels
    this.clickBuffer = this.audioContext.createBuffer(
      2,
      numSamples,
      sampleRate
    );

    // Fill buffer with exponentially decaying sine wave
    for (let channel = 0; channel < 2; channel++) {
      const channelData = this.clickBuffer.getChannelData(channel);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const frequency = 1000; // 1kHz click
        const envelope = Math.exp(-10 * t); // Less aggressive decay
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.8; // Higher volume
      }
    }
  }

  play(time: number, velocity: number = 1.0): void {
    if (!this.clickBuffer) {
      console.error('No click buffer available!');
      return;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    // Configure highpass filter for click articulation
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    // Set initial gain based on velocity (ensure positive value for exponential ramp)
    const v = Math.max(0.001, velocity);
    gainNode.gain.value = v;
    
    // Add short exponential envelope to reduce clicks/pops
    gainNode.gain.setValueAtTime(v, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    // Connect nodes: source -> filter -> gain -> destination
    source.buffer = this.clickBuffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Store scheduled sound
    const scheduledSound = { source, gainNode, filter, startTime: time };
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
        filter.disconnect();
        gainNode.disconnect();
      } catch {
        // Ignore errors
      }
    };

    // Schedule playback
    source.start(time);
  }

  // Create accent and normal click methods
  playAccent(time: number): void {
    this.play(time, 1.0); // Higher volume for accent
  }

  playNormal(time: number, velocity: number = 0.7): void {
    this.play(time, velocity); // Normal volume
  }

  // Stop all scheduled sounds
  stopAll(): void {
    // We can stop future-scheduled buffer sources; also mute immediately for safety
    this.scheduledSounds.forEach(({ source, gainNode, filter }) => {
      try {
        // Immediately mute the sound
        const now = this.audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(0, now);

        // Stop the source (cancels future playback if not started yet)
        source.stop(0);
      } catch {
        // Ignore errors - source may have already ended or not been started
      }

      // Disconnect nodes for cleanup
      try {
        source.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      try {
        filter.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      try {
        gainNode.disconnect();
      } catch {
        // Ignore disconnect errors
      }
    });
    this.scheduledSounds = [];
  }
}
