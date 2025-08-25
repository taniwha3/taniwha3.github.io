import { useState, useCallback } from 'react';
import { AudioContextProvider } from '../audio/AudioContextProvider';
import './CircleOfFifths.css';

interface KeyInfo {
  major: string;
  minor: string;
  position: number;
  sharps?: number;
  flats?: number;
}

const keys: KeyInfo[] = [
  { major: 'C', minor: 'Am', position: 0, sharps: 0 },
  { major: 'G', minor: 'Em', position: 1, sharps: 1 },
  { major: 'D', minor: 'Bm', position: 2, sharps: 2 },
  { major: 'A', minor: 'F♯m', position: 3, sharps: 3 },
  { major: 'E', minor: 'C♯m', position: 4, sharps: 4 },
  { major: 'B', minor: 'G♯m', position: 5, sharps: 5 },
  { major: 'F♯/G♭', minor: 'D♯m/E♭m', position: 6, sharps: 6, flats: 6 },
  { major: 'D♭', minor: 'B♭m', position: 7, flats: 5 },
  { major: 'A♭', minor: 'Fm', position: 8, flats: 4 },
  { major: 'E♭', minor: 'Cm', position: 9, flats: 3 },
  { major: 'B♭', minor: 'Gm', position: 10, flats: 2 },
  { major: 'F', minor: 'Dm', position: 11, flats: 1 },
];

const noteToMidi: { [key: string]: number } = {
  'C': 60,
  'G': 67,
  'D': 62,
  'A': 69,
  'E': 64,
  'B': 71,
  'F♯': 66,
  'G♭': 66,
  'D♭': 61,
  'A♭': 68,
  'E♭': 63,
  'B♭': 70,
  'F': 65,
};

const minorNoteToMidi: { [key: string]: number } = {
  'Am': 57,
  'Em': 64,
  'Bm': 59,
  'F♯m': 66,
  'C♯m': 61,
  'G♯m': 68,
  'D♯m': 63,
  'E♭m': 63,
  'B♭m': 70,
  'Fm': 65,
  'Cm': 60,
  'Gm': 67,
  'Dm': 62,
};

