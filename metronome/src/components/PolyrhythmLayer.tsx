import { useState } from 'react';
import type {
  PolyrhythmLayer as LayerType,
  LayerSound,
} from '../types/polyrhythm';
import './PolyrhythmLayer.css';

interface PolyrhythmLayerProps {
  layer: LayerType;
  baseBeats: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<LayerType>) => void;
  onDelete: () => void;
  canDelete: boolean;
}

const SOUND_OPTIONS: { value: LayerSound; label: string }[] = [
  { value: 'click', label: 'Click' },
  { value: 'accent', label: 'Accent' },
  { value: 'woodblock', label: 'Woodblock' },
  { value: 'cowbell', label: 'Cowbell' },
  { value: 'hihat', label: 'Hi-hat' },
  { value: 'rimshot', label: 'Rimshot' },
];

export function PolyrhythmLayer({
  layer,
  baseBeats,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  canDelete,
}: PolyrhythmLayerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleSubdivisionChange = (newSubdivision: number) => {
    // Create new pattern and velocities arrays with the new length
    const newPattern = new Array(newSubdivision).fill(true); // Default new beats to active
    const newVelocities = new Array(newSubdivision).fill(0.7);

    // Copy over existing values where possible
    for (let i = 0; i < Math.min(layer.pattern.length, newSubdivision); i++) {
      newPattern[i] = layer.pattern[i];
      newVelocities[i] = layer.velocities[i];
    }

    onUpdate({
      subdivision: newSubdivision,
      pattern: newPattern,
      velocities: newVelocities,
    });
  };

  const handleBeatToggle = (index: number) => {
    const newPattern = [...layer.pattern];
    newPattern[index] = !newPattern[index];
    onUpdate({ pattern: newPattern });
  };

  const handleMouseDown = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragIndex(index);
    updateVelocityFromEvent(index, e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && dragIndex !== null) {
      // Find the beat element at the current mouse position
      const beatElements = e.currentTarget.querySelectorAll('.beat');
      const mouseY = e.clientY;

      beatElements.forEach((element, index) => {
        if (index === dragIndex) {
          const rect = element.getBoundingClientRect();
          if (mouseY >= rect.top && mouseY <= rect.bottom) {
            updateVelocityFromPosition(
              dragIndex,
              mouseY - rect.top,
              rect.height
            );
          }
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(null);
  };

  const updateVelocityFromEvent = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    updateVelocityFromPosition(index, y, rect.height);
  };

  const updateVelocityFromPosition = (
    index: number,
    y: number,
    height: number
  ) => {
    const velocity = 1 - Math.max(0, Math.min(1, y / height));
    const newVelocities = [...layer.velocities];
    newVelocities[index] = velocity;
    onUpdate({ velocities: newVelocities });
  };

  // Calculate the polyrhythm ratio
  const ratio = `${layer.subdivision}:${baseBeats}`;

  return (
    <div
      className={`polyrhythm-layer ${isSelected ? 'selected' : ''} ${layer.muted ? 'muted' : ''}`}
      onClick={onSelect}
    >
      <div className="layer-header">
        <input
          type="text"
          className="layer-name"
          value={layer.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          onClick={(e) => e.stopPropagation()}
        />

        <div className="layer-ratio">{ratio}</div>

        <div className="layer-controls">
          <button
            className="mute-button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ muted: !layer.muted });
            }}
            title={layer.muted ? 'Unmute' : 'Mute'}
            aria-label={layer.muted ? 'Unmute layer' : 'Mute layer'}
            aria-pressed={layer.muted}
          >
            {layer.muted ? '🔇' : '🔊'}
          </button>

          <input
            type="color"
            className="color-picker"
            value={layer.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            title="Layer color"
          />

          {canDelete && (
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete layer"
              aria-label="Delete layer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="layer-settings">
        <div className="setting-group">
          <label>Subdivision:</label>
          <input
            type="number"
            min="2"
            max="16"
            value={layer.subdivision}
            onChange={(e) =>
              handleSubdivisionChange(Math.max(2, Math.min(16, parseInt(e.target.value, 10) || 3)))
            }
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="setting-group">
          <label>Sound:</label>
          <select
            value={layer.sound}
            onChange={(e) => onUpdate({ sound: e.target.value as LayerSound })}
            onClick={(e) => e.stopPropagation()}
          >
            {SOUND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <label>Pitch:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={layer.pitch}
            onChange={(e) => onUpdate({ pitch: parseFloat(e.target.value) })}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="pitch-value">{layer.pitch.toFixed(1)}x</span>
        </div>

        <div className="setting-group">
          <label>Align:</label>
          <select
            value={layer.alignment || 'edge'}
            onChange={(e) =>
              onUpdate({ alignment: e.target.value as 'edge' | 'center' })
            }
            onClick={(e) => e.stopPropagation()}
          >
            <option value="edge">Edge</option>
            <option value="center">Center</option>
          </select>
        </div>
      </div>

      <div
        className="beat-grid"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {layer.pattern.map((active, index) => (
          <div
            key={index}
            className={`beat ${active ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleBeatToggle(index);
            }}
            onMouseDown={(e) => {
              handleMouseDown(index, e);
            }}
            style={
              {
                '--beat-color': layer.color,
                '--velocity': layer.velocities[index],
              } as React.CSSProperties
            }
          >
            <div className="beat-fill" />
            <div className="beat-number">{index + 1}</div>
            <div className="velocity-bar" />
            {isDragging && dragIndex === index && (
              <div className="velocity-tooltip">
                {Math.round(layer.velocities[index] * 100)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
