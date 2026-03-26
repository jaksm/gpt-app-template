import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "gpt-app-template",
    version: "0.0.1",
    title: "GPT App Template",
  });

  registerResources(server);
  registerTools(server);

  return server;
}
