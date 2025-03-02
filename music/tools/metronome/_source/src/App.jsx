import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';
import MetronomeControls from './components/MetronomeControls';
import PolyRhythmControls from './components/PolyRhythmControls';
import Visualizer from './components/Visualizer';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff00ff, transparent);
    bottom: -10px;
    left: 0;
    filter: blur(2px);
    opacity: 0.5;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: transparent;
  background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  position: relative;
  text-shadow: 
    0 0 5px rgba(255, 0, 255, 0.3),
    0 0 10px rgba(0, 255, 255, 0.3);
  letter-spacing: 6px;
  
  &::after {
    content: 'METRONOME';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: blur(8px);
    opacity: 0.6;
    z-index: -1;
  }
`;

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [meter, setMeter] = useState(4);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [polyRhythms, setPolyRhythms] = useState([
    { id: 1, active: false, beats: 3, sound: 'high' }
  ]);

  // Setup and handle metronome timing
  useEffect(() => {
    let beatCount = 0;
    
    // Cancel any previous transport schedules
    Tone.Transport.cancel();
    
    // Set the tempo
    Tone.Transport.bpm.value = tempo;
    
    // Create an audio buffer for the click sound
    const accentBuffer = new Tone.ToneAudioBuffer();
    const normalBuffer = new Tone.ToneAudioBuffer();
    
    // Using tone.js oscillator to create buffer
    const createBuffer = (freq, duration) => {
      const sampleRate = Tone.context.sampleRate;
      const buffer = Tone.context.createBuffer(1, sampleRate * duration, sampleRate);
      const channel = buffer.getChannelData(0);
      
      for (let i = 0; i < channel.length; i++) {
        // Simple sine wave with exponential decay
        const t = i / sampleRate;
        channel[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-8 * t);
      }
      
      return buffer;
    };
    
    // Create click sounds with more distinct difference
    const accentClick = createBuffer(1500, 0.1); // Higher frequency for accent
    const normalClick = createBuffer(600, 0.1);  // Lower frequency for regular beats
    
    accentBuffer.set(accentClick);
    normalBuffer.set(normalClick);
    
    // Create click players with much bigger volume difference
    const accentPlayer = new Tone.Player({
      url: accentBuffer,
      volume: -5  // Louder accent
    }).toDestination();
    
    const normalPlayer = new Tone.Player({
      url: normalBuffer,
      volume: -20  // Quieter normal beats
    }).toDestination();
    
    // Create polyrhythm players
    const polyPlayers = polyRhythms.filter(r => r.active).map(rhythm => {
      return {
        id: rhythm.id,
        player: new Tone.Player({
          url: normalBuffer,
          volume: -20
        }).toDestination(),
        beats: rhythm.beats
      };
    });
    
    // Schedule the metronome loop with precise timing
    const loop = new Tone.Loop((time) => {
      // Calculate the current beat position in the measure
      const beatPosition = beatCount % meter;
      
      // Use Tone.Draw to sync beat display perfectly with audio
      Tone.Draw.schedule(() => {
        // This will execute in sync with the audio
        setCurrentBeat(beatPosition);
      }, time);
      
      // Play the appropriate click sound
      if (beatPosition === 0) {
        accentPlayer.start(time);
      } else {
        normalPlayer.start(time);
      }
      
      // Play polyrhythms
      polyPlayers.forEach(poly => {
        if (beatCount % poly.beats === 0) {
          poly.player.start(time);
        }
      });
      
      // Update beat count
      beatCount = (beatCount + 1) % (meter * 16); // Prevent overflow eventually
      
    }, "4n").start(0);
    
    // Clean up
    return () => {
      loop.dispose();
      accentPlayer.dispose();
      normalPlayer.dispose();
      polyPlayers.forEach(pp => pp.player.dispose());
    };
  }, [tempo, meter, polyRhythms]);
  
  // Play/Pause control
  useEffect(() => {
    if (isPlaying) {
      // Ensure audio context is started (needed due to browser autoplay policies)
      if (Tone.context.state !== 'running') {
        Tone.context.resume().then(() => {
          Tone.Transport.start();
        });
      } else {
        Tone.Transport.start();
      }
    } else {
      Tone.Transport.pause();
      setCurrentBeat(0);
    }
    
    return () => {
      Tone.Transport.pause();
    };
  }, [isPlaying]);
  
  const togglePlayPause = () => {
    // Ensure audio context is started (needed due to browser autoplay policies)
    if (Tone.context.state !== 'running') {
      Tone.context.resume().then(() => {
        setIsPlaying(!isPlaying);
      });
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTempoChange = (newTempo) => {
    setTempo(newTempo);
  };

  const handleMeterChange = (newMeter) => {
    setMeter(newMeter);
    setCurrentBeat(0);
  };

  const addPolyRhythm = () => {
    const newId = polyRhythms.length > 0 
      ? Math.max(...polyRhythms.map(r => r.id)) + 1 
      : 1;
    
    setPolyRhythms([
      ...polyRhythms, 
      { id: newId, active: false, beats: 3, sound: 'high' }
    ]);
  };

  const updatePolyRhythm = (id, updates) => {
    setPolyRhythms(polyRhythms.map(rhythm => 
      rhythm.id === id ? { ...rhythm, ...updates } : rhythm
    ));
  };

  const removePolyRhythm = (id) => {
    setPolyRhythms(polyRhythms.filter(rhythm => rhythm.id !== id));
  };

  return (
    <AppContainer>
      <Title>Metronome</Title>
      
      <Visualizer 
        isPlaying={isPlaying} 
        currentBeat={currentBeat} 
        meter={meter}
        polyRhythms={polyRhythms}
        tempo={tempo}
      />
      
      <MetronomeControls 
        tempo={tempo}
        meter={meter}
        isPlaying={isPlaying}
        onTempoChange={handleTempoChange}
        onMeterChange={handleMeterChange}
        onPlayPauseToggle={togglePlayPause}
      />
      
      <PolyRhythmControls 
        polyRhythms={polyRhythms}
        onAdd={addPolyRhythm}
        onUpdate={updatePolyRhythm}
        onRemove={removePolyRhythm}
      />
    </AppContainer>
  );
}

export default App;