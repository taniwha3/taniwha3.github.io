import { useState, useEffect, useCallback, useMemo } from 'react';
import { ModeSelector } from './components/ModeSelector';
import { TabSelector, type TabType } from './components/TabSelector';
import { SimpleModePanel } from './components/SimpleModePanel';
import { AdvancedModePanel } from './components/AdvancedModePanel';
import { FretboardTab } from './components/FretboardTab';
import { NaturalHarmonics } from './components/NaturalHarmonics';
import { Pentatonics } from './components/Pentatonics';
import { CircleOfFifths } from './components/CircleOfFifths';
import { Sidebar } from './components/Sidebar';
import { TimingDebug } from './components/TimingDebug';
import { useMetronome } from './hooks/useMetronome';
import { useProject } from './contexts/ProjectContext';
import type { Bar } from './components/Timeline';
import './App.css';

function App() {
  const { project, updateProject } = useProject();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTimingDebug, setShowTimingDebug] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('metronome');

  // Add keyboard shortcut for timing debug
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault();
        setShowTimingDebug((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Use simple mode values or advanced mode from project
  const currentTempo = useMemo(
    () =>
      project.useAdvancedMode && project.tempoMap.length > 0
        ? project.tempoMap[0].tempo
        : project.tempo,
    [project.useAdvancedMode, project.tempoMap, project.tempo]
  );

  const currentTimeSignature = useMemo(
    () =>
      project.useAdvancedMode && project.tempoMap.length > 0
        ? project.tempoMap[0].timeSignature
        : project.timeSignature,
    [project.useAdvancedMode, project.tempoMap, project.timeSignature]
  );

  const { isPlaying, currentBeat, isAccent, polyrhythmBeats, toggle } =
    useMetronome();

  const handlePlayPause = () => {
    toggle();
  };

  const handleTapTempo = useCallback(
    (newTempo: number) => {
      updateProject({ tempo: newTempo });
    },
    [updateProject]
  );

  const handleTempoChange = useCallback(
    (newTempo: number) => {
      if (project.useAdvancedMode) {
        // Update first bar in tempo map
        const updatedTempoMap = [...project.tempoMap];
        updatedTempoMap[0] = { ...updatedTempoMap[0], tempo: newTempo };
        updateProject({ tempoMap: updatedTempoMap });
      } else {
        updateProject({ tempo: newTempo });
      }
    },
    [project.useAdvancedMode, project.tempoMap, updateProject]
  );

  const handleTimeSignatureChange = useCallback(
    (numerator: number, denominator: number) => {
      if (project.useAdvancedMode) {
        // Update first bar in tempo map
        const updatedTempoMap = [...project.tempoMap];
        updatedTempoMap[0] = {
          ...updatedTempoMap[0],
          timeSignature: { numerator, denominator },
        };
        updateProject({ tempoMap: updatedTempoMap });
      } else {
        updateProject({ timeSignature: { numerator, denominator } });
      }
    },
    [project.useAdvancedMode, project.tempoMap, updateProject]
  );

  const handleBarsChange = useCallback(
    (newBars: Bar[]) => {
      updateProject({ tempoMap: newBars });
    },
    [updateProject]
  );

  const handleUpdateBar = useCallback(
    (updatedBar: Bar) => {
      const updatedTempoMap = project.tempoMap.map((bar) =>
        bar.id === updatedBar.id ? updatedBar : bar
      );
      updateProject({ tempoMap: updatedTempoMap });
    },
    [project.tempoMap, updateProject]
  );

  return (
    <div className="app-container">
      <div className="app-sidebar">
        <TabSelector activeTab={activeTab} onChange={setActiveTab} />
      </div>
      
      <div
        className={`app ${project.useAdvancedMode ? 'advanced-mode' : 'simple-mode'}`}
      >
        <div className="app-header">
          <div>
            <h1>Metronomicon</h1>
            <p className="subtitle">Progressive Metal Metronome</p>
          </div>

          {activeTab === 'metronome' && (
            <ModeSelector
              isAdvanced={project.useAdvancedMode}
              onChange={(isAdvanced) =>
                updateProject({ useAdvancedMode: isAdvanced })
              }
            />
          )}

          <div className="header-buttons">
            <button
              className="menu-button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open settings"
            >
              ⚙
            </button>

            <button
              className={`menu-button ${showTimingDebug ? 'active' : ''}`}
              onClick={() => setShowTimingDebug(!showTimingDebug)}
              aria-label="Toggle timing debug"
              title="Toggle Timing Debug (Ctrl+D)"
            >
              📊
            </button>
          </div>
        </div>

        {activeTab === 'metronome' ? (
        !project.useAdvancedMode ? (
          <SimpleModePanel
            tempo={currentTempo}
            timeSignature={currentTimeSignature}
            currentBeat={currentBeat}
            isAccent={isAccent}
            isPlaying={isPlaying}
            onTempoChange={handleTempoChange}
            onTimeSignatureChange={handleTimeSignatureChange}
            onPlayPause={handlePlayPause}
            onTapTempo={handleTapTempo}
          />
        ) : (
          <AdvancedModePanel
            isPlaying={isPlaying}
            currentBeat={currentBeat}
            isAccent={isAccent}
            polyrhythmBeats={polyrhythmBeats}
            tempoMap={project.tempoMap}
            onPlayPause={handlePlayPause}
            onTapTempo={handleTapTempo}
            onBarsChange={handleBarsChange}
            onUpdateBar={handleUpdateBar}
          />
        )
      ) : activeTab === 'fretboard' ? (
        <FretboardTab />
      ) : activeTab === 'harmonics' ? (
        <NaturalHarmonics />
      ) : activeTab === 'pentatonics' ? (
        <Pentatonics />
      ) : (
        <CircleOfFifths />
      )}

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <TimingDebug isVisible={showTimingDebug} />
      </div>
    </div>
  );
}

export default App;
