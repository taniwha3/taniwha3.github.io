import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 0, 255, 0.1);
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  letter-spacing: 3px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #ff00ff 0%, #9900ff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 
    0 0 10px rgba(255, 0, 255, 0.5),
    0 0 20px rgba(255, 0, 255, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 0 15px rgba(255, 0, 255, 0.7),
      0 0 30px rgba(255, 0, 255, 0.4);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 
      0 0 8px rgba(255, 0, 255, 0.5),
      0 0 16px rgba(255, 0, 255, 0.3);
  }
`;

const RhythmList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RhythmItem = styled.div`
  background: rgba(25, 10, 40, 0.7);
  border-radius: 8px;
  padding: 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(255, 0, 255, 0.1);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 5px rgba(255, 0, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  /* Removed animated scanline */
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 15, 40, 0.7);
    transition: .4s;
    border-radius: 26px;
    border: 1px solid rgba(128, 0, 255, 0.3);
    
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background: linear-gradient(135deg, #333, #222);
      transition: .4s;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
  
  input:checked + span {
    background: linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(128, 0, 255, 0.3));
    box-shadow: 
      0 0 5px rgba(255, 0, 255, 0.5),
      0 0 10px rgba(255, 0, 255, 0.3) inset;
  }
  
  input:checked + span:before {
    transform: translateX(24px);
    background: linear-gradient(135deg, #ff00ff, #9900ff);
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #aaa;
  min-width: 60px;
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

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.5);
  }
  
  option {
    background: #222;
  }
`;

const Value = styled.div`
  font-size: 1rem;
  min-width: 30px;
  text-align: center;
  color: #f5f5f5;
`;

const DeleteButton = styled.button`
  background: rgba(40, 0, 40, 0.4);
  color: #ff00ff;
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 0 8px rgba(255, 0, 255, 0.2);
  
  &:hover {
    background: rgba(255, 0, 255, 0.2);
    color: white;
    border-color: rgba(255, 0, 255, 0.6);
    box-shadow: 
      0 0 15px rgba(255, 0, 255, 0.5),
      0 0 30px rgba(255, 0, 255, 0.3);
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PolyRhythmControls = ({ polyRhythms, onAdd, onUpdate, onRemove }) => {
  return (
    <Container>
      <Header>
        <Title>Polyrhythms</Title>
        <AddButton onClick={onAdd}>+ Add Rhythm</AddButton>
      </Header>
      
      <RhythmList>
        {polyRhythms.map(rhythm => (
          <RhythmItem key={rhythm.id}>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                checked={rhythm.active}
                onChange={(e) => onUpdate(rhythm.id, { active: e.target.checked })}
              />
              <span />
            </ToggleSwitch>
            
            <Controls>
              <ControlRow>
                <Label>Beats:</Label>
                <Slider 
                  type="range" 
                  min="2" 
                  max="16" 
                  value={rhythm.beats}
                  onChange={(e) => onUpdate(rhythm.id, { beats: Number(e.target.value) })}
                />
                <Value>{rhythm.beats}</Value>
              </ControlRow>
              
              <ControlRow>
                <Label>Sound:</Label>
                <Select 
                  value={rhythm.sound}
                  onChange={(e) => onUpdate(rhythm.id, { sound: e.target.value })}
                >
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </Select>
              </ControlRow>
            </Controls>
            
            <DeleteButton onClick={() => onRemove(rhythm.id)}>×</DeleteButton>
          </RhythmItem>
        ))}
      </RhythmList>
    </Container>
  );
};

export default PolyRhythmControls;