import { describe, it, expect, beforeAll } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { server } from "../src/server.js";

// ─── Test helpers ───────────────────────────────────────────────────────────

let client: Client;

beforeAll(async () => {
  client = new Client({ name: "test-client", version: "1.0.0" });

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);
});

// ─── Objective 1: greet tool ────────────────────────────────────────────────

describe("greet tool", () => {
  it("should be listed as an available tool", async () => {
    const { tools } = await client.listTools();
    const greet = tools.find((t) => t.name === "greet");
    expect(greet).toBeDefined();
    expect(greet!.inputSchema.properties).toHaveProperty("name");
  });

  it("should return a greeting with the given name", async () => {
    const result = await client.callTool({
      name: "greet",
      arguments: { name: "Alice" },
    });

    const text =
      (result.content as { type: string; text: string }[])[0]?.text ?? "";
    expect(text).toContain("Hello");
    expect(text).toContain("Alice");
  });

  it("should handle different names", async () => {
    const result = await client.callTool({
      name: "greet",
      arguments: { name: "MCP Community" },
    });

    const text =
      (result.content as { type: string; text: string }[])[0]?.text ?? "";
    expect(text).toContain("MCP Community");
  });
});

// ─── Objective 2: calculate tool ────────────────────────────────────────────

describe("calculate tool", () => {
  it("should be listed as an available tool", async () => {
    const { tools } = await client.listTools();
    const calc = tools.find((t) => t.name === "calculate");
    expect(calc).toBeDefined();
  });

  it("should add two numbers", async () => {
    const result = await client.callTool({
      name: "calculate",
      arguments: { operation: "add", a: 3, b: 5 },
    });

    const text =
      (result.content as { type: string; text: string }[])[0]?.text ?? "";
    expect(text).toContain("8");
  });

  it("should subtract two numbers", async () => {
    const result = await client.callTool({
      name: "calculate",
      arguments: { operation: "subtract", a: 10, b: 4 },
    });

    const text =
      (result.content as { type: string; text: string }[])[0]?.text ?? "";
    expect(text).toContain("6");
  });

  it("should multiply two numbers", async () => {
    const result = await client.callTool({
      name: "calculate",
      arguments: { operation: "multiply", a: 7, b: 3 },
    });

    const text =
      (result.content as { type: string; text: string }[])[0]?.text ?? "";
    expect(text).toContain("21");
  });

  it("should divide two numbers", async () => {
    const result = await client.callTool({
      name: "calculate",
      arguments: { operation: "divide", a: 15, b: 3 },
    });

    const text =
      (result.content as { type: string; text: string }[])[0]?.text ?? "";
    expect(text).toContain("5");
  });

  it("should return error for division by zero", async () => {
    const result = await client.callTool({
      name: "calculate",
      arguments: { operation: "divide", a: 10, b: 0 },
    });

    expect(result.isError).toBe(true);
  });
});

// ─── Objective 3: custom tool ───────────────────────────────────────────────

describe("custom tool", () => {
  it("should expose at least 3 tools total", async () => {
    const { tools } = await client.listTools();
    expect(tools.length).toBeGreaterThanOrEqual(3);
  });

  it("should have a third tool beyond greet and calculate", async () => {
    const { tools } = await client.listTools();
    const customTools = tools.filter(
      (t) => t.name !== "greet" && t.name !== "calculate",
    );
    expect(customTools.length).toBeGreaterThanOrEqual(1);
  });

  it("should return valid content from the custom tool", async () => {
    const { tools } = await client.listTools();
    const customTool = tools.find(
      (t) => t.name !== "greet" && t.name !== "calculate",
    );
    expect(customTool).toBeDefined();

    // Build minimal valid arguments from the schema
    const args: Record<string, unknown> = {};
    const props = customTool!.inputSchema.properties ?? {};
    const required = (customTool!.inputSchema.required ?? []) as string[];

    for (const key of required) {
      const prop = props[key] as { type?: string } | undefined;
      if (!prop) continue;
      if (prop.type === "string") args[key] = "test";
      else if (prop.type === "number" || prop.type === "integer") args[key] = 1;
      else if (prop.type === "boolean") args[key] = true;
    }

    const result = await client.callTool({
      name: customTool!.name,
      arguments: args,
    });

    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});
