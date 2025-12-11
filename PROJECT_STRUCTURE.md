# Project Structure

Complete overview of the UI Designer & Design-to-Code Power file structure.

```
ui-designer-power/
├── src/
│   └── index.ts                    # Main MCP server implementation
│
├── steering/
│   ├── ui-design-patterns.md       # UI/UX patterns and best practices
│   ├── code-generation-rules.md    # Code generation standards
│   └── design-systems.md           # Design system references
│
├── dist/                           # Compiled JavaScript (generated)
│   └── index.js                    # Built MCP server
│
├── node_modules/                   # Dependencies (generated)
│
├── .git/                           # Git repository
│
├── POWER.md                        # Power documentation (required by Kiro)
├── kiro-power.json                 # Power metadata (required by Kiro)
├── package.json                    # Node.js package configuration
├── pnpm-lock.yaml                  # pnpm lock file
├── tsconfig.json                   # TypeScript configuration
├── .npmrc                          # npm/pnpm configuration
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variable template
├── LICENSE                         # MIT License
│
├── README.md                       # Main documentation
├── QUICKSTART.md                   # 5-minute setup guide
├── INSTALL.md                      # Detailed installation guide
├── EXAMPLES.md                     # Usage examples
├── GEMINI_GEM_GUIDE.md            # Custom Gem creation guide
├── GITHUB_COMPATIBILITY.md         # GitHub installation info
└── PROJECT_STRUCTURE.md            # This file
```

## File Descriptions

### Core Files (Required)

#### `POWER.md`
- **Purpose**: Main power documentation for Kiro
- **Required**: Yes
- **Content**: Features, usage, configuration, requirements
- **Used by**: Kiro IDE to display power information

#### `kiro-power.json`
- **Purpose**: Power metadata and configuration
- **Required**: Yes
- **Content**: Name, version, MCP server config, env vars
- **Used by**: Kiro IDE for installation and setup

#### `package.json`
- **Purpose**: Node.js package configuration
- **Required**: Yes
- **Key fields**:
  - `packageManager: "pnpm@9.0.0"` - Specifies pnpm
  - `postinstall` script - Auto-builds after install
  - Dependencies for MCP and Gemini AI
- **Used by**: pnpm for dependency management

#### `src/index.ts`
- **Purpose**: MCP server implementation
- **Required**: Yes
- **Content**: 
  - Tool definitions (generate_ui_design, design_to_code, etc.)
  - Gemini AI integration
  - Request handlers
- **Compiled to**: `dist/index.js`

### Configuration Files

#### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Target**: ES2022
- **Module**: Node16
- **Output**: `dist/` directory

#### `.npmrc`
- **Purpose**: npm/pnpm configuration
- **Settings**:
  - Specifies pnpm as package manager
  - Auto-install peer dependencies
  - Relaxed peer dependency strictness

#### `.env.example`
- **Purpose**: Environment variable template
- **Variables**:
  - `GEMINI_API_KEY` - Required for Gemini AI
  - `GOOGLE_API_KEY` - Alternative name
  - Optional Vertex AI settings

#### `.gitignore`
- **Purpose**: Git ignore rules
- **Excludes**:
  - `node_modules/`
  - `dist/`
  - `.env`
  - Log files
  - IDE files

### Documentation Files

#### `README.md`
- **Purpose**: Main documentation
- **Sections**:
  - Features overview
  - Installation (GitHub + manual)
  - Configuration
  - Usage examples
  - Troubleshooting
  - Development guide

#### `QUICKSTART.md`
- **Purpose**: Fast setup guide
- **Target**: New users wanting quick start
- **Time**: ~5 minutes
- **Content**: Minimal steps to get running

#### `INSTALL.md`
- **Purpose**: Detailed installation guide
- **Content**:
  - GitHub installation flow
  - Manual installation steps
  - Prerequisites
  - Troubleshooting
  - Verification steps

#### `EXAMPLES.md`
- **Purpose**: Comprehensive usage examples
- **Content**:
  - Design generation examples
  - Design-to-code examples
  - Component generation examples
  - Analysis examples
  - Advanced workflows

#### `GEMINI_GEM_GUIDE.md`
- **Purpose**: Custom Gem creation guide
- **Content**:
  - What is a Gem
  - How to create one
  - Training examples
  - Integration steps
  - Best practices

#### `GITHUB_COMPATIBILITY.md`
- **Purpose**: GitHub installation compatibility info
- **Content**:
  - Compatibility checklist
  - Installation flow
  - Testing instructions
  - Customization guide

