import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClickSound } from './ClickSound';

// Mock AudioContext
class MockAudioContext {
  sampleRate = 44100;
  currentTime = 0;
  destination = {};

  createBuffer(channels: number, length: number, sampleRate: number) {
    return {
      getChannelData: () => new Float32Array(length),
      numberOfChannels: channels,
      length,
      sampleRate,
    };
  }

  createBufferSource() {
    return {
      buffer: null,
      connect: vi.fn(),
      start: vi.fn(),
    };
  }

  createGain() {
    return {
      gain: { value: 1 },
      connect: vi.fn(),
    };
  }

  createBiquadFilter() {
    return {
      type: 'highpass',
      frequency: { value: 1000 },
      connect: vi.fn(),
    };
  }
}

describe('ClickSound', () => {
  let audioContext: MockAudioContext;
  let clickSound: ClickSound;

  beforeEach(() => {
    audioContext = new MockAudioContext();
    clickSound = new ClickSound(audioContext as unknown as AudioContext);
  });

  it('creates a default click buffer on initialization', () => {
    expect(clickSound).toBeDefined();
    // The buffer is created internally
  });

  it('plays a click at the specified time', () => {
    const mockSource = {
      buffer: null,
      connect: vi.fn(),
      start: vi.fn(),
    };
    const mockGain = {
      gain: { value: 1 },
      connect: vi.fn(),
    };
    const mockFilter = {
      type: 'highpass',
      frequency: { value: 1000 },
      connect: vi.fn(),
    };

    vi.spyOn(audioContext, 'createBufferSource').mockReturnValue(
      mockSource as unknown as AudioBufferSourceNode
    );
    vi.spyOn(audioContext, 'createGain').mockReturnValue(
      mockGain as unknown as GainNode
    );
    vi.spyOn(audioContext, 'createBiquadFilter').mockReturnValue(
      mockFilter as unknown as BiquadFilterNode
    );

    const time = 1.5;
    clickSound.play(time);

    expect(mockSource.start).toHaveBeenCalledWith(time);
    expect(mockSource.connect).toHaveBeenCalledWith(mockFilter);
    expect(mockFilter.connect).toHaveBeenCalledWith(mockGain);
    expect(mockGain.connect).toHaveBeenCalledWith(audioContext.destination);
  });

  it('adjusts gain based on velocity', () => {
    const mockGain = {
      gain: { value: 1 },
      connect: vi.fn(),
    };

    vi.spyOn(audioContext, 'createGain').mockReturnValue(
      mockGain as unknown as GainNode
    );

    clickSound.play(0, 0.5);

    expect(mockGain.gain.value).toBe(0.5);
  });

  it('plays accent with higher pitch and volume', () => {
    const playSpy = vi.spyOn(clickSound, 'play');

    clickSound.playAccent(1.0);

    expect(playSpy).toHaveBeenCalledWith(1.0, 1.0);
  });

  it('plays normal click with lower volume', () => {
    const playSpy = vi.spyOn(clickSound, 'play');

    clickSound.playNormal(1.0);

    expect(playSpy).toHaveBeenCalledWith(1.0, 0.7);
  });
});
