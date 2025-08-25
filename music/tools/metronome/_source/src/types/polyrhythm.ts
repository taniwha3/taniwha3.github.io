export interface PolyrhythmLayer {
  id: string;
  name: string;
  subdivision: number; // Number of beats in this layer per bar (e.g., 3 for triplets against 4/4)
  pattern: boolean[]; // Which subdivisions are active
  velocities: number[]; // Velocity for each subdivision (0-1)
  sound: LayerSound; // Sound type for this layer
  pitch: number; // Pitch modifier (0.5 - 2.0)
  muted: boolean;
  color: string;
  alignment: 'edge' | 'center'; // Whether beats align at subdivision edges or centers
}

export type LayerSound =
  | 'click'
  | 'accent'
  | 'woodblock'
  | 'cowbell'
  | 'hihat'
  | 'rimshot';

export interface PolyrhythmState {
  layers: PolyrhythmLayer[];
  masterBeatsPerBar: number; // The main beat count (e.g., 4 for 4/4 time)
}
