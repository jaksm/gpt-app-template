import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listPosts } from "../../../api-client/api.js";

const inputSchema = z.object({
  limit: z
    .number()
    .min(1)
    .max(50)
    .default(10)
    .describe("Number of results to return (1-50)"),
  search: z
    .string()
    .optional()
    .describe("Search term to filter posts by title or body"),
});

type InputSchema = z.infer<typeof inputSchema>;

export function registerListPosts(server: McpServer): void {
  server.registerTool(
    "list_posts",
    {
      title: "Browse Blog Posts",
      description:
        "Returns blog posts from the API. Supports filtering by search term and limiting results.",
      inputSchema,
      annotations: {
        readOnlyHint: true,
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/list-posts.html",
        "openai/toolInvocation/invoking": "Fetching Blog Posts",
        "openai/toolInvocation/invoked": "Here are the Blog Posts",
        "openai/widgetAccessible": true,
      },
    },
    async (input: InputSchema) => {
      try {
        const { posts, total } = await listPosts({
          limit: input.limit,
          search: input.search,
        });

        const filterText = input.search
          ? ` (search: "${input.search}")`
          : "";

        return {
          content: [
            {
              type: "text",
              text: `Here are ${posts.length} blog posts out of ${total} total${filterText}.`,
            },
          ],
          structuredContent: {
            posts,
            totalCount: total,
          },
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch blog posts: ${errorMessage}`,
            },
          ],
          structuredContent: {
            posts: [],
            totalCount: 0,
          },
        };
      }
    }
  );
}
