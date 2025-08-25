import type { Layer, BeatEvent, TimeSignature, Tuplet } from '../types/rhythm';

/**
 * Engine for calculating polyrhythm and polymeter timing
 * 
 * This engine uses microsecond-precision integer arithmetic to avoid
 * floating-point rounding errors when calculating complex polyrhythms.
 * The LCM (Least Common Multiple) approach ensures perfect synchronization
 * of different rhythm layers.
 * 
 * @example
 * // Calculate when a 5:4 polyrhythm aligns
 * const layers = [
 *   { tempo: 120, timeSignature: { numerator: 5, denominator: 4 }, ... },
 *   { tempo: 120, timeSignature: { numerator: 4, denominator: 4 }, ... }
 * ];
 * const alignmentTime = PolyrhythmEngine.calculateAlignment(layers);
 */
export class PolyrhythmEngine {
  /**
   * Calculate the duration of one beat in seconds
   * @param tempo BPM
   * @param timeSignature Time signature
   * @returns Duration of one beat in seconds
   */
  static calculateBeatDuration(
    tempo: number,
    timeSignature: TimeSignature
  ): number {
    // Guard against invalid tempo
    if (tempo <= 0 || tempo > 999) {
      throw new Error(`Invalid tempo: ${tempo}. Must be between 1 and 999 BPM`);
    }
    
    // Guard against invalid denominator
    if (![1, 2, 4, 8, 16, 32].includes(timeSignature.denominator)) {
      throw new Error(`Invalid denominator: ${timeSignature.denominator}. Must be 1, 2, 4, 8, 16, or 32`);
    }
    
    // Convert BPM to seconds per quarter note
    const quarterNoteDuration = 60 / tempo;

    // Adjust for time signature denominator
    // If denominator is 4, beat = quarter note
    // If denominator is 8, beat = eighth note (half duration)
    const beatDuration = quarterNoteDuration * (4 / timeSignature.denominator);

    return beatDuration;
  }

  /**
   * Calculate the duration of a measure in seconds
   */
  static calculateMeasureDuration(
    tempo: number,
    timeSignature: TimeSignature
  ): number {
    const beatDuration = this.calculateBeatDuration(tempo, timeSignature);
    return beatDuration * timeSignature.numerator;
  }

  /**
   * Apply tuplet ratio to a duration
   */
  static applyTupletRatio(duration: number, tuplet: Tuplet): number {
    return (duration * tuplet.inTimeOf) / tuplet.notes;
  }

  /**
   * Calculate next beat events for a layer within a time window
   * @param layer The layer to calculate beats for
   * @param startTime Start of the time window (seconds)
   * @param endTime End of the time window (seconds)
   * @param layerStartTime When this layer started playing (for polymeter offset)
   * @returns Array of beat events
   */
  static calculateLayerBeats(
    layer: Layer,
    startTime: number,
    endTime: number,
    layerStartTime: number = 0
  ): BeatEvent[] {
    const events: BeatEvent[] = [];
    const beatDuration = this.calculateBeatDuration(
      layer.tempo,
      layer.timeSignature
    );
    const measureDuration = beatDuration * layer.timeSignature.numerator;

    // Calculate which beat we should start from
    const elapsedTime = startTime - layerStartTime;
    const elapsedMeasures = Math.floor(elapsedTime / measureDuration);
    const measureStartTime = layerStartTime + elapsedMeasures * measureDuration;

    // Generate beats for the time window
    let currentTime = measureStartTime;

    while (currentTime < endTime) {
      // Generate beats for current measure
      for (let beat = 0; beat < layer.timeSignature.numerator; beat++) {
        const beatTime = currentTime + beat * beatDuration;

        if (beatTime >= startTime && beatTime < endTime) {
          // Calculate subdivisions
          const subdivisionDuration = beatDuration / layer.pattern.subdivisions;

          for (let sub = 0; sub < layer.pattern.subdivisions; sub++) {
            const subTime = beatTime + sub * subdivisionDuration;

            if (subTime >= startTime && subTime < endTime) {
              // Get accent for this beat/subdivision
              const patternIndex = beat % layer.pattern.length;
              const accent = layer.pattern.accents.get(patternIndex) || {
                velocity: 80, // Default velocity
              };

              events.push({
                layerId: layer.id,
                time: subTime,
                beatIndex: beat,
                subdivisionIndex: sub,
                accent: accent,
                isDownbeat: beat === 0 && sub === 0,
              });
            }
          }
        }
      }

      // Move to next measure
      currentTime += measureDuration;
    }

    return events;
  }

