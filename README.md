# UI Designer & Design-to-Code Power

A Kiro power that combines AI-powered UI design assistance with automated design-to-code conversion using Google's Gemini AI.

## Features

### 🎨 UI Design Generation
- Generate complete UI designs from text descriptions
- Support for multiple design styles (modern, minimal, glassmorphism, etc.)
- Design system recommendations
- Color palette generation
- Typography and spacing guidelines

### 🔄 Design-to-Code Conversion
- Convert screenshots to production-ready code
- Support for React, Vue, Svelte, Angular, and vanilla HTML/CSS
- Multiple styling options (Tailwind, styled-components, CSS modules, SCSS)
- Automatic accessibility attributes
- Responsive design generation

### 🔍 Design Analysis
- Accessibility compliance checking (WCAG 2.1 AA)
- Design system pattern extraction
- Layout and spacing analysis
- Color palette extraction
- Typography analysis

### 🧩 Component Generation
- Generate individual UI components
- Framework-specific implementations
- TypeScript support
- Prop types and interfaces
- Usage examples included

## Installation

### Option 1: Install from GitHub (Recommended)

1. Open Kiro IDE
2. Open the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
3. Search for "Add Power from GitHub"
4. Enter the repository URL: `https://github.com/smailg/ui-designer-power`
5. Kiro will automatically:
   - Clone the repository
   - Install dependencies with pnpm
   - Build the project
   - Prompt you for your Gemini API key

### Option 2: Manual Installation

1. Clone or download this power to your Kiro powers directory
2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm run build
```

4. Configure your Gemini API key:
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

## Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## Configuration in Kiro

Add this power to your Kiro MCP configuration (`.kiro/settings/mcp.json`):

```json
{
  "mcpServers": {
    "ui-designer-power": {
      "command": "node",
      "args": ["/path/to/ui-designer-power/dist/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Usage Examples

### Generate a UI Design
```
@ui-designer-power generate a modern dashboard for a SaaS analytics platform with dark mode support
```

### Convert Design to Code
```
@ui-designer-power convert this design screenshot to React components using Tailwind CSS
[attach screenshot]
```

### Analyze Design Accessibility
```
@ui-designer-power analyze this design for WCAG compliance
[attach screenshot]
```

### Generate a Component
```
@ui-designer-power create a button component in React with Tailwind CSS that supports primary, secondary, and ghost variants
```

## Advanced: Using a Custom Gemini Gem

You can fine-tune Gemini for your specific design patterns:

1. Create a Gem in [Google AI Studio](https://aistudio.google.com/)
2. Train it with your design system documentation
3. Add example prompts and responses
4. Update the model name in `src/index.ts`:
```typescript
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp",
  // or use your custom gem
  // model: "models/your-gem-id"
});
```

## Steering Files

The power includes three steering files that guide its behavior:

- `steering/ui-design-patterns.md`: Common UI patterns and best practices
- `steering/design-systems.md`: Popular design system guidelines
- `steering/code-generation-rules.md`: Code generation standards

You can customize these files to match your team's preferences.

## Supported Frameworks

### Frontend Frameworks
- React (with TypeScript)
- Vue 3 (Composition API)
- Svelte
- Angular
- Vanilla HTML/CSS

### Styling Solutions
- Tailwind CSS
- styled-components
- CSS Modules
- SCSS/Sass
- Plain CSS

## Requirements

- Node.js 18 or higher
- Google Gemini API key
- Kiro IDE

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Watch mode for development
pnpm run dev
```

## Troubleshooting

### API Key Issues
- Ensure your API key is valid and has Gemini API access
- Check that the environment variable is properly set
- Verify you haven't exceeded API quotas

### Image Processing
- Images should be base64 encoded or accessible URLs
- Supported formats: JPEG, PNG, WebP
- Maximum size: 4MB recommended

### Code Generation Quality
- Provide clear, detailed descriptions
- Include specific requirements (framework, styling, features)
- Attach reference images when possible
- Iterate on the output with follow-up requests

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
