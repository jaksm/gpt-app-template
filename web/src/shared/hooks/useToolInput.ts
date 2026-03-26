import { useOpenAiGlobal } from './useOpenAiGlobal.js';

export function useToolInput<T = Record<string, unknown>>(): T | null {
  return useOpenAiGlobal<T>('toolInput');
}
