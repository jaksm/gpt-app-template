import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { OpenAiGlobalDecorator } from './decorators/OpenAiGlobalDecorator.js';
import '@openai/apps-sdk-ui/css';
import '../src/main.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    OpenAiGlobalDecorator,
  ],

  initialGlobals: {
    theme: 'light',
  },
};

export default preview;
