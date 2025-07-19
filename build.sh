#!/bin/bash

# Railway build script to handle n8n dependency conflicts
echo "🚀 Starting Railway build with dependency conflict resolution..."

# Clean install attempt with fallback
if npm ci --legacy-peer-deps --force; then
    echo "✅ npm ci succeeded with legacy peer deps"
else
    echo "⚠️  npm ci failed, trying npm install with force..."
    rm -rf node_modules package-lock.json
    npm install --legacy-peer-deps --force --no-audit
fi

# Verify critical dependencies
echo "🔍 Verifying critical dependencies..."
node -e "
try {
  require('next');
  require('react');
  require('react-dom');
  console.log('✅ Core dependencies verified');
} catch (e) {
  console.error('❌ Missing core dependencies:', e.message);
  process.exit(1);
}
"

# Build the application
echo "🏗️  Building Next.js application..."
npm run build