  /**
   * Calculate the least common multiple of beat durations for synchronization
   * 
   * @param layers Array of layers to calculate LCM for
   * @returns LCM duration in seconds
   * @throws Error if LCM would overflow or is too large
   */
  static calculateLCMDuration(layers: Layer[]): number {
    if (layers.length === 0) return 0;
    
    const durations = layers.map((layer) =>
      this.calculateMeasureDuration(layer.tempo, layer.timeSignature)
    );

    // Find LCM of all durations (with precision handling)
    const precision = 1000000; // Microsecond precision
    const intDurations = durations.map((d) => Math.round(d * precision));

    const lcm = intDurations.reduce((a, b) => {
      const gcd = this.gcd(a, b);
      const result = (a * b) / gcd;
      
      // Guard against overflow
      if (!Number.isFinite(result) || result > Number.MAX_SAFE_INTEGER) {
        throw new Error('Polyrhythm LCM calculation overflow - rhythm too complex');
      }
      
      return result;
    });

    const resultSeconds = lcm / precision;
    
    // Guard against unreasonably long cycles (> 1 hour)
    if (resultSeconds > 3600) {
      throw new Error('Polyrhythm cycle too long (> 1 hour)');
    }

    return resultSeconds;
  }

  /**
   * Calculate greatest common divisor
   * Uses Euclidean algorithm with guards for edge cases
   */
  private static gcd(a: number, b: number): number {
    // Handle negative numbers
    a = Math.abs(a);
    b = Math.abs(b);
    
    // Handle zero cases
    if (a === 0) return b;
    if (b === 0) return a;
    
    // Euclidean algorithm
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  /**
   * Calculate all beat events for multiple layers (polyrhythm/polymeter)
   * @param layers Array of layers
   * @param startTime Start time window
   * @param endTime End time window
   * @param layerOffsets Optional time offsets for each layer (for polymeter)
   * @returns Sorted array of beat events
   */
  static calculatePolyrhythmBeats(
    layers: Layer[],
    startTime: number,
    endTime: number,
    layerOffsets?: Map<string, number>
  ): BeatEvent[] {
    const allEvents: BeatEvent[] = [];

    // Calculate beats for each layer
    layers.forEach((layer) => {
      if (!layer.muted) {
        const offset = layerOffsets?.get(layer.id) || 0;
        const layerEvents = this.calculateLayerBeats(
          layer,
          startTime,
          endTime,
          offset
        );
        allEvents.push(...layerEvents);
      }
    });

    // Sort by time
    allEvents.sort((a, b) => a.time - b.time);

    return allEvents;
  }

  /**
   * Calculate when layers will align (useful for polyrhythms)
   * @param layers Layers to check
   * @returns Time in seconds when all layers align on their downbeats
   */
  static calculateAlignment(layers: Layer[]): number {
    if (layers.length === 0) return 0;
    if (layers.length === 1) {
      return this.calculateMeasureDuration(
        layers[0].tempo,
        layers[0].timeSignature
      );
    }

    return this.calculateLCMDuration(layers);
  }

  /**
   * Generate a repeating pattern of beat events
   * Useful for creating loops
   */
  static *generateRepeatingPattern(
    layer: Layer,
    startTime: number = 0
  ): Generator<BeatEvent, never, unknown> {
    const beatDuration = this.calculateBeatDuration(
      layer.tempo,
      layer.timeSignature
    );
    const subdivisionDuration = beatDuration / layer.pattern.subdivisions;

    let currentTime = startTime;

    while (true) {
      for (let beat = 0; beat < layer.timeSignature.numerator; beat++) {
        for (let sub = 0; sub < layer.pattern.subdivisions; sub++) {
          const patternIndex = beat % layer.pattern.length;
          const accent = layer.pattern.accents.get(patternIndex) || {
            velocity: 80,
          };

          yield {
            layerId: layer.id,
            time: currentTime,
            beatIndex: beat,
            subdivisionIndex: sub,
            accent: accent,
            isDownbeat: beat === 0 && sub === 0,
          };

          currentTime += subdivisionDuration;
        }
      }
    }
  }
}
