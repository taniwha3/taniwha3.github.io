import { useState, useEffect } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { PolyrhythmLayer } from './PolyrhythmLayer';
import { PolyrhythmVisualization } from './PolyrhythmVisualization';
import type { PolyrhythmLayer as PolyrhythmLayerType } from '../types/polyrhythm';
import './PolyrhythmEditor.css';

interface PolyrhythmEditorProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentBeats?: { [layerId: string]: number };
}

export function PolyrhythmEditor({
  isPlaying,
  onTogglePlay,
  currentBeats = {},
}: PolyrhythmEditorProps) {
  const { project, updateProject } = useProject();
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Initialize default layer if empty
  useEffect(() => {
    if (project.polyrhythm.layers.length === 0) {
      const defaultLayer: PolyrhythmLayerType = {
        id: 'main-beat',
        name: 'Main Beat',
        subdivision: project.timeSignature.numerator,
        pattern: new Array(project.timeSignature.numerator).fill(true),
        velocities: new Array(project.timeSignature.numerator)
          .fill(0.7)
          .map((v, i) => (i === 0 ? 1 : v)),
        sound: 'click',
        pitch: 1,
        muted: false,
        color: '#ff6666',
        alignment: 'edge',
      };
      updateProject({
        polyrhythm: {
          layers: [defaultLayer],
        },
      });
    }
  }, [
    project.polyrhythm.layers.length,
    project.timeSignature.numerator,
    updateProject,
  ]);

  const layers = project.polyrhythm.layers;

  const handleLayerUpdate = (
    layerId: string,
    updates: Partial<PolyrhythmLayerType>
  ) => {
    updateProject({
      polyrhythm: {
        layers: layers.map((layer) =>
          layer.id === layerId ? { ...layer, ...updates } : layer
        ),
      },
    });
  };

  const handleAddLayer = () => {
    const newLayer: PolyrhythmLayerType = {
      id: `layer-${Date.now()}`,
      name: `Layer ${layers.length + 1}`,
      subdivision: 3, // Default to triplets
      pattern: new Array(3).fill(true),
      velocities: new Array(3).fill(0.7),
      sound: 'woodblock',
      pitch: 1.2,
      muted: false,
      color: '#ffd700',
      alignment: 'edge',
    };
    updateProject({
      polyrhythm: {
        layers: [...layers, newLayer],
      },
    });
  };

  const handleDeleteLayer = (layerId: string) => {
    if (layers.length > 1) {
      updateProject({
        polyrhythm: {
          layers: layers.filter((layer) => layer.id !== layerId),
        },
      });
      if (selectedLayerId === layerId) {
        setSelectedLayerId(null);
      }
    }
  };

  // Calculate the time signature from the project
  const timeSignature =
    project.useAdvancedMode && project.tempoMap.length > 0
      ? project.tempoMap[0].timeSignature
      : project.timeSignature;

  return (
    <div className="polyrhythm-editor">
      <div className="polyrhythm-header">
        <h3>Polyrhythm Layers</h3>
        <div className="polyrhythm-info">
          Base: {timeSignature.numerator}/{timeSignature.denominator}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className={`add-layer-button ${isPlaying ? 'playing' : ''}`}
            onClick={onTogglePlay}
            style={{ background: isPlaying ? '#ff3333' : undefined }}
            aria-label={isPlaying ? 'Stop polyrhythm' : 'Play polyrhythm'}
            aria-pressed={isPlaying}
          >
            {isPlaying ? '■ Stop' : '▶ Play'}
          </button>
          <button 
            className="add-layer-button" 
            onClick={handleAddLayer}
            aria-label="Add new polyrhythm layer"
          >
            + Add Layer
          </button>
        </div>
      </div>

      <div className="layers-container">
        {layers.map((layer) => (
          <PolyrhythmLayer
            key={layer.id}
            layer={layer}
            baseBeats={timeSignature.numerator}
            isSelected={selectedLayerId === layer.id}
            onSelect={() => setSelectedLayerId(layer.id)}
            onUpdate={(updates) => handleLayerUpdate(layer.id, updates)}
            onDelete={() => handleDeleteLayer(layer.id)}
            canDelete={layers.length > 1}
          />
        ))}
      </div>

      <div className="polyrhythm-visualization-container">
        <h4>Rhythm Alignment</h4>
        <PolyrhythmVisualization
          layers={layers}
          baseBeats={timeSignature.numerator}
          currentBeats={currentBeats}
        />
      </div>
    </div>
  );
}
