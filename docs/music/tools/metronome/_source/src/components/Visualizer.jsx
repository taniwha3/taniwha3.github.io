import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-width: 500px;
  background: rgba(25, 25, 25, 0.9);
  background-image: linear-gradient(
    180deg,
    rgba(15, 15, 30, 0.9) 0%,
    rgba(60, 20, 60, 0.6) 100%
  );
  border-radius: 50%;
  padding: 1.5rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(255, 0, 255, 0.2),
    0 0 20px rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 0, 255, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
  /* Synthwave grid effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-image: radial-gradient(
      circle,
      transparent 80%,
      rgba(255, 0, 255, 0.1) 85%,
      rgba(255, 0, 255, 0.2) 90%,
      rgba(255, 0, 255, 0.3) 95%,
      rgba(255, 0, 255, 0.4) 100%
    );
    z-index: 0;
  }
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: rgba(20, 20, 20, 0.7);
  background-image: linear-gradient(
    135deg,
    rgba(20, 10, 40, 0.8) 0%,
    rgba(40, 15, 50, 0.7) 50%,
    rgba(30, 10, 40, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 1px solid rgba(128, 0, 255, 0.2);
  box-shadow: 
    inset 0 0 20px rgba(128, 0, 255, 0.1),
    0 0 8px rgba(255, 0, 255, 0.2);
  
  /* Inner glow effect */
  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid transparent;
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
    opacity: 0.5;
  }
`;

const TempoDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #f5f5f5;
  text-align: center;
  line-height: 1;
  text-shadow: 
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 15px #ff00ff,
    0 0 20px #ff00ff,
    0 0 25px #ff00ff;
  letter-spacing: 1px;
  
  span {
    display: block;
    font-size: 1rem;
    font-weight: 400;
    color: #00ffff;
    margin-top: 0.5rem;
    letter-spacing: 2px;
    text-shadow: 
      0 0 5px #00ffff,
      0 0 10px #00ffff;
    text-transform: uppercase;
  }
`;

const BeatMarker = styled.div`
  background: ${({ $isActive, $isAccent }) => 
    $isActive 
      ? $isAccent 
        ? '#ff00ff' // Magenta for accents
        : '#00ffff' // Cyan for regular beats
      : 'rgba(100, 0, 100, 0.2)'};
  box-shadow: ${({ $isActive, $isAccent }) => 
    $isActive 
      ? $isAccent
        ? '0 0 10px #ff00ff, 0 0 20px rgba(255, 0, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.6)'
        : '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6)'
      : '0 0 5px rgba(128, 0, 128, 0.3)'};
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.1s ease;
  transform: translate(-50%, -50%);
  z-index: 1;
  border: ${({ $isActive }) => $isActive ? '2px solid rgba(255, 255, 255, 0.9)' : '1px solid rgba(128, 0, 128, 0.3)'};
`;

const ClockHand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 42%;
  background: linear-gradient(to top, rgba(255,255,255,0.1), #ff00ff);
  transform-origin: center bottom;
  transform: translate(-50%, -100%) rotate(${({ $rotation }) => $rotation}deg);
  z-index: 3;
  border-radius: 5px;
  box-shadow: 0 0 15px #ff00ff, 0 0 25px rgba(255,0,255,0.8);
  /* Synthwave glow effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: linear-gradient(to top, rgba(255,0,255,0), #00ffff);
    border-radius: 5px;
    opacity: 0.6;
    filter: blur(3px);
  }
  /* Center dot removed */
`;

const BeatSymbol = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ $isAccent }) => $isAccent ? '#f72585' : '#f5f5f5'};
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const PolyRhythmRing = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}%;
  height: ${({ $size }) => $size}%;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  opacity: ${({ $active }) => $active ? 1 : 0.3};
`;

const PolyRhythmMarker = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $isActive, $color }) => 
    $isActive ? $color : 'rgba(255, 255, 255, 0.05)'};
  box-shadow: ${({ $isActive, $color }) => 
    $isActive ? `0 0 16px ${$color}` : 'none'};
  transform: translate(-50%, -50%);
  z-index: 0;
