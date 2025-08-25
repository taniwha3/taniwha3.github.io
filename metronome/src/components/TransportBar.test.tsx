import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { TransportBar } from './TransportBar';

describe('TransportBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with play button when not playing', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const playButton = screen.getByLabelText('Play');
    expect(playButton).toBeInTheDocument();
    expect(screen.getByText('TAP')).toBeInTheDocument();
    expect(screen.getByText('Press SPACE to play')).toBeInTheDocument();
  });

  it('renders with stop button when playing', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={true}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const stopButton = screen.getByLabelText('Stop');
    expect(stopButton).toBeInTheDocument();
    expect(screen.getByText('Press SPACE to stop')).toBeInTheDocument();
  });

  it('calls onPlayPause when play/stop button is clicked', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    expect(onPlayPause).toHaveBeenCalledTimes(1);
  });

  it('calls onPlayPause when space key is pressed', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const transportBar = screen.getByRole('group');
    transportBar.focus();

    fireEvent.keyDown(transportBar, { key: ' ' });

    expect(onPlayPause).toHaveBeenCalledTimes(1);
  });

  it('calculates tempo from tap intervals', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const tapButton = screen.getByLabelText('Tap tempo');

    // Simulate taps at 120 BPM (500ms interval)
    const now = Date.now();
    vi.setSystemTime(now);
    fireEvent.click(tapButton);

    act(() => {
      vi.setSystemTime(now + 500);
    });
    fireEvent.click(tapButton);

    expect(onTapTempo).toHaveBeenCalledWith(120);
    expect(screen.getByText('2 taps')).toBeInTheDocument();
  });

  it('resets tap tempo after timeout', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const tapButton = screen.getByLabelText('Tap tempo');

    // First tap
    fireEvent.click(tapButton);
    expect(screen.getByText('1 tap')).toBeInTheDocument();

    // Advance time past timeout
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    // Should reset
    expect(screen.queryByText('1 tap')).not.toBeInTheDocument();
  });

  it('limits tap history to maximum taps', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const tapButton = screen.getByLabelText('Tap tempo');

    // Tap more than MAX_TAPS (8) times
    for (let i = 0; i < 10; i++) {
      act(() => {
        vi.setSystemTime(Date.now() + i * 500);
      });
      fireEvent.click(tapButton);
    }

    // Should show max of 8 taps
    expect(screen.getByText('8 taps')).toBeInTheDocument();
  });

  it('clamps tempo to valid range', () => {
    const onPlayPause = vi.fn();
    const onTapTempo = vi.fn();

    render(
      <TransportBar
        isPlaying={false}
        onPlayPause={onPlayPause}
        onTapTempo={onTapTempo}
      />
    );

    const tapButton = screen.getByLabelText('Tap tempo');

    // Simulate very fast taps (would be >400 BPM)
    const now = Date.now();
    vi.setSystemTime(now);
    fireEvent.click(tapButton);

    act(() => {
      vi.setSystemTime(now + 100); // 600 BPM
    });
    fireEvent.click(tapButton);

    expect(onTapTempo).toHaveBeenCalledWith(400); // Should be clamped to 400
  });
});
