# n8n Local Setup Script for Windows
# This script sets up and starts n8n locally with proper configuration

Write-Host "🚀 Setting up n8n for Shonen Ark..." -ForegroundColor Green

# Check if n8n is installed globally
$n8nInstalled = Get-Command n8n -ErrorAction SilentlyContinue

if (-not $n8nInstalled) {
    Write-Host "📦 Installing n8n globally..." -ForegroundColor Yellow
    npm install n8n -g
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install n8n. Try running as Administrator." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ n8n is installed!" -ForegroundColor Green

# Set environment variables for this session
$env:N8N_BASIC_AUTH_ACTIVE = "true"
$env:N8N_BASIC_AUTH_USER = "admin"
$env:N8N_BASIC_AUTH_PASSWORD = "ShonenArk2025!"
$env:N8N_API_KEY_AUTH_ENABLED = "true"
$env:N8N_PERSONAL_ACCESS_TOKEN_ENABLED = "true"
$env:N8N_HOST = "0.0.0.0"
$env:N8N_PORT = "5678"

Write-Host "⚙️ Environment variables set:" -ForegroundColor Cyan
Write-Host "   URL: http://localhost:5678" -ForegroundColor White
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: ShonenArk2025!" -ForegroundColor White

Write-Host ""
Write-Host "🔑 IMPORTANT: Save these credentials!" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor Green
Write-Host "   Password: ShonenArk2025!" -ForegroundColor Green
Write-Host ""

# Create .env.local if it doesn't exist
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
}

# Update .env.local with n8n settings
$envContent = Get-Content ".env.local" -Raw
if ($envContent -notlike "*N8N_URL*") {
    Add-Content ".env.local" "`n# n8n Local Configuration"
    Add-Content ".env.local" "N8N_URL=http://localhost:5678"
    Add-Content ".env.local" "N8N_API_KEY=your_api_key_here_get_from_n8n_settings"
    Add-Content ".env.local" "WEBHOOK_SECRET=shonen_ark_webhook_secret_2025"
}

Write-Host "🚀 Starting n8n..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop n8n when you're done." -ForegroundColor Yellow
Write-Host ""

# Start n8n
try {
    n8n start
} catch {
    Write-Host "❌ Failed to start n8n: $_" -ForegroundColor Red
    Write-Host "💡 Try running: npm install n8n -g" -ForegroundColor Yellow
    exit 1
}
