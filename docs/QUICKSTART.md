# Quick Start Guide

Get up and running with the UI Designer & Design-to-Code Power in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Kiro IDE installed
- Google account (for Gemini API)

## Fastest Method: Install from GitHub (2 minutes)

1. **Get Gemini API Key**
   - Visit https://makersuite.google.com/app/apikey
   - Sign in and click "Create API Key"
   - Copy the key

2. **Install in Kiro**
   - Open Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
   - Type "Add Power from GitHub"
   - Enter: `https://github.com/smailg/ui-designer-power`
   - Paste your API key when prompted

3. **Start Using**
   - Try: "Design a modern pricing page"
   - Done! 🎉

---

## Alternative: Manual Installation

If you prefer manual setup or need to customize:

## Step 1: Get Your API Key (2 minutes)

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

## Step 2: Install the Power (2 minutes)

```bash
# Clone or download this repository
cd /path/to/ui-designer-power

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Create environment file
cp .env.example .env

# Edit .env and paste your API key
# GEMINI_API_KEY=your_key_here
```

## Step 3: Configure Kiro (1 minute)

Add to your Kiro MCP config at `.kiro/settings/mcp.json`:

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

Or use the Kiro command palette:
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "MCP: Edit Configuration"
3. Add the configuration above

## Step 4: Test It Out

Restart Kiro or reconnect the MCP server, then try:

### Generate a Design
```
Design a modern pricing page with three tiers
```

### Convert a Design
```
Convert this screenshot to React with Tailwind CSS
[Attach an image of a UI design]
```

### Generate a Component
```
Create a card component in React with hover effects
```

## Common Issues

### "API Key not found"
- Check that your `.env` file exists and contains `GEMINI_API_KEY`
- Verify the key is valid at https://makersuite.google.com/app/apikey

### "Command not found"
- Ensure you've run `pnpm run build`
- Check that the path in your MCP config is absolute
- Verify Node.js is installed: `node --version`
- Verify pnpm is installed: `pnpm --version`

### "Server not connecting"
- Restart Kiro
- Check the MCP Server view in Kiro's sidebar
- Look for error messages in the Kiro output panel

## Next Steps

- Read the full [README.md](README.md) for detailed features
- Explore [GEMINI_GEM_GUIDE.md](GEMINI_GEM_GUIDE.md) to create a custom Gem
- Check out [EXAMPLES.md](EXAMPLES.md) for more usage examples
- Customize the steering files in `steering/` for your needs

## Getting Help

- Check the [README.md](README.md) troubleshooting section
- Review Kiro's MCP documentation
- Open an issue on GitHub
- Check Google AI Studio documentation

## Pro Tips

1. **Be Specific**: The more detailed your prompt, the better the output
2. **Iterate**: Start with a basic design, then refine it
3. **Use References**: Attach screenshots or examples when possible
4. **Customize Steering**: Edit the files in `steering/` to match your preferences
5. **Create a Gem**: For best results, create a custom Gemini Gem trained on your design system
