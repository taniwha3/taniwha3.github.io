import { describe, it, expect } from 'vitest';
import { PolyrhythmEngine } from './PolyrhythmEngine';
import type { Layer, Accent } from '../types/rhythm';

describe('PolyrhythmEngine', () => {
  const createLayer = (
    id: string,
    numerator: number,
    denominator: number,
    tempo: number,
    patternLength?: number
  ): Layer => {
    const accents = new Map<number, Accent>();
    const length = patternLength || numerator;

    for (let i = 0; i < length; i++) {
      accents.set(i, { velocity: i === 0 ? 127 : 80 });
    }

    return {
      id,
      name: `Layer ${id}`,
      timeSignature: { numerator, denominator },
      tempo,
      pattern: {
        length,
        accents,
        subdivisions: 1,
      },
      volume: 1,
      muted: false,
      solo: false,
    };
  };

  describe('calculateBeatDuration', () => {
    it('should calculate correct beat duration for 4/4 at 120 BPM', () => {
      const duration = PolyrhythmEngine.calculateBeatDuration(120, {
        numerator: 4,
        denominator: 4,
      });
      expect(duration).toBeCloseTo(0.5); // 60/120 = 0.5 seconds per beat
    });

    it('should calculate correct beat duration for 7/8 at 140 BPM', () => {
      const duration = PolyrhythmEngine.calculateBeatDuration(140, {
        numerator: 7,
        denominator: 8,
      });
      // At 140 BPM, quarter note = 60/140 = 0.4286 seconds
      // Eighth note = half of that = 0.2143 seconds
      expect(duration).toBeCloseTo(0.2143, 4);
    });

    it('should handle extreme tempos', () => {
      const slowDuration = PolyrhythmEngine.calculateBeatDuration(40, {
        numerator: 4,
        denominator: 4,
      });
      expect(slowDuration).toBeCloseTo(1.5); // 60/40 = 1.5

      const fastDuration = PolyrhythmEngine.calculateBeatDuration(300, {
        numerator: 4,
        denominator: 4,
      });
      expect(fastDuration).toBeCloseTo(0.2); // 60/300 = 0.2
    });
  });

  describe('calculateMeasureDuration', () => {
    it('should calculate correct measure duration', () => {
      const duration = PolyrhythmEngine.calculateMeasureDuration(120, {
        numerator: 4,
        denominator: 4,
      });
      expect(duration).toBeCloseTo(2.0); // 4 beats * 0.5 seconds = 2 seconds
    });

    it('should handle odd time signatures', () => {
      const duration = PolyrhythmEngine.calculateMeasureDuration(120, {
        numerator: 7,
        denominator: 8,
      });
      // 7 eighth notes at 120 BPM
      // Quarter note = 0.5s, eighth note = 0.25s
      // 7 * 0.25 = 1.75s
      expect(duration).toBeCloseTo(1.75);
    });
  });

  describe('calculateLayerBeats', () => {
    it('should generate correct beats for a simple 4/4 pattern', () => {
      const layer = createLayer('main', 4, 4, 120);
      const beats = PolyrhythmEngine.calculateLayerBeats(layer, 0, 2);

      // At 120 BPM in 4/4: 0.5s per beat, 2s = 4 beats
      expect(beats.length).toBe(4);
      expect(beats[0].time).toBe(0);
      expect(beats[1].time).toBe(0.5);
      expect(beats[2].time).toBe(1.0);
      expect(beats[3].time).toBe(1.5);

      // Check downbeats
      expect(beats[0].isDownbeat).toBe(true);
      expect(beats[1].isDownbeat).toBe(false);
    });

    it('should handle subdivisions correctly', () => {
      const layer = createLayer('main', 4, 4, 120);
      layer.pattern.subdivisions = 4; // 16th notes

      const beats = PolyrhythmEngine.calculateLayerBeats(layer, 0, 0.5);

      // First beat (0.5s) with 4 subdivisions = 4 events
      expect(beats.length).toBe(4);
      expect(beats[0].subdivisionIndex).toBe(0);
      expect(beats[1].subdivisionIndex).toBe(1);
      expect(beats[2].subdivisionIndex).toBe(2);
      expect(beats[3].subdivisionIndex).toBe(3);
    });

    it('should handle time windows correctly', () => {
      const layer = createLayer('main', 4, 4, 120);
      const beats = PolyrhythmEngine.calculateLayerBeats(layer, 0.7, 1.3);

      // Should only get beat at 1.0s
      expect(beats.length).toBe(1);
      expect(beats[0].time).toBe(1.0);
      expect(beats[0].beatIndex).toBe(2);
    });
  });

  describe('calculatePolyrhythmBeats', () => {
    it('should correctly calculate 3 over 4 polyrhythm', () => {
      const layer3 = createLayer('three', 3, 4, 120);
      const layer4 = createLayer('four', 4, 4, 120);

      const beats = PolyrhythmEngine.calculatePolyrhythmBeats(
        [layer3, layer4],
        0,
        2 // LCM of 3 and 4 beats = 12 beats = 6 seconds at 120 BPM
      );

      // Count beats per layer
      const layer3Beats = beats.filter((b) => b.layerId === 'three');
      const layer4Beats = beats.filter((b) => b.layerId === 'four');

      // In 2 seconds: layer3 gets 4 beats, layer4 gets 4 beats
      expect(layer3Beats.length).toBeGreaterThan(0);
      expect(layer4Beats.length).toBe(4);

      // Verify they're sorted by time
      for (let i = 1; i < beats.length; i++) {
        expect(beats[i].time).toBeGreaterThanOrEqual(beats[i - 1].time);
      }
    });

    it('should handle muted layers', () => {
      const layer1 = createLayer('one', 4, 4, 120);
      const layer2 = createLayer('two', 4, 4, 120);
      layer2.muted = true;

      const beats = PolyrhythmEngine.calculatePolyrhythmBeats(
        [layer1, layer2],
        0,
        2
      );

      // Should only get beats from unmuted layer
      expect(beats.every((b) => b.layerId === 'one')).toBe(true);
    });

    it('should handle layer offsets for polymeter', () => {
      const layer1 = createLayer('one', 4, 4, 120);
      const layer2 = createLayer('two', 4, 4, 120);

      const offsets = new Map([['two', 0.25]]); // Layer 2 starts 0.25s late

      const beats = PolyrhythmEngine.calculatePolyrhythmBeats(
        [layer1, layer2],
        0,
        1,
        offsets
      );

      const layer1First = beats.find((b) => b.layerId === 'one');
      const layer2First = beats.find((b) => b.layerId === 'two');

      expect(layer1First?.time).toBe(0);
      expect(layer2First?.time).toBe(0.25);
    });
  });

  describe('calculateAlignment', () => {
    it('should find alignment point for 3 over 4', () => {
      const layer3 = createLayer('three', 3, 4, 120);
      const layer4 = createLayer('four', 4, 4, 120);

      const alignment = PolyrhythmEngine.calculateAlignment([layer3, layer4]);

      // 3/4 measure = 1.5s, 4/4 measure = 2s
      // LCM = 6s (4 measures of 3/4, 3 measures of 4/4)
      expect(alignment).toBeCloseTo(6);
    });

    it('should handle single layer', () => {
      const layer = createLayer('single', 7, 8, 140);
      const alignment = PolyrhythmEngine.calculateAlignment([layer]);

      // Should just return measure duration
      const measureDuration = PolyrhythmEngine.calculateMeasureDuration(140, {
        numerator: 7,
        denominator: 8,
      });
      expect(alignment).toBe(measureDuration);
    });
  });

  describe('generateRepeatingPattern', () => {
    it('should generate infinite pattern', () => {
      const layer = createLayer('gen', 3, 4, 120);
      const generator = PolyrhythmEngine.generateRepeatingPattern(layer);

      const beats = [];
      for (let i = 0; i < 10; i++) {
        beats.push(generator.next().value);
      }

      expect(beats.length).toBe(10);

      // Check pattern repeats
      expect(beats[0].beatIndex).toBe(0);
      expect(beats[3].beatIndex).toBe(0); // New measure
      expect(beats[6].beatIndex).toBe(0); // Another new measure
    });
  });

  describe('complex scenarios', () => {
    it('should handle 7/8 + 5/4 polymeter', () => {
      const layer78 = createLayer('seven-eight', 7, 8, 140);
      const layer54 = createLayer('five-four', 5, 4, 140);

      const beats = PolyrhythmEngine.calculatePolyrhythmBeats(
        [layer78, layer54],
        0,
        10
      );

      // Both layers should produce beats
      const layer78Beats = beats.filter((b) => b.layerId === 'seven-eight');
      const layer54Beats = beats.filter((b) => b.layerId === 'five-four');

      expect(layer78Beats.length).toBeGreaterThan(0);
      expect(layer54Beats.length).toBeGreaterThan(0);

      // Verify different beat patterns
      expect(layer78Beats.length).not.toBe(layer54Beats.length);
    });
  });
});
