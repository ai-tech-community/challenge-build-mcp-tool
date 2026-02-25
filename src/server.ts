import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// You can import zod for tool input schemas:
// import { z } from "zod";

// ─── Create your MCP server ─────────────────────────────────────────────────
const server = new McpServer({
  name: "my-first-mcp-tools",
  version: "1.0.0",
});

// ─── Objective 1: Implement the "greet" tool ────────────────────────────────
// This tool takes a name and returns a greeting.
// The test suite expects:
//   - Tool name: "greet"
//   - Input: { name: string }
//   - Output text contains: "Hello, {name}"
//
// TODO: Register the "greet" tool here
// Hint: Use server.tool("greet", { ... }, async ({ name }) => { ... })

// ─── Objective 2: Implement the "calculate" tool ────────────────────────────
// This tool performs basic arithmetic.
// The test suite expects:
//   - Tool name: "calculate"
//   - Input: { operation: "add" | "subtract" | "multiply" | "divide", a: number, b: number }
//   - Output text contains the numeric result
//   - Division by zero returns an error (isError: true)
//
// TODO: Register the "calculate" tool here

// ─── Objective 3: Build your own custom tool ────────────────────────────────
// Create any tool you want! Be creative.
// The test suite checks that your server exposes at least 3 tools total.
//
// Ideas:
//   - A "weather" tool that returns mock weather data
//   - A "uuid" tool that generates random UUIDs
//   - A "word-count" tool that counts words in text
//   - A "base64" tool that encodes/decodes strings
//
// TODO: Register your custom tool here

// ─── Start the server ───────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Only start when running directly (not when imported by tests)
const isMain =
  typeof process !== "undefined" &&
  process.argv[1] &&
  (process.argv[1].endsWith("server.ts") ||
    process.argv[1].endsWith("server.js"));

if (isMain) {
  main().catch(console.error);
}

export { server };
