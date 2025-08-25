/**
 * Debug utility for conditional logging
 * Reduces console noise in production while enabling detailed logging during development
 */

// Check if debug mode is enabled via environment variable or localStorage
const isDebugEnabled = (): boolean => {
  // Check environment variable (for build-time configuration)
  if (import.meta.env.DEV) {
    return true;
  }
  
  // Check localStorage (for runtime configuration)
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('DEBUG') === 'true';
  }
  
  return false;
};

// Cache the debug state to avoid repeated localStorage access
let debugEnabled = isDebugEnabled();

// Allow runtime toggling of debug mode
export const setDebugMode = (enabled: boolean): void => {
  debugEnabled = enabled;
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('DEBUG', enabled ? 'true' : 'false');
  }
};

// Get current debug mode
export const getDebugMode = (): boolean => debugEnabled;

/**
 * Conditional debug logging
 * Only outputs if debug mode is enabled
 */
export const debugLog = (...args: unknown[]): void => {
  if (debugEnabled) {
    console.log('[Debug]', ...args);
  }
};

/**
 * Conditional debug warning
 * Only outputs if debug mode is enabled
 */
export const debugWarn = (...args: unknown[]): void => {
  if (debugEnabled) {
    console.warn('[Debug]', ...args);
  }
};

/**
 * Conditional debug error
 * Only outputs if debug mode is enabled
 */
export const debugError = (...args: unknown[]): void => {
  if (debugEnabled) {
    console.error('[Debug]', ...args);
  }
};

/**
 * Debug group for organizing related logs
 */
export const debugGroup = (label: string, fn: () => void): void => {
  if (debugEnabled) {
    console.group(label);
    fn();
    console.groupEnd();
  }
};

/**
 * Debug timing utility
 */
export const debugTime = (label: string): (() => void) => {
  if (!debugEnabled) {
    return () => {}; // No-op if debug is disabled
  }
  
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    debugLog(`${label}: ${(endTime - startTime).toFixed(2)}ms`);
  };
};

// Export a global toggle function for easy access in browser console
if (typeof window !== 'undefined') {
  (window as Window & { toggleDebug?: () => void }).toggleDebug = () => {
    setDebugMode(!debugEnabled);
    console.log(`Debug mode ${debugEnabled ? 'enabled' : 'disabled'}`);
  };
}