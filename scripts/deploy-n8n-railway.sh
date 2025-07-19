#!/bin/bash

# Railway n8n Deployment Script
# Deploys n8n as a separate service on Railway

echo "🚀 Deploying n8n to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Ensuring Railway authentication..."
railway whoami || railway login

# Deploy n8n service
echo "📦 Deploying n8n service..."

# Create n8n service if it doesn't exist
railway service create n8n-automation || true

# Set environment variables for n8n service
echo "⚙️ Setting n8n environment variables..."

railway variables set \
    NODE_ENV=production \
    N8N_HOST=0.0.0.0 \
    N8N_PORT=5678 \
    N8N_PROTOCOL=https \
    N8N_API_KEY_AUTH_ENABLED=true \
    N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true \
    N8N_BASIC_AUTH_ACTIVE=true \
    N8N_BASIC_AUTH_USER=admin \
    --service=n8n-automation

# Generate secure password if not set
if ! railway variables get N8N_BASIC_AUTH_PASSWORD --service=n8n-automation &> /dev/null; then
    N8N_PASSWORD=$(openssl rand -base64 32)
    railway variables set N8N_BASIC_AUTH_PASSWORD="$N8N_PASSWORD" --service=n8n-automation
    echo "🔑 Generated n8n admin password: $N8N_PASSWORD"
    echo "⚠️  Save this password! You'll need it to access n8n."
fi

# Deploy n8n with custom Dockerfile
echo "🚀 Deploying n8n container..."
railway up --dockerfile=infrastructure/config/Dockerfile.n8n --service=n8n-automation

# Get n8n service URL
N8N_URL=$(railway domain --service=n8n-automation)
echo "✅ n8n deployed successfully!"
echo "🌐 n8n URL: https://$N8N_URL"

# Update main app with n8n URL
echo "🔗 Updating main app with n8n connection..."
railway variables set \
    N8N_URL="https://$N8N_URL" \
    N8N_SIGNUP_WEBHOOK_URL="https://$N8N_URL/webhook/user-signup" \
    N8N_PROJECT_APPROVAL_WEBHOOK_URL="https://$N8N_URL/webhook/project-approval" \
    --service=web

echo "🎉 Railway n8n deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Visit https://$N8N_URL to access n8n"
echo "2. Login with admin / [password shown above]"
echo "3. Go to Settings > API Keys to generate your API token"
echo "4. Set N8N_API_KEY in your main app environment variables"
echo "5. Import workflows from the workflows/ directory"
