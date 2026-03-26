import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListPostsWidget } from './list-posts-widget.js';

export function registerResources(server: McpServer): void {
  registerListPostsWidget(server);
}
