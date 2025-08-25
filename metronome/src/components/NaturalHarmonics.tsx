import React, { useState, useCallback, useMemo } from 'react';
import { HarmonicSound } from '../audio/HarmonicSound';
import './NaturalHarmonics.css';

interface Harmonic {
  number: number;
  frequency: number;
  nodes: number[]; // positions as percentages of string length
  label: string;
  centsOff: number; // deviation from equal temperament in cents
}

export const NaturalHarmonics: React.FC = () => {
  const [activeHarmonic, setActiveHarmonic] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const harmonicSound = useMemo(() => new HarmonicSound(), []);

  // Fundamental frequency (A2)
  const FUNDAMENTAL = 110;

  // Generate harmonics from 1st (fundamental) to 12th
  const harmonics = useMemo<Harmonic[]>(() => {
    const result: Harmonic[] = [];

    // Calculate cents deviation from equal temperament
    // Harmonic series produces just intonation intervals
    const getCentsOff = (harmonicNumber: number): number => {
      // These are the cents deviations of just intonation from equal temperament
      const centsDeviations: { [key: number]: number } = {
        1: 0, // Fundamental - perfect match
        2: 0, // Octave - perfect match (2:1)
        3: 1.96, // Perfect 5th - just is 701.96¢, ET is 700¢
        4: 0, // Two octaves - perfect match (4:1)
        5: -13.69, // Major 3rd - just is 386.31¢, ET is 400¢
        6: 1.96, // Perfect 5th + octave
        7: -31.17, // Harmonic 7th - just is 968.83¢, ET would be 1000¢
        8: 0, // Three octaves - perfect match (8:1)
        9: 3.91, // Major 2nd - just is 203.91¢, ET is 200¢
        10: -13.69, // Major 3rd + 2 octaves
        11: -48.68, // Harmonic 11th - just is 551.32¢, ET tritone is 600¢
        12: 1.96, // Perfect 5th + 2 octaves
      };
      return centsDeviations[harmonicNumber] || 0;
    };

    for (let n = 1; n <= 12; n++) {
      const frequency = FUNDAMENTAL * n;

      // Calculate node positions (where the string doesn't vibrate)
      // For nth harmonic, there are n-1 nodes dividing the string into n equal parts
      const nodes: number[] = [];
      if (n > 1) {
        for (let i = 1; i < n; i++) {
          nodes.push((i / n) * 100);
        }
      }

      let label = `${n}`;
      if (n === 1) label = 'Fundamental';
      else if (n === 2) label = 'Octave';
      else if (n === 3) label = 'Octave + 5th';
      else if (n === 4) label = '2 Octaves';
      else if (n === 5) label = '2 Oct + M3';
      else if (n === 6) label = '2 Oct + 5th';
      else if (n === 7) label = '2 Oct + m7';
      else if (n === 8) label = '3 Octaves';
      else if (n === 9) label = '3 Oct + M2';
      else if (n === 10) label = '3 Oct + M3';
      else if (n === 11) label = '3 Oct + TT';
      else if (n === 12) label = '3 Oct + 5th';

      const centsOff = getCentsOff(n);

      result.push({
        number: n,
        frequency,
        nodes,
        label,
        centsOff,
      });
    }

    return result;
  }, []);

  const handleHarmonicClick = useCallback(
    async (harmonic: Harmonic) => {
      if (isPlaying) return;

      setActiveHarmonic(harmonic.number);
      setIsPlaying(true);

      try {
        await harmonicSound.playHarmonic(harmonic.frequency, harmonic.number);
      } catch (error) {
        console.error('Failed to play harmonic:', error);
      }

      // Only reset isPlaying, keep visualization active
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    },
    [harmonicSound, isPlaying]
  );

  const handleFundamentalClick = useCallback(async () => {
    if (isPlaying) return;

    setActiveHarmonic(0);
    setIsPlaying(true);

    try {
      await harmonicSound.playFundamental(FUNDAMENTAL);
    } catch (error) {
      console.error('Failed to play fundamental:', error);
    }

    // Only reset isPlaying, keep visualization active
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  }, [harmonicSound, isPlaying]);

  return (
    <div className="natural-harmonics">
      <div className="harmonics-container">
        <div className="harmonics-header">
          <h2>Natural Harmonics</h2>
          <p>Fundamental: {FUNDAMENTAL}Hz (A2)</p>
        </div>

        <div className="harmonics-content">
          {/* String visualization */}
          <div className="string-visualization">
            <div className="string-container">
              {/* The actual string */}
              <div
                className={`string ${activeHarmonic !== null ? `harmonic-${activeHarmonic}` : ''}`}
              >
                {/* Show nodes for active harmonic */}
                {activeHarmonic !== null && activeHarmonic > 0 && (
                  <>
                    {harmonics[activeHarmonic - 1].nodes.map(
                      (position, index) => (
                        <div
                          key={index}
                          className="node-point"
                          style={{ left: `${position}%` }}
                        />
                      )
                    )}
                  </>
                )}
              </div>

              {/* Static wave visualization */}
              {activeHarmonic !== null && activeHarmonic > 0 && (
                <svg
                  className="wave-visualization"
                  viewBox="0 0 1000 200"
                  preserveAspectRatio="none"
                >
                  <path
                    d={(() => {
                      const harmonic = harmonics[activeHarmonic - 1];
                      const points: string[] = [];
                      const amplitude = 40;
                      const segments = 200; // Number of points to plot

                      for (let i = 0; i <= segments; i++) {
                        const x = (i / segments) * 1000;
                        // Calculate y based on standing wave with harmonic frequency
                        // For nth harmonic, we have n antinodes (n/2 complete wavelengths)
                        // This means n half-cycles or n*π radians total
                        const phase =
                          (i / segments) * harmonic.number * Math.PI;
                        // Negate the amplitude to start going up instead of down
                        const y = 100 - amplitude * Math.sin(phase);
                        points.push(`${x},${y}`);
                      }

                      return `M ${points.join(' L ')}`;
                    })()}
                    stroke="#ff3333"
                    strokeWidth="2"
                    fill="none"
                    className="wave-path"
                  />

                  {/* Add node markers on the wave */}
                  {harmonics[activeHarmonic - 1].nodes.map(
                    (position, index) => (
                      <circle
                        key={index}
                        cx={position * 10} // Convert percentage to viewBox coordinates
                        cy="100" // Nodes are always at the center line
                        r="5"
                        fill="#ffd700"
                        stroke="#ff3333"
                        strokeWidth="2"
                      />
                    )
                  )}
                </svg>
              )}

              {/* Bridge and nut markers */}
              <div className="string-end nut">Nut</div>
              <div className="string-end bridge">Bridge</div>
            </div>

            {/* Fundamental button */}
            <button
              className={`fundamental-button ${activeHarmonic === 0 ? 'active' : ''}`}
              onClick={handleFundamentalClick}
              disabled={isPlaying}
            >
              Open String ({FUNDAMENTAL}Hz)
            </button>
          </div>

          {/* Harmonics grid */}
          <div className="harmonics-grid">
            {harmonics.map((harmonic) => (
              <button
                key={harmonic.number}
                className={`harmonic-button ${activeHarmonic === harmonic.number ? 'active' : ''}`}
                onClick={() => handleHarmonicClick(harmonic)}
                disabled={isPlaying}
              >
                <div className="harmonic-number">{harmonic.number}</div>
                <div className="harmonic-frequency">{harmonic.frequency}Hz</div>
                <div className="harmonic-label">{harmonic.label}</div>
                <div className="harmonic-cents">
                  {harmonic.centsOff !== 0 && (
                    <span
                      className={
                        harmonic.centsOff > 0 ? 'cents-sharp' : 'cents-flat'
                      }
                    >
                      {harmonic.centsOff > 0 ? '+' : ''}
                      {harmonic.centsOff.toFixed(1)}¢
                    </span>
                  )}
                  {harmonic.centsOff === 0 && (
                    <span className="cents-perfect">Perfect</span>
                  )}
                </div>
                <div className="harmonic-divisions">
                  {harmonic.number === 1
                    ? 'No nodes'
                    : `${harmonic.nodes.length} node${harmonic.nodes.length > 1 ? 's' : ''}`}
                </div>
              </button>
            ))}
          </div>

          {/* Info display */}
          {activeHarmonic !== null && (
            <div className="harmonic-info">
              {activeHarmonic === 0 ? (
                <>
                  <h3>Fundamental Frequency</h3>
                  <p>The open string vibrates as a whole at {FUNDAMENTAL}Hz</p>
                </>
              ) : (
                <>
                  <h3>Harmonic #{activeHarmonic}</h3>
                  <p>Frequency: {harmonics[activeHarmonic - 1].frequency}Hz</p>
                  <p>
                    String divided into {harmonics[activeHarmonic - 1].number}{' '}
                    equal parts
                  </p>
                  <p>Musical interval: {harmonics[activeHarmonic - 1].label}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NaturalHarmonics;
