import { describe, it, expect } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTools } from './tools/index.js';

describe('MCP Server Initialization', () => {
  it('should create server instance', () => {
    const server = new McpServer({
      name: 'gpt-app-template',
      version: '0.0.1',
      title: 'GPT App Template',
    });
    expect(server).toBeDefined();
  });

  it('should register tools without errors', () => {
    const server = new McpServer({
      name: 'gpt-app-template',
      version: '0.0.1',
      title: 'GPT App Template',
    });
    expect(() => registerTools(server)).not.toThrow();
  });
});
