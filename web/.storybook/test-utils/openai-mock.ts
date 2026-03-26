import type { OpenAiGlobal } from '../../src/shared/types/window.d.ts';

export interface OpenAiMockOptions {
  toolInput?: Record<string, unknown> | null;
  toolOutput?: Record<string, unknown> | null;
  toolResponseMetadata?: Record<string, unknown> | null;
  widgetState?: Record<string, unknown> | null;
  theme?: 'light' | 'dark' | null;
  displayMode?: 'inline' | 'fullscreen' | 'pip' | null;
  locale?: string | null;
  onSetWidgetState?: (state: Record<string, unknown>) => void;
  onCallTool?: (name: string, args: Record<string, unknown>) => Promise<void>;
  onOpenExternal?: (options: { href: string }) => Promise<void>;
}

export function createOpenAiMock(options: OpenAiMockOptions = {}): OpenAiGlobal {
  const {
    toolInput = null,
    toolOutput = null,
    toolResponseMetadata = null,
    widgetState = null,
    theme = 'light',
    displayMode = 'inline',
    locale = 'en-US',
    onSetWidgetState = () => {},
    onCallTool = async () => {},
    onOpenExternal = async () => {},
  } = options;

  const mock: OpenAiGlobal = {
    toolInput,
    toolOutput,
    toolResponseMetadata,
    widgetState,
    theme,
    displayMode,
    locale,
    setWidgetState: onSetWidgetState,
    callTool: onCallTool,
    openExternal: onOpenExternal,
    subscribe: undefined,
  };

  return mock;
}
