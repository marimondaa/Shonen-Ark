# Railway n8n Deployment Script (PowerShell)
# Deploys n8n as a separate service on Railway

Write-Host "🚀 Deploying n8n to Railway..." -ForegroundColor Green

# Check if Railway CLI is installed
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Railway CLI not found. Installing..." -ForegroundColor Red
    npm install -g @railway/cli
}

# Login to Railway (if not already logged in)
Write-Host "🔐 Ensuring Railway authentication..." -ForegroundColor Cyan
try {
    railway whoami | Out-Null
} catch {
    railway login
}

# Deploy n8n service
Write-Host "📦 Deploying n8n service..." -ForegroundColor Yellow

# Create n8n service if it doesn't exist
try {
    railway service create n8n-automation
} catch {
    Write-Host "Service already exists, continuing..." -ForegroundColor Yellow
}

# Set environment variables for n8n service
Write-Host "⚙️ Setting n8n environment variables..." -ForegroundColor Cyan

$env_vars = @(
    "NODE_ENV=production",
    "N8N_HOST=0.0.0.0",
    "N8N_PORT=5678",
    "N8N_PROTOCOL=https",
    "N8N_API_KEY_AUTH_ENABLED=true",
    "N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true",
    "N8N_BASIC_AUTH_ACTIVE=true",
    "N8N_BASIC_AUTH_USER=admin"
)

foreach ($var in $env_vars) {
    railway variables set $var --service=n8n-automation
}

# Generate secure password if not set
try {
    railway variables get N8N_BASIC_AUTH_PASSWORD --service=n8n-automation | Out-Null
} catch {
    $bytes = New-Object Byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $password = [Convert]::ToBase64String($bytes)
    
    railway variables set "N8N_BASIC_AUTH_PASSWORD=$password" --service=n8n-automation
    Write-Host "🔑 Generated n8n admin password: $password" -ForegroundColor Green
    Write-Host "⚠️  Save this password! You'll need it to access n8n." -ForegroundColor Yellow
}

# Deploy n8n with custom Dockerfile
Write-Host "🚀 Deploying n8n container..." -ForegroundColor Green
railway up --dockerfile=infrastructure/config/Dockerfile.n8n --service=n8n-automation

# Get n8n service URL
$n8n_url = railway domain --service=n8n-automation
Write-Host "✅ n8n deployed successfully!" -ForegroundColor Green
Write-Host "🌐 n8n URL: https://$n8n_url" -ForegroundColor Cyan

# Update main app with n8n URL
Write-Host "🔗 Updating main app with n8n connection..." -ForegroundColor Yellow
railway variables set "N8N_URL=https://$n8n_url" --service=web
railway variables set "N8N_SIGNUP_WEBHOOK_URL=https://$n8n_url/webhook/user-signup" --service=web
railway variables set "N8N_PROJECT_APPROVAL_WEBHOOK_URL=https://$n8n_url/webhook/project-approval" --service=web

Write-Host "🎉 Railway n8n deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit https://$n8n_url to access n8n"
Write-Host "2. Login with admin / [password shown above]"
Write-Host "3. Go to Settings > API Keys to generate your API token"
Write-Host "4. Set N8N_API_KEY in your main app environment variables"
Write-Host "5. Import workflows from the workflows/ directory"
