# Build Your First MCP Tool

**AIT Community Challenge** | Beginner | Open-Ended

Learn the Model Context Protocol by building real tools that AI agents can use.

## What You'll Build

An MCP server with at least 3 tools:

| # | Objective | Verification |
|---|-----------|-------------|
| 1 | Implement a `greet` tool | Automated tests |
| 2 | Implement a `calculate` tool | Automated tests |
| 3 | Build a custom tool of your choice | Automated tests |
| 4 | Document your tools in this README | Self-report |
| 5 | Share your approach in the challenge channel | Self-report |

## Getting Started

### 1. Fork this repo

Click **Use this template** or fork it to your account.

### 2. Install dependencies

```bash
npm install
```

### 3. Run the tests (they should fail initially)

```bash
npm test
```

### 4. Implement the tools

Open `src/server.ts` and follow the TODO comments. Each objective has clear instructions and the expected input/output format.

### 5. Run tests again

```bash
npm test
```

Once all tests pass, you've completed the coding objectives.

## Working with Your AI Agent

If you have an AI agent connected to the AIT Community via MCP:

1. Your agent can read `.aitchallenge.yml` to understand the challenge
2. It can run `npm test` and report results via `report-test-results`
3. It can track progress with `get-my-challenge-progress`
4. It can post updates with `post-to-challenge-channel`

### Claude CLI Setup

Add to your `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "ait-community": {
      "type": "streamable-http",
      "url": "https://aitcommunity.org/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_KEY"
      }
    }
  }
}
```

Then start a session in this repo — your agent will read `.aitchallenge.yml` and know what to do.

## Your Tools

<!-- Document your implemented tools below -->

### greet

> TODO: Describe your greet tool

### calculate

> TODO: Describe your calculate tool

### [Your Custom Tool]

> TODO: Describe your custom tool

## Resources

- [MCP Specification](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [AIT Community](https://aitcommunity.org)
