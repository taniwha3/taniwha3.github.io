import { useState } from 'react';
import { Timeline } from './Timeline';
import type { Bar } from './Timeline';
import { TempoCurve } from './TempoCurve';
import { useProject } from '../contexts/ProjectContext';
import './TempoMapEditor.css';

export function TempoMapEditor() {
  const { project, updateProject } = useProject();
  const bars = project.tempoMap;

  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

  const handleBarEdit = (barId: string) => {
    const bar = bars.find((b) => b.id === barId);
    setSelectedBar(bar || null);
  };

  const handleUpdateBar = (updatedBar: Bar) => {
    const updatedTempoMap = bars.map((bar) =>
      bar.id === updatedBar.id ? updatedBar : bar
    );
    updateProject({ tempoMap: updatedTempoMap });
    setSelectedBar(updatedBar);
  };

  const handleBarsChange = (newBars: Bar[]) => {
    updateProject({ tempoMap: newBars });
  };

  return (
    <div className="tempo-map-editor">
      <Timeline
        bars={bars}
        onBarsChange={handleBarsChange}
        onBarEdit={handleBarEdit}
      />

      <TempoCurve bars={bars} selectedBarId={selectedBar?.id || null} />

      {selectedBar && (
        <div className="bar-editor">
          <h4>Edit Bar {selectedBar.barNumber}</h4>

          <div className="bar-editor-field">
            <label>Tempo (BPM)</label>
            <input
              type="number"
              min={20}
              max={400}
              value={selectedBar.tempo}
              onChange={(e) =>
                handleUpdateBar({
                  ...selectedBar,
                  tempo: Math.max(20, Math.min(400, parseInt(e.target.value, 10) || 120)),
                })
              }
            />
          </div>

          <div className="bar-editor-field">
            <label>Time Signature</label>
            <div className="time-signature-inputs">
              <input
                type="number"
                min={1}
                max={16}
                value={selectedBar.timeSignature.numerator}
                onChange={(e) =>
                  handleUpdateBar({
                    ...selectedBar,
                    timeSignature: {
                      ...selectedBar.timeSignature,
                      numerator: Math.max(1, Math.min(16, parseInt(e.target.value, 10) || 4)),
                    },
                  })
                }
              />
              <span>/</span>
              <select
                value={selectedBar.timeSignature.denominator}
                onChange={(e) =>
                  handleUpdateBar({
                    ...selectedBar,
                    timeSignature: {
                      ...selectedBar.timeSignature,
                      denominator: parseInt(e.target.value, 10) || 4,
                    },
                  })
                }
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
