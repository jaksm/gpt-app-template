import React, { useEffect, useLayoutEffect, useRef } from 'react';
import type { Decorator } from '@storybook/react';
import { createOpenAiMock } from '../test-utils/openai-mock.js';
import type { OpenAiMockOptions } from '../test-utils/openai-mock.js';

export const OpenAiGlobalDecorator: Decorator = (Story, context) => {
  const openAiOptions = context.parameters.openai as OpenAiMockOptions | undefined;
  const originalOpenAiRef = useRef<unknown>();

  if (!originalOpenAiRef.current) {
    originalOpenAiRef.current = (window as typeof window & { openai?: unknown }).openai;
  }

  (window as typeof window & { openai: unknown }).openai = createOpenAiMock(openAiOptions);

  useEffect(() => {
    return () => {
      if (originalOpenAiRef.current !== undefined) {
        (window as typeof window & { openai: unknown }).openai = originalOpenAiRef.current;
      } else {
        delete (window as typeof window & { openai?: unknown }).openai;
      }
    };
  }, []);

  return <Story />;
};
