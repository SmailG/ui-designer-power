# Publishing Checklist

Complete checklist before publishing your UI Designer & Design-to-Code Power to GitHub.

## ✅ Pre-Publishing Checklist

### 1. Update Repository Information

- [ ] **kiro-power.json**
  - [ ] Update `author` field with your name
  - [ ] Update `repository.url` with your GitHub URL
  
- [ ] **package.json**
  - [ ] Update `author` field
  - [ ] Update `repository.url`
  - [ ] Update `bugs.url`
  - [ ] Update `homepage`
  
- [ ] **LICENSE**
  - [ ] Update copyright holder name
  - [ ] Update year if needed
  
- [ ] **README.md**
  - [x] Replace all `yourusername` with your GitHub username
  - [ ] Update repository URLs
  
- [ ] **QUICKSTART.md**
  - [ ] Replace `yourusername` with your GitHub username
  
- [ ] **INSTALL.md**
  - [ ] Replace `yourusername` with your GitHub username

### 2. Verify File Structure

- [ ] **Core files exist**
  - [ ] `POWER.md`
  - [ ] `kiro-power.json`
  - [ ] `package.json`
  - [ ] `tsconfig.json`
  - [ ] `src/index.ts`
  - [ ] `LICENSE`
  - [ ] `.gitignore`
  - [ ] `.npmrc`
  - [ ] `.env.example`

- [ ] **Documentation exists**
  - [ ] `README.md`
  - [ ] `QUICKSTART.md`
  - [ ] `INSTALL.md`
  - [ ] `EXAMPLES.md`
  - [ ] `GEMINI_GEM_GUIDE.md`
  - [ ] `GITHUB_COMPATIBILITY.md`
  - [ ] `PROJECT_STRUCTURE.md`
  - [ ] `SUMMARY.md`

- [ ] **Steering files exist**
  - [ ] `steering/ui-design-patterns.md`
  - [ ] `steering/code-generation-rules.md`
  - [ ] `steering/design-systems.md`

### 3. Test Locally

- [ ] **Dependencies install**
  ```bash
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```

- [ ] **Build succeeds**
  ```bash
  pnpm run build
  ```

- [ ] **Output exists**
  ```bash
  ls dist/index.js
  ```

- [ ] **Server starts**
  ```bash
  GEMINI_API_KEY=test node dist/index.js
  # Should show: "UI Designer Power MCP server running on stdio"
  ```

- [ ] **TypeScript compiles without errors**
  ```bash
  pnpm run build
  # Should complete with no errors
  ```

### 4. Test in Kiro (Manual Installation)

- [ ] **Configure MCP server**
  - [ ] Add to `.kiro/settings/mcp.json`
  - [ ] Set GEMINI_API_KEY
  
- [ ] **Server connects**
  - [ ] Check MCP Server view
  - [ ] Shows "ui-designer" as connected
  
- [ ] **Test each tool**
  - [ ] `generate_ui_design` - "Design a button"
  - [ ] `design_to_code` - Convert a screenshot
  - [ ] `analyze_design` - Analyze a design
  - [ ] `generate_component` - Generate a component

### 5. Verify Git Setup

- [ ] **Git initialized**
  ```bash
  git status
  ```

- [ ] **Correct files ignored**
  - [ ] `node_modules/` not tracked
  - [ ] `dist/` not tracked
  - [ ] `.env` not tracked
  
- [ ] **Correct files tracked**
  - [ ] All `.md` files
  - [ ] All `.json` files
  - [ ] All `.ts` files
  - [ ] `steering/` directory
  - [ ] `.gitignore`
  - [ ] `.npmrc`
  - [ ] `.env.example`
  - [ ] `LICENSE`

### 6. Documentation Quality

- [ ] **README.md**
  - [ ] Clear feature descriptions
  - [ ] Installation instructions work
  - [ ] Examples are accurate
  - [ ] Links work
  
- [ ] **QUICKSTART.md**
  - [ ] Steps are clear
  - [ ] Can be completed in ~5 minutes
  - [ ] Commands are correct
  
- [ ] **EXAMPLES.md**
  - [ ] Examples are realistic
  - [ ] Code samples are correct
  - [ ] Covers all tools

### 7. Code Quality

- [ ] **TypeScript**
  - [ ] No type errors
  - [ ] Proper error handling
  - [ ] Clear variable names
  - [ ] Comments where needed
  
- [ ] **MCP Server**
  - [ ] All tools defined
  - [ ] Input schemas correct
  - [ ] Error handling present
  - [ ] Proper response format

### 8. Security Check

- [ ] **No secrets in code**
  - [ ] No API keys
  - [ ] No passwords
  - [ ] No personal information
  
- [ ] **Environment variables**
  - [ ] `.env.example` has placeholders only
  - [ ] `.env` in `.gitignore`
  - [ ] API key required in kiro-power.json

## 🚀 Publishing Steps

### 1. Create GitHub Repository

