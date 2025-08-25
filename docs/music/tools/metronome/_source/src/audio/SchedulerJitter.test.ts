import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Scheduler } from './Scheduler';

// Mock AudioContextProvider
const mockAudioContext = {
  currentTime: 0,
  state: 'running',
};

const mockProvider = {
  getAudioContext: vi.fn().mockResolvedValue(mockAudioContext),
  getCurrentTime: vi.fn().mockReturnValue(0),
};

vi.mock('./AudioContextProvider', () => ({
  AudioContextProvider: {
    getInstance: () => mockProvider,
  },
}));

describe('Scheduler Jitter Tests', () => {
  let scheduler: Scheduler;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockAudioContext.currentTime = 0;
    mockProvider.getCurrentTime.mockReturnValue(0);
  });

  afterEach(() => {
    scheduler?.stop();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('should maintain jitter ≤ 2ms at 240 BPM', async () => {
    scheduler = new Scheduler({
      lookAheadTime: 128, // 128ms look-ahead
      scheduleInterval: 10, // 10ms schedule interval for higher precision
    });

    const bpm = 240;
    const beatInterval = 60 / bpm; // 0.25 seconds per beat
    const expectedTimes: number[] = [];
    const actualTimes: number[] = [];
    const startTime = performance.now();

    // Calculate expected times for 16 beats
    for (let i = 0; i < 16; i++) {
      expectedTimes.push(i * beatInterval * 1000); // Convert to ms
    }

    // Schedule beats
    for (let i = 0; i < 16; i++) {
      scheduler.scheduleEvent(i * beatInterval, () => {
        actualTimes.push(performance.now() - startTime);
      });
    }

    await scheduler.start();

    // Advance time to trigger all events
    vi.advanceTimersByTime(4200); // Slightly more than 16 beats at 240 BPM

    // Verify all events fired
    expect(actualTimes.length).toBe(16);

    // Check jitter for each beat
    const jitters: number[] = [];
    for (let i = 0; i < actualTimes.length; i++) {
      const jitter = Math.abs(actualTimes[i] - expectedTimes[i]);
      jitters.push(jitter);

      // Assert each beat has ≤ 2ms jitter
      expect(jitter).toBeLessThanOrEqual(2);
    }

    // Calculate average jitter
    const avgJitter = jitters.reduce((a, b) => a + b, 0) / jitters.length;
    console.log(`Average jitter at 240 BPM: ${avgJitter.toFixed(2)}ms`);

    // Average jitter should be well under 2ms
    expect(avgJitter).toBeLessThan(2);
  });

  it('should maintain jitter ≤ 2ms for 32nd notes at 180 BPM', async () => {
    scheduler = new Scheduler({
      lookAheadTime: 128,
      scheduleInterval: 5, // 5ms for even higher precision
    });

    const bpm = 180;
    const beatInterval = 60 / bpm; // 0.333... seconds per beat
    const thirtySecondInterval = beatInterval / 8; // 32nd note = 1/8 of a beat
    const expectedTimes: number[] = [];
    const actualTimes: number[] = [];
    const startTime = performance.now();

    // Schedule 32 thirty-second notes (1 measure in 4/4)
    for (let i = 0; i < 32; i++) {
      expectedTimes.push(i * thirtySecondInterval * 1000);
      scheduler.scheduleEvent(i * thirtySecondInterval, () => {
        actualTimes.push(performance.now() - startTime);
      });
    }

    await scheduler.start();

    // Advance time to trigger all events
    vi.advanceTimersByTime(1400); // Slightly more than needed

    // Verify all events fired
    expect(actualTimes.length).toBe(32);

    // Check jitter
    const jitters: number[] = [];
    for (let i = 0; i < actualTimes.length; i++) {
      const jitter = Math.abs(actualTimes[i] - expectedTimes[i]);
      jitters.push(jitter);

      // Assert ≤ 2ms jitter for high-resolution timing
      expect(jitter).toBeLessThanOrEqual(2);
    }

    const maxJitter = Math.max(...jitters);
    console.log(
      `Max jitter for 32nd notes at 180 BPM: ${maxJitter.toFixed(2)}ms`
    );

    expect(maxJitter).toBeLessThanOrEqual(2);
  });

  it('should handle rapid tempo changes with minimal jitter', async () => {
    scheduler = new Scheduler({
      lookAheadTime: 128,
      scheduleInterval: 10,
    });

    const actualTimes: number[] = [];
    const startTime = performance.now();

    // Schedule beats with changing tempo
    // 4 beats at 120 BPM (0.5s interval)
    for (let i = 0; i < 4; i++) {
      scheduler.scheduleEvent(i * 0.5, () => {
        actualTimes.push(performance.now() - startTime);
      });
    }

    // Then 4 beats at 240 BPM (0.25s interval), starting at 2s
    for (let i = 0; i < 4; i++) {
      scheduler.scheduleEvent(2 + i * 0.25, () => {
        actualTimes.push(performance.now() - startTime);
      });
    }

    await scheduler.start();

    // Advance time
    vi.advanceTimersByTime(3100);

    // Expected times
    const expectedTimes = [
      0,
      500,
      1000,
      1500, // 120 BPM
      2000,
      2250,
      2500,
      2750, // 240 BPM
    ];

    expect(actualTimes.length).toBe(8);

    // Check jitter
    for (let i = 0; i < actualTimes.length; i++) {
      const jitter = Math.abs(actualTimes[i] - expectedTimes[i]);
      expect(jitter).toBeLessThanOrEqual(2);
    }
  });
});
