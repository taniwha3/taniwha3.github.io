import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Bar } from '../components/Timeline';
import type { PolyrhythmLayer } from '../types/polyrhythm';
import { DEFAULT_PROJECT } from './projectConstants';

export interface ProjectState {
  name: string;
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  tempoMap: Bar[];
  polyrhythm: {
    layers: PolyrhythmLayer[];
  };
  useAdvancedMode: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface ProjectContextType {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
  exportProject: () => void;
  importProject: (file: File) => void;
  resetProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = 'metronomicon_project';
const CURRENT_VERSION = 1;

// Validate project structure
function validateProject(project: unknown): project is ProjectState {
  const p = project as Record<string, unknown>;
  const timeSig = p.timeSignature as Record<string, unknown>;
  
  return !!(
    p &&
    typeof p.name === 'string' &&
    typeof p.tempo === 'number' &&
    p.tempo >= 20 &&
    p.tempo <= 400 &&
    timeSig &&
    typeof timeSig.numerator === 'number' &&
    typeof timeSig.denominator === 'number' &&
    [2, 4, 8, 16, 32].includes(timeSig.denominator as number) &&
    Array.isArray(p.tempoMap) &&
    p.polyrhythm &&
    Array.isArray((p.polyrhythm as Record<string, unknown>).layers) &&
    typeof p.version === 'number'
  );
}

// Migrate project from older versions
function migrateProject(project: unknown): ProjectState {
  const p = project as Partial<ProjectState>;
  // If version is missing or old, migrate
  if (!p.version || p.version < CURRENT_VERSION) {
    return {
      ...DEFAULT_PROJECT,
      ...p,
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
    };
  }
  return p as ProjectState;
}

// Load project from localStorage
function loadProjectFromStorage(): ProjectState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (validateProject(parsed)) {
        return migrateProject(parsed);
      }
    }
  } catch (error) {
    console.error('Failed to load project from storage:', error);
  }
  return DEFAULT_PROJECT;
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<ProjectState>(loadProjectFromStorage);

  // Auto-save to localStorage when project changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch (error) {
      console.error('Failed to save project to storage:', error);
    }
  }, [project]);

  const updateProject = useCallback((updates: Partial<ProjectState>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const exportProject = useCallback(() => {
    const dataStr = JSON.stringify(project, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${project.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [project]);

  const importProject = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);

        // Validate the imported project
        if (!validateProject(importedData)) {
          throw new Error('Invalid project file format');
        }

        // Migrate if needed and update timestamps
        const migratedProject = migrateProject(importedData);
        setProject({
          ...migratedProject,
          updatedAt: new Date().toISOString(),
        });

        // Show success without using alert
        console.log('Project imported successfully!');
      } catch (error) {
        console.error('Failed to import project:', error);
        // In a real app, you'd show this in a toast or modal
        console.error('Invalid project file. Please check the format.');
      }
    };

    reader.onerror = () => {
      console.error('Failed to read file');
    };

    reader.readAsText(file);
  }, []);

  const resetProject = useCallback(() => {
    if (
      confirm(
        'Are you sure you want to reset the project? This will lose all unsaved changes.'
      )
    ) {
      setProject({
        ...DEFAULT_PROJECT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateProject,
        exportProject,
        importProject,
        resetProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
