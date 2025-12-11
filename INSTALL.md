# Installation Guide

This power is designed to be installed directly from GitHub into Kiro IDE.

## Quick Install (Recommended)

1. **Open Kiro IDE**
2. **Open Command Palette**
   - Mac: `Cmd+Shift+P`
   - Windows/Linux: `Ctrl+Shift+P`
3. **Type**: "Add Power from GitHub"
4. **Enter Repository URL**: `https://github.com/smailg/ui-designer-power`
5. **Wait for Installation**
   - Kiro will clone the repository
   - Install dependencies with pnpm
   - Build the TypeScript code
6. **Enter API Key**
   - When prompted, enter your Gemini API key
   - Get one from: https://makersuite.google.com/app/apikey

That's it! The power is now ready to use.

## What Happens During Installation

The installation process automatically:

1. **Clones the repository** to your Kiro powers directory
2. **Runs `pnpm install`** to install all dependencies:
   - `@modelcontextprotocol/sdk` - MCP server framework
   - `@google/generative-ai` - Gemini AI SDK
   - `sharp` - Image processing
   - `zod` - Schema validation
3. **Runs `pnpm run build`** to compile TypeScript to JavaScript
4. **Configures the MCP server** with your API key
5. **Loads steering files** for design patterns and code generation rules

## Manual Installation

If you prefer to install manually:

```bash
# Clone the repository
git clone https://github.com/smailg/ui-designer-power.git
cd ui-designer-power

# Install dependencies
pnpm install

# Build the project (happens automatically via postinstall)
pnpm run build

# Copy environment template
cp .env.example .env

# Edit .env and add your API key
# GEMINI_API_KEY=your_key_here
```

Then add to `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "ui-designer": {
      "command": "node",
      "args": ["/absolute/path/to/ui-designer-power/dist/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Prerequisites

- **Node.js 18+**: Check with `node --version`
- **pnpm**: Install with `npm install -g pnpm` or see https://pnpm.io/installation
- **Gemini API Key**: Get from https://makersuite.google.com/app/apikey

## Verifying Installation

After installation, verify the power is working:

1. Open Kiro IDE
2. Check the MCP Server view in the sidebar
3. Look for "ui-designer" server (should show as connected)
4. Try a test command:
   ```
   Design a simple button component
   ```

If you see a design specification response, the power is working correctly!

## Troubleshooting

### "pnpm not found"
Install pnpm globally:
```bash
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### "API Key Invalid"
- Verify your key at https://makersuite.google.com/app/apikey
- Ensure the key is correctly set in the environment
- Check for extra spaces or quotes

### "Server Not Connecting"
- Restart Kiro IDE
- Check the Output panel for error messages
- Verify the build completed: `ls dist/index.js`
- Try rebuilding: `pnpm run build`

### "Module Not Found"
- Reinstall dependencies: `pnpm install`
- Clear pnpm cache: `pnpm store prune`
- Rebuild: `pnpm run build`

## Updating the Power

To update to the latest version:

### Via Kiro
1. Open Command Palette
2. Search for "Update Power"
3. Select "ui-designer-power"

### Manually
```bash
cd /path/to/ui-designer-power
git pull
pnpm install
pnpm run build
```

## Uninstalling

### Via Kiro
1. Open Command Palette
2. Search for "Remove Power"
3. Select "ui-designer-power"

### Manually
1. Remove from `.kiro/settings/mcp.json`
2. Delete the power directory
3. Restart Kiro

## Getting Help

- Check [README.md](README.md) for usage documentation
- See [EXAMPLES.md](EXAMPLES.md) for usage examples
- Review [QUICKSTART.md](QUICKSTART.md) for quick setup
- Open an issue on GitHub for bugs or questions
