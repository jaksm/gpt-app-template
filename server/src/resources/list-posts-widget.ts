import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createWidgetResource } from './widget-helpers.js';

export function registerListPostsWidget(server: McpServer): void {
  const { uri, handler } = createWidgetResource({
    name: 'list-posts',
    uri: 'ui://widget/list-posts.html',
    prefersBorder: true,
    csp: {
      connect_domains: [],
      resource_domains: ['https://*.oaistatic.com'],
    },
  });

  server.registerResource('list-posts-widget', uri, {}, handler);
}
