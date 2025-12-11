# UI Designer & Design-to-Code Power

A Kiro power that combines AI-powered UI design assistance with automated design-to-code conversion using Google's Gemini AI.

## Repository Structure

```
.
├── power/              # Kiro Power package (install this)
│   ├── POWER.md       # Power documentation
│   ├── mcp.json       # MCP server configuration
│   └── steering/      # AI guidance files
├── mcp/               # MCP server implementation
│   ├── src/           # TypeScript source code
│   ├── Dockerfile     # Docker image definition
│   └── package.json   # Node.js dependencies
└── README.md          # This file
```

## Features

### 🎨 UI Design Generation (with Native Image Generation!)
- **Generate actual UI mockup images** using Gemini 3 Pro Image Preview
- Returns high-fidelity visual mockups + design specifications
- Support for multiple design styles (modern, minimal, glassmorphism, etc.)
- Multiple aspect ratios (1:1, 16:9, 21:9, etc.)
- Multiple resolutions (1K, 2K, 4K)
- Design system recommendations
- Color palette generation
- Typography and spacing guidelines

### 🔄 Design-to-Code Conversion
- Convert screenshots to production-ready code
- **Accepts image file paths** (all common formats), base64 data, or URLs
- Support for React, Next.js, Vue, Svelte, Angular, and vanilla HTML/CSS
- Multiple styling options (Tailwind, styled-components, CSS modules, SCSS)
- Automatic accessibility attributes
- Responsive design generation

### 🔍 Design Analysis
- **Accepts image file paths** (all common formats), base64 data, or URLs
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

### 🤖 Automatic Custom Gem Creation (NEW!)
- **Zero-configuration setup** - Works automatically on install
- **Auto-detects** your design system and component files
- **Project-specific naming** - "UI Designer Pro - [YourProject]"
- **One-command creation** - Just say "Create my custom Gemini Gem"
- **Easy regeneration** - "Regenerate my custom Gem" after changes
- **Saves configuration** - No need to specify files again
- Perfect for: rebranding, tech stack changes, design system updates
- TypeScript support
- Prop types and interfaces
- Usage examples included

## Installation

1. Open Kiro IDE
2. Open the Powers panel
3. Click "Add Power from Repository"
4. Enter: `https://github.com/SmailG/ui-designer-power/tree/main/power`
5. Set your `GEMINI_API_KEY` environment variable

The power uses a Docker container for the MCP server, so Docker must be running.

## Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## Configuration

The power automatically configures itself when installed. The MCP server runs in a Docker container (`smailg/ui-designer-power:latest`).

## Usage Examples

### Generate a UI Design
```
@ui-designer-power generate a modern dashboard for a SaaS analytics platform with dark mode support
```

### Convert Design to Code
```
# Option 1: Using a file path
@ui-designer-power convert ./designs/homepage.png to React components using Tailwind CSS

# Option 2: Attach an image
@ui-designer-power convert this design screenshot to React components using Tailwind CSS
[attach screenshot]
```

### Analyze Design Accessibility
```
# Option 1: Using a file path
@ui-designer-power analyze ./designs/dashboard.png for WCAG compliance

# Option 2: Attach an image
@ui-designer-power analyze this design for WCAG compliance
[attach screenshot]
```

### Generate a Component
```
@ui-designer-power create a button component in React with Tailwind CSS that supports primary, secondary, and ghost variants
```

## Model Configuration

The power uses dual models for optimal performance with automatic fallback and rate limiting:

```bash
# Model Configuration
GEMINI_GEM_ID=models/your-gem-id-here          # Custom Gem (overrides all)
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview  # Image generation
GEMINI_MODEL=gemini-2.5-flash                  # Code generation

# Rate Limiting Configuration (optional)
GEMINI_MIN_REQUEST_INTERVAL=1000  # Min ms between requests (default: 1000)
GEMINI_MAX_RETRIES=3               # Max retry attempts (default: 3)
GEMINI_INITIAL_RETRY_DELAY=2000    # Initial retry delay in ms (default: 2000)
```

**Automatic Features**:
- **Fallback**: If Gemini 3 models are overloaded (503 errors), automatically retries with Gemini 2.5 models
- **Rate Limiting**: Enforces minimum interval between requests to prevent hitting API rate limits
- **Exponential Backoff**: Automatically retries with increasing delays when rate limits are hit (429 errors)
- **Request Queuing**: Prevents concurrent requests that could trigger rate limits

### Using a Custom Gem

After creating a custom Gem in Google AI Studio:
1. Copy your Gem ID (looks like `models/gemini-...`)
2. Set `GEMINI_GEM_ID` environment variable
3. The power will use your custom Gem for all operations
4. Your Gem will have your project's design patterns and code style built-in!

### Available Models (when not using custom Gem)

**Image Models:**
- `gemini-3-pro-image-preview` - Most advanced, up to 14 images, 4K support (default)
- `gemini-2.5-flash-image` - Fast alternative

**Text Models:**
- `gemini-2.5-flash` - Fast code generation (default)
- `gemini-2.5-pro` - Highest quality
- `gemini-3-pro-preview` - Most intelligent

## Steering Files

The power includes three steering files that guide its behavior:

- `steering/ui-design-patterns.md`: Common UI patterns and best practices
- `steering/design-systems.md`: Popular design system guidelines
- `steering/code-generation-rules.md`: Code generation standards

You can customize these files to match your team's preferences.

## Supported Frameworks

### Frontend Frameworks
- React (with TypeScript)
- Next.js
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

See `mcp/README.md` for MCP server development instructions.

To rebuild and publish the Docker image:
```bash
cd mcp
docker build -t smailg/ui-designer-power:latest .
docker push smailg/ui-designer-power:latest
```

## Troubleshooting

### API Key Issues
- Ensure your API key is valid and has Gemini API access
- Check that the environment variable is properly set
- Verify you haven't exceeded API quotas

### Model Overload (503 Errors)
- The power automatically retries with fallback models (Gemini 2.5)
- If you see "Model is overloaded" messages, the fallback is working
- Image generation fallback: `gemini-2.5-flash-image` (supports image generation)
- Text generation fallback: `gemini-2.0-flash-exp`
- Consider using Gemini 2.5 models directly if Gemini 3 is consistently overloaded

### Rate Limit Errors (429 Errors)
- The power automatically handles rate limits with exponential backoff
- Default: 1 second minimum between requests
- Retries up to 3 times with increasing delays (2s, 4s, 8s)
- If you hit rate limits frequently, increase `GEMINI_MIN_REQUEST_INTERVAL`:
  ```bash
  GEMINI_MIN_REQUEST_INTERVAL=2000  # 2 seconds between requests
  ```
- Or reduce concurrent usage across multiple tools/sessions

### Image Processing
- **Accepts file paths** (relative or absolute): `./design.png`, `/path/to/image.jpg`
- Also accepts base64 encoded data or accessible URLs
- **Supported formats**: All common image formats (PNG, JPEG, GIF, WebP, BMP, SVG, TIFF, ICO, etc.)
- Automatic MIME type detection using the `mime` library
- Maximum size: 4MB recommended
- File paths are automatically detected and read

### Code Generation Quality
- Provide clear, detailed descriptions
- Include specific requirements (framework, styling, features)
- Attach reference images when possible
- Iterate on the output with follow-up requests

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