export function CircleOfFifths() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [showMinor, setShowMinor] = useState(false);
  const [showChords, setShowChords] = useState(false);

  const playChord = useCallback(async (notes: number[], isMinor: boolean = false) => {
    const audioContextProvider = AudioContextProvider.getInstance();
    const audioContext = await audioContextProvider.getAudioContext();
    const now = audioContext.currentTime;

    notes.forEach((midiNote, index) => {
      const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.type = 'triangle';
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(now + index * 0.05);
      oscillator.stop(now + 2);
    });
  }, []);

  const handleKeyClick = useCallback(async (key: KeyInfo) => {
    setSelectedKey(key.major);
    
    const baseNote = key.major.split('/')[0];
    const midiNote = noteToMidi[baseNote];
    
    if (showMinor) {
      const minorKey = key.minor.split('/')[0];
      const minorMidi = minorNoteToMidi[minorKey];
      if (minorMidi) {
        const minorChord = [minorMidi, minorMidi + 3, minorMidi + 7];
        await playChord(minorChord, true);
      }
    } else if (midiNote) {
      if (showChords) {
        const majorChord = [midiNote, midiNote + 4, midiNote + 7];
        await playChord(majorChord);
      } else {
        await playChord([midiNote]);
      }
    }
  }, [playChord, showMinor, showChords]);

  const getKeyPosition = (position: number) => {
    const angle = (position * 30 - 90) * (Math.PI / 180);
    const radius = 140;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const getRelatedKeys = (keyName: string) => {
    const key = keys.find(k => k.major === keyName || k.major.includes(keyName));
    if (!key) return { dominant: null, subdominant: null, relative: null, parallel: null };

    const dominant = keys[(key.position + 1) % 12];
    const subdominant = keys[(key.position - 1 + 12) % 12];
    const relative = key.minor;
    const parallel = showMinor ? key.major : key.minor;

    return { dominant, subdominant, relative, parallel };
  };

  const relatedKeys = selectedKey ? getRelatedKeys(selectedKey) : { dominant: null, subdominant: null, relative: null, parallel: null };

  return (
    <div className="circle-of-fifths-container">
      <div className="circle-controls">
        <button
          className={`mode-button ${!showMinor ? 'active' : ''}`}
          onClick={() => setShowMinor(false)}
        >
          Major Keys
        </button>
        <button
          className={`mode-button ${showMinor ? 'active' : ''}`}
          onClick={() => setShowMinor(true)}
        >
          Minor Keys
        </button>
        <button
          className={`mode-button ${showChords ? 'active' : ''}`}
          onClick={() => setShowChords(!showChords)}
        >
          {showChords ? 'Play Chords' : 'Play Notes'}
        </button>
      </div>

      <div className="circle-main">
        <svg width="400" height="400" viewBox="-200 -200 400 400" className="circle-svg">
          <circle cx="0" cy="0" r="180" fill="none" stroke="#333" strokeWidth="2" />
          <circle cx="0" cy="0" r="140" fill="none" stroke="#333" strokeWidth="1" opacity="0.3" />
          <circle cx="0" cy="0" r="100" fill="none" stroke="#333" strokeWidth="1" opacity="0.3" />
          
          {keys.map((key) => {
            const { x, y } = getKeyPosition(key.position);
            const isSelected = selectedKey === key.major;
            const isHovered = hoveredKey === key.major;
            const isRelated = relatedKeys.dominant?.major === key.major || 
                            relatedKeys.subdominant?.major === key.major;
            
            return (
              <g key={key.position} transform={`translate(${x}, ${y})`}>
                <circle
                  cx="0"
                  cy="0"
                  r="28"
                  className={`key-circle ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} ${isRelated ? 'related' : ''}`}
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={() => setHoveredKey(key.major)}
                  onMouseLeave={() => setHoveredKey(null)}
                />
                <text
                  x="0"
                  y={showMinor ? -8 : 0}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="key-text major"
                  pointerEvents="none"
                >
                  {showMinor ? key.minor : key.major}
                </text>
                <text
                  x="0"
                  y="15"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="key-text minor"
                  pointerEvents="none"
                >
                  {showMinor ? key.major : key.minor}
                </text>
              </g>
            );
          })}

          <text x="0" y="-160" textAnchor="middle" className="accidentals-label">
            No ♯/♭
          </text>
          <text x="160" y="0" textAnchor="middle" className="accidentals-label">
            ♯♯♯
          </text>
          <text x="0" y="160" textAnchor="middle" className="accidentals-label">
            ♯♯♯♯♯♯/♭♭♭♭♭♭
          </text>
          <text x="-160" y="0" textAnchor="middle" className="accidentals-label">
            ♭♭♭
          </text>
        </svg>
      </div>

      {selectedKey && (
        <div className="key-info">
          <h3>{showMinor ? keys.find(k => k.major === selectedKey)?.minor : selectedKey} {showMinor ? 'Minor' : 'Major'}</h3>
          <div className="key-relationships">
            <div className="relationship">
              <span className="label">Dominant (V):</span>
              <span className="value">{relatedKeys.dominant?.major}</span>
            </div>
            <div className="relationship">
              <span className="label">Subdominant (IV):</span>
              <span className="value">{relatedKeys.subdominant?.major}</span>
            </div>
            <div className="relationship">
              <span className="label">Relative {showMinor ? 'Major' : 'Minor'}:</span>
              <span className="value">{showMinor ? selectedKey : relatedKeys.relative}</span>
            </div>
            <div className="relationship">
              <span className="label">Parallel {showMinor ? 'Major' : 'Minor'}:</span>
              <span className="value">{relatedKeys.parallel}</span>
            </div>
          </div>
          {showChords && (
            <div className="chord-progression">
              <h4>Common Progressions in {selectedKey}:</h4>
              <div className="progressions">
                <div>I - V - vi - IV</div>
                <div>I - IV - V</div>
                <div>ii - V - I</div>
                <div>I - vi - IV - V</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}