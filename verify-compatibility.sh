#!/bin/bash

# Verification script for Kiro GitHub installation compatibility
# Run this before publishing to GitHub

echo "🔍 Verifying Kiro GitHub Installation Compatibility..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1 exists"
    else
        echo -e "${RED}❌${NC} $1 missing"
        ((ERRORS++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/ directory exists"
    else
        echo -e "${RED}❌${NC} $1/ directory missing"
        ((ERRORS++))
    fi
}

# Function to check file contains string
check_contains() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $1 contains '$2'"
    else
        echo -e "${YELLOW}⚠️${NC}  $1 should contain '$2'"
        ((WARNINGS++))
    fi
}

echo "📁 Checking Required Files..."
echo "================================"
check_file "POWER.md"
check_file "kiro-power.json"
check_file "package.json"
check_file "tsconfig.json"
check_file "LICENSE"
check_file ".gitignore"
check_file ".npmrc"
check_file ".env.example"
check_file "README.md"
check_file "src/index.ts"
echo ""

echo "📚 Checking Documentation Files..."
echo "================================"
check_file "QUICKSTART.md"
check_file "INSTALL.md"
check_file "EXAMPLES.md"
check_file "GEMINI_GEM_GUIDE.md"
check_file "GITHUB_COMPATIBILITY.md"
check_file "PROJECT_STRUCTURE.md"
check_file "SUMMARY.md"
echo ""

echo "🎯 Checking Steering Files..."
echo "================================"
check_dir "steering"
check_file "steering/ui-design-patterns.md"
check_file "steering/code-generation-rules.md"
check_file "steering/design-systems.md"
echo ""

echo "⚙️  Checking Configuration..."
echo "================================"
check_contains "package.json" "packageManager"
check_contains "package.json" "pnpm"
check_contains "package.json" "postinstall"
check_contains "kiro-power.json" "mcpServers"
check_contains "kiro-power.json" "GEMINI_API_KEY"
check_contains ".gitignore" "node_modules"
check_contains ".gitignore" "dist"
check_contains ".gitignore" ".env"
echo ""

echo "🔨 Testing Build..."
echo "================================"
if [ -f "package.json" ]; then
    echo "Running pnpm install..."
    if pnpm install --silent 2>&1 | grep -q "error"; then
        echo -e "${RED}❌${NC} pnpm install failed"
        ((ERRORS++))
    else
        echo -e "${GREEN}✅${NC} pnpm install successful"
    fi
    
    echo "Running pnpm run build..."
    if pnpm run build 2>&1 | grep -q "error"; then
        echo -e "${RED}❌${NC} Build failed"
        ((ERRORS++))
    else
        echo -e "${GREEN}✅${NC} Build successful"
    fi
    
    if [ -f "dist/index.js" ]; then
        echo -e "${GREEN}✅${NC} dist/index.js exists"
    else
        echo -e "${RED}❌${NC} dist/index.js not created"
        ((ERRORS++))
    fi
else
    echo -e "${RED}❌${NC} Cannot test build - package.json missing"
    ((ERRORS++))
fi
echo ""

echo "🔍 Checking for Secrets..."
echo "================================"
if grep -r "sk-" . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null | grep -v ".sh:" | grep -v "EXAMPLE" > /dev/null; then
    echo -e "${RED}❌${NC} Possible API key found in code!"
    ((ERRORS++))
else
    echo -e "${GREEN}✅${NC} No API keys found in code"
fi

if grep -r "smailg" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.sh" 2>/dev/null > /dev/null; then
    echo -e "${YELLOW}⚠️${NC}  'smailg' placeholder found - update before publishing"
    ((WARNINGS++))
else
    echo -e "${GREEN}✅${NC} No 'smailg' placeholders found"
fi
echo ""

echo "📊 Summary"
echo "================================"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "🎉 Your power is ready for GitHub installation!"
    echo ""
    echo "Next steps:"
    echo "1. Update 'smailg' in files with your GitHub username"
    echo "2. Update author information in kiro-power.json and package.json"
    echo "3. Update copyright in LICENSE"
    echo "4. Push to GitHub"
    echo "5. Test installation from GitHub in Kiro"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
    echo ""
    echo "Your power should work, but review the warnings above."
    echo ""
    exit 0
else
    echo -e "${RED}❌ $ERRORS error(s) found${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
    fi
    echo ""
    echo "Please fix the errors above before publishing."
    echo ""
    exit 1
fi
