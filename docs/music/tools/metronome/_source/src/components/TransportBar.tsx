import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useAudioUnlock } from '../hooks/useAudioUnlock';
import './TransportBar.css';

export interface TransportBarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onTapTempo: (tempo: number) => void;
}

const TAP_TIMEOUT = 2000; // Reset tap tempo after 2 seconds
const MIN_TAPS = 2; // Minimum taps to calculate tempo
const MAX_TAPS = 8; // Maximum taps to keep in memory

export const TransportBar: React.FC<TransportBarProps> = ({
  isPlaying,
  onPlayPause,
  onTapTempo,
}) => {
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [displayTempo, setDisplayTempo] = useState<number | null>(null);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ensureInitialized } = useAudioUnlock();

  const handleTap = useCallback(() => {
    const now = Date.now();

    setTapTimes((prev) => {
      const newTaps = [...prev, now].slice(-MAX_TAPS);

      // Calculate tempo if we have enough taps
      if (newTaps.length >= MIN_TAPS) {
        const intervals: number[] = [];
        for (let i = 1; i < newTaps.length; i++) {
          intervals.push(newTaps[i] - newTaps[i - 1]);
        }

        // Calculate average interval
        const avgInterval =
          intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const tempo = Math.round(60000 / avgInterval); // Convert to BPM

        // Clamp to reasonable range
        const clampedTempo = Math.max(20, Math.min(400, tempo));

        setDisplayTempo(clampedTempo);
        onTapTempo(clampedTempo);
      }

      return newTaps;
    });

    // Reset timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    tapTimeoutRef.current = setTimeout(() => {
      setTapTimes([]);
      setDisplayTempo(null);
    }, TAP_TIMEOUT);
  }, [onTapTempo]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && e.target === e.currentTarget) {
      e.preventDefault();
      onPlayPause();
    }
  };

  return (
    <div
      className="transport-bar"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-label="Transport controls"
    >
      <button
        className={`transport-button play-button ${isPlaying ? 'playing' : ''}`}
        onClick={async () => {
          // Ensure audio is unlocked on first play
          if (!isPlaying) {
            await ensureInitialized();
          }
          onPlayPause();
        }}
        aria-label={isPlaying ? 'Stop' : 'Play'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <button
        className="transport-button tap-button"
        onClick={handleTap}
        aria-label="Tap tempo"
      >
        TAP
        {displayTempo && (
          <span className="tap-tempo-display">{displayTempo}</span>
        )}
      </button>

      <div className="transport-info">
        <span className="transport-hint">
          {isPlaying ? 'Press SPACE to stop' : 'Press SPACE to play'}
        </span>
        {tapTimes.length > 0 && (
          <span className="tap-count">
            {tapTimes.length} tap{tapTimes.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};
