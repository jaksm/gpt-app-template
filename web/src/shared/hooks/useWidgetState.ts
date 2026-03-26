import { useState, useCallback, useEffect } from 'react';
import { useOpenAiGlobal } from './useOpenAiGlobal.js';

export function useWidgetState<T extends Record<string, unknown>>(
  defaultState: T | (() => T)
): [T, (state: T | ((prev: T) => T)) => void] {
  const widgetStateFromWindow = useOpenAiGlobal('widgetState') as T | null;

  const [state, _setState] = useState<T>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow;
    }
    return typeof defaultState === 'function' ? defaultState() : defaultState;
  });

  useEffect(() => {
    if (widgetStateFromWindow != null) {
      _setState(widgetStateFromWindow);
    }
  }, [widgetStateFromWindow]);

  const setState = useCallback((update: T | ((prev: T) => T)) => {
    _setState((prev) => {
      const next = typeof update === 'function' ? update(prev) : update;
      if (window.openai?.setWidgetState) {
        window.openai.setWidgetState(next);
      }
      return next;
    });
  }, []);

  return [state, setState];
}
