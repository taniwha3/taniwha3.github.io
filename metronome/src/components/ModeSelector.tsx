import './ModeSelector.css';

interface ModeSelectorProps {
  isAdvanced: boolean;
  onChange: (isAdvanced: boolean) => void;
}

export function ModeSelector({ isAdvanced, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector" role="group" aria-label="Mode selection">
      <button
        className={`mode-button ${!isAdvanced ? 'active' : ''}`}
        onClick={() => onChange(false)}
        aria-pressed={!isAdvanced}
        aria-label="Simple mode"
      >
        Simple
      </button>
      <button
        className={`mode-button ${isAdvanced ? 'active' : ''}`}
        onClick={() => onChange(true)}
        aria-pressed={isAdvanced}
        aria-label="Advanced mode"
      >
        Advanced
      </button>
    </div>
  );
}
