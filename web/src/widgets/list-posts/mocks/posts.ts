import type { Post } from '../../../shared/types/posts.js';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with MCP',
    body: 'The Model Context Protocol (MCP) enables powerful integrations between AI assistants and external tools. In this post, we explore the basics of building an MCP server.',
    userId: 1,
  },
  {
    id: 2,
    title: 'Building React Widgets for ChatGPT',
    body: 'Learn how to create beautiful, interactive widgets that render directly inside ChatGPT conversations using the OpenAI Apps SDK.',
    userId: 1,
  },
  {
    id: 3,
    title: 'TypeScript Best Practices in 2025',
    body: 'A comprehensive guide to modern TypeScript patterns, from strict mode to satisfies operator and beyond.',
    userId: 2,
  },
];
