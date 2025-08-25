import React from 'react';
import type { Bar } from './Timeline';
import './BarEditor.css';

interface BarEditorProps {
  bar: Bar;
  onUpdateBar: (bar: Bar) => void;
}

export const BarEditor: React.FC<BarEditorProps> = React.memo(
  ({ bar, onUpdateBar }) => {
    const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tempo = Math.max(
        20,
        Math.min(400, parseInt(e.target.value, 10) || 120)
      );
      onUpdateBar({ ...bar, tempo });
    };

    const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numerator = Math.max(
        1,
        Math.min(16, parseInt(e.target.value, 10) || 4)
      );
      onUpdateBar({
        ...bar,
        timeSignature: { ...bar.timeSignature, numerator },
      });
    };

    const handleDenominatorChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const denominator = parseInt(e.target.value, 10) || 4;
      onUpdateBar({
        ...bar,
        timeSignature: { ...bar.timeSignature, denominator },
      });
    };

    return (
      <div className="bar-editor">
        <h4>Edit Bar {bar.barNumber}</h4>
        <div className="bar-editor-field">
          <label>Tempo (BPM)</label>
          <input
            type="number"
            min={20}
            max={400}
            value={bar.tempo}
            onChange={handleTempoChange}
          />
        </div>
        <div className="bar-editor-field">
          <label>Time Signature</label>
          <div className="time-signature-inputs">
            <input
              type="number"
              min={1}
              max={16}
              value={bar.timeSignature.numerator}
              onChange={handleNumeratorChange}
            />
            <span>/</span>
            <select
              value={bar.timeSignature.denominator}
              onChange={handleDenominatorChange}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
);

BarEditor.displayName = 'BarEditor';
