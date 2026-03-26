import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOpenAiGlobal } from './useOpenAiGlobal.js';

describe('useOpenAiGlobal', () => {
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

  it('should return value from window.openai property', () => {
    const { result } = renderHook(() => useOpenAiGlobal('theme'));
    expect(result.current).toBe('light');
  });

  it('should return null when property is null', () => {
    const { result } = renderHook(() => useOpenAiGlobal('toolInput'));
    expect(result.current).toBeNull();
  });
});
