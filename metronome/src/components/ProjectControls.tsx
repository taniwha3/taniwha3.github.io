import { useRef } from 'react';
import './ProjectControls.css';

interface ProjectControlsProps {
  projectName: string;
  onNameChange: (name: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
}

export function ProjectControls({
  projectName,
  onNameChange,
  onExport,
  onImport,
  onReset,
}: ProjectControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="project-controls">
      <div className="project-header">
        <h3>Project</h3>
        <div className="project-actions">
          <button
            className="project-button export"
            onClick={onExport}
            title="Export project"
          >
            ↓ Export
          </button>
          <button
            className="project-button import"
            onClick={handleImportClick}
            title="Import project"
          >
            ↑ Import
          </button>
          <button
            className="project-button reset"
            onClick={onReset}
            title="Reset project"
          >
            ⟲ Reset
          </button>
        </div>
      </div>

      <div className="project-details">
        <label>Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => onNameChange(e.target.value)}
          className="project-name-input"
          placeholder="Enter project name"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
