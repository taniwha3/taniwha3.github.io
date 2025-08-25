import type { Bar } from '../components/Timeline';
import type { ProjectState } from './ProjectContext';

export const DEFAULT_PROJECT: ProjectState = {
  name: 'Untitled Project',
  tempo: 120,
  timeSignature: { numerator: 4, denominator: 4 },
  tempoMap: [
    {
      id: 'bar-1',
      barNumber: 1,
      tempo: 120,
      timeSignature: { numerator: 4, denominator: 4 },
    },
  ] as Bar[],
  polyrhythm: {
    layers: [],
  },
  useAdvancedMode: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
};

export const STORAGE_KEY = 'metronomicon_projects';
