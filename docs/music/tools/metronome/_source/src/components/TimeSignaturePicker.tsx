import React from 'react';
import './TimeSignaturePicker.css';

export interface TimeSignaturePickerProps {
  numerator: number;
  denominator: number;
  onNumeratorChange: (value: number) => void;
  onDenominatorChange: (value: number) => void;
}

const COMMON_NUMERATORS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16];
const COMMON_DENOMINATORS = [2, 4, 8, 16, 32];

export const TimeSignaturePicker: React.FC<TimeSignaturePickerProps> = ({
  numerator,
  denominator,
  onNumeratorChange,
  onDenominatorChange,
}) => {
  return (
    <div className="time-signature-picker">
      <label className="time-signature-label">
        <span className="sr-only">Time Signature</span>
        <div className="time-signature-display">
          <select
            className="time-signature-select numerator"
            value={numerator}
            onChange={(e) => onNumeratorChange(Number(e.target.value))}
            aria-label="Beats per measure"
          >
            {COMMON_NUMERATORS.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="time-signature-separator">/</span>
          <select
            className="time-signature-select denominator"
            value={denominator}
            onChange={(e) => onDenominatorChange(Number(e.target.value))}
            aria-label="Beat note value"
          >
            {COMMON_DENOMINATORS.map((denom) => (
              <option key={denom} value={denom}>
                {denom}
              </option>
            ))}
          </select>
        </div>
      </label>
      <div className="time-signature-info">
        {getTimeSignatureDescription(numerator, denominator)}
      </div>
    </div>
  );
};

function getTimeSignatureDescription(
  numerator: number,
  denominator: number
): string {
  const beatNote =
    denominator === 2
      ? 'half note'
      : denominator === 4
        ? 'quarter note'
        : denominator === 8
          ? 'eighth note'
          : denominator === 16
            ? 'sixteenth note'
            : 'thirty-second note';

  const commonNames: Record<string, string> = {
    '4/4': 'Common Time',
    '3/4': 'Waltz Time',
    '6/8': 'Compound Duple',
    '2/2': 'Cut Time',
    '7/8': 'Septuple',
    '5/4': 'Quintuple',
  };

  const key = `${numerator}/${denominator}`;
  const commonName = commonNames[key];

  return commonName
    ? `${commonName} - ${numerator} ${beatNote}${numerator > 1 ? 's' : ''} per measure`
    : `${numerator} ${beatNote}${numerator > 1 ? 's' : ''} per measure`;
}
