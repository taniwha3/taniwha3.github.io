import React from 'react';
import './BeatIndicator.css';

interface BeatIndicatorProps {
  currentBeat: number;
  isAccent: boolean;
}

export const BeatIndicator: React.FC<BeatIndicatorProps> = React.memo(
  ({ currentBeat, isAccent }) => {
    return (
      <div className="beat-indicator-container">
        <div
          className={`beat-indicator ${currentBeat > 0 ? 'active' : ''} ${isAccent ? 'accent' : ''}`}
        >
          {currentBeat > 0 ? currentBeat : ''}
        </div>
      </div>
    );
  }
);

BeatIndicator.displayName = 'BeatIndicator';
