#!/bin/bash

# Publishing Commands for UI Designer Power
# Run these commands to publish to GitHub

echo "🚀 Publishing UI Designer & Design-to-Code Power"
echo "================================================"
echo ""

# Step 1: Add all files
echo "📦 Step 1: Adding files to git..."
git add .

# Step 2: Commit
echo "💾 Step 2: Committing..."
git commit -m "Initial commit: UI Designer & Design-to-Code Power

- Complete MCP server with 4 tools
- UI design generation from descriptions
- Design-to-code conversion (React/Vue/Svelte/etc)
- Design analysis (accessibility, patterns, etc)
- Component generation
- Comprehensive documentation
- Steering files for AI guidance
- pnpm package manager
- Auto-build on install
- GitHub installation compatible"

# Step 3: Add remote (if not already added)
echo "🔗 Step 3: Adding GitHub remote..."
git remote add origin https://github.com/smailg/ui-designer-power.git 2>/dev/null || echo "Remote already exists"

# Step 4: Push to GitHub
echo "⬆️  Step 4: Pushing to GitHub..."
git branch -M main
git push -u origin main

# Step 5: Create and push tag
echo "🏷️  Step 5: Creating release tag..."
git tag -a v0.9.0 -m "Initial release (alpha): UI Designer & Design-to-Code Power

Features:
- Generate UI designs from text descriptions
- Convert screenshots to production code
- Analyze designs for accessibility
- Generate framework-specific components
- Support for React, Vue, Svelte, Angular
- Multiple styling options (Tailwind, styled-components, etc)
- Powered by Google Gemini AI"

git push origin v0.9.0

echo ""
echo "✅ Published successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Visit: https://github.com/smailg/ui-designer-power"
echo "2. Create a release from tag v0.9.0"
echo "3. Test installation in Kiro:"
echo "   - Command Palette → 'Add Power from GitHub'"
echo "   - Enter: https://github.com/smailg/ui-designer-power"
echo "4. Share with the community!"
echo ""
