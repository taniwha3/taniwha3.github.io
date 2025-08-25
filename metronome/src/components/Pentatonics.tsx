import React, { useState, useCallback, useMemo } from 'react';
import { GuitarSound } from '../audio/GuitarSound';
import './Pentatonics.css';

// All 12 chromatic notes
const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Standard guitar tuning for visualization
const GUITAR_TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // High to low
const GUITAR_MIDI_BASE = [64, 59, 55, 50, 45, 40]; // E4, B3, G3, D3, A2, E2

interface Note {
  name: string;
  midiNumber: number;
  isInDiatonic: boolean;
  isInPentatonic: boolean;
}

export const Pentatonics: React.FC = () => {
  const [playingNote, setPlayingNote] = useState<string | null>(null);
  const [diatonicRoot, setDiatonicRoot] = useState<string>('C');
  const [pentatonicMode, setPentatonicMode] = useState<'major' | 'minor'>('minor');
  const [pentatonicRoot, setPentatonicRoot] = useState<string>('D#');
  const guitarSound = useMemo(() => new GuitarSound(), []);

  // Generate major scale from root
  const getMajorScale = useCallback((root: string): string[] => {
    const rootIndex = CHROMATIC_NOTES.indexOf(root);
    // Major scale intervals: W-W-H-W-W-W-H (2-2-1-2-2-2-1 semitones)
    const intervals = [0, 2, 4, 5, 7, 9, 11];
    return intervals.map(interval => 
      CHROMATIC_NOTES[(rootIndex + interval) % 12]
    );
  }, []);

  // Generate major pentatonic from root
  const getMajorPentatonic = useCallback((root: string): string[] => {
    const rootIndex = CHROMATIC_NOTES.indexOf(root);
    // Major pentatonic intervals: 1-2-3-5-6 (0-2-4-7-9 semitones)
    const intervals = [0, 2, 4, 7, 9];
    return intervals.map(interval => 
      CHROMATIC_NOTES[(rootIndex + interval) % 12]
    );
  }, []);

  // Generate minor pentatonic from root
  const getMinorPentatonic = useCallback((root: string): string[] => {
    const rootIndex = CHROMATIC_NOTES.indexOf(root);
    // Minor pentatonic intervals: 1-b3-4-5-b7 (0-3-5-7-10 semitones)
    const intervals = [0, 3, 5, 7, 10];
    return intervals.map(interval => 
      CHROMATIC_NOTES[(rootIndex + interval) % 12]
    );
  }, []);

  // Current scales based on selection
  const diatonicScale = useMemo(() => getMajorScale(diatonicRoot), [diatonicRoot, getMajorScale]);
  const pentatonicScale = useMemo(() => {
    if (pentatonicMode === 'major') {
      return getMajorPentatonic(pentatonicRoot);
    } else {
      return getMinorPentatonic(pentatonicRoot);
    }
  }, [pentatonicRoot, pentatonicMode, getMajorPentatonic, getMinorPentatonic]);
  
  // Calculate the complement (notes NOT in diatonic scale)
  const complementNotes = useMemo(() => {
    return CHROMATIC_NOTES.filter(note => !diatonicScale.includes(note));
  }, [diatonicScale]);

  // When diatonic root changes, update pentatonic based on mode
  const handleDiatonicChange = useCallback((newRoot: string) => {
    setDiatonicRoot(newRoot);
    const rootIndex = CHROMATIC_NOTES.indexOf(newRoot);
    
    if (pentatonicMode === 'major') {
      // Major pentatonic at tritone (6 semitones away)
      const tritoneIndex = (rootIndex + 6) % 12;
      setPentatonicRoot(CHROMATIC_NOTES[tritoneIndex]);
    } else {
      // Minor pentatonic at minor third (3 semitones up)
      const minorThirdIndex = (rootIndex + 3) % 12;
      setPentatonicRoot(CHROMATIC_NOTES[minorThirdIndex]);
    }
  }, [pentatonicMode]);

  // When pentatonic root changes, update diatonic based on mode
  const handlePentatonicChange = useCallback((newRoot: string) => {
    setPentatonicRoot(newRoot);
    const rootIndex = CHROMATIC_NOTES.indexOf(newRoot);
    
    if (pentatonicMode === 'major') {
      // Diatonic at tritone from major pentatonic
      const tritoneIndex = (rootIndex + 6) % 12;
      setDiatonicRoot(CHROMATIC_NOTES[tritoneIndex]);
    } else {
      // Diatonic at minor third down from minor pentatonic
      const diatonicIndex = (rootIndex - 3 + 12) % 12;
      setDiatonicRoot(CHROMATIC_NOTES[diatonicIndex]);
    }
  }, [pentatonicMode]);

  // When mode changes, recalculate the relationship
  const handleModeChange = useCallback((newMode: 'major' | 'minor') => {
    setPentatonicMode(newMode);
    const rootIndex = CHROMATIC_NOTES.indexOf(diatonicRoot);
    
    if (newMode === 'major') {
      // Major pentatonic at tritone
      const tritoneIndex = (rootIndex + 6) % 12;
      setPentatonicRoot(CHROMATIC_NOTES[tritoneIndex]);
    } else {
      // Minor pentatonic at minor third
      const minorThirdIndex = (rootIndex + 3) % 12;
      setPentatonicRoot(CHROMATIC_NOTES[minorThirdIndex]);
    }
  }, [diatonicRoot]);

  // Get MIDI number for a note (C4 = 60)
  const getMidiNumber = useCallback((note: string, octave: number = 4): number => {
    const noteIndex = CHROMATIC_NOTES.indexOf(note);
    return 60 + noteIndex + (octave - 4) * 12; // C4 = 60
  }, []);

  // Play a note
  const playNote = useCallback(async (note: string, midiNumber: number) => {
    setPlayingNote(note);
    try {
      await guitarSound.playNote(midiNumber, 1);
    } catch (error) {
      console.error('Failed to play note:', error);
    }
    setTimeout(() => setPlayingNote(null), 500);
  }, [guitarSound]);

  // Generate piano keys for 2 octaves (C3 to B4)
  const pianoKeys = useMemo((): Note[] => {
    const keys: Note[] = [];
    for (let octave = 3; octave <= 4; octave++) {
      CHROMATIC_NOTES.forEach(note => {
        keys.push({
          name: note,
          midiNumber: getMidiNumber(note, octave),
          isInDiatonic: diatonicScale.includes(note),
          isInPentatonic: pentatonicScale.includes(note),
        });
      });
    }
    return keys;
  }, [getMidiNumber, diatonicScale, pentatonicScale]);

  // Generate guitar fretboard data
  const guitarFrets = useMemo(() => {
    const frets: Note[][] = [];
    
    GUITAR_TUNING.forEach((openNote, stringIndex) => {
      const stringFrets: Note[] = [];
      const openNoteIndex = CHROMATIC_NOTES.indexOf(openNote);
      const baseMidi = GUITAR_MIDI_BASE[stringIndex];
      
      // Show frets 0-12
      for (let fret = 0; fret <= 12; fret++) {
        const noteIndex = (openNoteIndex + fret) % 12;
        const noteName = CHROMATIC_NOTES[noteIndex];
        stringFrets.push({
          name: noteName,
          midiNumber: baseMidi + fret,
          isInDiatonic: diatonicScale.includes(noteName),
          isInPentatonic: pentatonicScale.includes(noteName),
        });
      }
      frets.push(stringFrets);
    });
    
    return frets;
  }, [diatonicScale, pentatonicScale]);

  return (
    <div className="pentatonics">
      <div className="pentatonics-container">
        <div className="pentatonics-header">
          <h2>Pentatonic Scales</h2>
          <p className="subtitle">The Complementary Relationship</p>
        </div>

        <div className="key-selectors">
          <div className="key-selector">
            <label>Diatonic Key (Major Scale):</label>
            <select 
              value={diatonicRoot} 
              onChange={(e) => handleDiatonicChange(e.target.value)}
              className="key-select"
            >
              {CHROMATIC_NOTES.map(note => (
                <option key={note} value={note}>{note} Major</option>
              ))}
            </select>
          </div>

          <div className="key-selector">
            <label>Pentatonic Mode:</label>
            <select 
              value={pentatonicMode} 
              onChange={(e) => handleModeChange(e.target.value as 'major' | 'minor')}
              className="key-select mode-select"
            >
              <option value="major">Major Pentatonic</option>
              <option value="minor">Minor Pentatonic</option>
            </select>
          </div>

          <div className="key-selector">
            <label>Pentatonic Key (Complement):</label>
            <select 
              value={pentatonicRoot} 
              onChange={(e) => handlePentatonicChange(e.target.value)}
              className="key-select"
            >
              {CHROMATIC_NOTES.map(note => (
                <option key={note} value={note}>
                  {note} {pentatonicMode === 'major' ? 'Major' : 'Minor'} Pentatonic
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="theory-explanation">
          <h3>The Mathematics of Pentatonics</h3>
          <p>
            When we take the 12 chromatic notes and remove the 7 notes of a diatonic scale,
            we get exactly 5 notes that form a pentatonic scale.
          </p>
          <p>
            <strong>{diatonicRoot} Major (Ionian):</strong> {diatonicScale.join(' - ')}
          </p>
          <p>
            <strong>{pentatonicRoot} {pentatonicMode === 'major' ? 'Major' : 'Minor'} Pentatonic:</strong> {pentatonicScale.join(' - ')}
          </p>
          <p>
            <strong>Complement Notes (not in {diatonicRoot} Major):</strong> {complementNotes.join(' - ')}
          </p>
          <p className="highlight">
            {pentatonicMode === 'major' 
              ? `The complement of ${diatonicRoot} Major forms the ${pentatonicRoot} major pentatonic - exactly a tritone (6 semitones) away!`
              : `The complement of ${diatonicRoot} Major forms the ${pentatonicRoot} minor pentatonic - a minor third (3 semitones) up!`
            }
          </p>
        </div>

        <div className="scale-display">
          <div className="scale-section">
            <h4>{diatonicRoot} Major Scale (Diatonic)</h4>
            <div className="note-list">
              {diatonicScale.map((note, index) => {
                // Calculate octave based on position in scale
                // Start at octave 4 for root, go up if we pass C
                const rootIndex = CHROMATIC_NOTES.indexOf(diatonicRoot);
                const noteIndex = CHROMATIC_NOTES.indexOf(note);
                let octave = 4;
                
                // If the note index is lower than root index, we've wrapped around
                // This happens when scale goes past B to C
                if (index > 0 && noteIndex < rootIndex) {
                  octave = 5;
                }
                
                return (
                  <button
                    key={note}
                    className={`note-button diatonic ${playingNote === note ? 'playing' : ''}`}
                    onClick={() => playNote(note, getMidiNumber(note, octave))}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="scale-section">
            <h4>Complement: {pentatonicRoot} {pentatonicMode === 'major' ? 'Major' : 'Minor'} Pentatonic</h4>
            <div className="note-list">
              {pentatonicScale.map((note, index) => {
                // Calculate octave based on position in pentatonic scale
                const rootIndex = CHROMATIC_NOTES.indexOf(pentatonicRoot);
                const noteIndex = CHROMATIC_NOTES.indexOf(note);
                let octave = 4;
                
                // If the note index is lower than root index, we've wrapped around
                if (index > 0 && noteIndex < rootIndex) {
                  octave = 5;
                }
                
                return (
                  <button
                    key={note}
                    className={`note-button pentatonic ${playingNote === note ? 'playing' : ''}`}
                    onClick={() => playNote(note, getMidiNumber(note, octave))}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Piano Visualization */}
        <div className="piano-section">
          <h3>Piano Keyboard</h3>
          <div className="piano-keyboard">
            {pianoKeys.map((key, index) => {
              const isBlackKey = key.name.includes('#');
              const isC = key.name === 'C';
              
              return (
                <button
                  key={index}
                  className={`piano-key ${isBlackKey ? 'black' : 'white'} 
                    ${key.isInDiatonic ? 'diatonic' : ''} 
                    ${key.isInPentatonic ? 'pentatonic' : ''}
                    ${playingNote === key.name ? 'playing' : ''}
                    ${isC ? 'c-key' : ''}`}
                  onClick={() => playNote(key.name, key.midiNumber)}
                  data-note={key.name}
                  title={key.isInDiatonic ? `${key.name} (${diatonicRoot} Major)` : key.isInPentatonic ? `${key.name} (${pentatonicRoot} Pentatonic)` : key.name}
                >
                  <span className="key-label">{key.name}</span>
                  {(key.isInDiatonic || key.isInPentatonic) && (
                    <span className="key-indicator">{key.isInDiatonic ? 'D' : 'P'}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="piano-legend">
            <span className="legend-item diatonic">
              <span className="legend-indicator">D</span>
              {diatonicRoot} Major (Diatonic)
            </span>
            <span className="legend-item pentatonic">
              <span className="legend-indicator">P</span>
              {pentatonicRoot} {pentatonicMode === 'major' ? 'Major' : 'Minor'} Pentatonic
            </span>
          </div>
        </div>

        {/* Guitar Fretboard Visualization */}
        <div className="guitar-section">
          <h3>Guitar Fretboard</h3>
          <div className="guitar-fretboard">
            {/* Fret numbers */}
            <div className="fret-numbers">
              <div className="string-label-spacer"></div>
              {Array.from({ length: 13 }, (_, i) => (
                <div key={i} className="fret-number">{i}</div>
              ))}
            </div>

            {/* Strings */}
            {guitarFrets.map((string, stringIndex) => (
              <div key={stringIndex} className="guitar-string-row">
                <div className="string-label">{GUITAR_TUNING[stringIndex]}</div>
                {string.map((fret, fretIndex) => (
                  <button
                    key={fretIndex}
                    className={`fret-button 
                      ${fret.isInDiatonic ? 'diatonic' : ''} 
                      ${fret.isInPentatonic ? 'pentatonic' : ''}
                      ${playingNote === fret.name ? 'playing' : ''}
                      ${fretIndex === 0 ? 'open' : ''}`}
                    onClick={() => playNote(fret.name, fret.midiNumber)}
                  >
                    <span className="fret-note">{fret.name}</span>
                  </button>
                ))}
              </div>
            ))}

            {/* Fret markers */}
            <div className="fret-markers">
              <div className="string-label-spacer"></div>
              {Array.from({ length: 13 }, (_, i) => (
                <div key={i} className="fret-marker-container">
                  {[3, 5, 7, 9].includes(i) && <div className="fret-marker" />}
                  {i === 12 && (
                    <>
                      <div className="fret-marker double top" />
                      <div className="fret-marker double bottom" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scale-relationships">
          <h3>Key Relationships</h3>
          <p>
            The complement of any major scale forms both major and minor pentatonic scales:
          </p>
          <div className="relationship-columns">
            <div className="relationship-section">
              <h4>Major Pentatonic (Tritone)</h4>
              <ul>
                <li>C Major → F# Major Pent</li>
                <li>G Major → C# Major Pent</li>
                <li>D Major → G# Major Pent</li>
                <li>A Major → D# Major Pent</li>
                <li>E Major → A# Major Pent</li>
                <li>B Major → F Major Pent</li>
              </ul>
            </div>
            <div className="relationship-section">
              <h4>Minor Pentatonic (m3 up)</h4>
              <ul>
                <li>C Major → D# Minor Pent</li>
                <li>G Major → A# Minor Pent</li>
                <li>D Major → F Minor Pent</li>
                <li>A Major → C Minor Pent</li>
                <li>E Major → G Minor Pent</li>
                <li>B Major → D Minor Pent</li>
              </ul>
            </div>
          </div>
          <p className="note">
            The same 5 complement notes form both scales - just with different root notes!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pentatonics;