# UI Designer & Design-to-Code Power

A comprehensive Kiro power that combines UI/UX design capabilities with automated design-to-code conversion, powered by Google's Gemini AI.

## Overview

This power provides two integrated workflows:
1. **UI Design Assistant**: Generate, iterate, and refine UI designs with AI-powered suggestions
2. **Design-to-Code**: Convert designs (screenshots, Figma exports, wireframes) into production-ready code

## Features

### UI Design Capabilities
- Generate UI mockups and wireframes from descriptions
- Provide design system recommendations
- Suggest color palettes, typography, and spacing
- Create responsive layout structures
- Accessibility compliance checking
- Design pattern recommendations

### Design-to-Code Capabilities
- Convert screenshots to HTML/CSS/React/Vue/Svelte
- Extract design tokens (colors, spacing, typography)
- Generate component hierarchies
- Responsive breakpoint detection
- Tailwind CSS / styled-components support
- Accessibility attributes generation

## Integration with Google Gemini

This power is designed to work with:
- **Gemini 2.0 Flash**: For fast design analysis and code generation
- **Custom Gemini Gem**: Fine-tuned for UI/UX patterns and code generation
- **Vision capabilities**: For analyzing design screenshots and mockups

## Usage

### Generate a UI Design
```
Design a modern dashboard for a SaaS analytics platform with dark mode support
```

### Convert Design to Code
```
Convert this design screenshot to React components using Tailwind CSS
```

### Iterate on Existing Design
```
Improve the accessibility of this component and suggest WCAG AA compliant alternatives
```

## Configuration

The power uses the Gemini API through a custom MCP server. Configure your API key in the power settings.

## Installation

### From GitHub (Recommended)
1. In Kiro, use Command Palette → "Add Power from GitHub"
2. Enter repository URL
3. Provide your Gemini API key when prompted

### Manual Installation
See [README.md](README.md) for detailed instructions.

## Requirements

- Google AI Studio API key (or Vertex AI credentials)
- Node.js 18+ (for the MCP server)
- pnpm package manager
- Optional: Figma API token for direct Figma integration

## Steering Files

- `ui-design-patterns.md`: Common UI patterns and best practices
- `design-systems.md`: Popular design system guidelines
- `code-generation-rules.md`: Code generation preferences and standards
