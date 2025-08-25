import React, { useState, useCallback, useMemo } from 'react';
import { GuitarSound } from '../audio/GuitarSound';
import './FretboardTab.css';

// Standard tuning: E-A-D-G-B-E (from lowest to highest string)
// Display order: highest to lowest (top to bottom)
const STANDARD_TUNING = ['E', 'B', 'G', 'D', 'A', 'E'];
const CHROMATIC_SCALE = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

// MIDI note numbers for open strings in standard tuning (matching display order)
const OPEN_STRING_MIDI = [64, 59, 55, 50, 45, 40]; // E4, B3, G3, D3, A2, E2

interface FretPosition {
  string: number;
  fret: number;
  note: string;
  midiNote: number;
}

export const FretboardTab: React.FC = () => {
  const [activeNote, setActiveNote] = useState<FretPosition | null>(null);
  const guitarSound = useMemo(() => new GuitarSound(), []);

  // Calculate the note at a given string and fret
  const getNoteAtPosition = useCallback(
    (stringIndex: number, fret: number): FretPosition => {
      const openNote = STANDARD_TUNING[stringIndex];
      const openNoteIndex = CHROMATIC_SCALE.indexOf(openNote);
      const noteIndex = (openNoteIndex + fret) % 12;
      const note = CHROMATIC_SCALE[noteIndex];
      const midiNote = OPEN_STRING_MIDI[stringIndex] + fret;

      return { string: stringIndex, fret, note, midiNote };
    },
    []
  );

  const handleFretClick = useCallback(
    async (stringIndex: number, fret: number) => {
      const position = getNoteAtPosition(stringIndex, fret);
      setActiveNote(position);

      try {
        await guitarSound.playNote(position.midiNote);
      } catch (error) {
        console.error('Failed to play note:', error);
      }

      // Clear active note after a short time
      setTimeout(() => setActiveNote(null), 500);
    },
    [getNoteAtPosition, guitarSound]
  );

  // Create fret markers (dots at 3, 5, 7, 9, 12)
  const fretMarkers = [3, 5, 7, 9];
  const doubleDotFret = 12;

  return (
    <div className="fretboard-tab">
      <div className="fretboard-container">
        <div className="fretboard">
          {/* String labels */}
          <div className="string-labels">
            {STANDARD_TUNING.map((note, index) => (
              <div key={index} className="string-label">
                {note}
              </div>
            ))}
          </div>

          {/* Fretboard grid */}
          <div className="fretboard-grid">
            {/* Fret numbers */}
            <div className="fret-numbers">
              <div className="fret-number">0</div>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i + 1} className="fret-number">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Strings and frets */}
            {STANDARD_TUNING.map((_, stringIndex) => (
              <div key={stringIndex} className="guitar-string">
                {/* Open string (fret 0) */}
                <button
                  className={`fret-position open ${
                    activeNote?.string === stringIndex && activeNote?.fret === 0
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => handleFretClick(stringIndex, 0)}
                  aria-label={`String ${stringIndex + 1} Open`}
                >
                  <div className="note-dot" />
                </button>

                {/* Frets 1-12 */}
                {Array.from({ length: 12 }, (_, fretIndex) => {
                  const fret = fretIndex + 1;
                  const position = getNoteAtPosition(stringIndex, fret);
                  return (
                    <button
                      key={fret}
                      className={`fret-position ${
                        activeNote?.string === stringIndex &&
                        activeNote?.fret === fret
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => handleFretClick(stringIndex, fret)}
                      aria-label={`String ${stringIndex + 1} Fret ${fret}: ${position.note}`}
                    >
                      <div className="note-dot" />
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Fret markers (inlays) */}
            <div className="fret-markers">
              <div className="marker-spacer" />
              {Array.from({ length: 12 }, (_, i) => {
                const fret = i + 1;
                const hasMarker = fretMarkers.includes(fret);
                const hasDoubleDot = fret === doubleDotFret;
                return (
                  <div key={fret} className="marker-container">
                    {hasMarker && <div className="fret-marker single-dot" />}
                    {hasDoubleDot && (
                      <>
                        <div className="fret-marker double-dot top" />
                        <div className="fret-marker double-dot bottom" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Display current note */}
        {activeNote && (
          <div className="note-display">
            <div className="note-info">
              <span className="note-name">{activeNote.note}</span>
              <span className="note-details">
                String {activeNote.string + 1}, Fret {activeNote.fret}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FretboardTab;
