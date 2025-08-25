import { useState } from 'react';
import { SampleManager } from './SampleManager';
import { ProjectControls } from './ProjectControls';
import { useProject } from '../contexts/ProjectContext';
import './Sidebar.css';

export type SidebarTab = 'project' | 'samples' | 'settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('project');
  const { project, updateProject, exportProject, importProject, resetProject } =
    useProject();

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Settings</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <div className="sidebar-tabs">
          <button
            className={`tab ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            Project
          </button>
          <button
            className={`tab ${activeTab === 'samples' ? 'active' : ''}`}
            onClick={() => setActiveTab('samples')}
          >
            Samples
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="sidebar-content">
          {activeTab === 'project' && (
            <div className="tab-content">
              <ProjectControls
                projectName={project.name}
                onNameChange={(name) => updateProject({ name })}
                onExport={exportProject}
                onImport={importProject}
                onReset={resetProject}
              />
              <div className="project-info">
                <h3>Project Information</h3>
                <p>Mode: {project.useAdvancedMode ? 'Advanced' : 'Simple'}</p>
                <p>Tempo: {project.tempo} BPM</p>
                <p>
                  Time Signature: {project.timeSignature.numerator}/
                  {project.timeSignature.denominator}
                </p>
                {project.useAdvancedMode && (
                  <>
                    <p>Bars: {project.tempoMap.length}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'samples' && (
            <div className="tab-content">
              <SampleManager />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <div className="settings-section">
                <h3>Audio Settings</h3>
                <p>Click sound customization coming soon...</p>
              </div>
              <div className="settings-section">
                <h3>Visual Settings</h3>
                <p>Theme customization coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
