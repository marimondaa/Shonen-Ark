# Railway build script to handle n8n dependency conflicts (PowerShell version)
Write-Host "🚀 Starting Railway build with dependency conflict resolution..." -ForegroundColor Green

# Clean install attempt with fallback
Write-Host "📦 Attempting npm install..." -ForegroundColor Yellow
$npmCiResult = & npm ci --legacy-peer-deps --force 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm ci succeeded with legacy peer deps" -ForegroundColor Green
} else {
    Write-Host "⚠️  npm ci failed, trying npm install with force..." -ForegroundColor Yellow
    if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
    if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
    & npm install --legacy-peer-deps --force --no-audit
}

# Verify critical dependencies
Write-Host "🔍 Verifying critical dependencies..." -ForegroundColor Yellow
$verifyScript = @"
try {
  require('next');
  require('react');
  require('react-dom');
  console.log('✅ Core dependencies verified');
} catch (e) {
  console.error('❌ Missing core dependencies:', e.message);
  process.exit(1);
}
"@
& node -e $verifyScript

# Build the application
Write-Host "🏗️  Building Next.js application..." -ForegroundColor Yellow
& npm run build
