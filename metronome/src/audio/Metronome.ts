import { Scheduler } from './Scheduler';
import { ClickSound } from './ClickSound';
import { AudioContextProvider } from './AudioContextProvider';
import { PolyrhythmSound } from './PolyrhythmSound';
import { debugLog } from '../utils/debug';
import type { Bar } from '../components/Timeline';
import type { PolyrhythmLayer } from '../types/polyrhythm';

export interface MetronomeOptions {
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  tempoMap?: Bar[];
  polyrhythmLayers?: PolyrhythmLayer[];
  onBeat?: (beatNumber: number, isAccent: boolean) => void;
  onPolyrhythmBeat?: (layerId: string, beatIndex: number) => void;
}

export class Metronome {
  private scheduler: Scheduler;
  private clickSound: ClickSound | null = null;
  private polyrhythmSound: PolyrhythmSound | null = null;
  private audioContext: AudioContext | null = null;
  private options: MetronomeOptions;
  private currentBeat: number = 0;
  private currentBar: number = 0;
  private isPlaying: boolean = false;
  private nextBeatTime: number = 0;
  private nextPolyrhythmTimes: Map<string, number> = new Map();
  private polyrhythmSubdivisionIndices: Map<string, number> = new Map();
  private scheduleIntervalId: string | null = null;
  private isInitialized: boolean = false;
  private lookAheadTime: number = 0.1; // Default 100ms look-ahead
  private scheduleInterval: number = 25; // Default 25ms scheduler interval

  constructor(options: MetronomeOptions) {
    this.options = options;
    this.scheduler = new Scheduler();

    // Set up visibility change listener
    this.setupVisibilityListener();
  }

  private visibilityHandler = () => {
    const wasHidden = this.lookAheadTime > 0.5; // Check if we were hidden before
    
    if (document.hidden) {
      // Increase look-ahead time and reduce scheduler frequency when tab is hidden
      this.lookAheadTime = 1.5; // 1.5 seconds
      this.scheduleInterval = 100; // Check every 100ms instead of 25ms
    } else {
      // Restore normal look-ahead and scheduler frequency when tab is visible
      this.lookAheadTime = 0.1; // 100ms
      this.scheduleInterval = 25; // Check every 25ms
    }
    
    // If playing and visibility changed, restart scheduler with new interval
    if (this.isPlaying && wasHidden !== document.hidden) {
      this.restartScheduler();
    }
  };

  private setupVisibilityListener(): void {
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const provider = AudioContextProvider.getInstance();
    this.audioContext = await provider.getAudioContext();
    this.clickSound = new ClickSound(this.audioContext);
    this.polyrhythmSound = new PolyrhythmSound(this.audioContext);
    this.isInitialized = true;
  }

  private getCurrentBar(): Bar | null {
    if (!this.options.tempoMap || this.options.tempoMap.length === 0) {
      return null;
    }
    return this.options.tempoMap[
      this.currentBar % this.options.tempoMap.length
    ];
  }

  private calculateBeatDuration(): number {
    // Use tempo from tempo map if available
    const currentBar = this.getCurrentBar();
    const tempo = currentBar ? currentBar.tempo : this.options.tempo;

    debugLog(
      'Current bar:',
      this.currentBar,
      'Tempo:',
      tempo,
      'Bar data:',
      currentBar
    );

    // Calculate duration of one beat in seconds
    const beatsPerSecond = tempo / 60;
    return 1 / beatsPerSecond;
  }

  private getTimeSignature(): { numerator: number; denominator: number } {
    const currentBar = this.getCurrentBar();
    return currentBar ? currentBar.timeSignature : this.options.timeSignature;
  }

  private scheduleNextBeat(): void {
    if (!this.audioContext || !this.clickSound) return;

    const currentTime = this.audioContext.currentTime;

    // Schedule beats that fall within the look-ahead time
    while (this.nextBeatTime < currentTime + this.lookAheadTime) {
      const timeSignature = this.getTimeSignature();
      const beatInMeasure = this.currentBeat % timeSignature.numerator;
      const isAccent = beatInMeasure === 0;

      debugLog(
        'Beat:',
        this.currentBeat,
        'Beat in measure:',
        beatInMeasure,
        'Time sig:',
        timeSignature.numerator
      );

      // Play the click sound
      if (isAccent) {
        this.clickSound!.playAccent(this.nextBeatTime);
      } else {
        this.clickSound!.playNormal(this.nextBeatTime);
      }

      // Schedule visual callback
      if (this.options.onBeat) {
        const beatNumber = beatInMeasure + 1;
        // Convert audio time to scheduler time for visual callback
        // nextBeatTime is in audio time (audioContext.currentTime based)
        // scheduler.scheduleEvent expects scheduler time (performance.now() based)
        const schedulerTime = this.scheduler.getCurrentTime();
        const audioTimeOffset = this.nextBeatTime - this.audioContext.currentTime;
        const schedulerEventTime = schedulerTime + audioTimeOffset;

        this.scheduler.scheduleEvent(schedulerEventTime, () => {
          // Only fire callback if still playing
          if (this.isPlaying) {
            this.options.onBeat?.(beatNumber, isAccent);
          }
        });
      }

      // Advance to next beat
      this.currentBeat++;

      // Check if we've completed a bar
      if (beatInMeasure === timeSignature.numerator - 1) {
        this.currentBar++;
        debugLog(
          'Advanced to bar:',
          this.currentBar,
          'Total bars:',
          this.options.tempoMap?.length
        );
      }

      // Calculate next beat time with current tempo
      const beatDuration = this.calculateBeatDuration();
      this.nextBeatTime += beatDuration;
    }
  }

