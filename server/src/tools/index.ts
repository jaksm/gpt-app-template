import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListPosts } from './list-posts.js';

export function registerTools(server: McpServer): void {
  registerListPosts(server);
}
