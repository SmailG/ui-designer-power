---
name: "ui-designer-power"
displayName: "UI Designer & Design-to-Code"
version: "1.0.1"
description: "AI-powered UI design generation and design-to-code conversion using Google Gemini"
author: "Smail G"
license: "MIT"
repository: "https://github.com/SmailG/ui-designer-power"
keywords: ["ui-design", "design-to-code", "gemini", "figma", "react", "nextjs", "vue", "tailwind", "accessibility"]
---

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

### Custom Gem Creation
- Automatically create a custom Gemini Gem trained on your codebase
- Scan and incorporate your design system files
- Learn from your code examples and patterns
- Use steering files for best practices
- Generate complete Gem configuration for Google AI Studio
- Get implementation guide and testing prompts

## Integration with Google Gemini

This power uses the latest Gemini models with native image generation:
- **Image Generation: Gemini 3 Pro Image Preview** - Advanced UI mockup generation with thinking
- **Code Generation: Gemini 2.5 Flash** - Fast, high-quality code generation
- **Configurable**: Set `GEMINI_IMAGE_MODEL` and `GEMINI_MODEL` environment variables
- **Custom Gemini Gem**: Optional fine-tuning for your specific patterns
- **Native image generation**: Creates actual UI mockup images, not just descriptions

See [MODEL_SELECTION.md](MODEL_SELECTION.md) for detailed model comparison.

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

### Create a Custom Gem (Automatic!)
```
Create my custom Gemini Gem
```
The power automatically:
- Scans steering files
- Detects design system files
- Finds component examples
- Names it after your project: "UI Designer Pro - [YourProject]"

### Regenerate After Changes
```
Regenerate my custom Gem
```
Use after:
- Design system updates
- Rebranding
- Tech stack changes
- New components added

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
