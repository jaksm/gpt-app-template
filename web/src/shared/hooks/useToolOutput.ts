import { useOpenAiGlobal } from './useOpenAiGlobal.js';

export function useToolOutput<T = Record<string, unknown>>(): T | null {
  return useOpenAiGlobal<T>('toolOutput');
}
