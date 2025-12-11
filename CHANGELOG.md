# Changelog

All notable changes to the UI Designer & Design-to-Code Kiro Power.

## [1.0.1] - 2024-12-11

### Fixed
- Added required YAML frontmatter to POWER.md for Kiro GitHub installation compatibility
- Fixed "No valid power found in the repository" installation error

### Added
- Comprehensive Next.js 14 examples in EXAMPLES.md
- Next.js App Router patterns with Server/Client Components
- Server Actions and optimistic UI examples
- E-commerce product page implementation example

### Documentation
- Enhanced EXAMPLES.md with Next.js-specific patterns
- Added metadata and SEO examples
- Included TypeScript types and proper component structure

## [1.0.0] - 2024-12-11

### Added
- Initial release of UI Designer & Design-to-Code Power
- 7 MCP tools for UI design and code generation
- **Native image generation** using `gemini-3-pro-image-preview` for UI mockups
- **Custom Gemini Gem support** via `GEMINI_GEM_ID` environment variable
- **Project context awareness** - Uses auto-generated gem config to enhance prompts
- Automatic custom Gemini Gem configuration on installation
- Auto-detection of design system files and component examples
- Support for multiple frameworks (React, Vue, Svelte, Angular)
- Support for multiple styling approaches (CSS, Tailwind, Styled Components)
- Accessibility analysis and WCAG compliance checking
- Design-to-code conversion with image support
- Component generation with TypeScript support
- Steering files for design patterns and code generation rules

### Changed
- Migrated from deprecated `@google/generative-ai` to official `@google/genai@1.33.0`
- **Updated to use advanced image generation**: `gemini-3-pro-image-preview` for UI designs
- Updated default text model to `gemini-2.5-flash` for code generation
- Converted post-install script to ES modules
- `generate_ui_design` now returns actual UI mockup images + specifications
- Supports up to 14 reference images, 4K resolution, and thinking process
- Auto-generated gem config now used to provide project context in prompts

### Technical
- TypeScript 5.3+
- Node.js 18+ (ES modules)
- pnpm 9.0.0+
- Official Google Generative AI SDK
- Dual model support: Image generation + Text generation
- Custom Gem support for personalized AI behavior

## Tools

- `generate_ui_design` - Generate UI designs from descriptions
- `design_to_code` - Convert design images to production code
- `analyze_design` - Analyze designs for accessibility and compliance
- `generate_component` - Generate specific UI components
- `create_custom_gem` - Create custom Gemini Gem configuration
- `regenerate_gem` - Regenerate Gem after design system changes
- `show_gem_config` - Display current Gem configuration

## Installation

```bash
# In Kiro
Command Palette → "Add Power from GitHub"
→ https://github.com/smailg/ui-designer-power
```

## Configuration

```bash
# Required
GEMINI_API_KEY=your_api_key_here

# Optional (defaults to gemini-2.5-flash)
GEMINI_MODEL=gemini-2.5-flash
```