`;

// Helper function to calculate position on a circle
const getPositionOnCircle = (angle, radius) => {
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { x, y };
};

const Visualizer = ({ isPlaying, currentBeat, meter, polyRhythms, tempo }) => {
  const [activeRhythmBeats, setActiveRhythmBeats] = useState({});
  const [clockHandAngle, setClockHandAngle] = useState(0); // Start at 12 o'clock
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const tempoRef = useRef(tempo || 120);
  
  // Clock animation precisely synced with Tone.js Transport
  useEffect(() => {
    if (!isPlaying) {
      setClockHandAngle(0);
      return;
    }
    
    // 1. Calculate exact time for one complete measure
    const msPerBeat = 60000 / tempo;
    const msPerFullMeasure = msPerBeat * meter;
    
    // 2. Calculate exact angle for one degree of rotation
    const msPer1Degree = msPerFullMeasure / 360;
    
    // 3. Reset animation on each beat change for perfect sync
    const startTime = performance.now();
    
    // Calculate exact angle of current beat
    const beatAngle = (currentBeat / meter) * 360;
    
    // Set hand to exact beat position (ensures sync with sound)
    setClockHandAngle(beatAngle);
    
    // 4. Create a continuously updating animation function
    const animateClockHand = (timestamp) => {
      // Calculate time since last beat
      const elapsedMs = timestamp - startTime;
      
      // Convert elapsed time to angle based on tempo and meter
      const degreesPerMs = 360 / msPerFullMeasure;
      const elapsedAngle = elapsedMs * degreesPerMs;
      
      // Calculate exact angle (starting from current beat position)
      const angle = (beatAngle + elapsedAngle) % 360;
      
      // Update hand position
      setClockHandAngle(angle);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animateClockHand);
    };
    
    // Start the animation loop
    animationRef.current = requestAnimationFrame(animateClockHand);
    
    // Clean up on unmount or when dependencies change
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentBeat, meter, tempo]);
  
  // Update active beat for each polyrhythm
  useEffect(() => {
    if (isPlaying) {
      const newActiveBeats = {};
      
      polyRhythms.forEach(rhythm => {
        if (rhythm.active) {
          newActiveBeats[rhythm.id] = currentBeat % rhythm.beats;
        }
      });
      
      setActiveRhythmBeats(newActiveBeats);
    }
  }, [currentBeat, polyRhythms, isPlaying]);
  
  // Generate beat markers and symbols for main rhythm
  const beatMarkers = [];
  const beatSymbols = [];
  for (let i = 0; i < meter; i++) {
    const angle = (i * (2 * Math.PI)) / meter - Math.PI / 2;
    const { x, y } = getPositionOnCircle(angle, 40);
    const symbolPos = getPositionOnCircle(angle, 45);
    
    // Beat markers (the circles)
    beatMarkers.push(
      <BeatMarker 
        key={`beat-${i}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        $isActive={currentBeat === i && isPlaying}
        $isAccent={i === 0}
      />
    );
    
    // Beat symbols (numbers)
    beatSymbols.push(
      <BeatSymbol
        key={`symbol-${i}`}
        style={{ left: `${symbolPos.x}%`, top: `${symbolPos.y}%` }}
        $isAccent={i === 0}
      >
        {i + 1}
      </BeatSymbol>
    );
  }
  
  // Generate polyrhythm rings and markers
  const polyRhythmElements = [];
  const polyRhythmSymbols = [];
  const polyRhythmColors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'];
  
  polyRhythms.forEach((rhythm, index) => {
    if (!rhythm.active) return;
    
    const ringSize = 95 - (index * 10);
    const color = polyRhythmColors[index % polyRhythmColors.length];
    
    // Add the ring
    polyRhythmElements.push(
      <PolyRhythmRing 
        key={`ring-${rhythm.id}`}
        $size={ringSize}
        $active={rhythm.active}
      />
    );
    
    // Add the beat markers and symbols for this rhythm
    for (let i = 0; i < rhythm.beats; i++) {
      const angle = (i * (2 * Math.PI)) / rhythm.beats - Math.PI / 2;
      const { x, y } = getPositionOnCircle(angle, ringSize / 2);
      const symbolPos = getPositionOnCircle(angle, (ringSize / 2) + 3);
      
      // Beat markers (circles)
      polyRhythmElements.push(
        <PolyRhythmMarker 
          key={`poly-${rhythm.id}-beat-${i}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          $isActive={activeRhythmBeats[rhythm.id] === i && isPlaying}
          $color={color}
        />
      );
      
      // Smaller symbols for polyrhythm beats
      polyRhythmSymbols.push(
        <BeatSymbol
          key={`poly-symbol-${rhythm.id}-${i}`}
          style={{ 
            left: `${symbolPos.x}%`, 
            top: `${symbolPos.y}%`,
            fontSize: '0.8rem',
            color: color
          }}
        >
          {i + 1}
        </BeatSymbol>
      );
    }
  });
  
  return (
    <VisualizerContainer>
      {beatMarkers}
      {beatSymbols}
      {polyRhythmElements}
      {polyRhythmSymbols}
      <ClockHand $rotation={clockHandAngle} />
      
      <InnerCircle>
        <TempoDisplay>
          {meter}/4
          <span>{isPlaying ? 'Playing' : 'Paused'}</span>
        </TempoDisplay>
      </InnerCircle>
    </VisualizerContainer>
  );
};

export default Visualizer;