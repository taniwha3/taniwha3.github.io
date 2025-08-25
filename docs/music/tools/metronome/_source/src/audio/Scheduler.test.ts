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

describe('Scheduler', () => {
  let scheduler: Scheduler;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockAudioContext.currentTime = 0;
    mockProvider.getCurrentTime.mockReturnValue(0);
    scheduler = new Scheduler({
      lookAheadTime: 100, // 100ms look-ahead
      scheduleInterval: 25, // 25ms schedule interval
    });
  });

  afterEach(() => {
    scheduler.stop();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('should start and stop correctly', async () => {
    await scheduler.start();
    expect(scheduler['isRunning']).toBe(true);

    scheduler.stop();
    expect(scheduler['isRunning']).toBe(false);
  });

  it('should schedule events in order', async () => {
    const events: number[] = [];

    scheduler.scheduleEvent(0.1, () => events.push(1));
    scheduler.scheduleEvent(0.05, () => events.push(2));
    scheduler.scheduleEvent(0.15, () => events.push(3));

    await scheduler.start();

    // Wait for first schedule loop
    vi.advanceTimersByTime(30);

    // Advance time to trigger all events
    vi.advanceTimersByTime(50); // 50ms - trigger event 2
    vi.advanceTimersByTime(50); // 100ms - trigger event 1
    vi.advanceTimersByTime(50); // 150ms - trigger event 3
    vi.advanceTimersByTime(50); // Extra time for processing

    expect(events).toEqual([2, 1, 3]);
  });

  it('should cancel scheduled events', async () => {
    const callback = vi.fn();
    const eventId = scheduler.scheduleEvent(0.1, callback);

    const cancelled = scheduler.cancelEvent(eventId);
    expect(cancelled).toBe(true);

    await scheduler.start();
    vi.advanceTimersByTime(200);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle repeating events', async () => {
    const callback = vi.fn();
    const interval = 0.1; // 100ms

    await scheduler.start();

    // Track calls to stop at exactly 3
    let callCount = 0;
    const wrappedCallback = vi.fn(() => {
      callCount++;
      callback();
      if (callCount === 3) {
        stop();
      }
    });

    const stop = scheduler.scheduleRepeating(interval, wrappedCallback, 0.1);

    // Advance time generously to ensure all events fire
    vi.advanceTimersByTime(400);

    expect(callback).toHaveBeenCalledTimes(3);

    // Advance more time to ensure no more calls
    vi.advanceTimersByTime(200);

    // Should not fire anymore
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should maintain timing accuracy with look-ahead', async () => {
    const times: number[] = [];
    const startTime = performance.now();

    // Mock getCurrentTime to simulate passage of time
    let mockTime = 0;
    mockProvider.getCurrentTime.mockImplementation(() => mockTime);

    scheduler.scheduleEvent(0.1, () => {
      times.push(performance.now() - startTime);
    });

    await scheduler.start();

    // Simulate time passing
    vi.advanceTimersByTime(50);
    mockTime = 0.05;

    vi.advanceTimersByTime(50);
    mockTime = 0.1;

    vi.advanceTimersByTime(50);

    // Event should have fired close to 100ms
    expect(times.length).toBe(1);
    expect(times[0]).toBeGreaterThanOrEqual(95);
    expect(times[0]).toBeLessThanOrEqual(105);
  });

  it('should handle pause and resume', async () => {
    const callback = vi.fn();

    await scheduler.start();

    // Schedule event at 300ms from now
    scheduler.scheduleEvent(0.3, callback);

    // Advance to 100ms and pause
    vi.advanceTimersByTime(30); // Initial schedule
    vi.advanceTimersByTime(70); // Total: 100ms
    scheduler.pause();

    // Verify callback hasn't been called yet
    expect(callback).not.toHaveBeenCalled();
    expect(scheduler.getQueueLength()).toBe(1);

    // Wait while paused
    vi.advanceTimersByTime(100);

    // Resume and continue
    await scheduler.resume();

    // The event was at 300ms, we paused at 100ms, so need 200ms more
    vi.advanceTimersByTime(30); // Schedule loop
    vi.advanceTimersByTime(200); // Reach 300ms mark

    expect(callback).toHaveBeenCalled();
  });

  it('should clear all events', async () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    scheduler.scheduleEvent(0.1, callback1);
    scheduler.scheduleEvent(0.2, callback2);

    scheduler.clearEvents();

    await scheduler.start();
    vi.advanceTimersByTime(300);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it('should report queue length correctly', () => {
    expect(scheduler.getQueueLength()).toBe(0);

    scheduler.scheduleEvent(0.1, () => {});
    scheduler.scheduleEvent(0.2, () => {});

    expect(scheduler.getQueueLength()).toBe(2);
  });

  it('should use performance timer as fallback', async () => {
    // Make getAudioContext return a promise
    mockProvider.getAudioContext.mockReturnValue(
      Promise.resolve({
        currentTime: 0,
        state: 'running',
      })
    );

    await scheduler.start();
    const time = scheduler.getCurrentTime();

    expect(time).toBeGreaterThanOrEqual(0);
  });

  it('should schedule repeating events with scheduleRepeatingEvent', async () => {
    const callback = vi.fn();

    await scheduler.start();

    const eventId = scheduler.scheduleRepeatingEvent(callback, 100); // 100ms interval

    expect(eventId).toBeDefined();
    expect(eventId).toMatch(/^repeat_/);

    // Advance through several intervals
    vi.advanceTimersByTime(30); // Initial schedule
    vi.advanceTimersByTime(100); // First callback
    vi.advanceTimersByTime(100); // Second callback
    vi.advanceTimersByTime(100); // Third callback

    // Should have been called 3 times
    expect(callback).toHaveBeenCalledTimes(3);

    // Cancel the repeating event
    const cancelled = scheduler.cancelEvent(eventId);
    expect(cancelled).toBe(true);

    // Clear previous calls
    callback.mockClear();

    // Wait more time
    vi.advanceTimersByTime(200);

    // Should not be called again after cancellation
    expect(callback).not.toHaveBeenCalled();
  });
});