#### `PROJECT_STRUCTURE.md`
- **Purpose**: This file - project structure overview
- **Content**: Complete file tree and descriptions

### Steering Files

Located in `steering/` directory, these guide the AI's behavior:

#### `ui-design-patterns.md`
- **Purpose**: UI/UX patterns and best practices
- **Content**:
  - Layout patterns (dashboard, landing page, forms)
  - Component patterns (navigation, cards, buttons)
  - Spacing scales
  - Color systems
  - Typography scales
  - Accessibility guidelines

#### `code-generation-rules.md`
- **Purpose**: Code generation standards
- **Content**:
  - General principles
  - React guidelines
  - Tailwind CSS guidelines
  - Accessibility requirements
  - Responsive breakpoints
  - File structure
  - Design tokens
  - Code quality standards

#### `design-systems.md`
- **Purpose**: Design system references
- **Content**:
  - Material Design
  - Ant Design
  - Chakra UI
  - Tailwind CSS
  - Apple HIG
  - Fluent Design
  - Comparison table
  - Common patterns

### Generated Files

These are created during build/install:

#### `dist/`
- **Created by**: TypeScript compiler
- **Contains**: Compiled JavaScript
- **Main file**: `dist/index.js` - The MCP server
- **Ignored by**: Git (in .gitignore)

#### `node_modules/`
- **Created by**: pnpm install
- **Contains**: All dependencies
- **Size**: ~50-100MB
- **Ignored by**: Git (in .gitignore)

#### `pnpm-lock.yaml`
- **Created by**: pnpm
- **Purpose**: Lock dependency versions
- **Committed**: Yes (ensures reproducible installs)

### License

#### `LICENSE`
- **Type**: MIT License
- **Required**: Yes (for open source)
- **Customization**: Update copyright holder name

## File Dependencies

```
Installation Flow:
package.json → pnpm install → node_modules/
           ↓
    postinstall script
           ↓
    pnpm run build
           ↓
    tsconfig.json → tsc → dist/index.js
           ↓
    kiro-power.json → MCP server config
           ↓
    .env or env vars → GEMINI_API_KEY
           ↓
    steering/*.md → Loaded by Kiro
           ↓
    Ready to use! ✅
```

## Size Information

Approximate sizes:

- **Source code**: ~50 KB
  - `src/index.ts`: ~15 KB
  - Steering files: ~30 KB
  - Config files: ~5 KB

- **Documentation**: ~100 KB
  - All .md files combined

- **Dependencies**: ~50-100 MB
  - `node_modules/` after install

- **Compiled**: ~20 KB
  - `dist/index.js`

- **Total repository**: ~150 KB (without node_modules)
- **Total installed**: ~50-100 MB (with node_modules)

## Customization Points

Files to customize before publishing:

1. **kiro-power.json**
   - `author`
   - `repository.url`

2. **package.json**
   - `author`
   - `repository.url`
   - `bugs.url`
   - `homepage`

3. **LICENSE**
   - Copyright holder name

4. **README.md**
   - Replace `smailg` with actual GitHub username

5. **Steering files** (optional)
   - Customize for your design system
   - Add company-specific patterns
   - Update code standards

## Development Workflow

```bash
# Initial setup
pnpm install

# Development (watch mode)
pnpm run dev

# Build for production
pnpm run build

# Test the server
node dist/index.js

# Clean build
rm -rf dist/
pnpm run build
```

## Adding New Features

To add a new tool:

1. **Define schema** in `src/index.ts`:
   ```typescript
   const NewToolSchema = z.object({
     param: z.string(),
   });
   ```

2. **Add to tools list** in `ListToolsRequestSchema` handler

3. **Implement handler** in `CallToolRequestSchema` handler

4. **Update documentation**:
   - Add to POWER.md features
   - Add examples to EXAMPLES.md
   - Update README.md if needed

5. **Rebuild**: `pnpm run build`

## Maintenance

Regular maintenance tasks:

- **Update dependencies**: `pnpm update`
- **Check for vulnerabilities**: `pnpm audit`
- **Update Gemini SDK**: `pnpm update @google/generative-ai`
- **Update MCP SDK**: `pnpm update @modelcontextprotocol/sdk`
- **Rebuild**: `pnpm run build`
- **Test**: Verify all tools still work

## Summary

This power has a clean, well-organized structure:

- ✅ All required files for Kiro GitHub installation
- ✅ Comprehensive documentation
- ✅ Proper TypeScript setup
- ✅ pnpm package management
- ✅ Steering files for AI guidance
- ✅ Examples and guides
- ✅ MIT licensed

Ready to publish and share! 🚀