  private schedulePolyrhythmBeats(): void {
    if (
      !this.audioContext ||
      !this.polyrhythmSound ||
      !this.options.polyrhythmLayers
    )
      return;

    const currentTime = this.audioContext.currentTime;
    const beatDuration = this.calculateBeatDuration();
    const timeSignature = this.getTimeSignature();
    const barDuration = beatDuration * timeSignature.numerator;

    // Check if we need to advance to the next bar based on the main beat timing
    while (this.nextBeatTime < currentTime + this.lookAheadTime) {
      const beatInMeasure = this.currentBeat % timeSignature.numerator;

      // Advance beat counter
      this.currentBeat++;

      // Check if we've completed a bar
      if (beatInMeasure === timeSignature.numerator - 1) {
        this.currentBar++;
        debugLog(
          'Advanced to bar:',
          this.currentBar,
          'Total bars:',
          this.options.tempoMap?.length
        );
      }

      // Move to next beat time
      this.nextBeatTime += beatDuration;
    }

    // Schedule each layer's beats
    this.options.polyrhythmLayers.forEach((layer) => {
      if (layer.muted) return;

      const subdivisionDuration = barDuration / layer.subdivision;
      let nextTime = this.nextPolyrhythmTimes.get(layer.id) || currentTime;
      let subdivisionIndex =
        this.polyrhythmSubdivisionIndices.get(layer.id) || 0;

      // Schedule beats within look-ahead time
      while (nextTime < currentTime + this.lookAheadTime) {
        // Check if this subdivision is active
        if (layer.pattern[subdivisionIndex]) {
          const velocity = layer.velocities[subdivisionIndex];
          const currentSubdivisionIndex = subdivisionIndex; // Capture current index

          // Calculate the actual play time based on alignment
          let playTime = nextTime;
          if ((layer.alignment || 'edge') === 'center') {
            // For centered alignment, offset by half a subdivision
            playTime = nextTime + subdivisionDuration / 2;
          }

          // Play the sound
          this.polyrhythmSound!.play(
            layer.sound,
            playTime,
            velocity,
            layer.pitch
          );

          // Schedule visual feedback
          if (this.options.onPolyrhythmBeat) {
            // Convert audio time to scheduler time for visual callback
            // playTime is in audio time (audioContext.currentTime based)
            // scheduler.scheduleEvent expects scheduler time (performance.now() based)
            const schedulerTime = this.scheduler.getCurrentTime();
            const audioTimeOffset = playTime - this.audioContext!.currentTime;
            const schedulerEventTime = schedulerTime + audioTimeOffset;

            this.scheduler.scheduleEvent(schedulerEventTime, () => {
              if (this.isPlaying) {
                this.options.onPolyrhythmBeat?.(
                  layer.id,
                  currentSubdivisionIndex
                );
              }
            });
          }
        }

        // Move to next subdivision
        subdivisionIndex = (subdivisionIndex + 1) % layer.subdivision;
        nextTime += subdivisionDuration;
      }

      // Update state for this layer
      this.nextPolyrhythmTimes.set(layer.id, nextTime);
      this.polyrhythmSubdivisionIndices.set(layer.id, subdivisionIndex);
    });
  }

