# GPT App Template

A starter template for building **ChatGPT GPT Apps** using [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) with React widgets, Storybook, and TypeScript.

## What's Included

- **MCP Server** — Streamable HTTP transport, tool registration, widget resource serving
- **React Widgets** — Interactive UI components that render inside ChatGPT conversations
- **Storybook** — Develop and preview widgets in isolation with OpenAI mock utilities
- **Vitest** — Unit tests with happy-dom environment
- **TypeScript** — Strict mode, full type safety across server and client

## Tech Stack

| Layer | Technology |
|-------|-----------|
| MCP Server | `@modelcontextprotocol/sdk` 1.24+ |
| Language | TypeScript 5.9+ |
| UI Framework | React 19 |
| UI Components | `@openai/apps-sdk-ui` |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite 7 |
| Storybook | Storybook 10 |
| Testing | Vitest 4 |

## Quick Start

```bash
# Clone the template
gh repo clone jaksm/gpt-app-template my-gpt-app
cd my-gpt-app

# Install dependencies
npm install

# Run Storybook to preview widgets
npm run storybook

# Build everything (widgets + server)
npm run build

# Run type checks
npm run tscheck

# Run tests
npm run test
```

## Project Structure

```
├── api-client/          # API client (plain fetch, easy to swap)
│   ├── api.ts           # API functions
│   └── index.ts         # Re-exports
├── server/
│   └── src/
│       ├── index.ts     # HTTP server entry point
│       ├── server.ts    # MCP server setup
│       ├── tools/       # MCP tools (callable by ChatGPT)
│       │   ├── list-posts.ts
│       │   └── index.ts
│       └── resources/   # MCP resources (widget HTML serving)
│           ├── list-posts-widget.ts
│           ├── widget-helpers.ts
│           └── index.ts
├── web/
│   ├── src/
│   │   ├── widgets/     # React widgets (one dir per widget)
│   │   │   └── list-posts/
│   │   │       ├── ListPosts.tsx
│   │   │       ├── PostCard.tsx
│   │   │       ├── index.tsx
│   │   │       ├── mocks/
│   │   │       └── *.stories.tsx
│   │   └── shared/      # Shared hooks, types, utilities
│   │       ├── hooks/   # useToolOutput, useToolInput, useWidgetState
│   │       └── types/
│   ├── .storybook/      # Storybook config + OpenAI decorators
│   └── vite.config.ts   # Multi-entry widget build
├── package.json
├── tsconfig.json
├── tsconfig.check.json
└── vitest.config.ts
```

## How to Customize

### Add a New Tool

1. Create `server/src/tools/my-tool.ts`:
   ```typescript
   import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { z } from "zod";

   export function registerMyTool(server: McpServer): void {
     server.registerTool("my_tool", {
       title: "My Tool",
       description: "What this tool does",
       inputSchema: z.object({ /* your params */ }),
       _meta: {
         "openai/outputTemplate": "ui://widget/my-widget.html",
         "openai/widgetAccessible": true,
       },
     }, async (input) => {
       // Your logic here
       return {
         content: [{ type: "text", text: "Result description" }],
         structuredContent: { /* data for your widget */ },
       };
     });
   }
   ```
2. Register it in `server/src/tools/index.ts`

### Create a New Widget

1. Create `web/src/widgets/my-widget/` with:
   - `MyWidget.tsx` — main component using `useToolOutput<T>()`
   - `index.tsx` — entry point (renders into `#root`)
   - `MyWidget.stories.tsx` — Storybook story with mock data
2. Create `server/src/resources/my-widget-widget.ts` using `createWidgetResource()`
3. Register in `server/src/resources/index.ts`
4. Vite auto-discovers new widget directories — no config changes needed

### Change the API Source

Edit `api-client/api.ts`. The template uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a demo API. Replace with your own API — just export async functions that your tools can call.

## Run in ChatGPT

To see your app live inside ChatGPT, you need to:
1. Build and start the MCP server
2. Expose it over HTTPS with ngrok
3. Create a connector in ChatGPT

### 1. Build & Start the Server

```bash
# Build widgets + server
npm run build

# Start the MCP server (default port 3000)
node build/index.js
```

The server starts at `http://localhost:3000` with the MCP endpoint at `/mcp`.

Verify it's running:
```bash
curl http://localhost:3000
# → "GPT App Template MCP server"
```

### 2. Expose with ngrok

ChatGPT needs an HTTPS URL to reach your server. Use [ngrok](https://ngrok.com/) to create a tunnel:

```bash
# Install ngrok (if you haven't)
brew install ngrok   # macOS
# or: npm install -g ngrok

# Expose your local server
ngrok http 3000
```

ngrok will give you a public URL like `https://abc123.ngrok-free.app`. Your MCP endpoint is:
```
https://abc123.ngrok-free.app/mcp
```

> **Tip:** Use `ngrok http 3000 --url your-custom-domain.ngrok-free.app` for a stable URL (requires free ngrok account).

### 3. Connect in ChatGPT

1. **Enable Developer Mode** — Go to [ChatGPT Settings](https://chatgpt.com) → **Apps & Connectors** → **Advanced settings** (bottom) → Toggle **Developer Mode** on

2. **Create a Connector** — Go to **Settings → Apps & Connectors** → Click **Create**:
   - **Name:** Your app name (e.g., "Blog Reader")
   - **Description:** What it does (e.g., "Browse and search blog posts")
   - **Connector URL:** Your ngrok MCP endpoint (e.g., `https://abc123.ngrok-free.app/mcp`)
   - Click **Create** — you'll see your tools listed if the connection succeeds

3. **Use It** — Open a new ChatGPT conversation:
   - Click the **+** button near the message box → **More**
   - Select your connector from the list
   - Ask ChatGPT something like *"Show me some blog posts"* — it will call your tool and render the widget

### Refreshing After Changes

When you update tools or widgets:
```bash
npm run build && node build/index.js
```
Then in ChatGPT: **Settings → Apps & Connectors** → click your connector → **Refresh**.

## Development

```bash
# Storybook (widget development)
npm run storybook

# Type checking
npm run tscheck

# Tests
npm run test
npm run test:watch

# Full build
npm run build

# MCP Inspector (debug tools)
npm run debug
```

## License

MIT