```bash
# On GitHub.com
# 1. Click "New repository"
# 2. Name: ui-designer-power
# 3. Description: "AI-powered UI design and design-to-code conversion for Kiro"
# 4. Public repository
# 5. Don't initialize with README (we have one)
# 6. Create repository
```

### 2. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: UI Designer & Design-to-Code Power"

# Add remote
git remote add origin https://github.com/smailg/ui-designer-power.git

# Push
git branch -M main
git push -u origin main
```

### 3. Verify on GitHub

- [ ] All files visible
- [ ] README.md displays correctly
- [ ] LICENSE shows MIT
- [ ] No sensitive files present

### 4. Create Release (Optional but Recommended)

```bash
# Tag the release
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# On GitHub:
# 1. Go to Releases
# 2. Click "Create a new release"
# 3. Choose tag v1.0.0
# 4. Title: "v1.0.0 - Initial Release"
# 5. Description: Copy from SUMMARY.md
# 6. Publish release
```

### 5. Test GitHub Installation

- [ ] **In Kiro**
  - [ ] Command Palette → "Add Power from GitHub"
  - [ ] Enter: `https://github.com/smailg/ui-designer-power`
  - [ ] Installation completes
  - [ ] Prompted for API key
  - [ ] Server connects
  - [ ] Tools work

## 📋 Post-Publishing

### 1. Update Repository Settings

- [ ] **About section**
  - [ ] Add description
  - [ ] Add topics: `kiro`, `ui-design`, `gemini`, `design-to-code`
  - [ ] Add website (if any)
  
- [ ] **Enable Issues**
  - [ ] For bug reports
  - [ ] For feature requests
  
- [ ] **Add README badges** (optional)
  - [ ] License badge
  - [ ] Version badge
  - [ ] Stars badge

### 2. Share Your Power

- [ ] **Kiro Community**
  - [ ] Share in Kiro Discord/Slack
  - [ ] Post in Kiro forums
  
- [ ] **Social Media**
  - [ ] Twitter/X
  - [ ] LinkedIn
  - [ ] Dev.to
  
- [ ] **Documentation**
  - [ ] Add to your portfolio
  - [ ] Write a blog post
  - [ ] Create a demo video

### 3. Maintenance Plan

- [ ] **Set up notifications**
  - [ ] Watch repository for issues
  - [ ] Enable GitHub notifications
  
- [ ] **Plan updates**
  - [ ] Monitor Gemini API changes
  - [ ] Update dependencies monthly
  - [ ] Add new features based on feedback
  
- [ ] **Documentation**
  - [ ] Keep CHANGELOG.md updated
  - [ ] Update examples as needed
  - [ ] Add FAQ based on issues

## 🔍 Final Verification

Run this command to verify everything:

```bash
# Check all required files exist
echo "Checking files..."
test -f POWER.md && echo "✅ POWER.md" || echo "❌ POWER.md missing"
test -f kiro-power.json && echo "✅ kiro-power.json" || echo "❌ kiro-power.json missing"
test -f package.json && echo "✅ package.json" || echo "❌ package.json missing"
test -f src/index.ts && echo "✅ src/index.ts" || echo "❌ src/index.ts missing"
test -f LICENSE && echo "✅ LICENSE" || echo "❌ LICENSE missing"
test -f README.md && echo "✅ README.md" || echo "❌ README.md missing"

# Check build works
echo -e "\nTesting build..."
pnpm run build && echo "✅ Build successful" || echo "❌ Build failed"

# Check dist exists
test -f dist/index.js && echo "✅ dist/index.js exists" || echo "❌ dist/index.js missing"

echo -e "\n✅ All checks passed! Ready to publish!"
```

## 📝 Quick Reference

### Repository URL Format
```
https://github.com/smailg/ui-designer-power
```

### Installation Command (for users)
```
Kiro → Command Palette → "Add Power from GitHub"
→ https://github.com/smailg/ui-designer-power
```

### Clone Command
```bash
git clone https://github.com/smailg/ui-designer-power.git
```

## ⚠️ Common Issues

### "pnpm not found" during GitHub install
- Users need pnpm installed
- Kiro should prompt to install
- Document in README

### "Build failed"
- Check TypeScript errors
- Verify all dependencies in package.json
- Test locally first

### "API key invalid"
- User needs valid Gemini API key
- Link to https://makersuite.google.com/app/apikey
- Check environment variable name

## ✨ Success Criteria

Your power is ready when:

- ✅ All checklist items completed
- ✅ Builds without errors
- ✅ Works in Kiro locally
- ✅ Pushed to GitHub
- ✅ Installs from GitHub in Kiro
- ✅ All tools function correctly
- ✅ Documentation is clear
- ✅ No secrets in repository

## 🎉 You're Ready!

Once all items are checked, your power is ready to share with the world!

**Next steps:**
1. Complete any remaining checklist items
2. Push to GitHub
3. Test GitHub installation
4. Share with the community
5. Maintain and improve based on feedback

**Good luck! 🚀**