  async start(): Promise<void> {
    if (this.isPlaying) return;

    // Ensure initialization
    await this.initialize();

    if (!this.audioContext) return;

    this.isPlaying = true;
    this.currentBeat = 0;
    this.currentBar = 0; // Reset bar counter
    this.nextBeatTime = this.audioContext.currentTime + 0.1; // Start slightly in the future

    // Start the scheduler
    await this.scheduler.start();

    // Initialize polyrhythm times if needed
    if (
      this.options.polyrhythmLayers &&
      this.options.polyrhythmLayers.length > 0
    ) {
      const startTime = this.audioContext.currentTime + 0.1;
      this.nextBeatTime = startTime; // Sync main beat with polyrhythm

      this.options.polyrhythmLayers.forEach((layer) => {
        // Start all layers at the same base time
        // The alignment offset will be applied during scheduling
        this.nextPolyrhythmTimes.set(layer.id, startTime);
        this.polyrhythmSubdivisionIndices.set(layer.id, 0);
      });
    }

    // Schedule beats at regular intervals
    this.scheduleIntervalId = this.scheduler.scheduleRepeatingEvent(
      () => {
        if (
          !this.options.polyrhythmLayers ||
          this.options.polyrhythmLayers.length === 0
        ) {
          debugLog('Using regular beat scheduling');
          this.scheduleNextBeat();
        } else {
          debugLog('Using polyrhythm beat scheduling');
          this.schedulePolyrhythmBeats();
        }
      },
      this.scheduleInterval // Use dynamic interval based on visibility
    );
  }

  private restartScheduler(): void {
    if (!this.isPlaying || !this.scheduleIntervalId) return;
    
    // Cancel current scheduler
    this.scheduler.cancelEvent(this.scheduleIntervalId);
    
    // Restart with new interval
    this.scheduleIntervalId = this.scheduler.scheduleRepeatingEvent(
      () => {
        if (
          !this.options.polyrhythmLayers ||
          this.options.polyrhythmLayers.length === 0
        ) {
          debugLog('Using regular beat scheduling');
          this.scheduleNextBeat();
        } else {
          debugLog('Using polyrhythm beat scheduling');
          this.schedulePolyrhythmBeats();
        }
      },
      this.scheduleInterval
    );
  }

  stop(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    // Cancel the scheduling interval
    if (this.scheduleIntervalId) {
      this.scheduler.cancelEvent(this.scheduleIntervalId);
      this.scheduleIntervalId = null;
    }

    // Stop the scheduler (this clears all scheduled events)
    this.scheduler.stop();

    // Stop all scheduled sounds
    if (this.clickSound) {
      this.clickSound.stopAll();
    }
    if (this.polyrhythmSound) {
      this.polyrhythmSound.stopAll();
    }

    // Reset timing for clean restart
    this.currentBeat = 0;
    this.currentBar = 0;
    this.nextBeatTime = 0;
    this.nextPolyrhythmTimes.clear();
    this.polyrhythmSubdivisionIndices.clear();
  }

  pause(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    // Cancel scheduling but keep scheduler paused
    if (this.scheduleIntervalId) {
      this.scheduler.cancelEvent(this.scheduleIntervalId);
      this.scheduleIntervalId = null;
    }

    this.scheduler.pause();
  }

  resume(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.scheduler.resume();

    // Restart scheduling
    this.scheduleIntervalId = this.scheduler.scheduleRepeatingEvent(() => {
      if (
        !this.options.polyrhythmLayers ||
        this.options.polyrhythmLayers.length === 0
      ) {
        this.scheduleNextBeat();
      } else {
        this.schedulePolyrhythmBeats();
      }
    }, 25);
  }

  setTempo(tempo: number): void {
    this.options.tempo = tempo;

    // If playing, we need to recalculate next beat time
    if (this.isPlaying && this.audioContext) {
      const beatDuration = this.calculateBeatDuration();
      const currentTime = this.audioContext.currentTime;

      // Adjust next beat time to maintain rhythm continuity
      const beatsSinceLastSchedule = Math.floor(
        (currentTime - this.nextBeatTime) / beatDuration
      );
      if (beatsSinceLastSchedule > 0) {
        this.nextBeatTime += beatsSinceLastSchedule * beatDuration;
        this.currentBeat += beatsSinceLastSchedule;
      }
    }
  }

  setTimeSignature(numerator: number, denominator: number): void {
    this.options.timeSignature = { numerator, denominator };

    // Reset beat counter to start of measure
    if (this.isPlaying) {
      this.currentBeat = 0;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  setTempoMap(tempoMap: Bar[]): void {
    debugLog('Setting tempo map:', tempoMap);
    this.options.tempoMap = tempoMap;
    // Don't reset if playing, let the changes take effect on next bar
  }

  setPolyrhythmLayers(layers: PolyrhythmLayer[]): void {
    this.options.polyrhythmLayers = layers;
    // Reset polyrhythm timings when layers change
    if (this.isPlaying && this.audioContext) {
      this.nextPolyrhythmTimes.clear();
      this.polyrhythmSubdivisionIndices.clear();
      const currentTime = this.audioContext.currentTime + 0.1;

      layers.forEach((layer) => {
        this.nextPolyrhythmTimes.set(layer.id, currentTime);
        this.polyrhythmSubdivisionIndices.set(layer.id, 0);
      });
    }
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    this.stop();
    this.scheduler.cleanup();
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  }
}
