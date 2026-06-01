import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

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
server.tool(
  "greet",
  "Return a friendly personalized greeting.",
  {
    name: z.string().min(1).describe("Name of the person or group to greet"),
  },
  async ({ name }) => ({
    content: [
      {
        type: "text",
        text: `Hello, ${name}! Welcome to your first MCP tool.`,
      },
    ],
  }),
);

// ─── Objective 2: Implement the "calculate" tool ────────────────────────────
// This tool performs basic arithmetic.
// The test suite expects:
//   - Tool name: "calculate"
//   - Input: { operation: "add" | "subtract" | "multiply" | "divide", a: number, b: number }
//   - Output text contains the numeric result
//   - Division by zero returns an error (isError: true)
//
server.tool(
  "calculate",
  "Perform basic arithmetic on two numbers.",
  {
    operation: z
      .enum(["add", "subtract", "multiply", "divide"])
      .describe("Arithmetic operation to perform"),
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ operation, a, b }) => {
    if (operation === "divide" && b === 0) {
      return {
        isError: true,
        content: [{ type: "text", text: "Cannot divide by zero." }],
      };
    }

    const result =
      operation === "add"
        ? a + b
        : operation === "subtract"
          ? a - b
          : operation === "multiply"
            ? a * b
            : a / b;

    return {
      content: [
        {
          type: "text",
          text: `${a} ${operation} ${b} = ${result}`,
        },
      ],
    };
  },
);

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
server.tool(
  "word-count",
  "Count words and characters in a text string.",
  {
    text: z.string().describe("Text to analyze"),
  },
  async ({ text }) => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;

    return {
      content: [
        {
          type: "text",
          text: `Words: ${words}; Characters: ${characters}`,
        },
      ],
    };
  },
);

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
