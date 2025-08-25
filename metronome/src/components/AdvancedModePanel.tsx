import React, { useState, useCallback } from 'react';
import { TransportBar } from './TransportBar';
import { BeatIndicator } from './BeatIndicator';
import { Timeline } from './Timeline';
import { TempoCurve } from './TempoCurve';
import { BarEditor } from './BarEditor';
import { PolyrhythmEditor } from './PolyrhythmEditor';
import type { Bar } from './Timeline';
import './AdvancedModePanel.css';

interface AdvancedModePanelProps {
  isPlaying: boolean;
  currentBeat: number;
  isAccent: boolean;
  polyrhythmBeats: { [layerId: string]: number };
  tempoMap: Bar[];
  onPlayPause: () => void;
  onTapTempo: (tempo: number) => void;
  onBarsChange: (bars: Bar[]) => void;
  onUpdateBar: (bar: Bar) => void;
}

export const AdvancedModePanel: React.FC<AdvancedModePanelProps> = React.memo(
  ({
    isPlaying,
    currentBeat,
    isAccent,
    polyrhythmBeats,
    tempoMap,
    onPlayPause,
    onTapTempo,
    onBarsChange,
    onUpdateBar,
  }) => {
    const [selectedBarId, setSelectedBarId] = useState<string | null>(null);

    const handleBarEdit = useCallback((barId: string) => {
      setSelectedBarId(barId);
    }, []);

    const selectedBar = selectedBarId
      ? tempoMap.find((bar) => bar.id === selectedBarId)
      : null;

    return (
      <div className="advanced-mode-content">
        <div className="advanced-transport">
          <TransportBar
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onTapTempo={onTapTempo}
          />
          <BeatIndicator currentBeat={currentBeat} isAccent={isAccent} />
        </div>

        <div className="advanced-editors">
          <div className="tempo-section">
            <Timeline
              bars={tempoMap}
              onBarsChange={onBarsChange}
              onBarEdit={handleBarEdit}
            />
            <TempoCurve bars={tempoMap} selectedBarId={selectedBarId} />
            {selectedBar && (
              <BarEditor bar={selectedBar} onUpdateBar={onUpdateBar} />
            )}
          </div>

          <div className="rhythm-section">
            <PolyrhythmEditor
              isPlaying={isPlaying}
              onTogglePlay={onPlayPause}
              currentBeats={polyrhythmBeats}
            />
          </div>
        </div>
      </div>
    );
  }
);

AdvancedModePanel.displayName = 'AdvancedModePanel';
