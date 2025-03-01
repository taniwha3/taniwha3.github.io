import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  background: rgba(25, 25, 25, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ControlsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ControlsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #f5f5f5;
`;

const PlayButton = styled.button`
  background: ${({ $isPlaying }) => 
    $isPlaying 
      ? 'linear-gradient(135deg, #ff5e62 0%, #ff9966 100%)' 
      : 'linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%)'};
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4cc9f0;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4cc9f0;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    border: none;
  }
`;

const Value = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
  color: #f5f5f5;
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