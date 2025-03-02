import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  background: rgba(15, 5, 30, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(255, 0, 255, 0.1),
    0 0 20px rgba(0, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 0, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  /* Grid effect */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: 
      linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, 0.05) 25%, rgba(255, 0, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.05) 75%, rgba(255, 0, 255, 0.05) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(255, 0, 255, 0.05) 25%, rgba(255, 0, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.05) 75%, rgba(255, 0, 255, 0.05) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
    z-index: -1;
    opacity: 0.3;
  }
`;

const ControlsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const ControlsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  letter-spacing: 3px;
`;

const PlayButton = styled.button`
  background: ${({ $isPlaying }) => 
    $isPlaying 
      ? 'linear-gradient(135deg, #ff00ff 0%, #ff00aa 100%)' 
      : 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ $isPlaying }) => 
    $isPlaying 
      ? '0 0 15px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.2)' 
      : '0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.2)'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $isPlaying }) => 
      $isPlaying 
        ? '0 0 20px rgba(255, 0, 255, 0.7), 0 0 40px rgba(255, 0, 255, 0.3)' 
        : '0 0 20px rgba(0, 255, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.3)'};
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: ${({ $isPlaying }) => 
      $isPlaying 
        ? '0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.2)' 
        : '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.2)'};
  }
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.5rem;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: rgba(30, 15, 40, 0.5);
  border-radius: 3px;
  outline: none;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
    border-radius: 3px;
    z-index: -1;
  }
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00ffff;
    cursor: pointer;
    box-shadow: 
      0 0 10px rgba(0, 255, 255, 0.8),
      0 0 20px rgba(0, 255, 255, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00ffff;
    cursor: pointer;
    box-shadow: 
      0 0 10px rgba(0, 255, 255, 0.8),
      0 0 20px rgba(0, 255, 255, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  min-width: 65px;
  text-align: center;
  color: #f5f5f5;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 
    0 0 5px rgba(0, 255, 255, 0.8),
    0 0 10px rgba(0, 255, 255, 0.5);
  background: linear-gradient(135deg, #00ffff, #f5f5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MetronomeControls = ({ 
  tempo, 
  meter, 
  isPlaying, 
  onTempoChange, 
  onMeterChange, 
  onPlayPauseToggle 
}) => {
  return (
    <ControlsContainer>
      <ControlsHeader>
        <ControlsTitle>Controls</ControlsTitle>
        <PlayButton 
          $isPlaying={isPlaying} 
          onClick={onPlayPauseToggle}
        >
          {isPlaying ? '■' : '▶'}
        </PlayButton>
      </ControlsHeader>
      
      <ControlsGrid>
        <ControlGroup>
          <Label htmlFor="tempo">Tempo (BPM)</Label>
          <SliderContainer>
            <Slider 
              type="range" 
              id="tempo" 
              min="40" 
              max="240" 
              value={tempo} 
              onChange={(e) => onTempoChange(Number(e.target.value))} 
            />
            <Value>{tempo}</Value>
          </SliderContainer>
        </ControlGroup>
        
        <ControlGroup>
          <Label htmlFor="meter">Meter (Beats)</Label>
          <SliderContainer>
            <Slider 
              type="range" 
              id="meter" 
              min="2" 
              max="12" 
              value={meter} 
              onChange={(e) => onMeterChange(Number(e.target.value))} 
            />
            <Value>{meter}</Value>
          </SliderContainer>
        </ControlGroup>
      </ControlsGrid>
    </ControlsContainer>
  );
};

export default MetronomeControls;