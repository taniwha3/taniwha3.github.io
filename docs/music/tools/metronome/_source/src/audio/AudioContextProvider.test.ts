import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AudioContextProvider } from './AudioContextProvider';

// Mock AudioContext
class MockAudioContext {
  state: string = 'running';
  sampleRate: number = 44100;
  currentTime: number = 0;
  destination: AudioDestinationNode = {} as AudioDestinationNode;

  resume = vi.fn().mockResolvedValue(undefined);
  suspend = vi.fn().mockResolvedValue(undefined);
  close = vi.fn().mockResolvedValue(undefined);
  createOscillator = vi.fn().mockReturnValue({});
  createGain = vi.fn().mockReturnValue({});
}

describe('AudioContextProvider', () => {
  beforeEach(() => {
    // Reset singleton instance
    (
      AudioContextProvider as typeof AudioContextProvider & {
        instance?: AudioContextProvider;
      }
    ).instance = undefined;

    // Mock window.AudioContext
    (
      window as Window & { AudioContext: typeof MockAudioContext }
    ).AudioContext = MockAudioContext;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should implement singleton pattern', () => {
    const instance1 = AudioContextProvider.getInstance();
    const instance2 = AudioContextProvider.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should create AudioContext on first getAudioContext call', async () => {
    const provider = AudioContextProvider.getInstance();
    const context = await provider.getAudioContext();

    expect(context).toBeInstanceOf(MockAudioContext);
    expect(context.sampleRate).toBe(44100);
  });

  it('should reuse existing AudioContext on subsequent calls', async () => {
    const provider = AudioContextProvider.getInstance();
    const context1 = await provider.getAudioContext();
    const context2 = await provider.getAudioContext();

    expect(context1).toBe(context2);
  });

  it('should resume suspended AudioContext', async () => {
    const provider = AudioContextProvider.getInstance();
    const context = await provider.getAudioContext();

    // Simulate suspended state
    (context as MockAudioContext).state = 'suspended';
    const resumeSpy = vi.spyOn(context, 'resume');

    await provider.getAudioContext();
    expect(resumeSpy).toHaveBeenCalled();
  });

  it('should handle browser compatibility', async () => {
    // Test webkit fallback
    delete (window as Window & { AudioContext?: typeof MockAudioContext })
      .AudioContext;
    (
      window as Window & { webkitAudioContext: typeof MockAudioContext }
    ).webkitAudioContext = MockAudioContext;

    const provider = AudioContextProvider.getInstance();
    const context = await provider.getAudioContext();

    expect(context).toBeInstanceOf(MockAudioContext);
  });

  it('should throw error if Web Audio API is not supported', async () => {
    delete (window as Window & { AudioContext?: typeof MockAudioContext })
      .AudioContext;
    delete (window as Window & { webkitAudioContext?: typeof MockAudioContext })
      .webkitAudioContext;
    delete (window as Window & { mozAudioContext?: typeof MockAudioContext })
      .mozAudioContext;

    const provider = AudioContextProvider.getInstance();

    await expect(provider.getAudioContext()).rejects.toThrow(
      'Web Audio API is not supported in this browser'
    );
  });

  it('should provide current time', async () => {
    const provider = AudioContextProvider.getInstance();
    const context = await provider.getAudioContext();
    (context as MockAudioContext).currentTime = 123.456;

    expect(provider.getCurrentTime()).toBe(123.456);
  });

  it('should handle suspend and resume', async () => {
    const provider = AudioContextProvider.getInstance();
    const context = await provider.getAudioContext();

    await provider.suspend();
    expect(context.suspend).toHaveBeenCalled();

    (context as MockAudioContext).state = 'suspended';
    await provider.resume();
    expect(context.resume).toHaveBeenCalled();
  });

  it('should handle close and cleanup', async () => {
    const provider = AudioContextProvider.getInstance();
    const context = await provider.getAudioContext();

    await provider.close();
    expect(context.close).toHaveBeenCalled();
    expect(provider.isRunning()).toBe(false);
  });

  it('should create audio nodes', async () => {
    const provider = AudioContextProvider.getInstance();
    await provider.getAudioContext();

    const oscillator = provider.createOscillator();
    const gain = provider.createGain();
    const destination = provider.getDestination();

    expect(oscillator).toBeDefined();
    expect(gain).toBeDefined();
    expect(destination).toBeDefined();
  });
});
