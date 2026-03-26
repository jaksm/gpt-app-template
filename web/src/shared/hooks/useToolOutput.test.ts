import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToolOutput } from './useToolOutput.js';

describe('useToolOutput', () => {
  beforeEach(() => {
    (window as typeof window & { openai: unknown }).openai = {
      toolOutput: { test: 'data' },
      toolInput: null,
      toolResponseMetadata: null,
      widgetState: null,
      theme: 'light',
      displayMode: 'inline',
      locale: 'en-US',
      setWidgetState: () => {},
      callTool: async () => {},
      openExternal: async () => {},
    };
  });

  it('should return toolOutput from window.openai', () => {
    const { result } = renderHook(() => useToolOutput());
    expect(result.current).toEqual({ test: 'data' });
  });

  it('should return null when toolOutput unavailable', () => {
    (window as typeof window & { openai: { toolOutput: null } }).openai.toolOutput = null;
    const { result } = renderHook(() => useToolOutput());
    expect(result.current).toBeNull();
  });
});
