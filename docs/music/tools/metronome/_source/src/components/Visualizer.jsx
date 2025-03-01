import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-width: 500px;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 50%;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: rgba(20, 20, 20, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const TempoDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #f5f5f5;
  text-align: center;
  line-height: 1;
  
  span {
    display: block;
    font-size: 1rem;
    font-weight: 400;
    color: #aaa;
    margin-top: 0.5rem;
  }
`;

const BeatMarker = styled.div`
  background: ${({ $isActive, $isAccent }) => 
    $isActive 
      ? $isAccent 
        ? '#f72585' 
        : '#4cc9f0' 
      : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: ${({ $isActive }) => 
    $isActive 
      ? '0 0 16px rgba(76, 201, 240, 0.7)' 
      : 'none'};
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.1s ease;
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

const Visualizer = ({ isPlaying, currentBeat, meter, polyRhythms }) => {
  const [activeRhythmBeats, setActiveRhythmBeats] = useState({});
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  // Animation for smooth beat transitions
  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      if (isPlaying) {
        // Animation logic if needed
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);
  
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
  
  // Generate beat markers for main rhythm
  const beatMarkers = [];
  for (let i = 0; i < meter; i++) {
    const angle = (i * (2 * Math.PI)) / meter - Math.PI / 2;
    const { x, y } = getPositionOnCircle(angle, 40);
    
    beatMarkers.push(
      <BeatMarker 
        key={`beat-${i}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        $isActive={currentBeat === i && isPlaying}
        $isAccent={i === 0}
      />
    );
  }
  
  // Generate polyrhythm rings and markers
  const polyRhythmElements = [];
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
    
    // Add the beat markers for this rhythm
    for (let i = 0; i < rhythm.beats; i++) {
      const angle = (i * (2 * Math.PI)) / rhythm.beats - Math.PI / 2;
      const { x, y } = getPositionOnCircle(angle, ringSize / 2);
      
      polyRhythmElements.push(
        <PolyRhythmMarker 
          key={`poly-${rhythm.id}-beat-${i}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          $isActive={activeRhythmBeats[rhythm.id] === i && isPlaying}
          $color={color}
        />
      );
    }
  });
  
  return (
    <VisualizerContainer>
      {beatMarkers}
      {polyRhythmElements}
      
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