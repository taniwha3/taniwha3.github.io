import { describe, it, expect } from 'vitest';
import type {
  TimeSignature,
  Tuplet,
  Layer,
  Accent,
  BeatEvent,
  MetronomeState,
} from './rhythm';

describe('Rhythm Type Interfaces', () => {
  it('should create valid time signatures', () => {
    const fourFour: TimeSignature = {
      numerator: 4,
      denominator: 4,
      displayName: 'Common Time',
    };

    const sevenEight: TimeSignature = {
      numerator: 7,
      denominator: 8,
    };

    const seventeenSixteen: TimeSignature = {
      numerator: 17,
      denominator: 16,
      displayName: 'Progressive Metal Special',
    };

    expect(fourFour.numerator).toBe(4);
    expect(sevenEight.numerator).toBe(7);
    expect(seventeenSixteen.denominator).toBe(16);
  });

  it('should create nested tuplets', () => {
    const complexTuplet: Tuplet = {
      notes: 5, // Quintuplet
      inTimeOf: 4,
      nested: [
        {
          notes: 3, // Triplet inside quintuplet
          inTimeOf: 2,
        },
      ],
    };

    expect(complexTuplet.notes).toBe(5);
    expect(complexTuplet.nested?.[0].notes).toBe(3);
  });

  it('should create a polyrhythmic layer setup', () => {
    // Create accent patterns
    const threePattern = new Map<number, Accent>();
    threePattern.set(0, { velocity: 127 }); // Strong
    threePattern.set(1, { velocity: 80 });
    threePattern.set(2, { velocity: 80 });

    const fourPattern = new Map<number, Accent>();
    fourPattern.set(0, { velocity: 127 }); // Strong
    fourPattern.set(1, { velocity: 60 });
    fourPattern.set(2, { velocity: 90 });
    fourPattern.set(3, { velocity: 60 });

    // 3 over 4 polyrhythm
    const layer3: Layer = {
      id: 'layer-3',
      name: '3 Pattern',
      timeSignature: { numerator: 3, denominator: 4 },
      tempo: 120,
      pattern: {
        length: 3,
        accents: threePattern,
        subdivisions: 1,
      },
      volume: 0.8,
      muted: false,
      solo: false,
      color: '#FF6EC7', // Neon pink
    };

    const layer4: Layer = {
      id: 'layer-4',
      name: '4 Pattern',
      timeSignature: { numerator: 4, denominator: 4 },
      tempo: 120,
      pattern: {
        length: 4,
        accents: fourPattern,
        subdivisions: 1,
      },
      volume: 0.8,
      muted: false,
      solo: false,
      color: '#00FCD8', // Cyan
    };

    expect(layer3.pattern.length).toBe(3);
    expect(layer4.pattern.length).toBe(4);
  });

  it('should create beat events', () => {
    const event: BeatEvent = {
      layerId: 'main',
      time: 0.5,
      beatIndex: 1,
      subdivisionIndex: 0,
      accent: { velocity: 100, soundId: 'click-high' },
      isDownbeat: false,
    };

    expect(event.time).toBe(0.5);
    expect(event.accent.velocity).toBe(100);
  });

  it('should create a complete metronome state', () => {
    const state: MetronomeState = {
      layers: [],
      globalTempo: 140,
      globalTimeSignature: { numerator: 4, denominator: 4 },
      tempoMap: [
        { time: 0, tempo: 140 },
        { time: 4, tempo: 180, curve: 'linear' },
      ],
      currentTime: 0,
      isPlaying: false,
      loop: {
        enabled: true,
        startTime: 0,
        endTime: 8,
      },
    };

    expect(state.globalTempo).toBe(140);
    expect(state.tempoMap.length).toBe(2);
    expect(state.loop?.enabled).toBe(true);
  });

  it('should handle complex time signatures', () => {
    // Test various complex signatures used in progressive metal
    const signatures: TimeSignature[] = [
      { numerator: 7, denominator: 8 }, // Tool
      { numerator: 5, denominator: 4 }, // Take Five
      { numerator: 15, denominator: 16 }, // Progressive complexity
      { numerator: 11, denominator: 8 }, // Extreme prog
    ];

    signatures.forEach((sig) => {
      const beatsPerMeasure = sig.numerator;
      const beatValue = sig.denominator;

      // Calculate measure duration in quarter notes
      const measureDuration = beatsPerMeasure / (beatValue / 4);

      expect(measureDuration).toBeGreaterThan(0);
    });
  });
});
