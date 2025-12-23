#!/bin/bash

# Local Development Server Script
# Usage: ./dev.sh
# This script starts a local development server at localhost:3000

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo "🚀 Starting local development server..."
echo ""

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

echo "🔨 Starting Vite development server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Local server is running!"
echo ""
echo "📍 Open your browser and go to:"
echo "   🔗 http://localhost:5173"
echo ""
echo "ℹ️  The server will automatically reload when you make changes"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the development server
npm run dev
