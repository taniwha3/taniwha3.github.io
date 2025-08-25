import { useState, useEffect } from 'react';
import { AudioContextProvider } from '../audio/AudioContextProvider';

/**
 * Hook to manage AudioContext unlock state
 * Provides methods to unlock on user gesture and track unlock status
 */
export function useAudioUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check initial unlock state
    const provider = AudioContextProvider.getInstance();
    setIsUnlocked(provider.getIsUnlocked());
  }, []);

  const unlock = async () => {
    try {
      const provider = AudioContextProvider.getInstance();
      await provider.unlock();
      setIsUnlocked(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlock audio');
      console.error('Audio unlock failed:', err);
    }
  };

  const ensureInitialized = async () => {
    try {
      const provider = AudioContextProvider.getInstance();
      await provider.ensureInitialized();
      setIsUnlocked(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize audio');
      console.error('Audio initialization failed:', err);
    }
  };

  return {
    isUnlocked,
    error,
    unlock,
    ensureInitialized,
  };
}