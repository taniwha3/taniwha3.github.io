/**
 * Core rhythm-related TypeScript interfaces
 */

/**
 * Represents a time signature (e.g., 4/4, 7/8, 17/16)
 */
export interface TimeSignature {
  /** Numerator - beats per measure */
  numerator: number;
  /** Denominator - note value that gets one beat (4 = quarter, 8 = eighth, etc.) */
  denominator: number;
  /** Optional display name */
  displayName?: string;
}

/**
 * Represents a tuplet (rhythmic grouping that divides time differently)
 */
export interface Tuplet {
  /** Number of notes in the tuplet (e.g., 3 for triplet, 5 for quintuplet) */
  notes: number;
  /** Time span in normal notes (e.g., 2 for "3 in the time of 2") */
  inTimeOf: number;
  /** Nested tuplets for complex rhythms */
  nested?: Tuplet[];
}

/**
 * Velocity/accent information for a beat
 */
export interface Accent {
  /** Velocity (0-127, MIDI standard) */
  velocity: number;
  /** Optional sound/sample ID to use */
  soundId?: string;
}

/**
 * Represents a rhythmic pattern/sequence
 */
export interface Pattern {
  /** Pattern length in beats */
  length: number;
  /** Accent pattern - maps beat index to accent info */
  accents: Map<number, Accent>;
  /** Subdivisions per beat (e.g., 4 for 16th notes) */
  subdivisions: number;
}

/**
 * Represents a polyrhythmic/polymeter layer
 */
export interface Layer {
  /** Unique layer ID */
  id: string;
  /** Layer name for display */
  name: string;
  /** Time signature for this layer */
  timeSignature: TimeSignature;
  /** Base tempo in BPM (can be different for polymeter) */
  tempo: number;
  /** Pattern for this layer */
  pattern: Pattern;
  /** Tuplet modifications */
  tuplets?: Tuplet[];
  /** Volume/gain for this layer (0-1) */
  volume: number;
  /** Mute state */
  muted: boolean;
  /** Solo state */
  solo: boolean;
  /** Visual color for UI */
  color?: string;
}

/**
 * Beat event that gets scheduled
 */
export interface BeatEvent {
  /** Which layer this beat belongs to */
  layerId: string;
  /** Absolute time in seconds */
  time: number;
  /** Beat number within the pattern */
  beatIndex: number;
  /** Subdivision index within the beat */
  subdivisionIndex: number;
  /** Accent information */
  accent: Accent;
  /** Is this a downbeat (first beat of measure)? */
  isDownbeat: boolean;
}

/**
 * Tempo change event for tempo maps
 */
export interface TempoChange {
  /** Time in seconds when tempo changes */
  time: number;
  /** New tempo in BPM */
  tempo: number;
  /** Curve type for gradual changes */
  curve?: 'linear' | 'exponential' | 'bezier';
  /** Curve parameters if applicable */
  curveParams?: number[];
}

/**
 * Complete metronome state
 */
export interface MetronomeState {
  /** All layers */
  layers: Layer[];
  /** Global tempo (can be overridden by layers) */
  globalTempo: number;
  /** Global time signature (can be overridden by layers) */
  globalTimeSignature: TimeSignature;
  /** Tempo map for tempo changes */
  tempoMap: TempoChange[];
  /** Current playback position in seconds */
  currentTime: number;
  /** Is playing? */
  isPlaying: boolean;
  /** Loop settings */
  loop?: {
    enabled: boolean;
    startTime: number;
    endTime: number;
  };
}

/**
 * Helper type for polyrhythm calculations
 */
export interface PolyrhythmConfig {
  /** Base pulse layer */
  baseLayer: Layer;
  /** Additional layers */
  additionalLayers: Layer[];
  /** Common subdivision to use for synchronization */
  commonSubdivision?: number;
}

/**
 * Sound/sample definition
 */
export interface Sound {
  /** Unique sound ID */
  id: string;
  /** Display name */
  name: string;
  /** URL or data for the sound */
  url?: string;
  /** Audio buffer if pre-loaded */
  buffer?: AudioBuffer;
  /** Default settings */
  defaultVelocity?: number;
  defaultPitch?: number;
}
