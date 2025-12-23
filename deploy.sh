#!/bin/bash

# Build and Deploy Script for GitHub Pages
# Usage: ./deploy.sh
# This script builds the project and deploys it to the gh-pages branch

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo "🚀 Starting deployment process..."
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: You must be on the main branch to deploy"
    echo "Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

echo "✅ On main branch with clean working directory"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install >/dev/null 2>&1
echo "✅ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building project..."
npm run build
echo "✅ Build complete"
echo ""

# Prepare deployment directory
echo "📁 Preparing deployment files..."
DEPLOY_DIR="/tmp/ghpages-deploy-$$"
mkdir -p "$DEPLOY_DIR"
rm -rf "$DEPLOY_DIR"/*
cp -r dist/* "$DEPLOY_DIR/"
echo "✅ Deployment files prepared"
echo ""

# Switch to gh-pages branch and deploy
echo "🌐 Switching to gh-pages branch..."
git checkout gh-pages >/dev/null 2>&1
git reset --hard origin/gh-pages >/dev/null 2>&1
echo "✅ gh-pages branch ready"
echo ""

# Copy new build files
echo "📤 Deploying new build..."
cp -r "$DEPLOY_DIR"/* .
touch .nojekyll
echo "✅ Build files deployed"
echo ""

# Commit and push
echo "💾 Committing changes..."
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
echo "✅ Changes committed"
echo ""

echo "🚀 Pushing to GitHub..."
git push origin gh-pages
echo "✅ Pushed to gh-pages"
echo ""

# Return to main branch
echo "↩️  Returning to main branch..."
git checkout main >/dev/null 2>&1
echo "✅ Back on main branch"
echo ""

# Cleanup
rm -rf "$DEPLOY_DIR"

echo "🎉 Deployment complete!"
echo ""
echo "Your site will be updated at: https://prodwork.github.io"
echo "(GitHub Pages may take 1-2 minutes to refresh)"
