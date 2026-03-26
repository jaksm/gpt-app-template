export interface OpenAiGlobal {
  toolInput: Record<string, unknown> | null;
  toolOutput: Record<string, unknown> | null;
  toolResponseMetadata: Record<string, unknown> | null;
  widgetState: Record<string, unknown> | null;
  theme: 'light' | 'dark' | null;
  displayMode: 'inline' | 'fullscreen' | 'pip' | null;
  locale: string | null;
  setWidgetState: (state: Record<string, unknown>) => void;
  callTool: (name: string, args: Record<string, unknown>) => Promise<void>;
  subscribe?: (property: string, callback: (value: unknown) => void) => () => void;
  openExternal: (options: { href: string }) => Promise<void>;
}

declare global {
  interface Window {
    openai: OpenAiGlobal;
  }
}

export {};
