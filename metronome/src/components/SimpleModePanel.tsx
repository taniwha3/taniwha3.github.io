import React from 'react';
import { TempoDial } from './TempoDial';
import { TimeSignaturePicker } from './TimeSignaturePicker';
import { TransportBar } from './TransportBar';
import { BeatIndicator } from './BeatIndicator';
import './SimpleModePanel.css';

interface SimpleModePanelProps {
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  currentBeat: number;
  isAccent: boolean;
  isPlaying: boolean;
  onTempoChange: (tempo: number) => void;
  onTimeSignatureChange: (numerator: number, denominator: number) => void;
  onPlayPause: () => void;
  onTapTempo: (tempo: number) => void;
}

export const SimpleModePanel: React.FC<SimpleModePanelProps> = React.memo(
  ({
    tempo,
    timeSignature,
    currentBeat,
    isAccent,
    isPlaying,
    onTempoChange,
    onTimeSignatureChange,
    onPlayPause,
    onTapTempo,
  }) => {
    return (
      <div className="simple-mode-content">
        <div className="main-content">
          <div className="controls controls-left">
            <TimeSignaturePicker
              numerator={timeSignature.numerator}
              denominator={timeSignature.denominator}
              onNumeratorChange={(n) =>
                onTimeSignatureChange(n, timeSignature.denominator)
              }
              onDenominatorChange={(d) =>
                onTimeSignatureChange(timeSignature.numerator, d)
              }
            />
          </div>

          <div className="controls-center">
            <TempoDial
              value={tempo}
              onChange={onTempoChange}
              min={20}
              max={400}
              step={1}
            />
            <BeatIndicator currentBeat={currentBeat} isAccent={isAccent} />
          </div>

          <div className="controls controls-right">
            <TransportBar
              isPlaying={isPlaying}
              onPlayPause={onPlayPause}
              onTapTempo={onTapTempo}
            />
          </div>
        </div>

        <div className="info">
          <p>{tempo} BPM</p>
          <p>
            {timeSignature.numerator}/{timeSignature.denominator}
          </p>
          <p>{isPlaying ? 'Playing' : 'Stopped'}</p>
        </div>
      </div>
    );
  }
);

SimpleModePanel.displayName = 'SimpleModePanel';
