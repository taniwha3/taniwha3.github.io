import { useState, useEffect, useRef, useCallback } from 'react';
import { Metronome } from '../audio/Metronome';
import { useProject } from '../contexts/ProjectContext';

export function useMetronome() {
  const { project } = useProject();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isAccent, setIsAccent] = useState(false);
  const [polyrhythmBeats, setPolyrhythmBeats] = useState<{
    [layerId: string]: number;
  }>({});
  const metronomeRef = useRef<Metronome | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const polyrhythmTimeoutRefs = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());

  // Get current tempo and time signature based on mode
  const currentTempo =
    project.useAdvancedMode && project.tempoMap.length > 0
      ? project.tempoMap[0].tempo
      : project.tempo;

  const currentTimeSignature =
    project.useAdvancedMode && project.tempoMap.length > 0
      ? project.tempoMap[0].timeSignature
      : project.timeSignature;

  // Define callbacks outside of useEffect
  const handleBeat = useCallback((beatNumber: number, accent: boolean) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setCurrentBeat(beatNumber);
    setIsAccent(accent);

    // Reset visual feedback after a short time
    timeoutRef.current = setTimeout(() => {
      setCurrentBeat(0);
      setIsAccent(false);
    }, 50);
  }, []);

  const handlePolyrhythmBeat = useCallback((layerId: string, beatIndex: number) => {
    // Clear any existing timeout for this layer
    const existingTimeout = polyrhythmTimeoutRefs.current.get(layerId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Update beat state
    setPolyrhythmBeats((prev) => ({
      ...prev,
      [layerId]: beatIndex,
    }));

    // Reset visual feedback after a short time
    const timeout = setTimeout(() => {
      setPolyrhythmBeats((prev) => ({
        ...prev,
        [layerId]: -1,
      }));
    }, 50);

    polyrhythmTimeoutRefs.current.set(layerId, timeout);
  }, []);

  // Initialize metronome
  useEffect(() => {
    metronomeRef.current = new Metronome({
      tempo: currentTempo,
      timeSignature: currentTimeSignature,
      tempoMap: project.useAdvancedMode ? project.tempoMap : undefined,
      polyrhythmLayers:
        project.polyrhythm.layers.length > 0
          ? project.polyrhythm.layers
          : undefined,
      onBeat: handleBeat,
      onPolyrhythmBeat: handlePolyrhythmBeat,
    });

    return () => {
      metronomeRef.current?.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Clear all polyrhythm timeouts
      polyrhythmTimeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      polyrhythmTimeoutRefs.current.clear();
    };
  }, [
    currentTempo,
    currentTimeSignature,
    project.useAdvancedMode,
    project.tempoMap,
    project.polyrhythm.layers,
    handleBeat,
    handlePolyrhythmBeat
  ]);

  // Update tempo
  useEffect(() => {
    if (metronomeRef.current && !project.useAdvancedMode) {
      metronomeRef.current.setTempo(currentTempo);
    }
  }, [currentTempo, project.useAdvancedMode]);

  // Update time signature
  useEffect(() => {
    if (metronomeRef.current && !project.useAdvancedMode) {
      metronomeRef.current.setTimeSignature(
        currentTimeSignature.numerator,
        currentTimeSignature.denominator
      );
    }
  }, [
    currentTimeSignature.numerator,
    currentTimeSignature.denominator,
    project.useAdvancedMode,
  ]);

  // Update tempo map in advanced mode
  useEffect(() => {
    if (metronomeRef.current && project.useAdvancedMode) {
      metronomeRef.current.setTempoMap(project.tempoMap);
    }
  }, [project.tempoMap, project.useAdvancedMode]);

  // Update polyrhythm layers
  useEffect(() => {
    if (metronomeRef.current) {
      metronomeRef.current.setPolyrhythmLayers(project.polyrhythm.layers);
    }
  }, [project.polyrhythm.layers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const start = useCallback(async () => {
    if (metronomeRef.current && !isPlaying) {
      await metronomeRef.current.start();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (metronomeRef.current && isPlaying) {
      // Clear any pending timeout FIRST
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Clear all polyrhythm timeouts
      polyrhythmTimeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      polyrhythmTimeoutRefs.current.clear();

      metronomeRef.current.stop();
      setIsPlaying(false);
      setCurrentBeat(0);
      setIsAccent(false);
      setPolyrhythmBeats({});
    }
  }, [isPlaying]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      stop();
    } else {
      await start();
    }
  }, [isPlaying, start, stop]);

  return {
    isPlaying,
    currentBeat,
    isAccent,
    polyrhythmBeats,
    start,
    stop,
    toggle,
    metronome: metronomeRef.current,
  };
}
