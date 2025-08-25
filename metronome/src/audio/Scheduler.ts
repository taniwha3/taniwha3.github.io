import { AudioContextProvider } from './AudioContextProvider';

export interface ScheduledEvent {
  time: number;
  callback: () => void;
  id: string;
}

export interface SchedulerOptions {
  lookAheadTime?: number; // How far ahead to schedule (ms)
  scheduleInterval?: number; // How often to check for events (ms)
  useAudioWorklet?: boolean;
}

/**
 * High-precision scheduler for audio events
 * Uses Web Audio API timing with look-ahead scheduling
 * 
 * IMPORTANT TIMING NOTES:
 * - This scheduler uses performance.now() for timing (scheduler time)
 * - All times in the Scheduler API are in seconds relative to scheduler start
 * - Audio events should be scheduled using audioContext.currentTime (audio time)
 * - The Metronome class handles conversion between scheduler time and audio time
 */
export class Scheduler {
  private audioContextProvider: AudioContextProvider;
  private scheduledEvents: ScheduledEvent[] = [];
  private isRunning = false;
  private schedulerTimer: number | null = null;
  private nextEventId = 0;

  // Configuration
  private lookAheadTime: number; // seconds
  private scheduleInterval: number; // milliseconds
  private useAudioWorklet: boolean;

  // Timing (all times are based on performance.now())
  private startTime = 0;        // performance.now() when scheduler started
  private pauseTime = 0;         // scheduler time when paused
  private audioStartTime = 0;    // audioContext.currentTime when started (for reference)

  constructor(options: SchedulerOptions = {}) {
    this.audioContextProvider = AudioContextProvider.getInstance();
    this.lookAheadTime = (options.lookAheadTime || 128) / 1000; // Convert to seconds
    this.scheduleInterval = options.scheduleInterval || 25; // Default 25ms
    this.useAudioWorklet = options.useAudioWorklet ?? false; // Default to false for now
  }

