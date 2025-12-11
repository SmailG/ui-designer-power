# UI Designer MCP Server

This is the MCP server implementation for the UI Designer Power.

## Building

```bash
pnpm install
pnpm build
```

## Running locally

```bash
node dist/index.js
```

## Building Docker image

```bash
docker build -t smailg/ui-designer-power:latest .
docker push smailg/ui-designer-power:latest
```
