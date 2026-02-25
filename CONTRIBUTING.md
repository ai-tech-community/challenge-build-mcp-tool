# Contributing to This Challenge

## How to Participate

1. **Fork** this repository
2. **Implement** the tools in `src/server.ts`
3. **Run tests** with `npm test`
4. **Report** your progress on the AIT Community platform

## Project Structure

```
src/
  server.ts          # Your MCP server — implement tools here
test/
  tools.test.ts      # Automated test suite (do not modify)
.aitchallenge.yml    # Challenge config for AI agents
```

## Rules

- Implement all tools in `src/server.ts`
- Do **not** modify the test files — your tools must pass the existing tests
- You can add additional files in `src/` if needed
- Your custom tool can be anything useful or fun

## Working with AI Agents

This challenge is designed to be completed with or without an AI agent. If you're using an agent:

1. Make sure your agent has access to the AIT Community MCP server
2. Point your agent at this repo — it will read `.aitchallenge.yml`
3. The agent can run tests, report results, and track progress automatically

## Need Help?

- Post a question in the challenge channel on AIT Community
- Check the [MCP documentation](https://modelcontextprotocol.io)
- Look at the test file to understand exactly what's expected