  /**
   * Start the scheduler
   */
  async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      const audioContext = await this.audioContextProvider.getAudioContext();
      this.audioStartTime = audioContext.currentTime || 0;
    } catch {
      // Fallback if audio context is not available
      this.audioStartTime = 0;
    }

    this.startTime = performance.now();
    this.isRunning = true;

    this.scheduleLoop();
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.schedulerTimer !== null) {
      clearTimeout(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    // Clear all scheduled events
    this.scheduledEvents = [];
  }

  /**
   * Pause the scheduler
   */
  pause(): void {
    if (!this.isRunning) return;

    this.pauseTime = this.getCurrentTime();
    this.isRunning = false;

    if (this.schedulerTimer !== null) {
      clearTimeout(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    // Don't clear scheduled events when pausing
  }

  /**
   * Resume from pause
   */
  async resume(): Promise<void> {
    if (this.isRunning) return;

    try {
      const audioContext = await this.audioContextProvider.getAudioContext();
      this.audioStartTime = audioContext.currentTime - this.pauseTime;
    } catch {
      // Fallback if audio context is not available
      this.audioStartTime = 0;
    }

    this.isRunning = true;
    this.startTime = performance.now() - this.pauseTime * 1000;
    this.scheduleLoop();
  }

  /**
   * Schedule an event at a specific time
   * @param time Time in seconds (relative to start)
   * @param callback Function to execute
   * @returns Event ID for cancellation
   */
  scheduleEvent(time: number, callback: () => void): string {
    const id = `event_${this.nextEventId++}`;
    const event: ScheduledEvent = { time, callback, id };

    // Insert in sorted order
    const insertIndex = this.scheduledEvents.findIndex((e) => e.time > time);
    if (insertIndex === -1) {
      this.scheduledEvents.push(event);
    } else {
      this.scheduledEvents.splice(insertIndex, 0, event);
    }

    return id;
  }

  /**
   * Cancel a scheduled event
   */
  cancelEvent(eventId: string): boolean {
    // Check if this is a repeating event
    if (eventId.startsWith('repeat_')) {
      const cancelFn = (this as Record<string, unknown>)[
        `cancel_${eventId}`
      ] as (() => void) | undefined;
      if (cancelFn) {
        cancelFn();
        delete (this as Record<string, unknown>)[`cancel_${eventId}`];
        return true;
      }
      return false;
    }

    // Handle regular events
    const index = this.scheduledEvents.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      this.scheduledEvents.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get current scheduler time in seconds
   * This is based on performance.now() and is relative to when the scheduler started
   * NOT the same as audioContext.currentTime
   */
  getCurrentTime(): number {
    if (!this.isRunning) return this.pauseTime;

    // Always use performance timer for consistency in tests
    return (performance.now() - this.startTime) / 1000;
  }

  /**
   * Alias for getCurrentTime() to make it clear this is scheduler time
   */
  getSchedulerTime(): number {
    return this.getCurrentTime();
  }

  /**
   * Convert audio time to scheduler time
   * @param audioTime Time from audioContext.currentTime
   * @returns Equivalent scheduler time
   */
  audioTimeToSchedulerTime(audioTime: number): number {
    // Calculate the offset between audio time and scheduler time
    const audioContext = this.audioContextProvider.getContext();
    const currentAudioTime = audioContext.currentTime;
    const currentSchedulerTime = this.getCurrentTime();
    
    // Convert the provided audio time to scheduler time
    const audioOffset = audioTime - currentAudioTime;
    return currentSchedulerTime + audioOffset;
  }

  /**
   * Convert scheduler time to audio time
   * @param schedulerTime Time from getCurrentTime()
   * @returns Equivalent audio time for scheduling audio events
   */
  schedulerTimeToAudioTime(schedulerTime: number): number {
    // Calculate the offset between scheduler time and audio time
    const audioContext = this.audioContextProvider.getContext();
    const currentAudioTime = audioContext.currentTime;
    const currentSchedulerTime = this.getCurrentTime();
    
    // Convert the provided scheduler time to audio time
    const schedulerOffset = schedulerTime - currentSchedulerTime;
    return currentAudioTime + schedulerOffset;
  }

  /**
   * The main scheduling loop
   */
  private scheduleLoop(): void {
    if (!this.isRunning) return;

    const currentTime = this.getCurrentTime();
    const scheduleUntilTime = currentTime + this.lookAheadTime;

    // Process events that should be scheduled
    while (
      this.scheduledEvents.length > 0 &&
      this.scheduledEvents[0].time <= scheduleUntilTime
    ) {
      const event = this.scheduledEvents.shift()!;
      const timeUntilEvent = Math.max(0, event.time - currentTime);

      // Schedule the callback
      if (this.useAudioWorklet) {
        // TODO: Implement AudioWorklet scheduling
        // For now, fall through to setTimeout implementation
      }

      {
        // Use setTimeout with compensation for drift
        const msDelay = timeUntilEvent * 1000;
        setTimeout(() => {
          if (this.isRunning) {
            event.callback();
          }
        }, msDelay);
      }
    }

    // Schedule next iteration
    this.schedulerTimer = window.setTimeout(() => {
      this.scheduleLoop();
    }, this.scheduleInterval);
  }

  /**
   * Schedule a repeating event
   * @param interval Interval in seconds
   * @param callback Function to execute
   * @param startTime Optional start time (defaults to next interval)
   * @returns Function to stop the repeating event
   */
  scheduleRepeating(
    interval: number,
    callback: () => void,
    startTime?: number
  ): () => void {
    let nextTime = startTime ?? this.getCurrentTime() + interval;
    let active = true;
    const eventIds: string[] = [];

    const scheduleNext = () => {
      if (!active) return;

      const id = this.scheduleEvent(nextTime, () => {
        callback();
        nextTime += interval;
        scheduleNext();
      });

      eventIds.push(id);
    };

    scheduleNext();

    // Return cancellation function
    return () => {
      active = false;
      eventIds.forEach((id) => this.cancelEvent(id));
    };
  }

  /**
   * Get number of events in queue
   */
  getQueueLength(): number {
    return this.scheduledEvents.length;
  }

  /**
   * Clear all scheduled events
   */
  clearEvents(): void {
    this.scheduledEvents = [];
  }

  /**
   * Schedule a repeating event with a callback
   * @param callback Function to execute repeatedly
   * @param intervalMs Interval in milliseconds
   * @returns Event ID for cancellation
   */
  scheduleRepeatingEvent(callback: () => void, intervalMs: number): string {
    const intervalSeconds = intervalMs / 1000;
    const id = `repeat_${this.nextEventId++}`;
    let active = true;
    let nextTime = this.getCurrentTime() + intervalSeconds;
    const eventIds: string[] = [];

    const scheduleNext = () => {
      if (!active || !this.isRunning) return;

      const eventId = this.scheduleEvent(nextTime, () => {
        if (!active) return; // Check again before calling callback
        callback();
        nextTime += intervalSeconds;
        scheduleNext();
      });

      eventIds.push(eventId);
    };

    scheduleNext();

    // Store cancellation function
    const cancelFn = () => {
      active = false;
      // Cancel all scheduled events
      eventIds.forEach((eventId) => {
        const index = this.scheduledEvents.findIndex((e) => e.id === eventId);
        if (index !== -1) {
          this.scheduledEvents.splice(index, 1);
        }
      });
    };

    // Store the cancellation function so we can call it when cancelEvent is called with the repeat ID
    (this as Record<string, unknown>)[`cancel_${id}`] = cancelFn;

    return id;
  }
}
