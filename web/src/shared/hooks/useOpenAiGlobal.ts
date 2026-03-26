import { useSyncExternalStore } from 'react';

const SET_GLOBALS_EVENT_TYPE = 'openai:set_globals';

export function useOpenAiGlobal<T = unknown>(
  key: string
): T | null {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') {
        return () => {};
      }

      const handleSetGlobal = (event: Event) => {
        const customEvent = event as CustomEvent<{ globals: Record<string, unknown> }>;
        const value = customEvent.detail?.globals?.[key];
        if (value === undefined) {
          return;
        }
        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => {
      if (typeof window === 'undefined' || !window.openai) {
        return null;
      }
      return (window.openai as any)[key] ?? null;
    },
    () => null
  );
}
