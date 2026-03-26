import { describe, it, expect } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListPosts } from './list-posts.js';

describe('list_posts tool', () => {
  it('should register without errors', () => {
    const server = new McpServer({
      name: 'test',
      version: '1.0.0',
      title: 'Test Server'
    });

    expect(() => registerListPosts(server)).not.toThrow();
  });
});
