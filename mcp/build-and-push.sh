#!/bin/bash

# UI Designer Power - Docker Build and Push Script
# Version: 1.1.6

set -e  # Exit on error

VERSION="1.1.6"
IMAGE_NAME="smailg/ui-designer-power"

echo "🐳 Building Docker image for UI Designer Power v${VERSION}"
echo "=================================================="

# Check if we're in the mcp directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must run from mcp directory"
    echo "   Run: cd mcp && ./build-and-push.sh"
    exit 1
fi

# Build the image
echo ""
echo "📦 Building Docker image..."
docker build -t ${IMAGE_NAME}:${VERSION} .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Build successful"

# Tag as latest
echo ""
echo "🏷️  Tagging as latest..."
docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest

# Show built images
echo ""
echo "📋 Built images:"
docker images | grep ui-designer-power | head -5

# Ask for confirmation before pushing
echo ""
read -p "🚀 Push to Docker Hub? (y/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "⬆️  Pushing ${IMAGE_NAME}:${VERSION}..."
    docker push ${IMAGE_NAME}:${VERSION}
    
    echo ""
    echo "⬆️  Pushing ${IMAGE_NAME}:latest..."
    docker push ${IMAGE_NAME}:latest
    
    echo ""
    echo "✅ Successfully pushed to Docker Hub!"
    echo ""
    echo "📦 Images available:"
    echo "   - ${IMAGE_NAME}:${VERSION}"
    echo "   - ${IMAGE_NAME}:latest"
else
    echo ""
    echo "⏭️  Skipped push to Docker Hub"
    echo ""
    echo "To push manually:"
    echo "   docker push ${IMAGE_NAME}:${VERSION}"
    echo "   docker push ${IMAGE_NAME}:latest"
fi

echo ""
echo "🎉 Done!"
echo ""
echo "Next steps:"
echo "1. Test the image locally:"
echo "   docker run --rm -e GEMINI_API_KEY=\$GEMINI_API_KEY ${IMAGE_NAME}:${VERSION}"
echo ""
echo "2. Create GitHub release:"
echo "   git tag v${VERSION}"
echo "   git push origin v${VERSION}"
echo ""
echo "3. Update power repository if needed"
