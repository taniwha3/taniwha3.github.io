/**
 * AudioContextProvider - Singleton pattern for Web Audio API context
 * Ensures we only have one AudioContext instance throughout the app
 */
export class AudioContextProvider {
  private static instance: AudioContextProvider;
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private isUnlocked = false;

  private constructor() {}

  static getInstance(): AudioContextProvider {
    if (!AudioContextProvider.instance) {
      AudioContextProvider.instance = new AudioContextProvider();
    }
    return AudioContextProvider.instance;
  }

  /**
   * Initialize or get the AudioContext
   * Handles browser restrictions on AudioContext creation
   */
  async getAudioContext(): Promise<AudioContext> {
    if (!this.audioContext) {
      // Use standard AudioContext, fallback to webkit for Safari
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) {
        throw new Error('Web Audio API is not supported in this browser');
      }

      this.audioContext = new AudioContextClass({
        latencyHint: 'interactive',
        // Omit sampleRate to use device default and avoid resampling artifacts
      });
    }

    // Handle suspended state (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.isInitialized = true;
    return this.audioContext;
  }

  /**
   * Explicitly unlock the AudioContext on user gesture
   * Required for iOS/Safari and some browsers with autoplay policies
   */
  async unlock(): Promise<void> {
    if (this.isUnlocked) return;

    try {
      // Get or create context
      const ctx = await this.getAudioContext();
      
      // Resume if suspended
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Create a silent buffer to trigger the context
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      
      // Mark as unlocked
      this.isUnlocked = true;
    } catch (error) {
      console.error('Failed to unlock AudioContext:', error);
      throw error;
    }
  }

  /**
   * Ensure AudioContext is initialized and running
   * Call this before any audio operations
   */
  async ensureInitialized(): Promise<AudioContext> {
    const ctx = await this.getAudioContext();
    
    if (!this.isUnlocked) {
      await this.unlock();
    }
    
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    return ctx;
  }

  /**
   * Get current audio time
   */
  getCurrentTime(): number {
    if (!this.audioContext) {
      return 0;
    }
    return this.audioContext.currentTime;
  }

  /**
   * Suspend audio context (pause)
   */
  async suspend(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'running') {
      await this.audioContext.suspend();
    }
  }

  /**
   * Resume audio context
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Close and cleanup audio context
   */
  async close(): Promise<void> {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      await this.audioContext.close();
      this.audioContext = null;
      this.isInitialized = false;
    }
  }

  /**
   * Check if audio context is initialized and running
   */
  isRunning(): boolean {
    return (
      this.isInitialized &&
      this.audioContext !== null &&
      this.audioContext.state === 'running'
    );
  }

  /**
   * Check if audio context has been unlocked
   */
  getIsUnlocked(): boolean {
    return this.isUnlocked;
  }

  /**
   * Get sample rate
   */
  getSampleRate(): number {
    return this.audioContext?.sampleRate || 44100;
  }

  /**
   * Create an oscillator for click sounds
   */
  createOscillator(): OscillatorNode | null {
    if (!this.audioContext) return null;
    return this.audioContext.createOscillator();
  }

  /**
   * Create a gain node for volume control
   */
  createGain(): GainNode | null {
    if (!this.audioContext) return null;
    return this.audioContext.createGain();
  }

  /**
   * Get the destination node (speakers)
   */
  getDestination(): AudioDestinationNode | null {
    return this.audioContext?.destination || null;
  }

  /**
   * Synchronously get context if already initialized
   * @throws Error if context not initialized
   */
  getContext(): AudioContext {
    if (!this.audioContext) {
      throw new Error(
        'AudioContext not initialized. Call getAudioContext() first.'
      );
    }
    return this.audioContext;
  }
}

// Export singleton instance getter for convenience
export const getAudioContext = async (): Promise<AudioContext> => {
  return AudioContextProvider.getInstance().getAudioContext();
};
