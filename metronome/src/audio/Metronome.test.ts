import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Metronome } from './Metronome';
import { AudioContextProvider } from './AudioContextProvider';
import { Scheduler } from './Scheduler';
import { ClickSound } from './ClickSound';

vi.mock('./AudioContextProvider');
vi.mock('./Scheduler');
vi.mock('./ClickSound');

describe('Metronome', () => {
  let metronome: Metronome;
  let mockAudioContext: { currentTime: number };
  let mockScheduler: {
    start: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
    pause: ReturnType<typeof vi.fn>;
    resume: ReturnType<typeof vi.fn>;
    scheduleEvent: ReturnType<typeof vi.fn>;
    scheduleRepeatingEvent: ReturnType<typeof vi.fn>;
    cancelEvent: ReturnType<typeof vi.fn>;
    cancelRepeatingEvent: ReturnType<typeof vi.fn>;
    getCurrentTime: ReturnType<typeof vi.fn>;
    cleanup: ReturnType<typeof vi.fn>;
  };
  let mockClickSound: {
    playAccent: ReturnType<typeof vi.fn>;
    playNormal: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock AudioContext
    mockAudioContext = {
      currentTime: 0,
    };

    // Mock AudioContextProvider
    const mockProvider = {
      getContext: vi.fn().mockReturnValue(mockAudioContext),
      getAudioContext: vi.fn().mockResolvedValue(mockAudioContext),
    };
    vi.mocked(AudioContextProvider.getInstance).mockReturnValue(
      mockProvider as unknown as AudioContextProvider
    );

    // Mock Scheduler
    mockScheduler = {
      start: vi.fn(),
      stop: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      scheduleEvent: vi.fn(),
      scheduleRepeatingEvent: vi.fn().mockReturnValue('interval-id'),
      cancelEvent: vi.fn(),
      cancelRepeatingEvent: vi.fn(),
      getCurrentTime: vi.fn().mockReturnValue(0),
      cleanup: vi.fn(),
    };
    vi.mocked(Scheduler).mockImplementation(
      () => mockScheduler as unknown as Scheduler
    );

    // Mock ClickSound
    mockClickSound = {
      playAccent: vi.fn(),
      playNormal: vi.fn(),
    };
    vi.mocked(ClickSound).mockImplementation(
      () => mockClickSound as unknown as ClickSound
    );

    // Create metronome
    metronome = new Metronome({
      tempo: 120,
      timeSignature: { numerator: 4, denominator: 4 },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with correct options', () => {
    expect(metronome).toBeDefined();
    expect(metronome.getIsPlaying()).toBe(false);
  });

  it('starts the metronome', async () => {
    await metronome.start();

    expect(metronome.getIsPlaying()).toBe(true);
    expect(mockScheduler.start).toHaveBeenCalled();
    expect(mockScheduler.scheduleRepeatingEvent).toHaveBeenCalled();
  });

  it('stops the metronome', async () => {
    await metronome.start();
    metronome.stop();

    expect(metronome.getIsPlaying()).toBe(false);
    expect(mockScheduler.stop).toHaveBeenCalled();
    expect(mockScheduler.cancelEvent).toHaveBeenCalledWith('interval-id');
  });

  it('pauses and resumes the metronome', async () => {
    await metronome.start();
    metronome.pause();

    expect(metronome.getIsPlaying()).toBe(false);
    expect(mockScheduler.pause).toHaveBeenCalled();
    expect(mockScheduler.cancelEvent).toHaveBeenCalledWith('interval-id');

    metronome.resume();

    expect(metronome.getIsPlaying()).toBe(true);
    expect(mockScheduler.resume).toHaveBeenCalled();
    expect(mockScheduler.scheduleRepeatingEvent).toHaveBeenCalledTimes(2);
  });

  it('changes tempo while playing', async () => {
    await metronome.start();
    metronome.setTempo(140);

    expect(metronome.getIsPlaying()).toBe(true);
  });

  it('changes time signature', async () => {
    metronome.setTimeSignature(3, 4);

    // Should reset beat counter when playing
    await metronome.start();
    metronome.setTimeSignature(5, 8);

    expect(metronome.getIsPlaying()).toBe(true);
  });

  it('schedules accent on first beat', async () => {
    await metronome.start();

    // Simulate scheduling callback
    const scheduleCallback =
      mockScheduler.scheduleRepeatingEvent.mock.calls[0][0];

    // Advance time and trigger scheduling
    mockAudioContext.currentTime = 0.05;
    scheduleCallback();

    expect(mockClickSound.playAccent).toHaveBeenCalled();
  });

  it('schedules normal click on other beats', async () => {
    await metronome.start();

    // Simulate scheduling callback
    const scheduleCallback =
      mockScheduler.scheduleRepeatingEvent.mock.calls[0][0];

    // Advance time to schedule multiple beats
    mockAudioContext.currentTime = 0.6; // Past first beat at 120 BPM
    scheduleCallback();

    expect(mockClickSound.playNormal).toHaveBeenCalled();
  });

  it('calls onBeat callback when provided', async () => {
    const onBeat = vi.fn();
    metronome = new Metronome({
      tempo: 120,
      timeSignature: { numerator: 4, denominator: 4 },
      onBeat,
    });

    await metronome.start();

    // Simulate scheduling
    const scheduleCallback =
      mockScheduler.scheduleRepeatingEvent.mock.calls[0][0];
    mockAudioContext.currentTime = 0.05;
    scheduleCallback();

    // Verify visual callback was scheduled
    expect(mockScheduler.scheduleEvent).toHaveBeenCalled();
  });
});
